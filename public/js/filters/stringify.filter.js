app.filter('stringify', function(){

  return function(input){
    if (!input)
      return input;
    return (typeof input == 'string') ? input : input.join(',');
  }

});