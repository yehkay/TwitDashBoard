var socket = io.connect();
jQuery(function ($) {
  var tweetList = $('#tweeText');
  var hashList = $('#hash');
  var hashItems = $('#hash li');
    
  var showPie = setInterval(function(){ 
    $('#holder').empty();
    drawpie();    
  },2000);


  //ON TWEET
  socket.on('tweet', function (data) {
    $('#loader').hide();
     //add tweets        
    tweetList.prepend('<li><div class="row"><div class="dp span1" style="background-image:url('+data.dp+');"></div><div class="tweet span8">' + data.text.toString() + '</div></div></li>');
    $("#tweeText li:gt(5):last").remove();
        
    var attr = world.getXY(data.lat,data.lon);
    //Continent
    mapRfl.circle().attr({fill: "#000", "fill-opacity": 1, "stroke-width": 0, r: 1}).attr(attr).animate({fill: "#3EA6E1", r: 2, "fill-opacity": 1, "stroke-width": 1, stroke : "#225C7D"}, 3000, 'elastic');
    //tt.remove();
    //mapRfl.circle().attr({fill: "#225C7D", "fill-opacity": 1, "stroke-width": 1, r: 1 }).attr(attr).animate({fill: "#3EA6E1", "fill-opacity": 1, "stroke-width": 1, stroke : "#225C7D", r: 2}, 1000, "elastic");   
    if(data.hashtag.toString() != ''){              

        //add hashtags
        hashList.prepend('<li>' + '#' +data.hashtag.toString() + '</li>');                         
        $("#hash li:gt(8):last").remove();
          
    } 

    //Pie Chart                 
    values = getPieValues(Math.round(attr.cx), Math.round(attr.cy));      

    //count
    $("#NA").html(countNA);
    $("#SA").html(countSA);
    $("#EU").html(countEU);
    $("#AF").html(countAF);
    $("#Asia").html(countAsia);
    $("#AU").html(countAU);
  });                  
});

