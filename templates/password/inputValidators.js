//@leo
String.prototype.toFloat = function() {
	return parseFloat(this.replace(',', '.'));
};

String.prototype.getCantidadDecimales = function() {
	result = this.replace(',', '.').split(".")[1];
	if (typeof result == "undefined"){
		return 0;
	}
	return result.length;
};

Number.prototype.redondear = function(decimales) {
	return parseFloat((this % 1) ? this.toFixed(decimales) : this);
};

/**Para validar configuraciones del monto.  */
function config(max,min,decimales){	
	this.maximo=max;
	this.minimo=min;	
	this.cantDecimales=decimales;
	this.isRangoValido=function(monto){
		return    (monto.toFloat() >= this.minimo.toFloat())
				&& (monto.toFloat() <= this.maximo.toFloat());
	}
	
	this.isDecimalesValido=function(monto){
		return (monto.getCantidadDecimales() <= this.cantDecimales) ;
	}	
	
} 

// valida que un campo posea solo caracteres numericos y que no sea vacio
function validateNumeric(value){
	var validator = /^[0-9]+$/;
	if(validator.test(value)){
		return true;
	}else{
		return false;
	}
}

//valida que el campo no este vacio y no tenga solo espacios en blanco
function validateNotEmptyString(campo) {
	for ( i = 0; i < campo.length; i++ ) {
        if ( campo.charAt(i) != " " ) {
                return true;
        }
	}
	return false;
        
}

//devuelve true solo si el valor que le llega posee solamente caracteres alfanumericos (a-z ,0-9, espacios y underscore)
function validateAlpha(value){ 
	var validator = /^[\s\wáéíóúÁÉÍÓÚüÜñÑ]*$/;
	return validator.test(value);
}

//devuelve true solo si el valor que le llega posee solamente caracteres alfanumericos (a-z ,0-9 y espacios)
function validateAlphaNoUnderscore(value) {
	var validator = /^[\sa-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ]*$/;
	return validator.test(value);
}

//Valida la longitud de un campo
function validateLongitud(valor, minimo, maximo){
	return (minimo <= valor.length) && (valor.length <= maximo);
}

//Valida que la longitud de un campo sea mayor o igual al su valor mínimo
function validateLongitudMayorA(valor, minimo){
	return (minimo <= valor.length);
}

function validateLongitudMenorA(valor, maximo){
	return (maximo >= valor.length);
}

function validateSuperaLongitud(valor, maximo){
	return (valor.length > maximo);
}

function validateDigitosEnteros(valor, maximo){	
	valor = valor.toString().split(".")[0];
	return (maximo >= valor.length);
}

function validateValorMenorA(valor, maximo){
	return (maximo > valor.value);
}

//valida el formato valido de monton dddd (,dd opcional) d = digito 
function validateFormatoImporte(str) { 
    str = str.replace(/^\s+|\s+$/g,"");
    
    var validator = /^(\d+)((\.|,)\d{1,2})?$/;
	if(validator.test(str)){
		return true;
	}else{
		return false;
	}
}

//valida el formato valido de monton dddd (,dd opcional) d = digito 
function validateSinDecimales(str) { 
    str = str.replace(/^\s+|\s+$/g,"");
    
    var validator = /^(\d+)((\.|,)\d{0})?$/;
	if(validator.test(str)){
		return true;
	}else{
		return false;
	}
}

//valida el formato valido de un mail
function validateEmail(valor) {
	var validator = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var str = new String(valor);
	str = str.toUpperCase();
	return validator.test(str);
}

function validarTexto(valor){
	if (!validateNotEmptyString(valor))	return false;
	
	var validator = /^[A-Z0-9ÑÁÉÍÓÚÄËÏÖÜ\s']+$/;
	var str = new String(valor);
	str = str.toUpperCase();
	return validator.test(str);
}

//devuelve true si el dato es texto, no permite el uso de apostrofes.
function validarTextoDescripcion(valor) {
	if (!validateNotEmptyString(valor))	return false;
	
	var validator = /^[A-Z0-9ÑÁÉÍÓÚÄËÏÖÜ\s]+$/;
	var str = new String(valor);
	str = str.toUpperCase();
	return validator.test(str);
}

//devuelve true si el dato es texto, admite tambien el uso del '.'
function validarTextArea(valor) {
	if (!validateNotEmptyString(valor))	return false;
	
	var validator = /^[A-Z0-9ÑÁÉÍÓÚÄËÏÖÜ\s'\.]+$/;
	var str = new String(valor);
	str = str.toUpperCase();
	return validator.test(str);
}

function validarTextAreaMensaje(valor) {
	if (!validateNotEmptyString(valor))	return false;

	var validator = /^[A-Z0-9ÑÁÉÍÓÚÄËÏÖÜ\s'-\/:,\."?!]+$/;
	var str = new String(valor);
	str = str.toUpperCase();
	return validator.test(str);
}

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

//valida un importe según la cantidad de valores enteros que se quiere tenga por delante
function validateFormatoImporteSelecInt(str,ent) { 
    str = str.replace(/^\s+|\s+$/g,"");
    var validator = new RegExp("^(\\d{1,"+ ent +"})((\\.|,)\\d{1,2})?$");
	
    if(validator.test(str)){
		return true;
	}else{
		return false;
	}
}

function makeSortString(s) {
	var translate = {
			"á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
			"Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U"   
  };
  var translate_re = /[áéíóúÁÉÍÓÚ]/g;
  return ( s.replace(translate_re, function(match) { 
    return translate[match]; 
  }) );
} 
