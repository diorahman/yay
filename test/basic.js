var AppearIn = require('../index-browser');
var test = require('tape');

var BASE_URL = 'https://appear.in';

function createIframe(options, cb) {
  options = options || {};
  cb = cb || function(){};
  var iframe = document.createElement('iframe');
  if (options.id)
    iframe.setAttribute("id", options.id);
  iframe.style.width = '640px';
  iframe.style.width = '480px';
  document.body.appendChild(iframe);
  iframe.onload = cb;
  return iframe;
}

test('browser is webrtc compatible', function(t){
  var api = new AppearIn();
  t.ok(api.isWebRtcCompatible(), 'not compatible');
  t.end();
});

test('get random room name', function(t){
  var api = new AppearIn();
  api.getRandomRoomName().then(function(name){
    t.ok(typeof name == 'string');
    t.ok(name.length > 0);
    t.end();
  });
});

test('add room to iframe', function(t){
  var api = new AppearIn();
  api.getRandomRoomName().then(function(name){
    console.log(name);
    var iframe = createIframe({id: '1'}, function(event){
      t.end();
    });
    api.addRoomToIframe(iframe, name);
    t.equal(iframe.getAttribute('src'), BASE_URL + name);
  });
});

test('add room to iframe', function(t){
  var api = new AppearIn();
  api.getRandomRoomName().then(function(name){
    console.log(name);
    var iframe = createIframe({id: '2'}, function(event){
      t.end();
    });
    api.addRoomToElementById('2', name);
    t.equal(iframe.getAttribute('src'), BASE_URL + name);
  });
});
