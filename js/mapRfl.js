
var mapRfl = Raphael('map', 1000, 400);
                
var r = mapRfl;
r.rect(0, 0, 1000, 400, 0).attr({
    stroke: "none",                    
});
var over = function () {
    this.c = this.c || this.attr("fill");
    this.stop().animate({fill: "#E0E0E0"}, 100);
},
    out = function () {
        this.stop().animate({fill: this.c}, 100);
    };
//START THE SET OF COUNTRIES
r.setStart();
var hue = Math.random();
//DRAW THE COUNTRIES
for (var country in worldmap.shapes) {
    // var c = Raphael.hsb(Math.random(), .5, .75);
    // var c = Raphael.hsb(.11, .5, Math.random() * .25 - .25 + .75);
    r.path((worldmap.shapes[country])).attr({stroke: "#FFF", fill: "#FFF", "stroke-opacity": 1});
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
              
           
/* try {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function (pos) {
        r.circle().attr({fill: "none", stroke: "#f00", r: 5}).attr(world.getXY(pos.coords.latitude, pos.coords.longitude));
        //r.path("M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z").attr(world.getXY(pos.coords.latitude, pos.coords.longitude));
    });
} catch (e) {} */

var dot = r.circle().attr({fill: "r#FE7727:50-#F57124:100", stroke: "#fff", "stroke-width": 2, r: 0});                      