/* 
 * jQuery CDC Ticker
 * by Mike Auclair
 * mike@mikeauclair.com
 *
 * Copyright (c) 2010 Mike Auclair
 * Licensed under the GPL (gpl-2.0.txt) license. 
 *
 * NOTE: This plugin depends on jQuery.  Download jQuery at www.jquery.com
 *
 */


/*
SCRATCH PAD


*/
(function(jQuery)
{
	var self = null;
	jQuery.fn.cdcTicker = function(o) {
		return this.each(function() {
			new jQuery.cdcTicker(this, o);
		});
	};
	
	jQuery.cdcTicker = function (e, o) {
		this.options = o || {};
		this.parent_elem = e;
		this.init();
	};
	
	jQuery.cdcTicker.fn = jQuery.cdcTicker.prototype = {
		cdcTicker: '0.0.1'
	};
	
	jQuery.cdcTicker.fn.extend = jQuery.cdcTicker.extend = jQuery.extend;
	jQuery.cdcTicker.fn.extend({
		init: function() {
			var self = this;
			var elem_counter = 0;
			console.log(self);
			$(this.parent_elem).children('li').each(function() {
				elem_counter += 1;
				console.log(elem_counter);
				this.elem_number = elem_counter;
				$(this).children().wrapAll('<div>').show();
				var heading = $(this).children('div').children(':header').clone();
				$(this).prepend(heading);
				$(this).children('div').css({'position':'absolute',
					'left':'0',
					'top':'6em',
					'z-index':'50'
				});
			});
			this.top_elem = $(this.parent_elem).children('li')[0];
			$(this.top_elem).children('div').css({'z-index':'52'});
			$(this.parent_elem).children('li').not(this.top_elem).children('div').hide();
			$(this.parent_elem).children('li').children(':header').contents().wrap('<a href="javascript:">');
			$(this.parent_elem).children('li').children(':header').children('a').click(function(){
				self.setShow($(this).parent().parent()[0].elem_number);
			})
		},
		setShow: function(number){
			var new_top = $(this.parent_elem).children('li').filter(function(index){
				return this.elem_number == number;
			})[0];
			var self = this;
			$(new_top).children('div').css({'z-index':'51'}).show();
			$(this.top_elem).children('div').fadeOut('fast',function(){
				$(new_top).children('div').css({'z-index':'52'});
				$(this).children('div').css({'z-index':'50'}).hide();
			});
			this.top_elem = new_top;
			
		}
	});
})(jQuery);
