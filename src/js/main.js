
(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip__container' ),
		header = container.querySelector( 'div.ip__header' ),
		loader = new PathLoader( document.getElementById( 'ip__loader--circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.1, 1 );

					instance.setProgress( progress );

					// reached the end
					if( progress === 1 ) {
						classie.remove( container, 'loading' );
						classie.add( container, 'loaded' );
						clearInterval( interval );

						var onEndHeaderAnimation = function(ev) {
							if( support.animations ) {
								if( ev.target !== header ) return;
								this.removeEventListener( animEndEventName, onEndHeaderAnimation );
							}

							classie.add( document.body, 'layout__switch' );
							window.removeEventListener( 'scroll', noscroll );
						};

						if( support.animations ) {
							header.addEventListener( animEndEventName, onEndHeaderAnimation );
						}
						else {
							onEndHeaderAnimation();
						}
					}
				}, 80 );
		};

		loader.setProgressFn( simulationFn );
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();
	
})();


$(document).ready(function(){
	$('.close-icon').on('click', function() {
	  $(this).addClass('clicked');
	  // do whatever you want to do
	});
  });
  
  $(document).on('click', function(e){
	if (!$(e.target).hasClass('close-icon-container') && $(e.target).closest('.close-icon-container').length==0) {
	  $('.close-icon').removeClass('clicked');
	}
});

$(document).ready(function(){
	$('.link__next').on('click', function() {
		var rel = $(this).attr('rel')
	  $('.close__button').addClass('close__button--hide');
	  $('.' + rel).removeClass('close__button--hide');
	  // do whatever you want to do
	});
	$('.close-icon-container').on('click',function () {
		$(this).parent('div').addClass('close__button--hide')
	});
  });
  

function progress() {
	var windowScrollTop = $(window).scrollTop();
	var docHeight = $(document).height();
	var windowHeight = $(window).height();
	var progress = (windowScrollTop / (docHeight - windowHeight)) * 100;
	var $bgColor = progress > 99 ? '#E72B2B' : '#E72B2B';
  
	if(screen.width  >= 1025) {
		$('.progress .bar').width(progress + '%').css({ backgroundColor: $bgColor });
	}
	else {
		$('.progress .bar').height(progress + '%').css({ backgroundColor: $bgColor });
	}
}
progress();
$(document).on('scroll', progress);
