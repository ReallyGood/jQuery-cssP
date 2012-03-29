jQuery.fn.cssP = function(changes){
	var $this = $(this);
	var s = $this.selector;
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
	
	console.log(stylesheet);
	
	return $(this);
};