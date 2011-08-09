/*!
 * Logger - jQuery plugin to log
 *
 * Version:	0.0.1
 * Relased: 2011-06-14
 * Source:	https://github.com/ernestohs/jQuery.logger
 * Author: Ernesto Herrera Salinas (http://blog.ernestohs.com)
 * License: MIT,GPL
 * 
 */

(function( $ ){

	var loggerOptions = {
							level: 9
						};
	
	var $remoteLogging = function ( options )
	{
		if (loggerOptions.url === undefined || loggerOptions.url === '' || loggerOptions.url === null) return;
		
		$.ajax({
			url: loggerOptions.url,
			dataType: 'json',
			param: {
				method: options.method,
				browser: $.browser,
				message: options.message
			},
			success: loggerOptions.success_callback || function() { }
		});
	};

	$.setupLogger = function ( options )
	{
		$.extend(loggerOptions, options);
	};
	
	$.logLevel = function ( level ) 
	{
		if ( level === undefined ) return loggerOptions.level;
		
		loggerOptions.level = level;
	};

	$.log = function ( message ) 
	{
		if ( loggerOptions.level < 4 ) return;
		
		window.console.log( message );
		$remoteLogging({
			method: 'log',
			message: message
		});
	};

	$.info = function ( message ) 
	{
		if ( loggerOptions.level < 3 ) return;
		
		window.console.info( message );
		$remoteLogging({
			method: 'info',
			message: message
		});
	};

	$.warn = function(message) 
	{
		if ( loggerOptions.level < 2 ) return;
		
		window.console.warn( message );
		$remoteLogging({
			method: 'warn',
			message: message
		});
	};

	$.error = function( message ) 
	{
		if ( loggerOptions.level < 1 ) return;
		
		window.console.error( message );
		$remoteLogging({
			method: 'error',
			message: message
		});
	};
	
})( jQuery );