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

	// macro simulation for debugger
	var de = false;
	var bug = function(msg) { console.log(msg); };
	
	// global background variables 
	var g_x = 0;
	var g_y = 0;
	var g_xGrad = 0;
	var g_yGrad = 0;
	var GRADIENT_INCREMENT = 1;
	var g_lightness = 0;
	var g_animating = false;
	var g_fontColor = '#fff';
	var FONT_LIGHT_THRESHOLD = 60;
	// build the quote library
	var g_arrQuotes = [
		{	'quote': 'This town doesn\'t have a mayor. But if there\'s ever ' +
				'problem, a skeleton will tell a fish lady about it. ' +
				'Thaaaaaat\'s politics!',
			'person': 'Snowdin Bear' },
		{	'quote': 'This is a quote that I am making up because I am a ' +
				'maker-upper.',
			'person': 'Me'},
		{	'quote': 'If I die today, then it means nothing.',
			'person': 'Sam Pepper'},
		{	'quote': 'If you don\'t like your situation, change it. If you ' +
				'can\'t, change your attitude. Don\'t complain.',
			'person': 'Maya Angelou'},
		{	'quote': 'As I walk through the valley and I look at my life, ' +
				'I think I\'m some kind of really obscure kind of foolish ' +
				'human being.',
			'person': 'Monkey Moniker'}
	];	

	// grab a new quote on #new-quote button click
	$('#new-quote').on('click.getQuote', function() {
		// do nothing if still animating 
		if ( $(':animated').length ) {
			return;
		}
		var index = ( Math.random() * g_arrQuotes.length ) >> 0;
		// fadeout, change quote, fadein
		$('.inner').animate({'opacity': 0}, 'slow', function() {
			$('#quote').html('<i class="fa fa-quote-left" ' + 
				'aria-hidden="true"></i> ' + g_arrQuotes[index].quote);
			$('#person').html('&mdash; ' + g_arrQuotes[index].person);
			$(this).animate({'opacity': 1}, 'slow');
		})
	});

	// mousemoves change background colour
	$(document).on('mousemove.bkg', function(e) {
		// capture x (left & right) movements & sign 
		var x = e.clientX;
		var x_left = ( x < g_x )? true : false;
		var x_right = ( x > g_x )? true : false;
		var x_sig = ( x_left )? -1 : ( x_right )? 1 : 0;
		g_x = x;
		g_xGrad += x_sig * GRADIENT_INCREMENT;

		// capture y (up & down) movements & sign
		var y = e.clientY;
		var y_up = ( y < g_y )? true : false;
		var y_down = ( y > g_y )? true : false;
		var y_sig = ( y_up )? -1 : ( y_down )? 1 : 0;
		g_y = y;
		g_yGrad += y_sig * GRADIENT_INCREMENT;
		
		var grad = g_xGrad + g_yGrad;
		$('body').css('background-image',
			'linear-gradient(to right top, hsla('+grad+', 100%, 70%, 0.66), ' +
			'hsla('+(grad+180)+', 100%, 70%, 0.66))');
	});

	// mouseclicks change background light
	$(document).on('click.bkg', function(e) {
		if ( g_animating ) {
			return;
		}
		g_animating = true;
		g_lightness = Math.random()*100 >> 0;
		var colour = Math.random()*360 >> 0;
		$('body').animate({'background-color': 'hsl('+colour+', 100%, ' +
			g_lightness+'%)'}, 'slow', function() {
				g_animating = false;
		} );

		// if g_lightness > 75%, change font for better UX
		g_fontColor = ( g_lightness > FONT_LIGHT_THRESHOLD )? '#333' : '#fff';
		$('.inner__text-color').animate({'color': g_fontColor,
			'border-color': g_fontColor}, 'slow');	
		de&&bug('g_lightness='+g_lightness+', g_fontColor='+g_fontColor);
	});



})(jQuery);