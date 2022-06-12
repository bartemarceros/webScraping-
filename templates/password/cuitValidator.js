function validarCuit(cuit) {

	var esValido = false;
	var prefijo = 0;
	var digVerificador = 0;
	var digito;
	var codigo = "";
	var prefijoStr;

	if (cuit.length == 11) {
		prefijoStr = cuit.substring(0, 2);
		prefijo = parseInt(prefijoStr);
		codigo = prefijoStr + cuit.substring(2, 10);
		digVerificador = parseInt(cuit.substring(10, 11));
	}

	if (isPersonaFisica(prefijo) || isPersonaJuridica(prefijo)) {
		var coeficientes = new Array(5, 4, 3, 2, 7, 6, 5, 4, 3, 2);
		var suma = 0;
		for ( var i = 0; i < codigo.length; ++i) {
			suma += parseInt(codigo.substring(i, i + 1)) * coeficientes[i];
		}
		var dif = 11 - suma % 11;
		if (dif == 11) {
			digito = 0;
		} else if (dif == 10) {
			digito = 9;
		} else {
			digito = dif;
		}

		esValido = digito == digVerificador;
	}
	return esValido;

}

function isPersonaFisica(value) {
	return value == 20 || value == 23 || value == 24 || value == 27;
}

function isPersonaJuridica(value) {
	return value == 30 || value == 33 || value == 34;
}