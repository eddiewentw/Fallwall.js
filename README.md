<h2>FALLWALL.js</h2>

It's a jQuery plugin for the style of fall like Pinterest.

這是一個幫助你完成瀑布流的 jQuery 插件

我會將你選擇的外框分割成你想要的數量的直欄div，並以classname=“outline”命名。

當中每一則內容都會再以classname=“fallwall_grid”的div包住

你可以透過這兩個classname再調整css

其中比較特別的一點是，我會需要一組HTML碼作為每一則內容的原型

以此為例：
```html
   <div class="template">
        <h4 class="fallwall_#3">fallwall_#1</h4>
        <div class="intro">fallwall_#2</div>
   </div>
```
你再使用 $('.template').html() 將這段原始碼丟給 plugin，我會以此為模型將其中的fallwall_#?替換成之後拿到的JSON格式中的內容

若以上述為例子，接下來傳進插件內的JSON會是像以下的格式：

```javascript
  var fallwall_data = { "data" : [
            { 0: "Eddie Wen",     1: "Hi~ I'm Eddie.",      2: "class_Wen" },
            { 0: "Jason Liu",     1: "Hi~ I'm Jason.",      2: "class_Liu" },
            { 0: "Steve Job",     1: "Hi~ I'm Steve.",      2: "class_Job" }
  ]}
```
而我會依序JSON的排列順序替換模型HTML code中的fallwall_#?部分

至於在設定的部分，你可以設定gridNumber(每次要跑出的數量)、columnNumber(要切割為幾個直欄)、margin_left(每個直欄的margin left)、margin_right(每個直欄的margin right)、color(其中的文字顏色)、enterAnimation(每則內容進入的特效)

目前在enterAnimation預設是搭配animate.css使用，他能夠僅以套上css class的方式產生漂亮的動畫效果，如果不喜歡也可以移除它，這裡僅是替每則內容加上class

接下來是 plugin 裏 function 使用

第一個是 <h4>fallwall_init</h4>

fallwall_init( framework, options, jdata, callback ){}

如：

```javascript
 $('.box').initialize( $('.template').html(), {
      gridNumber: 4,
      columnNumber: 3,
      margin_left: '5px',
      margin_right: '5px'
 }, fallwall_data, function(){
      alert("Complete!");
 });
```

我將 <div class=“box”></div> 分割成三個直欄，並且設定成每次僅跑出四則內容，然後設定在完成後跳出alert。

而 fallwall_data 就是上面所舉的JSON例子

再來是 <h4>giveMeMore</h4>

giveMeMore( callback ){}

大多用在使用者將畫面滑至底部時呼叫，我會將你原本傳進來的 JSON 帶出更多內容來，但數量依然是原本在 init 時所設定的 gridNumber。

如：

```javascript
 $('.box').giveMeMore();
```

最後一個則是 <h4>addNewGrid</h4>

addNewGrid( jdata, callback ){}

這會直接插入一個新的內容，但會在瀑布流的最上方出現，這裡 jdata 的格式就跟上面的格式一樣就行了。
