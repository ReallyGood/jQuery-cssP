/*!
 * jQuery cssP Plugin - https://github.com/ReallyGood/jQuery-cssP
 * v0.0.1, MIT licensed
 * by Really Good: http://reallygoodteam.com
 */

(function($){

$.cssP = (function(){
	var cache = {},
		methods = {};
	$.extend(methods, {
		set: function(el, changes){
			var s = el.selector,
				styleTag = cache[s] || $('<style></style>').appendTo('body');
			cache[s] = styleTag;
			
			var stylesheet = '';
			$.each(changes, function(key, ruleset){
				var newRuleset,
					declaration,
					skip;
				
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
					declaration = s + ':' + key + '{' + newRuleset + '}';
					stylesheet += declaration + '\r';
				}
			});
			
			methods.updateSS(styleTag, stylesheet);
		},
		updateSS: function(tag, sheet){
			$(tag).text(sheet);
		},
		get: function(el, pseudo, getFull){
			var sheet = cache[el.selector].text();
			if(!getFull) sheet = sheet.split(':' + pseudo)[1].split('}')[0].slice(1);
			return sheet;
		}
	});

	$.fn.cssP = function(data, getFull){
		var $this = $(this);
		if(typeof data === 'object') {
			methods.set($this, data);
			return $this;
		} else if(data == 'before' || data == 'after'){
			return methods.get($this, data, getFull);
		}
	};
})();

})(jQuery);