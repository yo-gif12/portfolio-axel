
var stop = false,
   scrollableElement = document.body,
   designText = document.querySelector('.design__text h1'),
   winHeight = $(window).height(),
   topLimit = winHeight * .2,
   bottomLimit = winHeight * .8,
   // left: 37, up: 38, right: 39, down: 40,
   // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
   keys = {37: 1, 38: 1, 39: 1, 40: 1},
   supportsPassive = false;

if(screen.width  < 768){
   var initialPosition = 0,
   limit = -110,
   jump = (limit*-1)/10,
   position = 0;
}
else if(screen.width  >= 768 && screen.width  < 900){
   var initialPosition = 150,
   limit = 0,
   jump = initialPosition/10,
   position = 150;
}
else if(screen.width  >= 900 && screen.width  < 1025){
   var initialPosition = 200,
   limit = 0,
   jump = initialPosition/10,
   position = 200;
}
else if(screen.width  >= 1025 && screen.width  < 1400){
   var initialPosition = 250,
   limit = 0,
   jump = initialPosition/10,
   position = 250;
}
else {
   var initialPosition = 300,
   limit = 0,
   jump = initialPosition/10,
   position = 300;
}

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function checkScrollDirection(event) {
   if (checkScrollDirectionIsUp(event)) {
     up();
   } else {
     down();
   }
 }
 
 function checkScrollDirectionIsUp(event) {
   if (event.wheelDelta) {
     return event.wheelDelta > 0;
   }
   return event.deltaY < 0;
 }

function up(){
   if(position==initialPosition){
      stop = false;
      enableScroll();
   }
   else if(position<initialPosition){
      position+=jump;
      designText.style.transform="translateX("+position+"px)";
   }
 }

function down(){
   if(position==limit){
      stop = false;
      enableScroll();
   }
   else if(position>limit){
      position-=jump;
      designText.style.transform="translateX("+position+"px)";
   }
 }

function mooveDesign(){
   if(stop){
      //à completer les direction 
      scrollableElement.addEventListener('wheel', checkScrollDirection);
      scrollableElement.addEventListener('DOMMouseScroll', checkScrollDirection);
      scrollableElement.addEventListener('keydown', checkScrollDirection);
      scrollableElement.addEventListener('touchmove', checkScrollDirection);
   }
}

$(window).on('scroll', function() {
   var thisTop = $('.design__text h1').offset().top - $(window).scrollTop();
   if (thisTop >= topLimit && (thisTop + $('.design__text h1').height()) <= bottomLimit) {
      disableScroll();
      stop = true;
   }
});

window.addEventListener('DOMMouseScroll', mooveDesign);
window.addEventListener(wheelEvent, mooveDesign); 
window.addEventListener('touchmove', mooveDesign);
window.addEventListener('keydown', mooveDesign);