
(function() {
    if(screen.width  >= 768) {
        var page = document.getElementById('scroll__horizontal');
        var list_pane = page.getElementsByTagName('div');
        var last_pane = list_pane[list_pane.length-1];
        var fisrt_pane = list_pane[0];
        var dummy_x = null;

        window.onscroll = function () {
            // Horizontal Scroll.
            var y = document.body.getBoundingClientRect().top;
            page.scrollLeft = -y;
            
            // Looping Scroll.
            var diff = window.scrollY - dummy_x;
           // window.scrollTo(0, dummy_x);
            if (diff > 0) {
                window.scrollTo(0, dummy_x);
            }
            else if (window.scrollY == 0) {
                window.scrollTo(0, diff);
            }
        }
        // Adjust the body height if the window resizes.
        window.onresize = resize;
        // Initial resize.
        resize();

        // Reset window-based vars
        function resize() {
            var w = page.scrollWidth-window.innerWidth+window.innerHeight;
            document.body.style.height = w + 'px';
            
            //dummy_x = fisrt_pane.getBoundingClientRect().right+window.scrollY;
            dummy_x = last_pane.getBoundingClientRect().left+window.scrollY;
        }
    }

})();