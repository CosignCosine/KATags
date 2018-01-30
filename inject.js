console.group('KABlock')
console.warn(`_  __   _   ___ _         _
 | |/ /  /_\\ | _ ) |___  __| |__
 | ' <  / _ \\| _ \\ / _ \\/ _| / /
 |_|\\_\\/_/ \\_\\___/_\\___/\\__|_\\_\\
                                `);
console.warn("KABlock loaded.\nRedistribution of this script with edited credit is not only unfair but also steals from the original author. This script was written in its entirety by CosignCosine/Scott Schraeder. Please do not redistribute without credit.");
console.groupEnd();

// get regexp for people currently blocked
var pl = localStorage.getItem("cosigncosine-block") ? JSON.parse(localStorage.getItem("cosigncosine-block")) : [];
var sh = localStorage.getItem('cosigncosine-show');
if(sh === undefined || sh === null){
    localStorage.setItem('cosigncosine-show', false);
}
var pr = new RegExp(pl.join("|"), "gim");

var ft = true; //first time runnning?

// delete parents
function dt(el, dpt){
  ++dpt;
  if(pl.length !== 0){
      if (el.textContent.replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "").match(pr)) {
          while(dpt > 0){
              el = el.parentNode;
              dpt--;
          }
          el.parentNode.removeChild(el)
      }
  }
}

function ext(s){
  switch(s){

    // cs discussion
    case 0:
      // add block button next to each comment post
      var discussion = document.querySelectorAll('.discussion-meta-controls');
      Array.prototype.forEach.call(discussion, function(el){
        if(el.querySelectorAll('.cosigncosine-block').length === 0 && !el.parentNode.parentNode.parentNode.className.match(/voting\-wrap/gim)){
          // discussion-meta-separator
          var sp = document.createElement("span")
          sp.innerHTML = ("• ");
          sp.className = "discussion-meta-separator";
          el.appendChild(sp);

          // block button
          var bl = document.createElement("span");
          bl.innerHTML = " <a href='javascript:void(0);' class='cosigncosine-block' title='Block this user'>Block</a>";
          bl.className = "flag-tools";
          el.appendChild(bl);

          bl.addEventListener("click", function(event){
            console.error('Clicked the block button')
            var user = bl.parentNode.parentNode.querySelectorAll('.discussion-meta-info')[0].querySelectorAll('.author-nickname')[0].textContent.replace("View profile for: ", "").trim().replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "");
            if(confirm('Are you sure that you want to block ' + user + '? If you\'re using the Khan Academy Extension, this will delete all recent notifications from this user!')){
              console.warn('blocked ' + user)
              pl.push(user);
              pr = new RegExp(pl.join("|"), "gim");
              localStorage.setItem("cosigncosine-block", JSON.stringify(pl));
            }
          })
        }
      });

      var a = document.querySelectorAll('a');
      Array.prototype.forEach.call(a, function(el){
          if(el.className.match(/author/gim)){
              dt(el, 2);
          }
      });
    break;

    case 1:
      if(ft && document.querySelectorAll('.profile-widget').length > 0 && document.querySelectorAll('.user-card-edit-menu')[0].innerHTML !== ''){
        console.warn(document.querySelectorAll('.profile-widget').length)
        var wgd = document.createElement("div");
        wgd.className = 'profile-widget editable cosigncosine-block-widg';
        wgd.role = 'button';
        wgd.innerHTML = '<div class="profile-widget-header"><div class="profile-widget-name">Users Blocked</div><div class="dropdown widget-privacy editing-privacy"><div class="widget-privacy-indicator"><div class="widget-privacy-indicator-inner"><span class="widget-privacy-icon icon-user"></span><span>Only You</span></div></div></div></div><div class="profile-widget-contents" id="cosigncosineBU"></div>';
        var wc = document.querySelectorAll('.widgets-column')[0];

        wc.insertBefore(wgd, wc.firstChild)

        for(var i = 0; i < pl.length; i++){
          var usr = document.createElement('div');
          usr.className = 'blocked-user-div'
          usr.innerHTML = pl[i] + " <a href='javascript:void(0)' class='cosigncosine-unblock' style='color: red' name='" + i + "'>(unblock)</a>";
          document.getElementById('cosigncosineBU').appendChild(usr)
        }

        var ub = document.querySelectorAll('.cosigncosine-unblock');
        Array.prototype.forEach.call(ub, function(el){
          el.addEventListener("click", function(event){
            if(confirm('Are you sure that you want to unblock ' + pl[+el.name] + '? If you\'re using the Khan Academy Extension, this will not restore deleted notifications!')){
              pl.splice(+el.name, 1);
              localStorage.setItem("cosigncosine-block", JSON.stringify(pl));
              document.getElementById("cosigncosineBU").innerHTML = "";
              for(var i = 0; i < pl.length; i++){
                var usr = document.createElement('div');
                usr.className = 'blocked-user-div'
                usr.innerHTML = pl[i] + " <a href='javascript:void(0)' class='cosigncosine-unblock' style='color: red' name='" + i + "'>(unblock)</a>";
                document.getElementById('cosigncosineBU').appendChild(usr)
              }
            }
          });
        });

        ft = false;
      }
    break;

    default: {
      var str = document.querySelectorAll('strong');
      Array.prototype.forEach.call(str, function(el){
        if(el.parentNode.parentNode.parentNode.parentNode.className.match(/notification/gim)){
          if(el.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.kae-notif-delete').length > 0 && el.textContent.replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "").match(pr)){
            el.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.kae-notif-delete')[0].click();
          }else{
            dt(el, 4)
          }
        }
      })
    } break;
  }
}

ft = true;
var int = setInterval(function(){
  if(document.querySelectorAll('.discussion-meta-controls').length > 0 && (location.href.includes('computing') || location.href.includes('computer-programming'))){
    ext(0);
    ext();
  }
  // add block button on profile

  // add unblock area on user profile
  if(location.href.includes('profile') || location.href === 'https://www.khanacademy.org/'){
    ext(1);
    ext();
  }

  // add show blocked checkbox to notification dropdown
}, 500)
