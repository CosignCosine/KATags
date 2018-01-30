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
        }
      });

      if(ft){
        var blocks = document.querySelectorAll('.cosigncosine-block');
        Array.prototype.forEach.call(discussion, function(el){
          el.addEventListener("click", function(event){
            var user = el.parentNode.parentNode.parentNode.querySelectorAll('.discussion-meta-info')[0].querySelectorAll('.author-nickname')[0].textContent.replace("View profile for: ", "").trim().replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "");
            if(confirm('Are you sure that you want to block ' + user + '?')){
              console.warn('blocked ' + user)
              pl.push(user);
              pr = new RegExp(pl.join("|"), "gim");
              localStorage.setItem("cosigncosine-block", JSON.stringify(pl));
            }
          })
        })
      }

      ft = false;
    break;

  }
}

var int = setInterval(function(){
  if(document.querySelectorAll('.discussion-meta-controls').length > 0){
    ext(0);
  }
  // add block button on profile

  // add unblock area on user profile

  // add show blocked checkbox to notification dropdown
}, 500)
