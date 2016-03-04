(function($){

	/* ---------------------------- *\
				Fall Style
	\* ---------------------------- */

	var settings;

	$.fn.fallwall_init = function( template, options, dataArray, callback_func ) {

		// Store data from user
		settings = $.extend({
			gridNumber: 20,
			columnNumber: 1,
			enterAnimation: 'animated zoomIn',
			html_template: `<div class='fw_grid'>${template}</div>`,
			dataArray: dataArray,
			currentGrid: 0
		}, options);

		// Add columns
		var colElements = '';
		for( var i = 0; i < settings.columnNumber; i++ ) {
			colElements += '<div class=\'fw_column\'></div>';
		}
		this.append( colElements );

		// Prepare CSS
		this.find('.fw_column').css({
			'display': 'inline-block',
			'vertical-align': 'top',
			'width': Math.floor( this.width() / settings.columnNumber )
		});

		// Add grids at first
		_setContentAtFirst( dataArray, callback_func );

	};

	$.fn.loadMoreFw = function( callback_func ) {

		if( settings.currentGrid +1 < settings.dataArray.length ) {

			settings.currentGrid++;
			const limitNum = settings.currentGrid + settings.gridNumber;
			for( var i = settings.currentGrid; i < limitNum; i++ ) {

				if( typeof settings.dataArray[i] != "undefined" ) {

					_createGrid( i, settings.dataArray, 'down' );
					settings.currentGrid = i;

				}
				else {
					// Data is exhausted before last run in loop
					if( callback_func ) {
						callback_func();
					}
					return "NO_MORE_DATA";
				}

				// Last run in loop
				if( i == limitNum-1 ) {
					if( callback_func ) {
						callback_func();
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

	// Directly add a new grid at the top of any column
	$.fn.addFwGrid = function( data, callback_func ) {

		// Add a new grid
		_createGrid( 0, [data], 'up' );

		if( callback_func ) {
			callback_func();
		}

	};

	function _setContentAtFirst( dataArray, callback_func ) {

		for( var i = 0; i < settings.gridNumber; i++ ) {
			if( typeof dataArray[i] != "undefined" ) {
				_createGrid( i, dataArray, 'down' );
				settings.currentGrid = i;
			}
			else {
				break;
			}
		}

		if( callback_func ) {
			callback_func();
		}

	}

	/***
	 *
	 * Add new grid
	 * direction: up/down => grid is added at the top/bottom
	 * But keep second parameter - data because of 'addFwGrid()'
	 *
	***/
	function _createGrid( i, data, direction ) {

		var thisCode = settings.html_template;

		for( var j = 0; j < Object.keys(data[0]).length; j++ ) {
			thisCode = thisCode.replace( `fallwall_#${j+1}`, data[i][j] );
		}

		const targetColumn = $('.fw_column').eq( _getShortestCol() );
		if( direction == 'up' ) {
			targetColumn.prepend( thisCode );
			const creatingElement = targetColumn.find('.fw_grid').first();
		}
		else {
			targetColumn.append( thisCode );
			const creatingElement = targetColumn.find('.fw_grid').last();
		}

		// Add animation class
		if( settings.enterAnimation != '' ) {
			creatingElement.addClass( settings.enterAnimation );
		}

	}

	// Return the shortest '.fw_column' to append a new grid
	function _getShortestCol() {

		var heightArray = [];

		$.each( $('.fw_column'), function(index, element) {
			heightArray.push( element.offsetHeight );
		});

		const minColumn = Math.min.apply( null, heightArray );
		return $.inArray( minColumn, heightArray );

	}

}(jQuery));
