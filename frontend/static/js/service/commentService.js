import { getDoc, deleteDoc ,updateDoc, getDocs, collection, setDoc, doc, addDoc,  query, where} from "firebase/firestore";
import  Config  from './config.js';

export default class Comment extends Config {
    constructor() {
        super();
        this.commentRef = collection(this.db, "comments");
    }
    async addComment(dataComment){
        return await addDoc(this.commentRef, { 
            content : dataComment.content,
            createdAt : dataComment.createdAt,
            email : dataComment.email,
            name : dataComment.name,
            product_id : dataComment.product_id
        }) 
        .then((data) => {
            return {
                status : 'success'
            }
        })
        .catch((error) => {

        })
    }

    async getCommentsByProductId(id){
        return await getDocs(query(this.commentRef, where("product_id", "==", id)))
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
    
}
