/*!
 * Fallwall.js
 *
 * Copyright © 2017 Eddie Wen | MIT license
 * https://github.com/EddieWen-Taiwan/Fallwall.js
 */

((root, factory) => {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	root ? root.Fallwall = factory(jQuery) :
	window.Fallwall =  factory(jQuery)
})(this, ($) => {

	let defaults = {
		gridNumber: 20,
		columnNumber: 1,
		defaultClass: '',
		currentGrid: 0,
	};

	/**
	 * call after initializing Fallwall
	 * append grids in the zfirst round
	 */
	const _setFirstRoundContent = function( dataArray, callback_func ) {

		for( var i = 0; i < defaults.gridNumber; i++ ) {
			if( typeof dataArray[i] != "undefined" ) {
				_appendGrids( dataArray[i], 'down' );
				defaults.currentGrid = i;
			}
			else {
				break;
			}
		}

		if( callback_func ) {
			if( typeof callback_func == 'function' )
				callback_func();
			else
				console.error(callback_func+' is not a function');
		}

	},

	/**
	 * Add new grid
	 * direction: up/down => grid is added at the top/bottom
	 */
	_appendGrids = function( obj, direction ) {

		var thisCode = defaults.html_template;

		for( var j = 0; j < Object.keys(obj).length; j++ ) {
			thisCode = thisCode.replace( 'fallwall_#'+(j+1), obj[j] );
		}

		var targetColumn = $('.fw_column').eq( _getShortestColumn() );
		var creatingElement;
		if( direction == 'up' ) {
			targetColumn.prepend( thisCode );
			creatingElement = targetColumn.find('.fw_grid').first();
		}
		else {
			targetColumn.append( thisCode );
			creatingElement = targetColumn.find('.fw_grid').last();
		}

		/**
		 * Add extra class
		 * like animation class
		 */
		if( defaults.defaultClass != '' ) {
			creatingElement.addClass( defaults.defaultClass );
		}

	},

	/**
	 * Return the shortest fw_column to append a new grid
	 */
	_getShortestColumn = function() {

		var heightArray = [];

		$.each( $('.fw_column'), function(index, element) {
			heightArray.push( element.offsetHeight );
		});

		var minColumn = Math.min.apply( null, heightArray );
		return $.inArray( minColumn, heightArray );

	};

	/**
	 * Fallwall construtcor
	 * Setup template and data source
	 */
	$.fn.fallwall_init = ( template, dataArray, options, callbackFunction ) => {

		/**
		 * check required parameters
		 */
		if( !template ) {
			throw new Error('missed HTML template');
		}

		if( !dataArray ) {
			throw new Error('missed data source');
		}
		if( !Array.isArray(dataArray) ) {
			throw new Error('typeof dataArray is not correct');
		}

		// Store data from user
		defaults = {
			...defaults,
			html_template: `<div class='fw_grid'>${template}</div>`,
			dataArray: dataArray,
			...options,
		};

		// Add columns
		let colElements = '';
		for( let i = 0; i < defaults.columnNumber; i++ ) {
			colElements += '<div class=\'fw_column\'></div>';
		}
		this.append( colElements );

		// Prepare CSS
		this.find('.fw_column').css({
			'vertical-align': 'top',
			display: 'inline-block',
			width: `${Math.floor(1000/defaults.columnNumber)/10}%`,
		});

		// Add grids at first
		_setFirstRoundContent( dataArray, callbackFunction );

	};

	/**
	 * load more data and append them
	 */
	$.fn.loadMoreFw = function( callback_func ) {

		if( defaults.currentGrid +1 < defaults.dataArray.length ) {

			defaults.currentGrid++;
			var limitNum = defaults.currentGrid + defaults.gridNumber;
			for( var i = defaults.currentGrid; i < limitNum; i++ ) {

				if( typeof defaults.dataArray[i] != "undefined" ) {

					_appendGrids( defaults.dataArray[i], 'down' );
					defaults.currentGrid = i;

				}
				else {
					// Data is exhausted before last run in loop
					if( callback_func ) {
						if( typeof callback_func == 'function' )
							callback_func();
						else
							console.error(callback_func+' is not a function');
					}
					return "NO_MORE_DATA";
				}

				// Last run in loop
				if( i == limitNum-1 ) {
					if( callback_func ) {
						if( typeof callback_func == 'function' )
							callback_func();
						else
							console.error(callback_func+' is not a function');
					}
					return "FINISHED";
				}

			}

		}

		/***
		 * There is no more data.
		 * All is displayed.
		***/
		return "NO_MORE_DATA";

	};

	/**
	 * directly append a new grid at the top of one column
	 */
	$.fn.addFwGrid = function( data, callback_func ) {

		if( typeof data == 'object' ) {
			// Add a new grid
			_appendGrids( data, 'up' );

			if( callback_func ) {
				if( typeof callback_func == 'function' )
					callback_func();
				else
					console.error(callback_func+' is not a function');
			}
		}
		else {
			throw new Error('First parameter of addFwGrid(): '+data+' must be Object');
		}

	};

});
