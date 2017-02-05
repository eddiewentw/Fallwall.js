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
	const _setFirstRoundContent = ( dataArray, callbackFunction ) => {

		for( let i = 0; i < defaults.gridNumber; i++ ) {
			if( dataArray[i] ) {
				_appendGrids( dataArray[i], 'down' );
				defaults.currentGrid = i;
			}
			else {
				break;
			}
		}

		if( callbackFunction ) {
			if( typeof callbackFunction === 'function' ) {
				callbackFunction();
			}
			else {
				console.error(`${callbackFunction} is not a function`);
			}
		}

	};

	/**
	 * Add new grid
	 * direction: up/down => grid is added at the top/bottom
	 */
	const _appendGrids = ( obj, direction ) => {

		let thisCode = defaults.html_template;

		for( let j = 0; j < Object.keys(obj).length; j++ ) {
			thisCode = thisCode.replace( `fallwall_#${j+1}`, obj[j] );
		}

		const targetColumn = $('.fw_column').eq( _getShortestColumn() );
		let creatingElement;
		if( direction === 'up' ) {
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
		if( defaults.defaultClass ) {
			creatingElement.addClass( defaults.defaultClass );
		}

	};

	/**
	 * Return the shortest fw_column to append a new grid
	 */
	const _getShortestColumn = () => {

		let heightArray = [];

		$.each($('.fw_column'), (index, element) => {
			heightArray.push( element.offsetHeight );
		});

		return $.inArray( Math.min.apply( null, heightArray ), heightArray );

	};

	/**
	 * Fallwall construtcor
	 * Setup template and data source
	 */
	$.fn.fallwall_init = function( template, dataArray, options, callbackFunction ) {

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
	$.fn.addFwGrid = ( data, callbackFunction ) => {

		if( typeof data !== 'object' ) {
			throw new Error(`First parameter of addFwGrid(): ${data} must be Object`);
		}

		// Add a new grid
		_appendGrids( data, 'up' );

		if( callbackFunction ) {
			if( typeof callbackFunction === 'function' ) {
				callbackFunction();
			}
			else {
				console.error(`${callbackFunction} is not a function`);
			}
		}

	};

});
