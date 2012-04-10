/*!
 * jQuery cssP Plugin - https://github.com/ReallyGood/jQuery-cssP
 * v0.0.2, MIT licensed
 * by Really Good: http://reallygoodteam.com
 */

(function($){

$.cssP = (function(){
	var cache = {},
		methods = {};
	$.extend(methods, {
		set: function(el, changes){
			var s = el.selector;
			if(!s) return;
			styleTag = cache[s] || $('<style></style>');
			styleTag.appendTo('body');
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
					rules = sheets[i].cssRules;
				} catch(e){
					//console.log(e);
				}
				if(rules) {
					rulesL = rules.length;
					for(j = 0; j < rulesL; j++){
						if( pRegex.test(rules[j].selectorText) ) {
							var r = rules[j];
							//console.log('found pseudo style rule:', r);
							found [ r.selectorText ] = r.style.cssText;
						};
					}
				}
			}
			
			return found;
		},
		getFromStylesheet: function(el, pseudo){			
			var pRegex = new RegExp(":?:" + pseudo, "ig"),
				all = methods.getPseudos(pRegex),
				found = null;
			for(p in all) {
				var element = p.replace(pRegex, '');				
				if( $(el).is(element) ) {
					found = all[p];
					break;
				}
			};

			return found;
		},
		get: function(el, pseudo, getFull){			
			if(!cache[el.selector]) return methods.getFromStylesheet(el, pseudo);

			var sheet = cache[el.selector].text();			
			if(!getFull) {
				sheet = sheet.split(':' + pseudo)[1];
				if(!sheet) return null;
				sheet = sheet.split('}')[0].slice(1);
			}
			return sheet;
		}
	});

	$.fn.cssP = function(data, value, getFull){
		var $this = $(this);
		if(typeof data === 'object') {
			methods.set($this, data);
			return $this;
		} else if(typeof data === 'string' && typeof value == 'undefined'){
			return methods.get($this, data, getFull);
		} else if(typeof data === 'string' && typeof value === 'string' || typeof value === 'function') {
			var setOne = {};
			setOne[data] = value;
			return methods.set($this, setOne);
		}
	};
})();

})(jQuery);