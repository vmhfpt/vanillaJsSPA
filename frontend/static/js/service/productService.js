import { getDoc, deleteDoc ,updateDoc, getDocs, collection, setDoc, doc, addDoc,  query, where, orderBy, limit} from "firebase/firestore";
import {  ref , uploadBytes, uploadBytesResumable, getDownloadURL , deleteObject} from "firebase/storage";

import  Config  from './config.js';
import Category from './categoryService.js';
import Comment from './commentService.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default class Product extends Config {
    constructor() {
        super();
        this.productRef = collection(this.db, "products");
    }

   async getProductByPrice(object){
        
        return await getDocs(this.productRef)
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
                let filteredDocs = dataItem.filter((doc) => {
                    let price = Number(doc.price_sale);
                    return price >= object.min && price <= object.max;
                  });
                return (filteredDocs);
            }).catch((error) => {
                console.log(error);
            })
    }
   async getProductBySearch(keySearch){
        let startAtName = keySearch;
        let endAtName = startAtName + '\uf8ff';
        return await getDocs(query(this.productRef,where('name', '>=', startAtName), where('name', '<=', endAtName)))
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
            return dataItem;
        }).catch((error) => {
            console.log(error);
        })
    }
   async getProductByCategoryID(id){
        return await getDocs(query(this.productRef, where("category_id", "==", id)))
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
            return dataItem;
        }).catch((error) => {
            console.log(error);
        })
    }
    async sortProduct(type){
        let querySort = true;
        if(type == '1'){
            querySort = query(this.productRef, orderBy("name"));
        }else if(type == '2'){
            querySort = query(this.productRef, orderBy("price_sale", "desc"));
        }else if(type == '3'){
            querySort = query(this.productRef, orderBy("price_sale", "asc"));

        }
        return await getDocs(querySort)
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
           return(dataItem);
        }).catch((error) => {
            console.log(error);
        })
    }
    async getProductLastest(){
        return  await getDocs(query(this.productRef, orderBy(firebase.firestore.FieldPath.documentId()), limit(3)))
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
           return(dataItem);
        }).catch((error) => {
            console.log(error);
        })
    }
    async getAllProduct(){
        return await getDocs(this.productRef)
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
    async insertProduct(img, dataProduct){
        //console.log(img, dataProduct);
        return await addDoc(this.productRef, { 
            category_id : dataProduct.category,
            content : dataProduct.content,
            description : dataProduct.description,
            image : img,
            name : dataProduct.name,
            price : dataProduct.price,
            price_sale : dataProduct.priceSale
        }) 
        .then((data) => {
           
            location.reload();
        })
        .catch((error) => {

        })
    }
    async uploadFile(file, dataProduct){
        //return true;
        $('.progress').removeClass('d-none');
       
        const spaceRef = ref(this.storage, `products/${Math.floor(100000 + Math.random() * 900000)}`);
        const uploadTask = uploadBytesResumable(spaceRef, file);
        return uploadTask.on('state_changed', 
        (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            $('.progress-bar-animated').css("width", `${progress}%`)
            
        }, 
        (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                  alert("User doesn't have permission to access the object");
                  break;
                case 'storage/canceled':
                  alert("User canceled the upload");
                  break;
                case 'storage/unknown':
                  alert("Unknown error occurred, inspect error.serverResponse");
                  break;
              }
        }, 
        () => {
           
            return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log('File available at', downloadURL);
             return this.insertProduct(downloadURL, dataProduct);
            });
        }
        );

    }
    async productDeleteByID(id){
        const docRef = doc(this.productRef, id);
        return await getDoc(docRef)
        .then((data) => {
             const nameImage = data.data().image;
             const deleteRef = ref(this.storage,nameImage );
             Promise.all([
                deleteDoc(docRef),
                deleteObject(deleteRef)
            ]).then(([v1, v2]) => {
               return {
                 status : "delete success"
               }
            }).catch((error) => {
               console.log(error);
            });
            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async productGetByID(id){
        const docRef = doc(this.productRef, id);
        return await getDoc(docRef)
        .then((data) => {
            return {
                id : id,
                ...data.data()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    async updateProduct(data, file){
        const docRef = doc(this.productRef, data.id);
        // return await updateDoc(docRef, {
        //     name : name
        // });
       // console.log(data, file)
        if(file == false){
           // const docRef = doc(this.productRef, data.id);
            return await updateDoc(docRef, {
                category_id : data.category,
                content : data.content,
                description : data.description,
                name : data.name,
                price : data.price,
                price_sale : data.priceSale
            });
        }else {
             
        }
    }
    async getDetailProduct(id){
        const docRef = doc(this.productRef, id);
        const querySnapshot = await getDoc(docRef);
        let product = (querySnapshot.data())
        const category = new Category();
        const comment = new Comment();
        const categorySnapshot = await getDoc(doc(category.categoriesRef, product.category_id ));
        if (categorySnapshot.exists()) {
            product.category = categorySnapshot.data();
        } else {
            product.category = null;
        }
        
        product = {
            ...product,
            category : {
                id : product.category_id,
                name : product.category.name
            }
        }

        return await Promise.all([
            getDocs(query(this.productRef, where("category_id", "==", product.category_id), limit(4))),
            comment.getCommentsByProductId(id)
        ])
        .then(([data, dataComments]) => {
         
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
            return {
                product,
                productSuggest : dataItem,
                comments : dataComments
            }
        })
        
    }
    
}

