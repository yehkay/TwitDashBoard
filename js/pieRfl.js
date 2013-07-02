var values = [];
var labels = {legend: ['NA', 'SA', 'EU', 'AF', 'Asia', 'AU']};
var countNA=0 , countSA=0, countEU=0, countAF=0, countAsia=0, countAU=0;
var pieHolder = Raphael("holder"),
    pie = pieHolder.piechart(175, 130, 100, values, labels);
function getPieValues(x,y){                    
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