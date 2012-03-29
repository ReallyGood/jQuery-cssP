(function($){

$.cssP = (function(){
	var cache = {},
		methods = {};
	$.extend(methods, {
		updateEl: function(el, changes){
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
						throw Error('The passed function has errors in it.');
						skip = true;
					}
				} else if(typeof ruleset === 'string') {
					// yay, an actual string!
					newRuleset = ruleset;
				} else {
					// sorry mate
					throw Error('Sorry, ruleset must be or return a string');
				}

				if(!skip) {
					declaration = s + ':' + key + ' {' + newRuleset + '}';
					stylesheet += declaration + '\r';
				}
			});
			
			methods.writeStylesheet(styleTag, stylesheet);
		},
		writeStylesheet: function(tag, sheet){			
			$(tag).text(sheet);
		}
	});

	$.fn.cssP = function(changes){
		var $this = $(this);		
		methods.updateEl($this, changes);
		return $this;
	};

	return methods.globalUpdate;
})();

})(jQuery);