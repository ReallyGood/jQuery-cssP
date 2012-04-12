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
	equalTrim( $('#basics .oneRule').cssP('before'), 'font-size: 16px;');
});

test('One pseudo, multiple rules', function(){
	equalTrim( $('#basics .multipleRules').cssP('after'), 'font-size: 16px; color: blue;');
});

}