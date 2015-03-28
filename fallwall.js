(function($){

	/* ---------------------------------- *\
					瀑 布 流
	\* ---------------------------------- */

	var settings, sample_code, dataArray_stored, dataNumber, fatherBox;
	var currentGrid = 0;
	var its_running = 0;

	$.fn.fallwall_init = function( framework, options, dataArray, callback_func ) {

		sample_code = '<div class="fallwall_grid">' + framework + '</div>';
		dataNumber = dataArray.length;
		fatherBox = this;

		settings = $.extend({
			gridNumber: 20,
			columnNumber: 1,
			margin_left: '0px',
			margin_right: '0px',
			color: 'black',
			enterAnimation: 'animated zoomIn'
		}, options);

		for( var i = 0; i < settings.columnNumber; i++ ) {
			this.append( '<div class="outline"></div>' );
		}

		this.find('.outline').css({
			'float': 'left',
			'margin-left': settings.margin_left,
			'margin-right': settings.margin_right,
			'color': settings.color,
<<<<<<< HEAD
			'width': Math.floor( ( this.width() - ( parseInt(settings.margin_left) + parseInt(settings.margin_right) +0 ) *settings.columnNumber ) / settings.columnNumber )
=======
			'width': Math.floor( ( this.width() - ( parseInt(settings.margin_left) + parseInt(settings.margin_right) +4 ) *settings.columnNumber ) / settings.columnNumber )
>>>>>>> efaf4086fc5ae57801f692daf1b7d8a4cbc5ca48
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

						createGrid( i, dataArray_stored, 'down' );
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

			} else {
				// 已經用光了 別在摳了>///<
				plugin_status = 3;
			}

		} else {
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

		createGrid( 0, dataArray, 'up' );

		if( callback_func != null )
			callback_func();

	};

	function setContentAtFirst( dataArray, callback_func ) {

		for( var i = currentGrid; i < settings.gridNumber; i++ ) {
			if( typeof dataArray[i] != "undefined" ) {
				createGrid( i, dataArray, 'down' );
				currentGrid = i;
			}
		}

		fatherBox.append('<br class="endline" style="clear: both;" />');

		if( callback_func != null )
			callback_func();

	}

	function createGrid( i, data, direction ) {

		var shortest = getShortest();
		var thisCode = sample_code;

		for( var j = 0; j < dataNumber; j++ ) {
			thisCode = thisCode.replace( 'fallwall_#'+(j+1), data[i][j] );
		}

		if( direction == 'down' ) {
			$('.outline').eq( shortest ).append( thisCode );
			var creatingElement = $('.outline').eq( shortest ).find('.fallwall_grid').last();
		} else {
			$('.outline').eq( shortest ).prepend( thisCode );
			var creatingElement = $('.outline').eq( shortest ).find('.fallwall_grid').first();
		}

		if( settings.enterAnimation != '' )
			creatingElement.addClass( settings.enterAnimation );

	}

	// get the shortest 'outline' div
	function getShortest() {

		var heightArray = [];

		$.each( $('.outline'), function(){
			heightArray.push( parseInt( $(this).height() ) );
		});

		var min_of_array = Math.min.apply( null, heightArray );
		return $.inArray( min_of_array, heightArray );

	}

}(jQuery));

