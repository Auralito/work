chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  switch (msg.action) {
    case 'none':

      break;

    case 'basic':

      break;

    case 'changeout':
      changeout();
      break;
  }
});

var inputs = $('textarea:first').parent().parent().parent().parent().parent().parent().parent();

function changeout() {
  var selectors = inputIndexes.map(function(element) { return element.selector; });
  // Loop through each input field to determine whether to hide or show it
  $(inputs).children().each(function(i, val) {
    var id = selectors.indexOf(i);

    if (id === -1) {
      $(val).hide();
    }

  });

  $.get(chrome.extension.getURL('inject/online.html'), function(data) {
      //$(data).after('.hof-online');
      // Or if you're using jQuery 1.8+:
      var injectloc = $('.hof-online').parent();
      $($.parseHTML(data)).appendTo(injectloc);
      processInputs();
  });

}
// Input field whitelist for changeout
var inputIndexes = [{
  selector: 2,
  class: 'id',
  inputtype: 'input'
}, {
  selector: 5,
  class: 'online',
  inputtype: 'select'
}, {
  selector: 16,
  class: 'body',
  inputtype: 'textarea'
}, {
  selector: 87,
  class: 'desktop-body-w',
  inputtype: 'select'
}, {
  selector: 88,
  class: 'home-mob-w',
  inputtype: 'select'
}, {
  selector: 89,
  class: 'hub-desktop-w',
  inputtype: 'select'
}, {
  selector: 90,
  class: 'hub-mob-w',
  inputtype: 'select'
}, {
  selector: 92,
  class: 'hub-filter',
  inputtype: 'select'
}, {
  selector: 93,
  class: 'home-filter',
  inputtype: 'select'
}];

$.each(inputIndexes, function(i, val) {
  var className = 'hof-' + inputIndexes[i].class;
  $(inputs).children().eq(inputIndexes[i].selector).find(inputIndexes[i].inputtype).addClass(className);
});

// $(inputs).children().eq(2).find('input').addClass('hof-id');
// $(inputs).children().eq(5).find('select').addClass('hof-online');
// $(inputs).children().eq(16).find('textarea').addClass('hof-body');
//
// $(inputs).children().eq(87).find('select').addClass('hof-home-desktop-w');
// $(inputs).children().eq(88).find('select').addClass('hof-home-mob-w');
// $(inputs).children().eq(89).find('select').addClass('hof-hub-desktop-w');
// $(inputs).children().eq(90).find('select').addClass('hof-hub-mob-w');
//
// $(inputs).children().eq(92).find('select').addClass('hof-hub-filter');
// $(inputs).children().eq(93).find('select').addClass('hof-home-filer');

$(document).keydown(function(e) {
  if ((e.which == '115' || e.which == '83') && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    $('button[name="apply"]').click();
    return false;
  }
  return true;
});

function processInputs() {
  $('#hof-online-switch').attr('checked', ($('.hof-online').val() === 'true' ) ? true : false);
  $('#hof-online-switch').click(function() {
    if(this.checked) {
      $('.hof-online').val('true');
    } else {
      $('.hof-online').val('false');
    }
  });
  //var state = JSON.parse($('.hof-online').val());
  // $('#cmn-toggle-7').prop('checked', JSON.parse($('.hof-online').val()));
}
