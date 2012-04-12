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
			
			methods.createSS(stylesheet);
		},
		createSS: function(sheet){
			$('<style>' + sheet + '</style>').appendTo('body');
		},
		getPseudos: function(pRegex){
			var sheets = document.styleSheets,
				sheetsL = sheets.length,
				i = 0,
				j,
				rules,
				found = [],
				foundIndexes = [];

			for(var i = 0; i < sheetsL; i++){		
				try {
					rules = sheets[i].cssRules || sheets[i].rules;
				} catch(e){
					//console.log(e);
				}
				if(rules) {
					rulesL = rules.length;
					for(j = 0; j < rulesL; j++){
						if( pRegex.test(rules[j].selectorText) ) {
							var r = rules[j],
								s = r.selectorText,
								css = r.style.cssText;
							//console.log('found pseudo style rule:', r, css);
							if ( found[s] ) {
								found[s] += ' ' + css;
							} else {
								found[s] = css;
							}
						};
					}
				}
			}

			return found;
		},
		get: function(el, pseudo){			
			var pRegex = new RegExp(':?:' + regExpEscape(pseudo) + '$', 'ig'),
				all = methods.getPseudos(pRegex),
				found = null;
			for(p in all) {
				var element = p.replace(pRegex, '');				
				if( $(el).is(element) ) {
					found = $.trim( all[p] );
					break;
				}
			};

			return found;
		}
	});

	$.fn.cssP = function(data, value){
		var $this = $(this);
		if(typeof data === 'object') {
			methods.set($this, data);
			return $this;
		} else if(typeof data === 'string' && typeof value == 'undefined'){
			return methods.get($this, data);
		} else if(typeof data === 'string' && typeof value === 'string' || typeof value === 'function') {
			var setOne = {};
			setOne[data] = value;
			return methods.set($this, setOne);
		}
	};
})();

})(jQuery);