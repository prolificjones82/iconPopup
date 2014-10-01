/*
 *
 *		ICON POPUP PLUGIN
 *		version 1.0
 *		Written by Lee Jones (mail@leejones.me.uk)
 *		Home Page: http://leejones.me.uk
 *
 */ 

(function($) {

	$.fn.iconPopup = function(options) {

		// OPTIONS
		var options = $.extend({
			popupLocation: 'images/icons/popups/',
			iconLocation: 'images/icons/',
			fileExt: 'png',
			locX: 0,
			locY: 0,
			animationSpeed: 100
		}, options);

		$('head').append('<style>.'+$(this).attr('class')+'{display:inline-block;position:relative;margin-left:3px;margin-right:3px;}.popup-activate{display:inline;position:absolute;cursor:pointer;}.icon-popup-large{position:absolute;padding:10px;left:0;top:0;z-index:300px;display:none;}.icon-popup-large img{max-width:300px;}</style>');

		// BUILD POPUP IMAGE CONTAINER
		$(document.body).prepend('<div class="icon-popup-large"></div>');

		// WRAP HUDL ICON
		this.wrap('<div class="popup-activate"></div>');

		// POPULATE ICONS INTO HOLDERS
		this.each(function() {

			// BUILD ICON LINK
			if ($(this).attr('data-switch') !== undefined && $(this).attr('data-switch') !== false)
			{
				var icon = options.iconLocation + $(this).attr('data-switch') + '/' + $(this).attr('data-icon') + '.' + options.fileExt;
			}
			else
			{
				var icon = options.iconLocation + $(this).attr('data-icon') + '.' + options.fileExt;
			}

			// SET SIZE VARIABLE CSS
			switch ($(this).attr('data-icon-size')) {
				case 'large':
					var size = {
						'width': '70px'
					}
					break;
				case 'xlarge':
					var size = {
						'width': '120px'
					}
					break;
				case 'full':
					var size = {
						'width': 'auto'
					}
					break;
				default:
					var size = {
						'width': '30px'
					}
			}

			// INPUT CSS STYLES
			$(this).css(size);

			
			// GENERATE IMAGES
			$(this).attr('src', icon);


			// POPUP ACTIONS
			$(this)
				.mouseover($(this), function(e) {

					var icon = $(this).attr('data-icon');
					
					// POPUP LOCATION
					var mouseX = e.pageX + options.locX + 'px';
					var mouseY = e.pageY - options.locY + 'px';
					var popupLocation = {
						'top': mouseY,
						'left': mouseX
					}

					// PLACE POPUP IMAGE CONTAINER
					$('.icon-popup-large').css(popupLocation);

					// BUILD ICON LINK
					if ($(this).attr('data-switch') !== undefined && $(this).attr('data-switch') !== false)
					{
						var img = '<img src="' + options.popupLocation + $(this).attr('data-switch') + '/' + icon + '.' + options.fileExt +'" alt="' + icon + '" />';
					}
					else
					{
						var img = '<img src="' + options.popupLocation + icon + '.' + options.fileExt +'" alt="' + icon + '" />';
					}
					

					// ADD POPUP IMAGE TO CONTAINER
					$('.icon-popup-large').prepend(img);
					$('.icon-popup-large').fadeIn(options.animationSpeed);
				})
				.mouseleave($(this), function() {
					$('.icon-popup-large').fadeOut(options.animation_speed).html('');
				});


		});

	}

}(jQuery));