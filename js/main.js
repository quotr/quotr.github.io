/**
 * @fileoverview The main js implementation for quotr.github.io, 2016.
 * @author afablee@gmail.com, @superafable
 */

'use strict';

// document and window ready functions (test which loads first)
// window.onload = function() { console.log("LOADED window.onload..."); };
// (function() { console.log("LOADED IIFE.."); })();
// $(document).ready(function() { console.log("LOADED $(document).ready..."); });

(function($) {
	
	// global background variables 
	var g_x = 0;
	var g_y = 0;
	var x_grad = 0;
	var y_grad = 0;
	var GRADIENT_INCREMENT = 1;
	var lightness = 0;
	var animating = false;

	// mousemoves change background colour
	$(document).on('mousemove.bkg', function(e) {
		// capture x (left & right) movements & sign 
		var x = e.clientX;
		var x_left = ( x < g_x )? true : false;
		var x_right = ( x > g_x )? true : false;
		var x_sig = ( x_left )? -1 : ( x_right )? 1 : 0;
		g_x = x;
		x_grad += x_sig * GRADIENT_INCREMENT;

		// capture y (up & down) movements & sign
		var y = e.clientY;
		var y_up = ( y < g_y )? true : false;
		var y_down = ( y > g_y )? true : false;
		var y_sig = ( y_up )? -1 : ( y_down )? 1 : 0;
		g_y = y;
		y_grad += y_sig * GRADIENT_INCREMENT;
		
		var grad = x_grad + y_grad;
		$('body').css('background-image', 'linear-gradient(to right top, hsla('+grad+', 100%, 70%, 0.66), hsla('+(grad+180)+', 100%, 70%, 0.66))');
	});

	// mouseclicks change background light
	$(document).on('click.bkg', function(e) {
		if ( animating ) {
			return;
		}
		animating = true;
		lightness = Math.random()*100 >> 0;
		var colour = Math.random()*360 >> 0;
		$('body').animate({'background-color': 'hsl('+colour+', 100%, '+lightness+'%)'}, 'slow', function() {
			animating = false;
		} );
	});



})(jQuery);