import AbstractView from "../AbstractView.js";
import Product from "../../service/productService.js"
import Category from "../../service/categoryService.js"
import Add from './add.js';
import Edit from './edit.js';
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Product");
    }

    async getHtml() {
      let category = new Category();
      let product = new Product();
      var idDelete = 0;
      var idUpdate = 0;
      
        const handlePaginate = (data) => {
          
          let template = "";
           for(let i = 1; i <= data.total_page; i ++){
                template = template + `  <li onclick="changePage(this)" data-page="${i}" class="page-item ${i == data.page_current ? `active` : ``}">
                <a class="page-link" href="javascript:void(0);" ">${i}</a>
              </li>`;
            }
           let append = `<nav aria-label="Page navigation">
           <ul class="pagination">
                ${data.prev_page ? ` <li onclick="changePage(this)" data-page="${data.prev_page}" class="page-item prev">
                <a class="page-link" href="javascript:void(0);"  ><i class="tf-icon bx bx-chevron-left"></i></a>
              </li>` : ``}
              ${template}
               ${data.next_page ? `<li onclick="changePage(this)" data-page="${data.next_page}" class="page-item next">
               <a class="page-link" href="javascript:void(0);"  ><i class="tf-icon bx bx-chevron-right"></i></a>
             </li>` : ``}
           </ul>
             </nav>
           `;
           $('.show-pagination').html(append);
        }
        const renderProducts = (page = 1) => {
          
           product.getProductAndPaginate(page).then((data) => {
            $('.show-table').empty();
            $('.loading-animation').remove();
              data.dataItem.map((item, key) => {
                 
                  
                  $('.show-table').append(`<tr id="${item.id}">
                <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>#${(key) + 1}</strong></td>
                <td>${item.name}</td>
                <td><img class="object-fit-cover" src="${item.image}" width="120" height="150" /> </td>
                <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price_sale)}</td>
              
                
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                    <div class="dropdown-menu">
                      <a onclick="editHandle(this);" data-edit="${item.id}" class="dropdown-item edit-handle" href="javascript:;"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                      <a onclick="confirmDelete(this);" data-delete="${item.id}" class="dropdown-item confirm-delete" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                    </div>
                  </div>
                </td>
              </tr>`);
              })
             handlePaginate(data.pagination);
           })
        }
        renderProducts(1);
        

        window.changePage = (thisData) => {
          $(thisData).prop('disabled', true);
          $(thisData).empty();
          $(thisData).append(` <li   class="page-item active">
          <a class="page-link" href="javascript:void(0);" ">  <div class="spinner-border spinner-border-sm text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div></a>
        </li>`);
          let page = Number(($(thisData).attr("data-page")));
          renderProducts(page);
        }

         window.addHandle = () => {
            $('.show-popup-edit').html(Add);
            $('#basicModal').modal('toggle');
         }
         
         window.confirmDelete = (thisData) => {
            $('#exampleModal').modal('toggle');
            idDelete = $(thisData).attr("data-delete");
         }
         window.editHandle = (thisData) => {
           idUpdate = $(thisData).attr("data-edit");
            product.productGetByID(idUpdate).then((item) => {
                $('.show-popup-edit').html(Edit(item, renderProducts));
                $('#basicModalUpdate').modal('toggle');
            })
         }
        
       
       
         window.deleteItem = () => {
            product.productDeleteByID(idDelete).then((data) => {
              $('#exampleModal').modal('toggle');

              $('#exampleModalLabelCustom').text(`Delete successfully`);
              $('#exampleModalSuccess').modal('toggle');
              $(`#${idDelete}`).remove();
            })
         }
       
      
         function readURL(input) {
            if (input.files && input.files[0]) {
    
                
                var reader = new FileReader();
                reader.onload = function(e) {
                    $(".img-fluid").attr("src", e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        window.customFile = (thisData) => {
          var fileName = $(thisData).val().split("\\").pop();
          readURL(thisData);
        }
                 
        return `
        <div class="show-popup-edit"></div>
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
              <button onclick="deleteItem();"  type="button" class="btn btn-primary delete-item">Ok</button>
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
                
                
        <h4 class="fw-bold py-3 mb-4">
          <span class="text-muted fw-light">Home/</span> List Product
        </h4>
        
        
        <div class="card">
          <h5 class="card-header">Table Basic</h5>
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>NAME</th>
                  <th>IMAGE</th>
                  <th>PRICE</th>
                  
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
    
        <div class="my-3">
          <div class="show-pagination">
       
          </div>

          <div class="demo-inline-spacing">
           
             <a onclick="addHandle();" href="javascript:;" class="add-handle"> <button type="button" class="btn btn-success">Add product</button></a>
             
          </div>
        </div>
        
        <hr class="my-5">
        
           
                
        `;
    }
}