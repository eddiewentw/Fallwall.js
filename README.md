## Fallwall.js [![npm version](https://badge.fury.io/js/fallwall.svg)](https://badge.fury.io/js/fallwall)

This is a jQuery plugin to make Fall Styles like Pinterest.

[Fallwall DEMO](http://github.eddiewen.me/Fallwall.js/)

----

### Installation

Just clone or download the zip of this repository  
or via [npm](https://www.npmjs.com/package/fallwall)

~~~bash
# npm install --save fallwall
$ yarn add fallwall
~~~

### Setup

~~~html
<!-- jQuery -->
<script src='jquery.min.js'></script>
<!-- fallwall.js or .min.js -->
<script src='path/to/fallwall.js'></script>
~~~

or

~~~javascript
// import in your .js file
import 'fallwall';
~~~

----

### How to

First, you need to prepare a HTML template. Later Fallwall.js uses it to build content.  

Example:

~~~html
<div class='template'>
	<h4 class='fallwall_#3'>fallwall_#1</h4>
	<div class='intro'>fallwall_#2</div>
</div>
~~~

*fallwall\_#1, fallwall\_#2... fallwall\_#n will be replaced with your data.*

Your each content will be wrapped in `<div class='fw_grid'></div>`, and they are wrapped in `<div class='fw_column'></div>`, all of these are in your element.  
You could control them with classname `fw_column` & `fw_grid`.

~~~html
<div id='element'>
	<!-- column -->
	<div class='fw_column'>
		<!-- grid -->
		<div class='fw_grid'>
			<h4 class='fallwall_#3'>fallwall_#1</h4>
			<div class='intro'>fallwall_#2</div>
		</div>
		<!-- grid -->
		<div class='fw_grid'>
			<h4 class='fallwall_#3'>fallwall_#1</h4>
			<div class='intro'>fallwall_#2</div>
		</div>
	</div>
	<!-- column -->
	<div class='fw_column'>
		<!-- grid -->
		<div class='fw_grid'>
			<h4 class='fallwall_#3'>fallwall_#1</h4>
			<div class='intro'>fallwall_#2</div>
		</div>
	</div>
</div>
~~~

### Replace `fallwall_#N`

Prepare your data like this array:

~~~javascript
var fallwall_data = [
	{ 0: "Eddie Wen",  1: "Hi~ I'm Eddie.", 2: "class_Wen"  },
	{ 0: "Jason Liu",  1: "Hi~ I'm Jason.", 2: "class_Liu"  },
	{ 0: "Steve Wang", 1: "Hi~ I'm Steve.", 2: "class_Wang" }
];
~~~

fallwall\_data[n][0] will replace `fallwall_#1` in template, fallwall\_data[n][1] will replace `fallwall_#2`....

In this case, you will get this output:

~~~html
<div class='fw_grid'>
	<h4 class='class_Wen'>Eddie Wen</h4>
	<div class='intro'>Hi~ I'm Eddie.</div>
</div>
<div class='fw_grid'>
	<h4 class='class_Liu'>Jason Liu</h4>
	<div class='intro'>Hi~ I'm Jason.</div>
</div>
<div class='fw_grid'>
	<h4 class='class_Wang'>Steve Wang</h4>
	<div class='intro'>Hi~ I'm Steve.</div>
</div>
~~~

----

### Options

* __gridNumber__: _Int_  
How many grids do you want to generate everytime
* __columnNumber__: _Int_  
Number of column in your element
* __defaultClass__: _String_  
Default class you want be add on the grid.

My default class is `'animated zoomIn'` in the [DEMO](http://github.eddiewen.me/Fallwall.js/) page. That's [Animate.css](http://daneden.github.io/animate.css/)'s class. You could use this way to build animation.

----

### Functions

#### fallwall()

`fallwall( template, dataArray, options, callback ){}`

Example：

~~~javascript
$('#element').fallwall( $('.template').html(), fallwall_data, {
	gridNumber: 4,
	columnNumber: 3,
	defaultClass: 'animated zoomIn'
}, function() {
	alert('Init is finished');
});
~~~

----

#### loadMoreFw()

`loadMoreFw( callback ){}`

This will append more data grid at the bottom. You might like to call this function when user scroll down.

This function will return a String, `NO_MORE_DATA` or `FINISHED`. The latter means this run is finished, the former means the data is exhausted.

Example：

~~~javascript
$('#element').loadMoreFw( function() {
	console.log('LOAD');
});
~~~

----

#### addFwGrid()

`addFwGrid( data, callback ){}`

Directly append a new grid at the top.  
But you have to give a new data in __Object__, it doesn't use the old data you gave.

Example：

~~~javascript
$('#element').addFwGrid({
	0: "Mandy Chen",
	1: "Hi~ I'm Mandy.",
	2: "class_new"
}, function() {
	console.log('ADD');
});
~~~
