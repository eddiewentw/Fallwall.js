(function($){

	/* ---------------------------------- *\
					瀑 布 流
	\* ---------------------------------- */

	var sample_code, gridNumber, jdata_stored;
	var currentGrid = 0;
	var add_running = 0;

	$.fn.initialize = function( framework, options, jdata, callback_func ) {

		sample_code = '<div class="grid">' + framework + '</div>';

		var settings = $.extend({
			gridNumber: 20,
			column_number: 1,
			margin_left: '0px',
			margin_right: '0px',
			color: 'black'
		}, options);

		gridNumber = settings.gridNumber;

		for( var i = 0; i < settings.column_number; i++ ) {
			this.append( '<div class="outline f-left"></div>' );
		}

		this.find('.outline').css({
			'margin-left': settings.margin_left,
			'margin-right': settings.margin_right,
			'color': settings.color,
			'width': ( this.width() - ( parseInt(settings.margin_left) + parseInt(settings.margin_right) +10 ) *settings.column_number ) / settings.column_number
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
		if( direction == 'down' ) {
			$('.outline').eq( shortest ).append( sample_code );
			var creatingElement = $('.outline').eq( shortest ).find('.grid').last();
		} else {
			$('.outline').eq( shortest ).prepend( sample_code );
			var creatingElement = $('.outline').eq( shortest ).find('.grid').first();
			creatingElement.append('<div class="delete post"></div>');
		}

			creatingElement.attr( 'rel', data['data'][i]['pid'] );
			creatingElement.find('a').attr( 'href', './profile.php?id=' + data['data'][i]['senderid'] );
			creatingElement.find('.author img').attr( 'src', './images/profile/' + data['data'][i]['senderid'] + '/sticker.png' );
			creatingElement.find('.author .name').text( isThisEnglish( data['data'][i]['l_name'] ) ? data['data'][i]['f_name'] + " " + data['data'][i]['l_name'] : data['data'][i]['l_name'] + data['data'][i]['f_name'] );
			creatingElement.find('.author .time_ago').text( long_time_ago( data['data'][i]['updatetime'] ) );
			creatingElement.find('.post_content').html( getlink( data['data'][i]['p_content'] ) );
			creatingElement.find('.more-msg .num').text( data['data'][i]['count_comment'] );
			creatingElement.addClass('animated zoomIn');

		if( data['data'][i]['senderid'] == data['delete_able'] ) {
			creatingElement.append('<div class="delete post"></div>');
		}

	}

	function long_time_ago( past_time ) {

		var time_str = "";

		var nowTime = new Date(),
			nowYear = nowTime.getFullYear(),
			nowMonth = nowTime.getMonth() +1,
			nowDate = nowTime.getDate(),
			nowHour = nowTime.getHours(),
			nowMinute = nowTime.getMinutes(),
			nowSecond = nowTime.getSeconds();

		var pastYear = past_time.substr( 0, 4 ),
			pastMonth = past_time.substr( 5, 2 ),
			pastDate = past_time.substr( 8, 2 ),
			pastHour = past_time.substr( 11, 2 ),
			pastMinute = past_time.substr( 14, 2 ),
			pastSecond = past_time.substr( 17, 2 );

		if( nowYear - pastYear >= 1 )
			time_str = nowYear - pastYear + "年前";
		else if( nowMonth - pastMonth >= 1 )
			time_str = nowMonth - pastMonth + "月前";
		else if( nowDate - pastDate >= 1 )
			time_str = nowDate - pastDate + "天前";
		else if( nowHour - pastHour >= 1 )
			time_str = nowHour - pastHour + "小時前";
		else if( nowMinute - pastMinute >= 1 )
			time_str = nowMinute - pastMinute + "分鐘前";
		else
			time_str = nowSecond - pastSecond + "秒前";

		return time_str;
	}

	function getShortest() {

		var heightArray = [];

		$.each( $('.outline'), function(){
			heightArray.push( parseInt( $(this).height() ) );
		});

		var min_of_array = Math.min.apply( null, heightArray );
		return $.inArray( min_of_array, heightArray );

	}

	function isThisEnglish( str ) {
		var regExp = /^[\d|a-zA-Z]+$/;
		if( regExp.test(str) )
			return true; // english
		else
			return false; // chinese
	}

	function getlink(text) {
		return Autolinker.link( text, {
			stripPrefix: false
		});
	}


}(jQuery));


