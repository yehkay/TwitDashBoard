
var mapRfl = Raphael('map', 1000, 400);
                
var r = mapRfl;
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