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
console.warn(pr)

var int = setInterval(function(){
  if(document.querySelectorAll('.discussion-meta-controls').length > 0){
    // add block button next to each comment post
    var discussion = document.querySelectorAll('.discussion-meta-controls');
    Array.prototype.forEach.call(discussion, function(el, i){
      if(el.querySelectorAll('.cosigncosine-block').length === 0){
        // discussion-meta-separator
        var sp = document.createElement("span")
        sp.innerHTML = ("• ");
        sp.className = "discussion-meta-separator";
        el.appendChild(sp);

        // block button
        var bl = document.createElement("span");
        bl.innerHTML = " <a href='javascript:void(0);' class='cosigncosine-block' title='Block this user'>Block</a>";
        bl.className = "flag-tools";
        el.appendChild(bl)
      }
    });
  }
  // add block button on profile

  // add unblock area on user profile

  // add show blocked checkbox to notification dropdown
}, 500)
