(function($){

	/* ---------------------------------- *\
					瀑 布 流
	\* ---------------------------------- */

	var sample_code, gridNumber, jdata_stored, dataNumber;
	var currentGrid = 0;
	var add_running = 0;

	$.fn.initialize = function( framework, options, jdata, callback_func ) {

		sample_code = '<div class="grid">' + framework + '</div>';
		dataNumber = jdata['data'].length;

		var settings = $.extend({
			gridNumber: 20,
			columnNumber: 1,
			margin_left: '0px',
			margin_right: '0px',
			color: 'black'
		}, options);

		gridNumber = settings.gridNumber;

		for( var i = 0; i < settings.columnNumber; i++ ) {
			this.append( '<div class="outline"></div>' );
		}

		this.find('.outline').css({
			'float': 'left',
			'margin-left': settings.margin_left,
			'margin-right': settings.margin_right,
			'color': settings.color,
			'width': ( this.width() - ( parseInt(settings.margin_left) + parseInt(settings.margin_right) +4 ) *settings.columnNumber ) / settings.columnNumber
		});

		setContent( jdata, callback_func );
		jdata_stored = jdata;

	};

	$.fn.giveMeMore = function( more_callback ) {

		var plugin_status = 0;

		if( add_running == 0 ) {

			if( currentGrid +1 < jdata_stored['data'].length ) {

				add_running = 1;

				currentGrid++;
				var limitNum = currentGrid  + gridNumber;
				for( var i = currentGrid; i < limitNum; i++ ) {

					if( typeof jdata_stored['data'][i] != "undefined" ) {

						createGrid( i, jdata_stored, 'down' );
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
					add_running = 0;
					if( more_callback != null )
						more_callback();
					return "oh_no";
				break;
			case 2:
					add_running = 0;
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

	$.fn.addNewGrid = function( jdata, callback_func ) {

		createGrid( 0, jdata, 'up' );

		if( callback_func != null )
			callback_func();

	};

	function setContent( jdata, callback_func ) {

		for( var i = currentGrid; i < gridNumber; i++ ) {
			if( typeof jdata['data'][i] != "undefined" ) {
				createGrid( i, jdata, 'down' );
				currentGrid = i;
			}
		}

		if( callback_func != null )
			callback_func();

	}

	function createGrid( i, data, direction ) {

		var shortest = getShortest();
		var thisCode = sample_code;

		for( var j = 0; j < dataNumber; j++ ) {
			thisCode = thisCode.replace( 'fallwall_#'+(j+1), data['data'][i][j] );
		}

		if( direction == 'down' ) {
			$('.outline').eq( shortest ).append( thisCode );
			var creatingElement = $('.outline').eq( shortest ).find('.grid').last();
		} else {
			$('.outline').eq( shortest ).prepend( thisCode );
			var creatingElement = $('.outline').eq( shortest ).find('.grid').first();
		}

	}

	function getShortest() {

		var heightArray = [];

		$.each( $('.outline'), function(){
			heightArray.push( parseInt( $(this).height() ) );
		});

		var min_of_array = Math.min.apply( null, heightArray );
		return $.inArray( min_of_array, heightArray );

	}

}(jQuery));


