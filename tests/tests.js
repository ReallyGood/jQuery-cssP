function startTests(){

module('Preflight');

test('jQuery is loaded', function() { 
    equal( typeof jQuery, 'function');
})

test('jQuery.cssP is loaded', function() { 
    equal( typeof $.fn.cssP, 'function');
})

test('Elements exist', function(){	
	ok( $('body > ul').children().length > 0, 'Some elements are ready for testing');
});

module('Basic get');
test('No pseudos', function(){
	equal( $('#basics .noPseudo').cssP('before'), null);
});

test('One pseudo, one rule', function(){
	equal( $('#basics .oneRule').cssP('before'), 'font-size: 16px;');
});

test('One pseudo, multiple rules', function(){
	equal( $('#basics .multipleRules').cssP('after'), 'font-size: 16px; color: blue;');
});

test('Different selectors for set & get', function(){
	equal( $('#basics .last2').cssP('before'), 'color: orange;');
});

module('Edge Cases');
test('Pseudos with special characters: first-child', function(){
	equal( $('#edge .first').cssP('first-child'), 'color: green;');
});

test('Pseudos with special characters: nth-child(-n+6)', function(){
	equal( $('#edge .nth').cssP('nth-child(-n+6)'), 'color: green;');
});

test('Implied star selector within another element', function(){
	equal( $('#edge .implied *').cssP('first-line'), 'font-weight: bold;');
});

test('Implied star selector', function(){
	equal( $('*').cssP('first-letter'), 'letter-spacing: 0.1px;');
});

test('Proprietary pseudos: -moz-selection', function(){
	equal( $('*').cssP('-moz-selection'), 'text-shadow: none;');
});

test('Combined: :hover:before', function(){
	equal( $('#edge .combined').cssP('hover:before'), 'color: red;');
});

test('Combined: :hover::before', function(){
	equal( $('#edge .combined').cssP('hover::before'), 'color: red;');
});

test('Compound: #edge .c1, #edge .c2', function(){
	equal( $('#edge .c1, #edge .c2').cssP('before'), 'content: "These two have the same :before - ";');
});

test('Mixed pseudo with a unrelated selector', function(){	
	equal( $('#edge .mixedCompound').cssP('before'), 'font-style: italic;');
});

test('Descendant selectors within a pseudo: :first-child strong', function(){
	equal( $('#edge .des').cssP('first-child strong'), 'color: purple;');
});

}