import Category from "../../service/categoryService.js";
export default function Add(renderList){
    let category = new Category();
    window.submitAdd = (thisData) => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`);
      //let name = ($('#name-category').val());
      let name = document.getElementById('name-category').value ;
      category.addCategory(name).then(result => {
        renderList();
        $('#exampleModalLabelCustom').text(`Add category "${name}" success `);
        $('#exampleModalSuccess').modal('toggle');
        $('#basicModal').modal('toggle');
      });
      
     
   }
    return (`
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
            <button onclick="submitAdd(this);" type="button" class="btn btn-primary submit-add">Add new</button>
          </div>
        </div>
      </div>
    </div>`);
}