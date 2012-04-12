function startTests(){

module('Basics');

test('Simple Color', function() { 
    equal( $('#basics h1').css('color'), 'rgb(0, 0, 0)');
})

test('basic functionality', function(){
	ok( $('#basics h1').length > 0, 'Hello World');
});

}