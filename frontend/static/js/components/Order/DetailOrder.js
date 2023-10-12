import AbstractView from "../AbstractView.js";
import Order from "../../service/orderService.js";
import Product from "../../service/productService.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.orderID = params.id;
        this.setTitle("detail order");
    }

    async getHtml() {
        let order = new Order();
        let product = new Product();
        product.getAllProduct().then((data) => {
            
            
            data.map((item) => {
                $('#product-select').append(`<option value="${item.id}/${item.price_sale}">${item.name} -- ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price_sale)} </option>`)
            })
        })
        const renderList = () => {
            order.getOrderById(this.orderID).then(data => {
                console.log(data.orderDetail);
                let total = 0;
                $('.title-order').empty();
                $('.title-order').html(` <span class="text-muted fw-light ">Home/</span> Detail order "${data.order.name}"`)
                $('.loading-animation').remove();
                $('.show-table').empty();
                $('.show-add-product').removeClass('d-none');
                data.orderDetail.map((item, key) => {
                  total = total + (Number(item.price) * Number(item.quantity))
                  
                  $('.show-table').append(`<tr id="${item.id}">
                <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>#${(key) + 1}</strong></td>
                <td>${item.dataProduct.name}</td>
                <td><img src="${item.dataProduct.image}" width="120" height="120" /></td>
                <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                <td> &times ${item.quantity}</td>
                <td> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(item.price) * Number(item.quantity))}</td>
                
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                    <div class="dropdown-menu">
                      
                      <a data-delete="${item.id}" onclick="confirmDelete(this);" class="dropdown-item confirm-delete" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                    </div>
                  </div>
                </td>
              </tr>`);
              })
              $('.show-total-order').html(`<b>Total :</b> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}`)
           });
          }
          window.addProductToOrder = () => {
            let dataProduct = $('#product-select').val();
            let quantity = $('#quantity-input').val();
            let parts = dataProduct.split('/');

            let productId = parts[0];
            let price = parts[1];
            let dataProdctAdd = {
                productId,
                price,
                quantity,
                orderID : this.orderID
            }
            //console.log(dataProdctAdd);
            order.insertOrderDetail(dataProdctAdd).then((data) => {
               if(data.status == "success"){
                renderList();
                  $('#exampleModalLabelCustom').text(`Add product to order success !`);
                  $('#exampleModalSuccess').modal('toggle');
                  
               }
            })
          }

          window.confirmDelete = (thisData) => {
            let id = ($(thisData).attr('data-delete'));
            order.deleteOrderDetail(id).then(() => {
                $(`#${id}`).remove();
                $('#exampleModalLabelCustom').text(`Delete success !`);
                $('#exampleModalSuccess').modal('toggle');
            })
          }
  
          renderList();
        return `
           
        <div class="modal fade " id="basicModalEdit" tabindex="-1"  aria-modal="true" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title name-category-edit" >Edit category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col mb-3">
                  <label for="nameBasic" class="form-label">Name</label>
                  <input type="text" id="name-category-edit" class="form-control" placeholder="Enter Name">
                </div>
              </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
              <button onclick="submitUpdate();" type="button" class="btn btn-primary submit-update">Update</button>
            </div>
          </div>
        </div>
      </div>
  
  
  
      <div class="modal fade " id="basicModal" tabindex="-1"  aria-modal="true" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel1">Add category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col mb-3">
                  <label for="nameBasic" class="form-label">Name</label>
                  <input type="text" id="name-category" class="form-control" placeholder="Enter Name">
                </div>
              </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
              <button onclick="submitAdd();" type="button" class="btn btn-primary submit-add">Add new</button>
            </div>
          </div>
        </div>
      </div>
  
  
  
  
  
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Are you sure ?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onclick="deleteItem();" type="button" class="btn btn-primary delete-item">Ok</button>
            </div>
          </div>
        </div>
      </div>
  
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
  
          <h4 class="fw-bold py-3 mb-4 title-order">
          Loading ...
        </h4>
        
        
        <div class="card">
    
    
       
    
    
          <h5 class="card-header">Table Basic</h5>
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>PRODUCT</th>
                  <th>IMAGE</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>

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
        <div class="my-4">
           <div class="row">
              <div class="col-12">
                 <span class="show-total-order" > </span>
              </div>
             
           </div>
        </div>
        <div class="my-3 d-none show-add-product">
          <div class="demo-inline-spacing">
           
             <div class="row">
                <div class="col-3">
                    <select id="product-select" class="form-select">
                        <option value="0" >-- Select product</option>
                      
                    </select>
                </div>
                <div class="col-3">
                  <input id="quantity-input" class="form-control" type="number" placeholder="Enter quantity">
                </div>
                <div class="col-3">
                  <a href="javascript:;" onclick="addProductToOrder();" class=""> <button type="button" class="btn btn-success add-handle">Add product</button></a>
                </div>
             </div>
            
          </div>
        </div>
        
        <hr class="my-5">
          
        `;
    }
}