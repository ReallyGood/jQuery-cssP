jQuery cssP(seudos) plugin
===

Allows you to style pseudo elements with jQuery

Usage:
===

Setter
==
$('p').cssP({
    before: 'margin-left: 10px;', // accepts a string or a function (which return a string)
    after: function(){
		var direction = Math.random() < .5 ? 'left' : 'right';
		var distance = Math.floor( Math.random() * 1000 );
		return '#logo { ' + direction + ': ' + distance + 'px; }';
	}
});