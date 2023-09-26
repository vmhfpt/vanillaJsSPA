import Order from "../../service/orderService.js";
import axios from 'axios';
export default function  DetailUser(item, reLoad){
   let order = new Order();
   axios.get("https://provinces.open-api.vn/api/").then(function (response) {         
        response.data.map((item, key) => {
            $('#show-provinces').append(`<option value="${item.code}" > ${item.name}</option>`)
        })
   })
   window.showProvince = (thisData) => {
           
        $('#show-wards').empty();
        $('#show-wards').append(`<option value="0" class="">-- Select ward -- </option>`);
        $('#show-districts').empty();
        $('#show-districts').append(`<option value="0" class="">-- Select district -- </option>`);
        if($(thisData).val() == '0'){
            return true;
        }

        axios.get(`https://provinces.open-api.vn/api/p/${$(thisData).val()}/?depth=2`).then(function (response) {
            response.data.districts.map((item, key) => {
                    
            $('#show-districts').append(`<option value="${item.code}" > ${item.name}</option>`)
        })
            
        })
    }



    window.showDistrict = (thisData) => {
        $('#show-wards').empty();
        $('#show-wards').append(`<option value="0" class="">-- Select ward -- </option>`);
        if($(thisData).val() == '0'){
            return true;
        }
        
        axios.get(`https://provinces.open-api.vn/api/d/${$(thisData).val()}/?depth=2`).then(function (response) {
        
            response.data.wards.map((item, key) => {
            
                $('#show-wards').append(`<option value="${item.code}" > ${item.name}</option>`)
            })
            
        })
    }

    window.submitUpdate = (thisData) => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`);
        
        let name = $('#name-order').val();
        let phoneNumber = $('#phone-number-order').val();
        let email = $('#email-order').val();
        let address = $('#address-order').val();
        
        if($('#show-provinces').val() != '0' && $('#show-districts').val() != '0' && $('#show-wards').val() != '0'){
          let province = $("#show-provinces").children("option").filter(":selected").text();
          let district = $("#show-districts").children("option").filter(":selected").text();
          let ward = $("#show-wards").children("option").filter(":selected").text();
          address = `${$('#address-full').val()}, ${ward}, ${district}, ${province}`;
        }
        let dataUser = {
          id : item.id,
          name,
          phoneNumber,
          email,
          address,
        }
    
        order.updateOrderById(dataUser).then((data) => {
          reLoad();
          $('#exampleModalLabelCustom').text('Updated successfully');
          $('#exampleModalSuccess').modal('toggle');
          $('#basicModalEdit').modal('toggle');
        })
     }

    return `<div class="modal fade " id="basicModalEdit" tabindex="-1"  aria-modal="true" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title name-order-edit" >Edit information of order "${item.name}"</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col mb-6">
              <label for="nameBasic" class="form-label">Name</label>
              <input value="${item.name}" type="text" id="name-order" class="form-control" placeholder="Enter Name">
            </div>

            <div class="col mb-6">
              <label for="nameBasic" class="form-label">Phone Number</label>
              <input value="${item.phoneNumber}" type="number" id="phone-number-order" class="form-control" placeholder="Enter phone number">
            </div>
          </div>
          <div  class="row">
              <div class="col mb-12">
              <label for="nameBasic" class="form-label">Email</label>
              <input value="${item.email}" type="email" id="email-order" class="form-control" placeholder="Enter Email">
            </div>
          </div>
          <div  class="row">
          <div class="col mb-12">
          <label for="nameBasic" class="form-label">Date ordered</label>
          <input value="${item.createdAt}" type="text" id="date-order" class="form-control" placeholder="" readonly>
        </div>
      </div>
          <div  class="row">
          <div class="col mb-12">
          <label for="nameBasic" class="form-label">Address current</label>
          <input value="${item.address}" type="text" id="address-order" class="form-control" placeholder="" readonly>
        </div>
      </div>

        <div class="row mt-3">
             <div class="col mb-12">
                  <label for="nameBasic" class="form-label">New address</label>
              </div>
              <div class="col-12 mb-12">
                  <label for="defaultSelect" class="form-label">Select province</label>
                  <select onchange="showProvince(this);" id="show-provinces" class="form-select">
                    <option value="0">-- Select province --</option>
                  
                  </select>
              </div>
              <div class="col-12 mb-12">
                  <label for="defaultSelect" class="form-label">select district</label>
                  <select onchange="showDistrict(this);" id="show-districts" class="form-select">
                    <option value="0">-- Select district --</option>
                   
                  </select>
              </div>
              <div class="col-12 mb-12">
                  <label for="defaultSelect" class="form-label">select ward</label>
                  <select id="show-wards" class="form-select">
                    <option value="0">-- Select ward --</option>
                    
                  </select>
              </div>
        </div>
        <div  class="row">
          <div class="col mb-12">
          <label for="nameBasic" class="form-label">Address</label>
          <input type="text" id="address-full" class="form-control" placeholder="Enter address house number, road name ..." >
        </div>
      </div>

          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
          <button onclick="submitUpdate(this);" type="button" class="btn btn-primary submit-update">Update</button>
        </div>
      </div>
    </div>
  </div>`;
}