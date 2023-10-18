import AbstractView from "../AbstractView.js";
import Order from "../../service/orderService.js";
import axios from 'axios';
import DetailUser from "./DetailUser.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("list order");
    }

    async getHtml() {
        var idUpdate = 0;
        let order = new Order();

        function convertDate(date){
           date = date.toDate();

          let year = date.getFullYear();
          let month = date.getMonth() + 1; 
          let day = date.getDate();
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let seconds = date.getSeconds();
          month = month < 10 ? '0' + month : month;
          day = day < 10 ? '0' + day : day;
          hours = hours < 10 ? '0' + hours : hours;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          return(formattedDate);
        }
        function loadAllOrder(){
         
            order.getAllOrder().then((data) => {
                $('.loading-animation').remove();
                $('.show-table').empty();
                
                  data.map((item, key) => {
                    
                      
                      $('.show-table').append(`<tr id="${item.id}">
                    <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>#${(key) + 1}</strong></td>
                    <td>${item.name}</td>
                    <td>${item.phone_number}</td>
                    <td><select onchange="onChangeStatusOrder(this);" data-id="${item.id}" class="form-select form-select-sm w-2  ">
                    <option value="6" ${item.status == '6' ? 'selected' : ''}>On hold</option>
                    <option value="5"  ${item.status == '5' ? 'selected' : ''}>Processing</option>
                    <option value="4"  ${item.status == '4' ? 'selected' : ''}>Been Shipped</option>
                    <option value="3"  ${item.status == '3' ? 'selected' : ''}>Success</option>
                    <option value="2"  ${item.status == '2' ? 'selected' : ''}>Cancelled</option>
                  </select></td>
                  
                    
                    <td>
                      <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item btn-edit-handle" href="/order/${item.id}" data-link><i class="prevent-click fa fa-eye mx-1" aria-hidden="true"></i> View Order</a>
                          <a onclick="detailUser(this);" data-created="${convertDate(item.createdAt)}" data-phone="${item.phone_number}" data-email="${item.email}" data-address="${item.address}" data-name="${item.name}" data-id="${item.id}" class="dropdown-item btn-edit-handle" href="javascript:;"><i class="bx bx-edit-alt me-1"></i> Detail User</a>
                         
                        </div>
                      </div>
                    </td>
                  </tr>`);
                  })
            })
        }
        loadAllOrder();


        window.detailUser = (thisData) => {
         
          let id = $(thisData).attr('data-id');
          idUpdate = id;
          let name = $(thisData).attr('data-name');
          let phoneNumber = $(thisData).attr('data-phone');
          let email = $(thisData).attr('data-email');
          let address = $(thisData).attr('data-address');
          let createdAt = ($(thisData).attr('data-created'));
       
          let dataUserEdit = {
            id ,
            name,
            phoneNumber,
            email,
            address ,
            createdAt
          }
          $('.show-popup').html(DetailUser(dataUserEdit,loadAllOrder));
          $('#basicModalEdit').modal('toggle');
        }

        
      


       window.onChangeStatusOrder = (thisData) => {
     
        
          let dataStatus ={
              id : $(thisData).attr('data-id'),
              status : $(thisData).val()
          }
          order.updateStateOrderById(dataStatus).then(() => {
            $('#exampleModalLabelCustom').text('Updated successfully');
             $('#exampleModalSuccess').modal('toggle');
          })
        
       }
        return /*html */`
        <div class="show-popup"> </div>
        <div class="modal fade" id="exampleModalSuccess" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabelCustom">Delete successfully</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  
            </div>
          </div>
        </div>
      </div>
  
        

        <h4 class="fw-bold py-3 mb-4">
        <span class="text-muted fw-light">Home/</span> List Order
      </h4>
      
      
      <div class="card">
  
        <h5 class="card-header">Table Basic</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>NAME</th>
                <th>PHONE NUMBER</th>
                <th>STATUS</th>
                
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0 show-table">
            
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
            </tbody>
          </table>
        </div>
      </div>
        `;
    }
}