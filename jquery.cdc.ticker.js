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
		this.speed = this.options['speed'] || null;
		this.parent_elem = e;
		this.init();
	};
	
	jQuery.cdcTicker.fn = jQuery.cdcTicker.prototype = {
		cdcTicker: '0.0.2'
	};
	
	jQuery.cdcTicker.fn.extend = jQuery.cdcTicker.extend = jQuery.extend;
	jQuery.cdcTicker.fn.extend({
		init: function() {
			var self = this;
			var elem_counter = 0;
			var outer_elem = $(this.parent_elem);
			outer_elem.wrap('<div>').parent().addClass('cdcTickerWrapper');
			container = $('<div>');
			outer_elem.children('li').each(function() {
				elem_counter += 1;
				this.elem_number = elem_counter;
				var heading = $('<div>');
				this.control_box = heading;
				heading.append($(this).children(':header').text());
				//console.log($(this).children(':header').contents());
				heading.contents().wrap('<a href="javascript:">');
				heading.children('a').data('elem_number', elem_counter).click(function(){
					self.setShow($(this).data('elem_number'));
				});
				if (elem_counter == 1){
					heading.addClass('selected');
				}
				container.append(heading);
				$(this).css({'position':'absolute',
					'left':'0',
					'top':'0',
					'z-index':'50'
				});
			});
			container.addClass('cdcTickerControls');
			outer_elem.after(container);
			this.elem_count = elem_counter;
			this.top_elem = $(this.parent_elem).children('li')[0];
			$(this.top_elem).css({'z-index':'52'});
			$(this.parent_elem).children('li').not(this.top_elem).hide();
			if (this.speed){
				this.anim_timer = setTimeout(function(){self.autoAdvance(this.speed);}, self.speed);
			}
			container.hover(
				function(){
					//console.log('fleh');
					clearTimeout(self.anim_timer);},
				function(){
					if(self.speed){
						clearTimeout(self.anim_timer);
						self.anim_timer = setTimeout(function(){self.autoAdvance(this.speed);}, self.speed);
					}
				}
			);
		},
		autoAdvance: function(speed){
			var self = this;
			self.nextElem();
			self.anim_timer = setTimeout(function(){self.autoAdvance(speed);}, self.speed);
		},
		nextElem: function(){
			//console.log((this.top_elem.elem_number) % (this.elem_count) + 1);
			// console.log(this.top_elem.elem_number);
			// console.log(this.elem_count);
			this.setShow((this.top_elem.elem_number) % (this.elem_count) + 1);
		},
		setShow: function(number){
			var new_top = $(this.parent_elem).children('li').filter(function(index){
				return this.elem_number == number;
			})[0];
			if (this.top_elem != new_top){
				$(new_top)[0].control_box.siblings().removeClass('selected');
				$(new_top)[0].control_box.addClass('selected');
				$(new_top).css({'z-index':'51'}).fadeIn('medium');
				$(this.top_elem).fadeOut('medium',function(){
					$(new_top).css({'z-index':'52'});
					$(this).css({'z-index':'50'}).hide();
				});
				this.top_elem = new_top;
			}
		}
	});
})(jQuery);
