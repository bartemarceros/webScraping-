/**
 * 
 * Requiere:
 * 
 * libreria jquery.validate y jquery.form
 * 
 * Uso:
 * 
 * var options = {
 *  	formId:"formId",
 *  	afterSubmitFunction:function(){...},
 *  	loadCompleteFunction:function(json){...},
 *  	validationsConfig:{json de configuración de validaciones},
 * 		customValidationFunction: function(){...},
 *  	errorHandler:function(message){...},
 *  	ajaxSubmit: true
 * }
 * 
 * var trxController = new LinkTransactionController(options);
 * 
 * Al instanciarlo maneja el submit del formulario de id formId
 * 
 * Detalle de opciones:
 * - formId: Identificador del form a submitear. Obligatorio
 * - afterSubmitFunction: funcion a ejecutar justo luego de realizar el submit
 * - loadCompleteFunction: Callback a invocar cuando vuelva la respuesta. Obligatorio
 * - validationsConfig: Configuración jquery.validate. Opcional
 * - customValidationFunction: Funcion de validacion a ejecutar antes del submit
 * - handleError: funcion para manejar la respuesta en caso de una respuesta de error
 * - typeResponse: tipo de respuesta del formulario (json o html). Obligatorio
 * - ajaxSubmit: si debe ser submit por ajax o no
 * @param options
 * @return
 */
function ajaxSubmitConfiguration(options) {

	// -------------------------------------------------------------------------------
	// Opciones
	//
	var formId = options.formId;
	var afterSubmitFunction = options.afterSubmitFunction ? options.afterSubmitFunction : null;
	var loadCompleteFunction = options.loadCompleteFunction ? options.loadCompleteFunction : null;
	var solapa = options.solapa ? options.solapa : false;
	var validationsConfig= options.validationsConfig;	
	var customValidationFunction = options.customValidationFunction;
	var handleError=options.errorHandler?options.errorHandler:defaultErrorHandler;
	var typeResponse=options.typeResponse?options.typeResponse:'json';
	var ajaxSubmit=options.ajaxSubmit;
	//
	// -------------------------------------------------------------------------------
	
	// Registra el manejador de las respuesta del server
	validationsConfig['submitHandler'] = function(form) 
	{		
		var ajaxSubmitOptions;		
		if(customValidationFunction && customValidationFunction != null) {
			ajaxSubmitOptions = { success: genericCallbackFunction, 
								  beforeSubmit: customValidationFunction, 
								  error: doHandleAjaxError};
		} else {
			ajaxSubmitOptions = { success: genericCallbackFunction, 
								  error: doHandleAjaxError};
		}
		if (ajaxSubmit != false) {
	        // inside event callbacks 'this' is the DOM element so we first 
	        // wrap it in a jQuery object and then invoke ajaxSubmit 
	        $(form).ajaxSubmit(ajaxSubmitOptions);
	        
	        if(afterSubmitFunction && afterSubmitFunction != null) {
	        	afterSubmitFunction();
	        }
	        // !!! Important !!! 
	        // always return false to prevent standard browser submit and page navigation 
	        return false; 
		} else {
			form.submit();
			return true;
		}
	 
	};
	
	// Registrar validaciones	
	$("#" + formId  ).validate(validationsConfig);	
						
	function genericCallbackFunction(result, statusText) 
	{
			var json = getJSON(result);
			if (json == null) { //Si no es JSON lo devuelvo tal cual
				//TODO sacar este parche para que expire la session x ajax
				//'<!--*EXPIRAR*SESION*-->'.length = 23
				if (result.length > 23){
					var token = result.substr(0,23);
					if (token == '<!--*EXPIRAR*SESION*-->'){
						if ($('#columnaCentral')){
							$('#columnaCentral').html(result);
						}
					}
				}
				
				/*Esto es para las pantallas con el diseño en solapas. El contenido del html se cargara en la solapa*/
				if(solapa){
					if ($('#contenidoSolapa')){
						$('#contenidoSolapa').empty();
						$('#contenidoSolapa').html(result);
					}
				}
				
				//TODO: Falta ver como se manejan los errores en pedidos html
				if (loadCompleteFunction != null || loadCompleteFunction != undefined) {
		    		loadCompleteFunction(result);
		    	}
			} else if(json.response.expirationMessage) {
			    handleSessionExpired();
		    } else if (json.response.message == "sessionExpired") { 
		    	// session expirada
		    	handleSessionExpired();
		    } else if (json.response.errorMessage) { 
		    	// si se produjo un error en el servidor
		    	doHandleError(json.response);
		    } else {
		    	// si esta todo ok
		    	if (loadCompleteFunction != null || loadCompleteFunction != undefined) {
		    		loadCompleteFunction(json);
		    	}
			}
	};
	
	// Todos los resultados de tipo json comienzan con una llave.
	function getJSON(result) {
		if (result.charAt(0) == "{") {
			if($.browser.msie && $.browser.version >= "7.0") {
				var pattern = /\r/g;
				result = result.replace(pattern, '\\r'); 
			}			
			return eval("(" + result + ")");
		} else {
			return null;
		}
	};

	function handleSessionExpired() {
//		alert('Su sesion ha caducado. Por favor, ingrese nuevamente.');
//		window.location = 'login.htm?sessionExpired=true';
//		window.location = 'index.jsp';
	};
	
	function doHandleError(response) {
			handleError(response);	
	};	

	function doHandleAjaxError() {
			var object = new Object();
			object["message"] = "Se ha producido un error de comunicaci&oacute;n. Por favor reintente la operaci&oacute;n.";
			object["code"] = "Error_Submit";			
			doHandleError(object);
	};	
	
	function defaultErrorHandler(response) {
//		alert("Respuesta de Error de Ajax");
	};
	
}
