var socket = io.connect();
jQuery(function ($) {
  var tweetList = $('#tweeText');
  var hashList = $('#hash');
  var hashItems = $('#hash li');
  var tweeTimer = 0;
  setInterval(function(){
        if(tweeTimer <= 6){
            tweeTimer++;                                                        
        }                            
        else{
            tweeTimer = 1;                                                                               
        }  
    },300);

    var showPie = setInterval(function(){
      console.log('set interval called');
      pieHolder.clear();
      console.log('labels: '+ labels.legend);                 
      pie = pieHolder.piechart(175, 130, 100, values, labels);
    },2000);


  //ON TWEET
  socket.on('tweet', function (data) {
    var attr = world.getXY(data.lat,data.lon);
    //Continent
    mapRfl.circle().attr({fill: "#fff", "fill-opacity": 1, "stroke-width": 0, r: 1 }).attr(attr).animate({fill: "#C43737", "fill-opacity": 1, "stroke-width": 0, r: 2}, 1000, "elastic");
   
    if(data.hashtag.toString() != ''){
        //add tweets
        if(tweeTimer%2 == 1 ){
            tweetList.prepend('<li><div class="row"><div class="dp span1" style="background-image:url('+data.dp+');"></div><div class="tweet span8">' + data.text.toString() + '</div></div></li>');
            $("#tweeText li:gt(5):last").remove();
        }

        //add hashtags
        hashList.prepend('<li>' + '#' +data.hashtag.toString() + '</li>');                         
        $("#hash li:gt(8):last").remove();
          //  console.log('open '+ tweeTimer);
        //hashList.prepend('<li>' + '#' +data.hashtag.toString() + '</li>');
        //console.log($("#hash li").length);
        //$("#hash li:gt(5):last").remove();
    }    
    //Pie Chart                 
    values = getPieValues(Math.round(attr.cx), Math.round(attr.cy));      
  });

  pieHolder.clear();
  console.log('after called')                   
  pie = pieHolder.piechart(175, 130, 100, values, labels);               
});