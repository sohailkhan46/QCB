(function ($) {
"use strict";

/*--------------------------------------
	Nivo Slider Active
----------------------------------------*/
$('.slider-active').nivoSlider({
	controlNav: true,
	directionNav: true,
	randomStart: true,
	controlNavThumbs: false,
	animSpeed: 500,
	pauseTime: 5000,
	pauseOnHover: false,
	manualAdvance: false,
	prevText:'<i class="fa fa-angle-left"></i>',
	nextText: '<i class="fa fa-angle-right"></i>',
	slices: 15,
	boxCols: 8,
	boxRows: 4,
});

})(jQuery);	
