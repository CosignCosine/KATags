console.group('KATags')
console.warn(`\n██╗  ██╗ █████╗ ████████╗ █████╗  ██████╗ ███████╗
██║ ██╔╝██╔══██╗╚══██╔══╝██╔══██╗██╔════╝ ██╔════╝
█████╔╝ ███████║   ██║   ███████║██║  ███╗███████╗
██╔═██╗ ██╔══██║   ██║   ██╔══██║██║   ██║╚════██║
██║  ██╗██║  ██║   ██║   ██║  ██║╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                  `);
console.warn("KATags loaded.\nRedistribution of this script with edited credit is not only unfair but also steals from the original author. This script was written in its entirety by CosignCosine/Scott Schraeder. Please do not redistribute without credit.");
console.groupEnd();
//var loc = location.href.match(/https:\/\/www.khanacademy.org\/computer-programming\/.+\/(\d+)/gim);
var pn = location.href.replace(/https:\/\/www.khanacademy.org\/computer-programming\/.+\/(\d+)/gim, '$1');
var request = new XMLHttpRequest();
request.open('GET', ('https://www.khanacademy.org/api/labs/scratchpads/' + pn), true);
var tags = [];

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    var l = data.revision.code.replace(/(.+)KATAGS: /gim, '')
    if(l === data.revision.code){
      console.warn('no tags')
      l = [];
    }else{
      console.warn(l)
      l = l.replace(/ END[\s\S]*/gim, '');
      console.warn(l)
      l = l.split(' ');
    }

    tags = l;
  } else {
    console.error('Could not fire KATags due to Khan Academy server errors.')
    // We reached our target server, but it returned an error
  }
};
request.onerror = function() {
  console.error('Could not fire KATags due to client-side inconsistencies or errors.')
};
request.send();

var nint = setInterval(function(){
  if(tags.length > 0 && document.querySelectorAll('.author-nickname').length > 0){
    var fd = document.querySelectorAll('div');
    Array.prototype.forEach.call(fd, function(el){
      if(el.querySelectorAll('div')[0] && el.querySelectorAll('div')[0].className.match(/buttons/gim)){
        console.warn('applying tags')
        var tagDIV = document.createElement('div');
        var htm = "<br>";
        for(var i = 0; i < tags.length; i++){
          htm += "<a style='background:rgb(31, 171, 84);color:white;padding:5px;border-radius:1em;font-weight:bold;text-decoration:none;' href='https://www.khanacademy.org/computer-programming/browse?tag=" + tags[i].replace(/\#/gim, '') + "'>" + tags[i].replace(/\#/gim, '') + '</a>&nbsp;&nbsp;'
        }
        tagDIV.innerHTML = htm;
        el.appendChild(tagDIV);
      }
    });
    clearInterval(nint);
  }
}, 250)

// implement blacklist and more
/**
Sample text:

Hello *{{user}}*! This is your *1st* KATags strike. Please remember to use KATags functionality correctly by correctly tagging your programs. For instance, if a program is a platformer, don't tag it as "RPG" as well. Tagging your programs like that is unfair to those who have spent time making RPGs. Additionally, please keep in mind that every user has a maximum of *two* strikes. You have *one* strike remaining. At that point, your programs will be entirely blacklisted from KATags. No tags will take effect, and a red notice will appear that notifies other users that you have been blocked.

Note: This message is semi-automated via a bot. It is impersonal and is the same message anyone else would get. If you feel like this strike was undeserved, you may reply to this message, but it is very likely that this stike will not be repealed. */
