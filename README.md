## Fallwall.js

This is a jQuery plugin to make Fall Styles like Pinterest.

[Fallwall DEMO](http://github.eddiewen.me/fallwall.js/)

----

### Setup

~~~html
<!-- required: jQuery -->
<script type="text/javascript" src="jquery.min.js"></script>
<!-- required: fallwall.js or .min.js -->
<script type="text/javascript" src="path/to/fallwall.js"></script>
<!-- optional: animation effect -->
<link rel="stylesheet" type="text/css" href="path/to/animate.css">
~~~

----

### How to

First, you need to prepare a HTML template. Later Fallwall.js uses it to build content.  
Example:

~~~html
<div class="template">
	<h4 class="fallwall_#3">fallwall_#1</h4>
	<div class="intro">fallwall_#2</div>
</div>
~~~

*fallwall\_#1, fallwall\_#2... fallwall\_? will be replace with your data.*

Your each content will be wrapped in `<div class="fallwall_grid"></div>`, and they are wrapped in `<div class="outline"></div>`, all of these are in your element. You could control them with classname `outline` & `fallwall_grid`.

~~~html
<div id="your-element">
	<div class="outline">
			<div class="fallwall_grid">
				<div class="template">
					<h4 class="fallwall_#3">fallwall_#1</h4>
					<div class="intro">fallwall_#2</div>
				</div>
			</div>
			<div class="fallwall_grid">
				<div class="template">
					<h4 class="fallwall_#3">fallwall_#1</h4>
					<div class="intro">fallwall_#2</div>
				</div>
			</div>
	</div>
	<div class="outline">
			<div class="fallwall_grid">
				<div class="template">
					<h4 class="fallwall_#3">fallwall_#1</h4>
					<div class="intro">fallwall_#2</div>
				</div>
			</div>
	</div>
</div>
~~~

### Replace `fallwall_#`

Please prepare your data like this array:

~~~javascript
var fallwall_data = [
	{ 0: "Eddie Wen",  1: "Hi~ I'm Eddie.", 2: "class_Wen" },
	{ 0: "Jason Liu",  1: "Hi~ I'm Jason.", 2: "class_Liu" },
	{ 0: "Steve Wang", 1: "Hi~ I'm Steve.", 2: "class_Wang"}
];
~~~

fallwall\_data[0][0] will replace `fallwall_#1` in template, fallwall\_data[0][1] will replace `fallwall_#2`....

In this case, you will get this output:

~~~html
<div class="fallwall_grid">
	<h4 class="class_Wen">Eddie Wen</h4>
	<div class="intro">Hi~ I'm Eddie.</div>
</div>
<div class="fallwall_grid">
	<h4 class="class_Liu">Jason Liu</h4>
	<div class="intro">Hi~ I'm Jason.</div>
</div>
<div class="fallwall_grid">
	<h4 class="class_Wang">Steve Wang</h4>
	<div class="intro">Hi~ I'm Steve.</div>
</div>
~~~

----

參數設定，如下所列：

* gridNumber ( 每次要跑出的數量 )
* columnNumber ( 要切割為幾個直欄 )
* margin_left ( 每個直欄的margin left )
* margin_right ( 每個直欄的margin right )
* color ( 其中的文字顏色 )
* enterAnimation ( 每則內容進入的特效 )

目前在 enterAnimation 預設是搭配 animate.css 使用，他能夠僅以套上 css class 的方式產生漂亮的動畫效果，如果不喜歡也可以移除它，這裡僅是替每則內容加上 class

Animate.css :  <http://daneden.github.io/animate.css/>

----

### 使用函數

#### fallwall_init()

`fallwall_init( framework, options, dataArray, callback ){}`

如：

~~~javascript
$('.box').fallwall_init( $('.template').html(), {
	gridNumber: 4,
	columnNumber: 3,
	margin_left: '5px',
	margin_right: '5px'
}, fallwall_data, function(){
	alert("OVER!");
});
~~~

將 `<div class='box'></div>` 分割成三個直欄，並且設定成每次僅跑出四則內容，然後設定在完成後跳出alert。

而 fallwall_data 就是前面所舉的陣列例子

----

#### giveMeMore()

`giveMeMore( callback ){}`

大多用在使用者將畫面滑至底部時呼叫，會將先前所傳入的資料帶出更多內容來，但數量依然是原本在 init 時所設定的 gridNumber。

如：

~~~javascript
$('.box').giveMeMore( function(){
	alert("OVER!");
});
~~~

----

#### addNewGrid()

`addNewGrid( dataArray, callback ){}`

這會直接插入一個新的內容，但會在瀑布流的最上方出現，這裡資料的格式就跟上面的格式一樣就行了。

如：

~~~javascript
$('.box').addNewGrid( [
	{ 0: "Mandy Chen", 1: "Hi~ I'm Mandy.", 2: "class_new" }
], function(){
	alert("OVER!");
});
~~~
