<h2>FALLWALL.js</h2>

It's a jQuery plugin for the style of fall like Pinterest.

這是一個幫助你完成瀑布流的 jQuery 插件

插件會將你選擇的外框分割成你想要的數量的直欄div，並以classname=“outline”命名。

當中每一則內容都會再以classname=“fallwall_grid”的div包住

之後可以透過這兩個classname再調整css

其中比較特別的一點是，會需要一組HTML碼作為每一則內容的原型

以此為例：
```html
   <div class="template">
        <h4 class="fallwall_#3">fallwall_#1</h4>
        <div class="intro">fallwall_#2</div>
   </div>
```

再使用 $('.template').html() 將這段原始碼丟入插件，會以此為模型並依序將其中的 fallwall_#? 替換成之後拿到的 JSON 中的內容

若以上述為例子，接下來傳進插件內的 JSON 會是像以下的格式：

```javascript
  var fallwall_data = { "data" : [
         { 0: "Eddie Wen",  1: "Hi~ I'm Eddie.",   2: "class_Wen" },
         { 0: "Jason Liu",  1: "Hi~ I'm Jason.",   2: "class_Liu" },
         { 0: "Steve Wang",  1: "Hi~ I'm Steve.",   2: "class_Wang" }
  ]}
```

之後會依序 JSON 的排列順序替換 HTML code 模型中的 fallwall_#? 部分

至於在設定的部分，可以設定
<ul>
   <li>gridNumber ( 每次要跑出的數量 )</li>
   <li>columnNumber ( 要切割為幾個直欄 )</li>
   <li>margin_left ( 每個直欄的margin left )</li>
   <li>margin_right ( 每個直欄的margin right )</li>
   <li>color ( 其中的文字顏色 )</li>
   <li>enterAnimation ( 每則內容進入的特效 )</li>
</ul>

目前在 enterAnimation 預設是搭配 animate.css 使用，他能夠僅以套上 css class 的方式產生漂亮的動畫效果，如果不喜歡也可以移除它，這裡僅是替每則內容加上 class

（ Animate.css -> http://daneden.github.io/animate.css/ ）

******************************

接下來是插件裏的 function 使用

第一個是 <h4>fallwall_init()</h4>

fallwall_init( framework, options, jdata, callback ){}

如：

```javascript
 $('.box').fallwall_init( $('.template').html(), {
      gridNumber: 4,
      columnNumber: 3,
      margin_left: '5px',
      margin_right: '5px'
 }, fallwall_data, function(){
      alert("OVER!");
 });
```

我將

```html
<div class='box'></div>
```

分割成三個直欄，並且設定成每次僅跑出四則內容，然後設定在完成後跳出alert。

而 fallwall_data 就是前面所舉的 JSON 例子

******************************

再來是 <h4>giveMeMore()</h4>

giveMeMore( callback ){}

大多用在使用者將畫面滑至底部時呼叫，會將先前所傳入的 JSON 帶出更多內容來，但數量依然是原本在 init 時所設定的 gridNumber。

如：

```javascript
 $('.box').giveMeMore( function(){
      alert("OVER!");
 });
```

******************************

最後一個則是 <h4>addNewGrid()</h4>

addNewGrid( jdata, callback ){}

這會直接插入一個新的內容，但會在瀑布流的最上方出現，這裡 jdata 的格式就跟上面的格式一樣就行了。

如：

```javascript
  $('.box').addNewGrid( { "data": [
       { 0: "Mandy Chen", 1: "Hi~ I'm Mandy.", 2: "class_new" }
  ]}, function(){
       alert("OVER!");
  });
```
