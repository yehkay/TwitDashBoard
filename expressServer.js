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

var  latlong = [['tweets', [ ]]];
var latlongdata = [['tweets', [ ]]];
var temp = [];
var countMin = [];
var countMinData = [];
var countdata = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
var count = 0;
var count15 = 0;

//record count every 1 minute
setInterval(function(){
  countMin = countMin.concat(count);
  console.log(countMin);

},60000);

//store the geo values in the variable 'latlongdata' and restart 'count' every 15 mins
setInterval(function(){
  latlongdata = latlong;
  countMinData = countMin;
  count15 = count;
  countdata = tweetcountmin();

  latlong = [['tweets', [ ]]];
  count = 0;
  countMin = [];

  console.log('ll: ' + latlongdata[0][1].length); 
  console.log('countdata: '+countdata);
},900000);

function tweetcountmin(){
  var tempcount = [];
  for(var i = 0; i<14; i++){
    if(i == 0)
      tempcount[i] = countMinData[0];
    else
      tempcount[i] = countMinData[i] - countMinData[i-1];
  }
  tempcount[14] = count15 - countMinData[13];
  return tempcount; 
}

twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
  stream.on('data', function (data) { 
    count++;   
    if(data.entities.hashtags[0] != null || data.entities.hashtags[0] != undefined ) 
      var tag = data.entities.hashtags[0].text;
    else
      var tag = '';    
   
    
    if(data.geo != null){
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
      count++;    
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
  var graph = {data: countdata, count: count15 };
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