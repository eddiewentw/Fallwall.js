var fallwall_data = [
		{ 0: 'Airbnb', 				1: '#Carnival is coming. And we know some perfect places to revel in #Rio: <a href=\'http://abnb.co/7n9PtB\'>http://abnb.co/7n9PtB</a> .', 2: '0204' },
		{ 0: 'GitHub', 				1: 'Outfit the mini-coder in your life with new one-pieces and kids tees in the GitHub Shop <a href=\'http://github.myshopify.com/\'>http://github.myshopify.com/</a> ', 2: '0129' },
		{ 0: 'Starbucks Coffee', 	1: 'Coffee of love, lovin\' on some Dark Chocolate Covered Graham Crackers. #NowBrewing #CafféVerona ', 2: '0202' },
		{ 0: 'WorkFlowy', 			1: 'Tip: Make the WorkFlowy Chrome App Feel Like a Normal App (Mac) <a href=\'http://wp.me/p4aoKx-2i\'>http://wp.me/p4aoKx-2i</a> ', 2: '0113' },
		{ 0: 'Uber', 				1: '\"I started being able to do things at the drop of a hat and experience a freedom I\'ve never had before.\"', 2: '0130' },
		{ 0: 'Slack', 				1: 'Free holiday fun! ESC to mark a channel as read… Option(alt)-click any message to mark as unread! Back and forth! ALL DAY! #SlackTipOfTheDay', 2: '1218' },
		{ 0: 'Starbucks Coffee', 	1: 'Pour-over, Pour-over — let flavor come over. #StarbucksReserve #Coffee', 2: '1026' },
		{ 0: 'Airbnb', 				1: 'Who needs a dose of wanderlust? Listen to these TED talks on travel while you pack your real (or imaginary) bags: <a href=\'http://abnb.co/35H6C4\'>http://abnb.co/35H6C4</a> .', 2: '' },
		{ 0: 'WorkFlowy', 			1: 'Site is down due to networking issues on our host (EC2) affecting other sites as well. Looking into it...', 2: '0913' },
		{ 0: 'Evernote',			1: 'Learn how to merge notes together in Evernote. | <a href=\'http://bit.ly/1wKg7Pa\'>http://bit.ly/1wKg7Pa</a>  #EvernoteTips ', 2: '0130' },
		{ 0: 'Slack', 				1: 'Small pleasing fix: Emoji now appear in notifications*!<br/>*On some browsers**<br/>**Not custom emoji***<br/>***We did say small ', 2: '1219' },
		{ 0: 'Github', 				1: 'Collect your first Gracehoppertocat sticker and others with GitHub Sticker Packs now available at <a href=\'http://shop.github.com\'>http://shop.github.com</a> ', 2: '0113' },
		{ 0: 'Starbucks Coffee', 	1: 'Green juice and a little of this. And that. And a few of those over there.', 2: '0123' },
		{ 0: 'Uber', 				1: 'After the launch of uberX in CA, alcohol-related crashes fell by 60 per month—that\'s 1,800 less accidents since 2012. <a href\'http://t.uber.com/madd\'>http://t.uber.com/madd</a> ', 2: '0127' }
	];

$(document).ready( function(){

	$('.box').fallwall_init( $('.template').html(), {
		gridNumber: 4,
		columnNumber: 3,
		margin_left: '5px',
		margin_right: '5px'
	}, fallwall_data, function(){
		$('body h1').css( 'background-color', '#c0c0c0' );
	});

});

$(window).load( function(){

	$(window).scroll( function(){

		var scrollNow = $(window).scrollTop();
		if( scrollNow >= $('body').height() - $(window).height() +60 ) {
			$('.box').giveMeMore();
		}

	});

});

function more() {
	$('.box').addNewGrid( [
		{ 0: "Evernote", 1: "The beauty of paper. The power of Evernote. | Learn more: <a href=\'http://bit.ly/1HHycsE\'>http://bit.ly/1HHycsE</a>", 2: "0202" }
	] );
}