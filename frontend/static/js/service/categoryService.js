import { getDoc, deleteDoc ,updateDoc, getDocs, collection, setDoc, doc, addDoc,  query, where} from "firebase/firestore";
import  Config  from './config.js';

export default class Category extends Config {
    constructor() {
        super();
        this.categoriesRef = collection(this.db, "categories");
    }
    async getAllCategory(){
       return await getDocs(collection(this.db, "categories"))
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
    async addCategory(name){
        return await addDoc(this.categoriesRef, { name : name}) 
        .then((data) => {
            return {
                status : 'success'
            }
        })
        .catch((error) => {

        })
    }
    async updateCategory(name, id){
        const docRef = doc(this.categoriesRef, id);
        return await updateDoc(docRef, {
            name : name
        });
    }
    async getCategoryByID(id){
        const docRef = doc(this.categoriesRef, id);
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
    async findCategoryByName(name) {
        return await getDocs(query(this.categoriesRef, where("name", "==", name)))
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
    async deleteCategoryByID(id){
        const docRef = doc(this.categoriesRef, id);
        return await deleteDoc(docRef);
    }
}
