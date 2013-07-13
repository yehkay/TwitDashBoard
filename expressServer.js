var express = require('express'),
  twitter = require('ntwitter'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

var port = process.env.PORT || 3000; 
  
server.listen(port, function() {
  console.log("Listening on " + port);
});


//twitter authorizations
var twit = new twitter({
  consumer_key: 'wmUbKfLKrHwt8mGb80SQ',
  consumer_secret: 'VgrYTCMiDxZAmKrKhCzgJpkyOKy2ms9Yt9VOSNvTiM',
  access_token_key: '15735158-Q0u4utLa1z0ddBox7IY8tjlqM2Hc8VqaxbPJjXxRT',
  access_token_secret: 'VzjQf5muAlXQPzuIsRFdKm6cWqpXPBPHp5N0uv7ZXFE'
});

var latlong = [['tweets', [ ]]];
var latlongdata = [['tweets', [ ]]];
var temp = [];

var timeC = 0;
var countdata = [0,0,0,0,0,0,0,0,0,0];
var count = 0;

var countMin = [];
var countMinData = [0,0,0,0,0,0,0,0,0,0];

var count15 = 0;

//record count every 1 minute
setInterval(function(){
  //countMin = countMin.concat(count);
  countMinData[timeC] = count;
  tweetcountmin();
  timeC++;  
},60000);

//store the geo values in the variable 'latlongdata' and restart 'count' every 15 mins
setInterval(function(){
  latlongdata = latlong;
  latlong = [['tweets', [ ]]];

 /* countMinData = countMin;
  count15 = count;
  countdata = tweetcountmin();  
  count = 0;
  countMin = []; */
  
  countMinData = [0,0,0,0,0,0,0,0,0,0];
  countdata = [0,0,0,0,0,0,0,0,0,0];
  count = 0;
  timeC = 0;
},600000);

function tweetcountmin(){  
  if(timeC == 0)
    countdata[0] = count;
  else
    countdata[timeC] = countMinData[timeC] - countMinData[timeC-1];   
}  

twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
  stream.on('data', function (data) {        
    if(data.entities.hashtags[0] != null || data.entities.hashtags[0] != undefined ) 
      var tag = data.entities.hashtags[0].text;
    else
      var tag = '';    
   
    
    if(data.geo != null){
      count++;
      io.sockets.volatile.emit('tweet', {
        user: data.user.screen_name,
        dp: data.user.profile_image_url,
        text: data.text,
        lat: data.geo.coordinates[0],
        lon: data.geo.coordinates[1],
        hashtag: tag    
      });

      temp = [ data.geo.coordinates[0], data.geo.coordinates[1], 1 ]
      latlong[0][1] = latlong[0][1].concat(temp);            
    }


  });
});


//Routers
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/getlatlong',function (req, res) {
  if(latlongdata[0][1].length !=0)
    res.json(latlongdata);
  else
    res.json(latlong);
});

app.get('/getgraphdata',function (req, res) {
  if(timeC == 0)
    countdata[0] = count;
  else
    countdata[timeC] = count - countMinData[timeC-1];
  var graph = {data: countdata, count: count, time: timeC };
  console.log('Graph values: ' + graph);
  res.json(graph);
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