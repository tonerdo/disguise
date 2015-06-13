app.filter('stringify', function(){

  return function(input){
    return (typeof input == 'string') ? input : input.join(',');
  }

});