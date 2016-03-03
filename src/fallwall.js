(function($){

	/* ---------------------------------- *\
					瀑 布 流
	\* ---------------------------------- */

	var settings, dataArray_stored, dataNumber, fatherBox;
	var currentGrid = 0;
	var its_running = 0;

	$.fn.fallwall_init = function( framework, options, dataArray, callback_func ) {

		dataNumber = dataArray.length;
		fatherBox = this;

		settings = $.extend({
			gridNumber: 20,
			columnNumber: 1,
			enterAnimation: 'animated zoomIn',
			html_template: `<div class='fw_grid'>${framework}</div>`,
		}, options);

		var colElements = '';
		for( var i = 0; i < settings.columnNumber; i++ ) {
			colElements += '<div class=\'fw_column\'></div>';
		}
		this.append( colElements );

		this.find('.fw_column').css({
			'float': 'left',
			'width': Math.floor( this.width() / settings.columnNumber )
		});

		setContentAtFirst( dataArray, callback_func );
		dataArray_stored = dataArray;

	};

	$.fn.giveMeMore = function( more_callback ) {

		var plugin_status = 0;

		if( its_running == 0 ) {

			if( currentGrid +1 < dataArray_stored.length ) {

				its_running = 1;

				currentGrid++;
				var limitNum = currentGrid + settings.gridNumber;
				for( var i = currentGrid; i < limitNum; i++ ) {

					if( typeof dataArray_stored[i] != "undefined" ) {

						_createGrid( i, dataArray_stored, 'down' );
						currentGrid = i;

					} else {
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

		}
		else {
			// plugin is working~~~~
			plugin_status = 4;
		}

		switch( plugin_status ) {
			case 1:
				its_running = 0;
				if( more_callback != null )
					more_callback();
				return "oh_no";
				break;
			case 2:
				its_running = 0;
				if( more_callback != null )
					more_callback();
				return "finish";
				break;
			case 3:
				return "no_more_data";
				break;
			case 4:
				return "running";
				break;
			default: 
				break;
		}

	};

	$.fn.addNewGrid = function( dataArray, callback_func ) {

		_createGrid( 0, dataArray, 'up' );

		if( callback_func != null ) {
			callback_func();
		}

	};

	function setContentAtFirst( dataArray, callback_func ) {

		for( var i = currentGrid; i < settings.gridNumber; i++ ) {
			if( typeof dataArray[i] != "undefined" ) {
				_createGrid( i, dataArray, 'down' );
				currentGrid = i;
			}
		}

		fatherBox.append('<br class=\'endline\' style=\'clear: both;\' />');

		if( callback_func != null ) {
			callback_func();
		}

	}

	function _createGrid( i, data, direction ) {

		var shortest = _getShortestCol();
		var thisCode = settings.html_template;

		for( var j = 0; j < dataNumber; j++ ) {
			thisCode = thisCode.replace( `fallwall_#${j+1}`, data[i][j] );
		}

		if( direction == 'down' ) {
			$('.fw_column').eq( shortest ).append( thisCode );
			var creatingElement = $('.fw_column').eq( shortest ).find('.fw_grid').last();
		}
		else {
			$('.fw_column').eq( shortest ).prepend( thisCode );
			var creatingElement = $('.fw_column').eq( shortest ).find('.fw_grid').first();
		}

		if( settings.enterAnimation != '' ) {
			creatingElement.addClass( settings.enterAnimation );
		}

	}

	// get the shortest '.fw_column'
	function _getShortestCol() {

		var heightArray = [];

		$.each( $('.fw_column'), function(index, element) {
			heightArray.push( element.offsetHeight );
		});

		var min_of_array = Math.min.apply( null, heightArray );
		return $.inArray( min_of_array, heightArray );

	}

}(jQuery));
