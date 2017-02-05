import $ from 'jquery';
import '../src/fallwall.js';

describe('pass parameter with wrong format', () => {

	document.body.innerHTML = '<div id="template"></div>';

	it('html template', () => {
		expect(() => {
			$.fn.fallwall_init();
		}).toThrow(
			'missed HTML template'
		);
	});

	it('dataArray', () => {
		expect(() => {
			$.fn.fallwall_init(document.getElementById('template'));
		}).toThrow(
			'missed data source'
		);

		expect(() => {
			$.fn.fallwall_init(document.getElementById('template'), 'this is not a Array');
		}).toThrow(
			'typeof dataArray is not correct'
		);

		expect(() => {
			$.fn.fallwall_init(document.getElementById('template'), []);
		}).toThrow(
			'typeof dataArray is not correct'
		);
	});

});
