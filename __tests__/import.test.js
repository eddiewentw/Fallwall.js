import $ from 'jquery';
import '../src/fallwall.js';

describe('make sure functions are exported', () => {

	it('initialize', () => {
		expect($.fn.fallwall_init).not.toBeUndefined();
		expect(typeof $.fn.fallwall_init).toBe('function');
	});

});
