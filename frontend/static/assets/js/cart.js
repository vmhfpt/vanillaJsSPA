function getTotalCart(arr){
  $('.show-quantity-icon').empty();
  if(arr == null){
      $('.show-quantity-icon').text(0)
  }else {
    var sum = 0;
    for(var i = 0; i < arr.length; i ++){
      sum = sum + Number(arr[i].quantity);
    }
    $('.show-quantity-icon').text( String(sum));
  }
}


getTotalCart(JSON.parse(localStorage.getItem("carts")));

function addCart(item, redirect = false){
                    
    var shopCart = JSON.parse(localStorage.getItem("carts"));
    if(shopCart == null){
        localStorage.setItem("carts", JSON.stringify([item]));
    }else {
      function checkArray(arr, id){
          for(var i = 0; i < arr.length; i ++){
            if(arr[i].id == id){
              return(true);
            }
          }
          return (false);
        }
      
        
        if(checkArray(shopCart, item.id) == true){
          var newArr = shopCart.map((value, key) => {
                if(value.id == item.id){
                  return {
                    ...value,
                    quantity : (Number((value.quantity)) + item.quantity)
                  }
                }else {
                    return (value);
                }
          });
           localStorage.setItem("carts", JSON.stringify(newArr));
        }else {
            localStorage.setItem("carts", JSON.stringify([...shopCart, item]));
        }

    }
    getTotalCart(JSON.parse(localStorage.getItem("carts")));
    if(redirect){
      window.location.replace("cart.html");
    }
}