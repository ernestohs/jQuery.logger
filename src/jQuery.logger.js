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

	var loggeroptions = {
							level: 9
						};
	
	var $remoteLogging = function ( options )
	{
		if (loggeroptions.url === undefined || loggeroptions.url === '' || loggeroptions.url === null) return;
		
		$.ajax({
			url: loggeroptions.url,
			dataType: 'json',
			param: {
				method: options.method,
				browser: $.browser,
				message: options.message
			},
			success: loggeroptions.success_callback || function() { }
		});
	};

	$.setupLogger = function ( options )
	{
		$.extend(loggeroptions, options);
	};
	
	$.logLevel = function ( level ) 
	{
		if ( level === undefined ) return loggeroptions.level;
		
		loggeroptions.level = level;
	}

	$.log = function ( message ) 
	{
		if ( loggeroptions.level < 4 ) return;
		
		window.console.log( message );
		$remoteLogging({
			method: 'log',
			message: message
		});
	};

	$.info = function ( message ) 
	{
		if ( loggeroptions.level < 3 ) return;
		
		window.console.info( message );
		$remoteLogging({
			method: 'info',
			message: message
		});
	};

	$.warn = function(message) 
	{
		if ( loggeroptions.level < 2 ) return;
		
		window.console.warn( message );
		$remoteLogging({
			method: 'warn',
			message: message
		});
	};

	$.error = function( message ) 
	{
		if ( loggeroptions.level < 1 ) return;
		
		window.console.error( message );
		$remoteLogging({
			method: 'error',
			message: message
		});
	};
	
})( jQuery );