module('logger', {
	setup: function() {
		jQuery.setupLogger({
			level: 9,
			url: undefined,
			success_callback: undefined
		});	
	},
	teardown: function() {
		jQuery.setupLogger({
			level: 9,
			url: undefined,
			success_callback: undefined
		});	
	}
});

test('log to browser console only', function()
{
	window.console.messages = [];
	
	notEqual( jQuery.log, undefined, 'log is defined' );
	equal( typeof(jQuery.log), "function", 'log is a function' );
	
	jQuery.log('This is log info');
	
	equal(window.console.messages[0], 'This is log info', 'info was logged');
});

test('info to browser console only', function()
{
	window.console.information = [];
	
	notEqual( jQuery.info, undefined, 'info is defined' );
	equal( typeof(jQuery.info), "function", 'info is a function' );
	
	jQuery.info('This is info in the log');
	
	equal(window.console.information[0], 'This is info in the log', 'info was logged');
});


test('warn to browser console only', function()
{
	window.console.warnings = [];
	
	notEqual( jQuery.warn, undefined, 'warn is defined' );
	equal( typeof(jQuery.warn), "function", 'warn is a function' );
	
	jQuery.warn('This is warn info');
	
	equal(window.console.warnings[0], 'This is warn info', 'warn was logged');
});

test('error to browser console only', function()
{
	window.console.errors = [];
	
	notEqual( jQuery.error, undefined, 'error is defined' );
	equal( typeof(jQuery.error), "function", 'error is a function' );
	
	jQuery.error('This is error info');
	
	equal(window.console.errors[0], 'This is error info', 'error was logged');
});

test('log to browser console and backend log', function()
{
	expect(4);
	window.console.messages = [];
	
	jQuery.setupLogger({
		url: '/loggerService.asmx',
		success_callback: function( data ){
			ok(data !== null, 'ajax data response is not null');
			equal(!!data['success'], true, 'use the ajax call');
			equal(data['message'], 'This is log info', 'message was delivered');
		}
	});
	
	var mockupAjax = $.mockjax({
		url: '/loggerService.asmx',
		status: 200,
		responseTime: 250,
		contentType: 'text/json',
		responseText: { 
			success: true, 
			message: 'This is log info'
		}
	});
	
	stop();
	
	jQuery.log('This is log info');
	
	setTimeout(function() {  
        start();
		
		equal(window.console.messages[0], 'This is log info', 'info was logged');
		$.mockjaxClear(mockupAjax);
    }, 250);  
	
});

test('info to browser console and backend info', function()
{
	expect(4);
	window.console.information = [];
	
	jQuery.setupLogger({
		url: '/loggerService.asmx',
		success_callback: function( data ){
			ok(data !== null, 'ajax data response is not null');
			equal(!!data['success'], true, 'use the ajax call');
			equal(data['message'], 'This is info', 'message was delivered');
		}
	});
	
	var mockupAjax = $.mockjax({
		url: '/loggerService.asmx',
		status: 200,
		responseTime: 250,
		contentType: 'text/json',
		responseText: { 
			success: true, 
			message: 'This is info'
		}
	});
	
	stop();
	
	jQuery.log('This is info');
	
	setTimeout(function() {  
        start();
		
		equal(window.console.information[0], 'This is info', 'info was logged');
		$.mockjaxClear(mockupAjax);
    }, 250);  
	
});
