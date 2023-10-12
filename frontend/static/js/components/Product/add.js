import Category from "../../service/categoryService.js"
import Product from "../../service/productService.js"
import { validateName, validatePrice, validateContent } from "../../service/validateService.js";
export default function Add(){
  var checkName = false, checkPrice = false, checkPriceSale = false, checkContent = false, checkDescription = false;
  let category = new Category();
  let product = new Product();
  category.getAllCategory()
  .then((data) => {
      
      data.map((value) => {
          $('#category_id').append(`<option value="${value.id}"> ${value.name}</option>`);

      })
  })
  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-bs4.min.js', function() {
      $('#description, #content').summernote();
  });
    window.submitAdd = (thisData) => {
       if(checkName && checkContent && checkDescription && checkPrice && checkPriceSale){
       
            $(thisData).prop('disabled', true);
            $(thisData).empty();
            $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>`);
          let file = $("#customFile")[0].files[0];
            
            
            let name = $("#name").val();
            let price = Number($("#price").val());
            let category = $("#category_id").val();
            let priceSale = Number($("#price_sale").val());
            let description = $("#description").val();
            let content = $("#content").val();
            let dataProduct = {
                name,
                price,
                category,
                priceSale,
                description,
                content
            }
            product.uploadFile(file, dataProduct);
    }
  }
  window.handleInputName = (thisData) => {
    checkName = validateName({target: thisData, name : "Name"}, $('.error-name') );
  } 
  window.handleInputPrice = (thisData) => {
    checkPrice = validatePrice(thisData, $('.error-price') );
  } 
  window.handleInputPriceSale = (thisData) => {
    checkPriceSale = validatePrice(thisData, $('.error-price-sale') );
  }

  setTimeout(function (){
    $('#content').on('summernote.keyup', function() {
      checkContent = validateContent(this, $('.error-content') );
    });
    $('#description').on('summernote.keyup', function() {
      checkDescription = validateContent(this, $('.error-description') );
    });
  }, 1000);
    return ( /*html */`<div class="modal fade " id="basicModal" tabindex="-1"  aria-modal="true" role="dialog">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Add product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          

          <div class="row">
            <div class="col-6">
              <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="basic-default-name">Name</label>
                  <div class="col-sm-10">
                    <input oninput="handleInputName(this)" type="text" class="form-control" id="name" placeholder="Enter name ...">
                  </div>
                  <span class="text-danger error-name" >* Name is required</span>
                </div>
              
  
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="basic-default-name">Category</label>
                  <div class="col-sm-10">
                      <select name="" id="category_id" class="form-control">
                          
                      </select>
                  </div>
                </div>
            </div>
            <div class="col-6">
              <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="basic-default-name">Price</label>
                  <div class="col-sm-10">
                    <input oninput="handleInputPrice(this)" type="number" class="form-control" id="price" placeholder="Enter price ...">
                  </div>
                  <span class="text-danger error-price" >* Price is required</span>
                </div>
  
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="basic-default-name">Price sale</label>
                  <div class="col-sm-10">
                      <input oninput="handleInputPriceSale(this)" type="number" class="form-control" id="price_sale" placeholder="Enter price sale...">
                  </div>
                  <span class="text-danger error-price-sale" >* Price sale is required</span>
                </div>
            </div>
            <div class="col-12">
              <div class="row mb-3">
                  <label class="col-sm-12 col-form-label" for="basic-default-name">Description</label>
                  <div class="col-sm-12">
                      <textarea class="form-control" name="" id="description" cols="30" rows="10"></textarea>
                  </div>
                  <span class="text-danger error-description" >* Description is required</span>
                </div>
            </div>
            <div class="col-12">
              <div class="row mb-3">
                  <label class="col-sm-12 col-form-label" for="basic-default-name">Content</label>
                  <div class="col-sm-12">
                      <textarea class="form-control" name="" id="content" cols="30" rows="10"></textarea>
                  </div>
                  <span class="text-danger error-content" >* Content is required</span>
                </div>
            </div>
        </div>

        <div class="row mb-3">
          <label class="col-sm-1 col-form-label" for="basic-default-name">Image</label>
          <div class="col-sm-11">
              <div>
                  <label for="formFileDisabled" class="form-label">Upload image for product</label>
                  <input onchange="customFile(this)" class="form-control" type="file" id="customFile" >
                </div>
          </div>
          
        </div>
        <div class="row mb-3">
          <div class="col-sm-1"></div>
          <div class="col-sm-2">
              <img src="https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg" alt="" class="w-100 img-fluid">
          </div>
          <div class="col-12 mt-4">
              <div class="row">
                  <div class="col-sm-1"></div>
                  <div class="col-4">
                      <div class="progress d-none">
                          <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: 0%"  aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                  </div>
              </div>
          
          </div>
        </div>

          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
          <button onclick="submitAdd(this)" type="button" class="btn btn-primary submit-add">Add new</button>
        </div>
      </div>
    </div>
  </div>`);
}