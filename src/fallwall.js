(function($){

	/* ---------------------------- *\
				Fall Style
	\* ---------------------------- */

	var settings;
	var currentGrid = 0;

	$.fn.fallwall_init = function( template, options, dataArray, callback_func ) {

		// Store data from user
		settings = $.extend({
			gridNumber: 20,
			columnNumber: 1,
			enterAnimation: 'animated zoomIn',
			html_template: `<div class='fw_grid'>${template}</div>`,
			dataArray: dataArray,
		}, options);

		// Add columns
		var colElements = '';
		for( var i = 0; i < settings.columnNumber; i++ ) {
			colElements += '<div class=\'fw_column\'></div>';
		}
		colElements += '<br class=\'endline\' style=\'clear: both;\' />';
		this.append( colElements );

		// Prepare CSS
		this.find('.fw_column').css({
			'float': 'left',
			'width': Math.floor( this.width() / settings.columnNumber )
		});

		// Add grids in first run
		_setContentAtFirst( dataArray, callback_func );

	};

	$.fn.loadMoreFw = function( more_callback ) {

		var plugin_status = 0;

		if( currentGrid +1 < settings.dataArray.length ) {

			currentGrid++;
			const limitNum = currentGrid + settings.gridNumber;
			for( var i = currentGrid; i < limitNum; i++ ) {

				if( typeof settings.dataArray[i] != "undefined" ) {

					_createGrid( i, settings.dataArray, 'down' );
					currentGrid = i;

				}
				else {
					// 這一輪跑到一半就用光了
					plugin_status = 1;
					break;
				}

				if( i+1 == limitNum ) {
					// 這一輪全部跑完 nice!
					plugin_status = 2;
				}

			}

		}
		else {
			// 已經用光了 別在摳了>///<
			plugin_status = 3;
		}

		switch( plugin_status ) {
			case 1:
				if( more_callback ) {
					more_callback();
				}
				return "oh_no";
				break;
			case 2:
				if( more_callback ) {
					more_callback();
				}
				return "finish";
				break;
			case 3:
				return "no_more_data";
				break;
			default: 
				break;
		}

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
				currentGrid = i;
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

		const minimumCol = Math.min.apply( null, heightArray );
		return $.inArray( minimumCol, heightArray );

	}

}(jQuery));
