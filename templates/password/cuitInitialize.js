
function inicializarInputsCuit(categoria, dni, verificador){
	//ie no tiene Array.indexOf 
	if(!Array.indexOf){
	    Array.prototype.indexOf = function(obj){
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    }
	}
				//shift, tab & arrows
	var ignoredKeys = [9, 16, 37, 38, 39, 40];
	$('#' + categoria).keyup(function(event) {
	    if (ignoredKeys.indexOf(event.keyCode) == -1) {
	        if($(event.currentTarget).attr('value').length >= $(event.currentTarget).attr('maxLength')){
	            $('#' + dni).focus();
	            $('#' + dni).select();
	        }
	    }
	});

	$('#' + dni).keyup(function(event) {
		if (ignoredKeys.indexOf(event.keyCode) == -1) {
	        if($(event.currentTarget).attr('value').length >= $(event.currentTarget).attr('maxLength')){
	            $('#' + verificador).focus();
	            $('#' + verificador).select();
	        }
	    }
	    //8 = <--
	    if (event.keyCode == '8') {
	        if($(event.currentTarget).attr('value').length == 0){
	            $('#' + categoria).focus();
	        }
	    }
	});

	$('#' + verificador).keyup(function(event) {
	    if (event.keyCode == '8') {
	        if($(event.currentTarget).attr('value').length == 0){
	            $('#' + dni).focus();
	            
	        }
	    }
	});
	
}