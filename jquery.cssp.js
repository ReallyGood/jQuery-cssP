/*!
 * jQuery cssP Plugin - https://github.com/ReallyGood/jQuery-cssP
 * v0.0.2, MIT licensed
 * by Really Good: http://reallygoodteam.com
 */

(function($){

var regExpEscape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

$.cssP = (function(){
	var methods = {},
		doubleColons = ['selection', '-moz-selection'];
	$.extend(methods, {
		set: function(el, changes){
			var s = el.selector;
			if(!s) return;
			
			var stylesheet = '';
			$.each(changes, function(key, ruleset){
				var newRuleset,
					declaration,
					skip,
					seperator = ':';
				
				if(typeof ruleset === 'function') {
					// let's do our best to get a string back
					try {
						newRuleset = ruleset();
						if(typeof newRuleset != 'string') skip = true;
					} catch(e){
						throw Error('The function failed:', e);
						skip = true;
					}
				} else if(typeof ruleset == 'string') {
					// yay, an actual string!
					newRuleset = ruleset;
				}

				if(!skip) {
					if( $.inArray(key, doubleColons) >= 0) seperator = '::';
					declaration = s + seperator + key + '{' + newRuleset + '}';
					stylesheet += declaration + '\r';
				}
			});
			
			methods.updateSS(stylesheet);
		},
		updateSS: function(sheet){
			var styleTag = $('#cssPSheet');
			if(styleTag.length) {
				styleTag.text( styleTag.text() + sheet);
			} else {
				$('<style id="cssPSheet">' + sheet + '</style>').appendTo('body');
			}
		},
		get: function(el, pseudo, property){
			var style = getComputedStyle(el[0], pseudo);
			if(!style) return;
			var rule = property ? style.getPropertyCSSValue(property).cssText : style.cssText;
			return rule;
		}
	});

	$.fn.cssP = function(data, value){
		var $this = $(this);
		if(typeof data === 'object') {
			methods.set($this, data);
			return $this;
		} else if(typeof data === 'string' && typeof value === 'undefined'){
			return methods.get($this, data);
		} else if(typeof data === 'string' && ( typeof value === 'string' && value.indexOf(':') === -1 ) ){
			return methods.get($this, data, value);
		} else if(typeof data === 'string' && typeof value === 'string' || typeof value === 'function') {
			var setOne = {};
			setOne[data] = value;
			return methods.set($this, setOne);
		}
	};
})();

})(jQuery);