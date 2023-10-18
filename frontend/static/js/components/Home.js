import AbstractView from "./AbstractView.js";
import Order from "../service/orderService.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
      let order = new Order();
      order.getStatisticOrder().then((data) => {
           
        let onHold = 0,processing = 0, beenShipped = 0, success = 0, cancelled = 0;
         data.dataOrder.map((item) => {
            
            if(item.status == '5') processing ++;
            if(item.status == '4') beenShipped ++;
            if(item.status == '3') success ++;
            if(item.status == '2') cancelled ++;
         });
         $('.show').removeClass('d-none');
         $('.loading-update').remove();
         $('.show-shipped').text(beenShipped);
         $('.show-canceled').text(cancelled);
         $('.show-processing').text(processing);
         $('.show-success').text(success);
    })
        return /*html */ `
        <div class="px-y d-flex justify-content-center loading-update">
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
        <div class="row d-none show">
        <div class="col-lg-12 mb-4 order-0">
            <div class="row"> 
            <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn.icon-icons.com/icons2/2785/PNG/512/shipping_success_icon_177371.png" alt="chart success" class="rounded">
                  </div>
                  
                </div>
                <span class="fw-medium d-block mb-1"> Order success</span>
                <h3 class="card-title mb-2 show-success"></h3>
               
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn-icons-png.flaticon.com/512/2795/2795368.png" alt="Credit Card" class="rounded">
                  </div>
                  
                </div>
                <span>Order processing</span>
                <h3 class="card-title text-nowrap mb-1 show-processing"></h3>
                
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn.icon-icons.com/icons2/2785/PNG/512/trolley_cart_cancel_icon_177409.png" alt="Credit Card" class="rounded">
                  </div>
                  
                </div>
                <span>Order canceled</span>
                <h3 class="card-title text-nowrap mb-1 show-canceled"></h3>
               
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn-icons-png.flaticon.com/512/8922/8922324.png" alt="Credit Card" class="rounded">
                  </div>
                 
                </div>
                <span>Been shipped</span>
                <h3 class="card-title text-nowrap mb-1 show-shipped"></h3>
               
              </div>
            </div>
          </div>
            </div>
        </div>
    



      </div>


        `;
    }
}