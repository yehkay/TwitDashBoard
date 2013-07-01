var express = require('express'),
	twitter = require('ntwitter'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
  io = require('socket.io').listen(server); 
  
server.listen(3000);


//twitter authorizations
var twit = new twitter({
  consumer_key: 'wmUbKfLKrHwt8mGb80SQ',
  consumer_secret: 'VgrYTCMiDxZAmKrKhCzgJpkyOKy2ms9Yt9VOSNvTiM',
  access_token_key: '15735158-Q0u4utLa1z0ddBox7IY8tjlqM2Hc8VqaxbPJjXxRT',
  access_token_secret: 'VzjQf5muAlXQPzuIsRFdKm6cWqpXPBPHp5N0uv7ZXFE'
});

var count = 0;

console.log("count started :" + count);
setInterval(function(){console.log('Tweet Count: '+ count);},15000);

twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
  stream.on('data', function (data) {
    count ++;
    if(data.entities.hashtags[0] != null || data.entities.hashtags[0] != undefined ) 
      var tag = data.entities.hashtags[0].text;
    else
      var tag = '';    
   
    
    if(data.geo != null){
      console.log(tag);
        io.sockets.volatile.emit('tweet', {
          user: data.user.screen_name,
          dp: data.user.profile_image_url,
          text: data.text,
          lat: data.geo.coordinates[0],
          lon: data.geo.coordinates[1],
          hashtag: tag    
        });
      }


	});
});


//Routers
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/js/:pname', function (req, res) {  
  var pname = req.params.pname;
  console.log("pname: "+pname);
  res.sendfile(__dirname + '/js/'+pname);
});

app.get('/css/:pname', function (req, res) {  
  var pname = req.params.pname;
  console.log("pname: "+pname);
  res.sendfile(__dirname + '/css/'+pname);
});

app.get('/globe/:pname', function (req, res) {  
  var pname = req.params.pname;
  console.log("pname: "+pname);
  res.sendfile(__dirname + '/globe/'+pname);
});

app.get('/globe/third-party/:pname', function (req, res) {  
  var pname = req.params.pname;
  console.log("pname: "+pname);
  res.sendfile(__dirname + '/globe/third-party/'+pname);
});

app.get('/globe/third-party/Three/:pname', function (req, res) {  
  var pname = req.params.pname;
  console.log("pname: "+pname);
  res.sendfile(__dirname + '/globe/third-party/Three/'+pname);
});