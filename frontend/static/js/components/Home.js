import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
     
        return /*html */ `
        <div class="row">
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
                <h3 class="card-title mb-2">$12,628</h3>
                <small class="text-success fw-medium"><i class="bx bx-up-arrow-alt"></i> +72.80%</small>
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
                <h3 class="card-title text-nowrap mb-1">$4,679</h3>
                <small class="text-success fw-medium"><i class="bx bx-up-arrow-alt"></i> +28.42%</small>
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
                <h3 class="card-title text-nowrap mb-1">$4,679</h3>
                <small class="text-success fw-medium"><i class="bx bx-up-arrow-alt"></i> +28.42%</small>
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
                <span>Revenue</span>
                <h3 class="card-title text-nowrap mb-1">$4,679</h3>
                <small class="text-success fw-medium"><i class="bx bx-up-arrow-alt"></i> +28.42%</small>
              </div>
            </div>
          </div>
            </div>
        </div>
    



      </div>


        `;
    }
}