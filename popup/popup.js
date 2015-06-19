$(document).ready(function() {
	//alert('ready');
	if(localStorage.state) {
		var selector = '#' + localStorage.state + '> .icon';
		var active = $('.active')
		$(selector).append(active);
	}

	$('#none').on('click', function(){

		$(this).find('.icon').append($('.active'));
		setState('none');
	});

	$('#basic').on('click', function(){
		$(this).find('.icon').append($('.active'));
		setState('basic');
	});

	$('#changeout').on('click', function(){
		$(this).find('.icon').append($('.active'));
		setState('changeout');
	});
});

function setState(state) {
	localStorage.setItem('state', state);

	// Reload the page
	chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
	    var code = 'window.location.reload();';
	    chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
	    window.close();
	});

}
