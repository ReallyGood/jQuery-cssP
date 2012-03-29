##jQuery cssP - Play with the css of Pseudo Elements
__jQuery cssP__ is a lightweight plugin, letting you set and get the css of pseudo elements.
Notice: in its current form, it only gets the styles which the plugin itself has set.

## Demo
Check out the [__DEMO__](http://reallygood.co.il/plugins/car/) page (or look at `index.html`).


## Usage:

### Setter
```javascript
$('#myThing').cssP({
    before: 'margin-left: 10px;', // String, the ruleset itself (cssP adds selector & braces)
    after: function(){ // or a Function, which returns a ruleset string.
		// For the hell of it, say we want to note the time in a random color (WAT?!)
		var timestamp = 'content: " by the way, it is now ' + new Date().toGMTString() + '";'
		var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		return timeStamp + 'color: ' + color;
	}
});
```

### Getter
Say you previously did something like:

```javascript
$('h2').cssP({
    before: 'background: hotpink;',
    after: 'content: "!";'
});
```

To get it back, you can do either:
```javascript
$('h2').cssP('before');
// content: "!";
```
Or add ``true`` as a second parameter to get the full stylesheet for this selector:

```javascript
$('h2').cssP('before', true);
// You'll get both rules back no matter what you wrote as the first parameter:
// h2:before {background: hotpink;}
// h2:after {content: "!";}
```

Enjoy, [contribute ](https://github.com/ReallyGood/jQuery-cssP/issues) and spread the word!
  — [Really Good](http://reallygoodteam.com)