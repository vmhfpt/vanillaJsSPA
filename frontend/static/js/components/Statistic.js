import AbstractView from "./AbstractView.js";
import Order from "../service/orderService.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Statistic");
    }

    async getHtml() {
        let order = new Order();
        function convertDate(date){
            date = date.toDate();
 
           let year = date.getFullYear();
           let month = date.getMonth() + 1; 
           let day = date.getDate();
           return `${day}-${month}-${year}`;
        }
        function showAreaChart(result){
              var chart = new CanvasJS.Chart(document.getElementById("chartContainer"), {
                title: {
                    text: "",
                    fontSize: 24
                },
                axisY: {
                    title: "Number of ordered"
                },
                data: [{
                    type: "area",
                    toolTipContent: "{label}: {y} order(s)/day",
                    dataPoints: result
                }]
            });
            chart.render();
        }
        function showPieChart(reslut){
            const ctx = document.getElementById("pieChart").getContext('2d');
        
            const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["on hold", "processing", "been shipped", "success", "cancelled"
            ],
                datasets: [{
                label: 'Order Items',
                data: reslut,
                backgroundColor: ["#FF4136", "#FFDC00", "#39CCCC",
                "#2ECC40", "#111111", "#B10DC9", "",
                "#001f3f", "", "#01FF70", "#85144b",
                "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                }]
            },
            });
        }
        function showBarChart(dataArr, ticksArr){
            var bar_data = {
                data: dataArr,
                bars: {
                    show: true
                }
            }
            
            $.plot('#bar-chart', [bar_data], {
                grid: {
                    borderWidth: 1,
                    borderColor: '#f3f3f3',
                    tickColor: '#f3f3f3'
                },
                series: {
                    bars: {
                        show: true,
                        barWidth: 0.5,
                        align: 'center',
                    },
                },
                colors: ['red'],
                xaxis: {
                    ticks: ticksArr
                }
            })
        }
        order.getStatisticOrder().then((data) => {
           
            var dataItem = [];
            let onHold = 0,processing = 0, beenShipped = 0, success = 0, cancelled = 0;
             data.dataOrder.map((item, key) => {
                dataItem.push({
                    ...item,
                    createdAt : convertDate(item.createdAt)
                });
                if(item.status == '6') onHold ++;
                if(item.status == '5') processing ++;
                if(item.status == '4') beenShipped ++;
                if(item.status == '3') success ++;
                if(item.status == '2') cancelled ++;
             });

             var result = Object.values(dataItem.reduce(function(acc, obj) {
                var key = obj['createdAt'];
                if (!acc[key]) {
                  acc[key] = {label: key, y: 0};
                }
                acc[key].y += 1;
                return acc;
              }, {}));

              
              $('.title-loading').removeClass('d-none');
              $('.loading-animation').remove();
              showPieChart([onHold,  processing, beenShipped, success, cancelled]);
              showAreaChart(result);
              
              let arrBarChart = [];
              let dataBarChart = data.dataOrderDetail.map((item,key) => {
                  arrBarChart.push([key, item.quantity]);
                  return [key, item.name];
              })
              showBarChart(arrBarChart, dataBarChart);
          
           
        })

        return `
        <h4 class="fw-bold py-3 mb-4">
        <span class="text-muted fw-light">Home/</span> Statistic
      </h4>
      <div class="px-y d-flex justify-content-center loading-animation">
                <div class="">
                  <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
            </div>


           <div class="row my-5" >
           <div class="col-12 text-center my-3 d-none title-loading"> <h2>Statistic status order</h2></div>
           <div class="col-md-12">
           <div class="chart-responsive">
               <div class="chartjs-size-monitor">
                   <div class="chartjs-size-monitor-expand">
                       <div class=""></div>
                   </div>
                   <div class="chartjs-size-monitor-shrink">
                       <div class=""></div>
                   </div>
               </div>
               <canvas id="pieChart" height="104" style="display: block; width: 208px; height: 104px;" width="208" class="chartjs-render-monitor"></canvas>
           </div>

       </div>
           </div>


           <div class="row my-5" >
           <div class="col-12 text-center my-3 d-none title-loading"> <h2>Statistic Number of products ordered</h2></div>
           <div class="col-md-12">
           <div class="">
              
               <div id="bar-chart" style="height: 300px; padding: 0px; position: relative;">

               </div>
           </div>

       </div>
           </div>

           <div class="row my-5">
           <div class="col-12 text-center my-3 d-none title-loading"> <h2>Statistic orders by days</h2></div>
           <div class="col-md-12">
           <div class="">
              
           <div id="chartContainer" style="height: 338px; padding: 0px; position: relative;" class="full-width-chart"></div>
           </div>

       </div>
           </div>


           
        `;
    }
}