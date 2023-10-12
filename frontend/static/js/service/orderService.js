import { getDoc, deleteDoc ,updateDoc, getDocs, collection,  doc, addDoc,  query, where, orderBy} from "firebase/firestore";
//import {  ref , uploadBytes, uploadBytesResumable, getDownloadURL , deleteObject} from "firebase/storage";

import  Config  from './config.js';

export default class Order extends Config {
    constructor() {
        super();
        this.orderRef = collection(this.db, "orders");
        this.orderDetailRef = collection(this.db, "order_details");
        this.productRef = collection(this.db, "products");
    }

    async deleteOrderDetail(id){
        const docRef = doc(this.orderDetailRef, id);
        return await deleteDoc(docRef);
    }
   async insertOrderDetail(data){
        return await addDoc(this.orderDetailRef, {
            order_id : data.orderID,
            price : data.price,
            product_id : data.productId,
            quantity : Number(data.quantity)
        }).then(() => {
            return {
                status : "success"
            }
        })
    }
   async getOrderById(id){
    const docRef = doc(this.orderRef, id);
        return await Promise.all([
            getDoc(docRef),
            getDocs(query(this.orderDetailRef, where("order_id", "==", id)))
        ]).then(async ([order, orderDetail]) => {
            var dataItem = [];
            for (const docs of orderDetail.docs) {
                 const product = docs.data();
                 product.id = docs.id;
                 const productSnapshot = await getDoc(doc(this.productRef, product.product_id));
                
                if (productSnapshot.exists()) {
                    product.dataProduct = {
                        name : productSnapshot.data().name,
                        image : productSnapshot.data().image
                    }
                } else {
                    product.dataProduct = null;
                }
                dataItem.push(product);
            }
            return {
                order : order.data(),
                orderDetail : dataItem
            }
          
        })
    }
    async updateStateOrderById(data){
        const docRef =  doc(this.orderRef, data.id);
        return await updateDoc(docRef, {
            status : data.status
        });
    }
    async updateOrderById(data){
        const docRef = doc(this.orderRef, data.id);
        return await updateDoc(docRef, {
            address : data.address,
            email : data.email,
            phone_number : data.phoneNumber,
            name : data.name
        });
    }
   async getStatisticOrder(){
            return await Promise.all([
                getDocs(query(this.orderRef, orderBy("createdAt", "desc"))),
                getDocs(this.orderDetailRef)
            ])
            .then(async ([dataOrder, dataOrderDetail]) => {
               var dataItemOrder = [];
               dataOrder.forEach((doc) => {
                  dataItemOrder = [
                     ...dataItemOrder,
                     {
                        id : doc.id,
                        ...doc.data()
                     }
                  ]
                });

                var dataItem = [];
                let groupedData = {};

                dataOrderDetail.forEach((docs) => {
                    let key = docs.data().product_id;
                    if(!groupedData[key]){
                        groupedData[key] = Number(docs.data().quantity);
                    }else {
                        groupedData[key] = Number(groupedData[key]) +  Number(docs.data().quantity)
                    }
                    
                  });
                  
                  let arr = Object.entries(groupedData).map(([key, value]) => ({ productID :key, quantity : value }));
                  for (const docs of arr) {
                        const productSnapshot = await getDoc(doc(this.productRef, docs.productID));
                        
                        if (productSnapshot.exists()) {
                            dataItem.push({
                                name : productSnapshot.data().name,
                                quantity : docs.quantity
                            });
                        } 
                   
                  }
                  return {
                    dataOrder : dataItemOrder,
                    dataOrderDetail : dataItem
                  }
            })
            .catch(() => {
                alert('something went error');
            }) 
    }
    async getAllOrder() {
        return await getDocs(this.orderRef)
        .then((data) => {
            var dataItem = [];
            data.forEach((doc) => {
              dataItem = [
                 ...dataItem,
                 {
                    id : doc.id,
                    ...doc.data()
                 }
              ]
            });
            return (dataItem);
        }).catch((error) => {
            console.log(error);
        })
    }
    async insertOrderAndGetLastID(dataUser, dataCart){
    
        return await addDoc(this.orderRef, { 
            address : dataUser.fullAddress,
            createdAt : Timestamp.fromDate(new Date()),
            email : dataUser.email,
            name : dataUser.name,
            phone_number : dataUser.phoneNumber,
            status : 6
        }) 
        .then(async (result) => {
           
            let promises = dataCart.map(data => addDoc(this.orderDetailRef, {
                order_id : result.id,
                price : data.price,
                product_id : data.id,
                quantity : data.quantity
            }));
           return  await Promise.all(promises)
            .then(() => {
                return {
                    status : 'success',
                }
            })
            .catch((error) => {
              console.error("Error adding documents: ", error);
            });
        })
        .catch((error) => {
            console.error("Error adding documents: ", error);
        })
    }
    
}

/**
 import { collection, getDocs, doc, getDoc } from "firebase/firestore";

async function getProducts() {
    const products = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    for (const doc of querySnapshot.docs) {
        const product = doc.data();
        const categorySnapshot = await getDoc(doc(db, "categories", product.categoryId));
        if (categorySnapshot.exists()) {
            product.category = categorySnapshot.data();
        } else {
            product.category = null;
        }
        products.push(product);
    }
    console.log(products);
}

getProducts();
 */