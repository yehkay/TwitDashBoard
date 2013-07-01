

Raphael('map', 1000, 400, function () {
                var socket = io.connect();
                var r = this;
                r.rect(0, 0, 1000, 400, 0).attr({
                    stroke: "none",                    
                });
                var over = function () {
                    this.c = this.c || this.attr("fill");
                    this.stop().animate({fill: "#BFB188"}, 300);
                },
                    out = function () {
                        this.stop().animate({fill: this.c}, 300);
                    };
                //START THE SET OF COUNTRIES
                r.setStart();
                var hue = Math.random();
                //DRAW THE COUNTRIES
                for (var country in worldmap.shapes) {
                    // var c = Raphael.hsb(Math.random(), .5, .75);
                    // var c = Raphael.hsb(.11, .5, Math.random() * .25 - .25 + .75);
                    r.path((worldmap.shapes[country])).attr({stroke: "#3C4359", fill: "#3C4359", "stroke-opacity": 0.8});
                }
                //FINISH THE SET OF COUNTRIES
                var world = r.setFinish();
                world.hover(over, out);
                // world.animate({fill: "#666", stroke: "#666"}, 2000);

                world.getXY = function (lat, lon) {                    
                    return {
                        cx: lon * 2.6938 + 465.4,
                        cy: lat * -2.6938 + 227.066
                    };
                };
                              
                           
                try {
                    navigator.geolocation && navigator.geolocation.getCurrentPosition(function (pos) {
                        r.circle().attr({fill: "none", stroke: "#f00", r: 5}).attr(world.getXY(pos.coords.latitude, pos.coords.longitude));
                    });
                } catch (e) {}

                var dot = r.circle().attr({fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 0});
                
                jQuery(function ($) {
                  var tweetList = $('#tweeText');
                  //Hashtags code
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

                  var values = [];
                  var labels = ['NA', 'SA', 'EU', 'AF', 'Asia', 'AU'];
                  var countNA=0 , countSA=0, countEU=0, countAF=0, countAsia=0, countAU=0;
                  var pie = Raphael("holder", 300, 300).pieChart(350, 350, 200, values, labels, "#fff");
                  getPieValues = function(x,y){                    
                    if((0<=x)&&(x<=405.0) && (0<=y)&&(y<=195.0))
                        countNA++;
                    else if((208<=x)&&(x<=406) && (196<=y)&&(y<=390))
                        countSA++;
                    else if((428<=x)&&(x<=573) && (28<=y)&&(y<=137))
                        countEU++;
                    else if((406<=x)&&(x<=570) && (138<=y)&&(y<=330))
                        countAF++;
                    else if((764<=x)&&(y<=1000) && (260<=y)&&(y<=400))
                        countAU++;
                    else 
                        countAsia++;
                    return [countNA, countSA, countEU, countAF, countAsia, countAU];
                  }

                    //ON TWEET
                  socket.on('tweet', function (data) {
                    

                    var attr = world.getXY(data.lat,data.lon);                    
                    values = getPieValues(Math.round(attr.cx), Math.round(attr.cy));
                    pie.remove();                   
                    pie = Raphael("holder", 700, 700).pieChart(350, 350, 200, values, labels, "#fff");              



                    //Continent



                    r.circle().attr({fill: "#fff", "fill-opacity": 1, "stroke-width": 0, r: 1 }).attr(attr).animate({fill: "#C43737", "fill-opacity": 1, "stroke-width": 0, r: 2}, 1000, "elastic");
                   
                    if(data.hashtag.toString() != ''){
                        if(tweeTimer%2 == 1 ){
                            tweetList.prepend('<li><div class="row"><div class="dp span1" style="background-image:url('+data.dp+');"></div><div class="tweet span8">' + data.text.toString() + '</div></div></li>');
                            $("#tweeText li:gt(5):last").remove();
                        }
                        hashList.prepend('<li>' + '#' +data.hashtag.toString() + '</li>');                         
                        $("#hash li:gt(8):last").remove();
                          //  console.log('open '+ tweeTimer);
                        //hashList.prepend('<li>' + '#' +data.hashtag.toString() + '</li>');
                        //console.log($("#hash li").length);
                        //$("#hash li:gt(5):last").remove();
                    }                    
                  });                  
                }); 
             });

