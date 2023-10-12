// import $ from "jquery";
// import 'bootstrap';  
//error (...).modal is not a function
import AbstractView from "../AbstractView.js";
import Category from "../../service/categoryService.js";
import Add from "./add.js";
import Edit from "./edit.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Category");
    }

    async getHtml() {
        let category = new Category();
        var idDelete = 0;
        var idUpdate = 0;
        const renderList = () => {
          category.getAllCategory().then(result => {
          //$('.loading-animation').remove();
          if(document.getElementsByClassName('loading-animation')[0]){
            document.getElementsByClassName('loading-animation')[0].remove();
          }
          
          //$('.show-table').empty();
          document.getElementsByClassName('show-table')[0].innerHTML = "";
            result.map((item, key) => {
              //$('.show-table').append(`<tr id="${item.id}">
              document.getElementsByClassName('show-table')[0].insertAdjacentHTML('beforeend',`<tr id="${item.id}">
              <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>#${(key) + 1}</strong></td>
              <td>${item.name}</td>
            
              
              <td>
                <div class="dropdown">
                  <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                  <div class="dropdown-menu">
                    <a onclick="btnEditHandle(this);" data-id="${item.id}" class="dropdown-item btn-edit-handle" href="javascript:;"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                    <a data-delete="${item.id}" onclick="confirmDelete(this);" class="dropdown-item confirm-delete" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                  </div>
                </div>
              </td>
            </tr>`);
            })
         });
        }

        renderList();


         window.confirmDelete = (thisData) => {
          var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
          myModal.toggle();
            //$('#exampleModal').modal('toggle');
            //idDelete = $(thisData).attr("data-delete");
            idDelete = thisData.dataset.delete;
         }
         window.addHandle = () => {
          
            $('.show-popup').html(Add(renderList));

            $('#basicModal').modal('toggle');
         }
        
        
         
         window.deleteItem = () => {
            category.deleteCategoryByID(idDelete).then(() => {
                $('#exampleModal').modal('toggle');
  
               // $('#exampleModalLabelCustom').text(`Delete successfully`);
                document.getElementById('exampleModalLabelCustom').innerText = "Delete successfully";
                $('#exampleModalSuccess').modal('toggle');
                //$(`#${idDelete}`).remove();
                document.getElementById(`${idDelete}`).parentNode.removeChild(document.getElementById(`${idDelete}`));
              })
         }
         
         
         window.btnEditHandle = (thisData) => {
            //idUpdate = $(thisData).attr('data-id');
            idUpdate = thisData.dataset.id;
            category.getCategoryByID(idUpdate).then((item) => {
                  //$('.name-category-edit').text(`Edit category '${item.name}'`);
                  //$('#name-category-edit').val(item.name);
                  $('.show-popup').html(Edit(item, renderList));
                  $('#basicModalEdit').modal('toggle');
              });
              
              
         }

        return `
      
    <div class="show-popup"></div>
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

        <h4 class="fw-bold py-3 mb-4">
        <span class="text-muted fw-light">Home/</span> List Category
      </h4>
      
      
      <div class="card">
  
  
     
  
  
        <h5 class="card-header">Table Basic</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>NAME</th>
                
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
        <div class="demo-inline-spacing">
         
           <a href="javascript:;" onclick="addHandle()" class=""> <button type="button" class="btn btn-success add-handle">Add category</button></a>
          
        </div>
      </div>
      
      <hr class="my-5">
        `;
    }
}