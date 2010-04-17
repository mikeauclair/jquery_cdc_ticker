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

position:absolute;
left:0;
top:0;
z-index:5;
*/
(function(jQuery)
{
	var self = null;
	jQuery.fn.cdcticker = function(o)
	{
		return this.each(function()
		{
			new jQuery.cdcticker(this, o);
		});
	};
	jQuery.cdcticker = function (e, o)
	{
		this.init();
	};
	jQuery.cdcticker.fn = jQuery.cdcticker.prototype = {
		cdcticker: '0.0.1'
	};
	jQuery.cdcticker.fn.extend = jQuery.cdcticker.extend = jQuery.extend;
	jQuery.cdcticker.fn.extend({
		init: function()
		{
			var self = this;
		}
	});
})(jQuery);
