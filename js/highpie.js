var values = [];
var countNA=0 , countSA=0, countEU=0, countAF=0, countAsia=0, countAU=0;
function drawpie(){
    $('#holder').highcharts({
        chart: {
            animation: false,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        colors: ['#91062B','#DE3535','#FF615C','#FF854A','#FFC25C','#8C4646'],
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            hideDelay: 100
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                slicedOffset: 20,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            },
            series: {
                animation: false
            }
        },
        series: [{
            type: 'pie',
            name: 'Tweets share',
            data: values
        }]
    });
}

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
  return [
            ['North America',countNA],
            ['Europe', countEU],
            ['South America', countSA],
            ['Asia',countAsia],
            ['Africa', countAF],             
            ['Australia',countAU]
        ];
}
