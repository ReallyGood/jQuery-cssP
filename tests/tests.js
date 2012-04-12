function startTests(){

test('Simple Color', function() { 
    equal( $('h1').css('color'), 'rgb(0, 0, 0)');
})

test('basic functionality', function(){
	ok( $('h1').length > 0, 'Hello World');
});

}