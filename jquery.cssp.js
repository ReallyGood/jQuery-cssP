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
					// let's do our best to get a string back from it
					try {
						newRuleset = ruleset();
						if(typeof newRuleset != 'string') skip = true;
					} catch(e){
						throw Error('The passed function has errors in it:', e);
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
		get: function(el, pseudo){
			var sheet = cache[el.selector].text();
			sheet = sheet.split(':' + pseudo)[1].split('}')[0].slice(1);			
			return sheet;
		}
	});

	$.fn.cssP = function(data){
		var $this = $(this);
		if(typeof data === 'object') {
			methods.set($this, data);
			return $this;
		} else if(data == 'before' || data == 'after'){
			return methods.get($this, data);
		}
	};

	// could be useful some day
	return;
})();

})(jQuery);