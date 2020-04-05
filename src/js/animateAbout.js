/*window.addEventListener('scroll', function() {
   var defilement = window.pageYOffset + 'px';
   var design = document.querySelector('.design__text')
   console.log(design);
   if(defilement==design){
    document.querySelector('body').style.background="red";
   }
  });*/

  $(document).ready(function() {
   var winHeight = $(window).height(),
       topLimit = winHeight * .2,
       bottomLimit = winHeight * .8;

   $(window).on('scroll', function() {
       
      var thisTop = $('.design__text').offset().top - $(window).scrollTop();
      if (thisTop >= topLimit && (thisTop + $('.design__text').height()) <= bottomLimit) {
         console.log("J'y suis");
      } else{
         console.log("fini");
      }
   });
});


//or if you want  vanilla JS (supplied by felgall)
// http://community.sitepoint.com/t/changing-an-element-background-color-on-page-scroll-viewport/193578/17?u=paulob
/*
addClass = function(el,cl) {
var re = new RegExp('(^|\\s)'+cl+'(\\s|$)');
if (!el.className.match(re)) el.className += " "+cl;
};

removeClass = function(el,cl) {
var re = new RegExp('(^|\\s)'+cl+'(\\s|$)');
if (el.className.match(re))
el.className=el.className.replace(re,' ');
};

var scrollHi = function() {
[].forEach.call(document.querySelectorAll('.scroll li'), function(el) {
           var thisTop = (el.style.top || el.style.pixelTop || el.offsetTop || 0) - (window.pageXOffset ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
           if (thisTop >= topLimit && (thisTop + (el.offsetHeight || el.clipHeight || 0)) <= bottomLimit) {
               addClass(el,'highlight');
           } else{
      removeClass(el,'highlight');
          } 
        });
}; 

var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
       topLimit = winHeight * 0.2,
       bottomLimit = winHeight * 0.8;

   window.addEventListener('scroll', scrollHi, false );




*/


