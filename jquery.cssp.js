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
					declaration;
				
				if(typeof ruleset === 'function') {
					newRuleset = ruleset();
				} else if(typeof ruleset === 'string') {
					newRuleset = ruleset;
				}
				
				declaration = s + ':' + key + ' {' + newRuleset + '}';
				stylesheet += declaration + '\r';
			});
			
			methods.writeStylesheet(styleTag, stylesheet);
		},
		globalUpdate: function(stylesheet){
			var styleTag = cache.global || $('<style></style>').appendTo('body');
			cache.global = styleTag;
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