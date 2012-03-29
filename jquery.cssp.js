(function($){

$.cssP = (function(){
	var cache = {};
	var methods = {};
	$.extend(methods, {
		updateEl: function(el, changes){
			var s = el.selector;
			var styleTag = cache[s] || $('<style></style>').appendTo('body');
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
			
			$(el).trigger('update.cssp', {"tag": styleTag, "sheet": stylesheet});
		},
		writeStylesheet: function(ev, d){			
			$(d.tag).text(d.sheet);
		}
	});

	$.fn.cssP = function(changes){
		var $this = $(this);
		$this.bind('update.cssp', methods.writeStylesheet);
		methods.updateEl($this, changes);
		return $this;
	};
})();


})(jQuery);