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
      pieHolder.clear();                      
      pie = pieHolder.piechart(175, 130, 100, values, labels);

      pie.hover(function () {
        console.log('HOVER @@@@@@@@');
        this.sector.stop();
        this.sector.scale(1.1, 1.1, this.cx, this.cy);

        if (this.label) {
            this.label[0].stop();
            this.label[0].attr({ r: 7.5 });
            this.label[1].attr({ "font-weight": 800 });
        }
      }, function () {
        this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

        if (this.label) {
            this.label[0].animate({ r: 5 }, 500, "bounce");
            this.label[1].attr({ "font-weight": 400 });
        }
      });
    },2000);


  //ON TWEET
  socket.on('tweet', function (data) {
    var attr = world.getXY(data.lat,data.lon);
    //Continent
    mapRfl.circle().attr({fill: "#225C7D", "fill-opacity": 1, "stroke-width": 1, r: 1 }).attr(attr).animate({fill: "#3EA6E1", "fill-opacity": 1, "stroke-width": 1, stroke : "#225C7D", r: 2}, 1000, "elastic");   
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

    //count
    $("#NA").html(countNA);
    $("#SA").html(countSA);
    $("#EU").html(countEU);
    $("#AF").html(countAF);
    $("#Asia").html(countAsia);
    $("#AU").html(countAU);
  });

  pieHolder.clear();
  console.log('after called')                   
  pie = pieHolder.piechart(175, 130, 100, values, labels);               
});