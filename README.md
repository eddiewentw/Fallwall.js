## Fallwall.js

This is a jQuery plugin to make Fall Styles like Pinterest.

[Fallwall DEMO](http://github.eddiewen.me/Fallwall.js/)

----

### Installation

Just clone or download the zip of this repository  
or via [npm](https://www.npmjs.com/package/fallwall)

~~~shell
npm install --save fallwall
~~~

### Setup

~~~html
<!-- REQUIRED: jQuery -->
<script type='text/javascript' src='jquery.min.js'></script>
<!-- REQUIRED: fallwall.js or .min.js -->
<script type='text/javascript' src='path/to/fallwall.js'></script>
<!-- OPTIONAL: animation effect -->
<link rel='stylesheet' type='text/css' href='path/to/animate.css'>
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
			<div class='template'>
				<h4 class='fallwall_#3'>fallwall_#1</h4>
				<div class='intro'>fallwall_#2</div>
			</div>
		</div>
		<!-- grid -->
		<div class='fw_grid'>
			<div class='template'>
				<h4 class='fallwall_#3'>fallwall_#1</h4>
				<div class='intro'>fallwall_#2</div>
			</div>
		</div>
	</div>
	<!-- column -->
	<div class='fw_column'>
		<!-- grid -->
		<div class='fw_grid'>
			<div class='template'>
				<h4 class='fallwall_#3'>fallwall_#1</h4>
				<div class='intro'>fallwall_#2</div>
			</div>
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

* __gridNumber__: Int  
How many grids do you want to generate everytime
* __columnNumber__: Int  
Number of column in your element
* __defaultClass__: String  
Default class you want be add on the grid.

My default class is `'animated zoomIn'` in the [DEMO](http://github.eddiewen.me/Fallwall.js/) page. That's [Animate.css](http://daneden.github.io/animate.css/)'s class. You could use this way to build animation.

----

### Functions

#### fallwall_init()

`fallwall_init( template, dataArray, options, callback ){}`

Example：

~~~javascript
$('#element').fallwall_init( $('.template').html(), fallwall_data, {
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

This will append more data grid at the bottom. You could call this when user scroll down.

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
But you have to give a new data in Object, it doesn't use the old data you gave.

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
