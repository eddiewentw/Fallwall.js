import $ from 'jquery';
import '../dist/fallwall.min.js';

describe('make sure functions are exported', () => {

	it('initialize', () => {
		expect($.fn.fallwall_init).not.toBeUndefined();
		expect(typeof $.fn.fallwall_init).toBe('function');
	});

	it('loadMoreFw', () => {
		expect($.fn.loadMoreFw).not.toBeUndefined();
		expect(typeof $.fn.loadMoreFw).toBe('function');
	});

	it('addFwGrid', () => {
		expect($.fn.addFwGrid).not.toBeUndefined();
		expect(typeof $.fn.addFwGrid).toBe('function');
	});

});
