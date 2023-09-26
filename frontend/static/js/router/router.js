import Home from "../components/Home.js";
import Product from "../components/Product/Product.js";
import Category from "../components/Category/Category.js";
import Order from "../components/Order/Order.js";
import DetailOrder from "../components/Order/DetailOrder.js";
import Statistic from "../components/Statistic.js";

export var  routes = [
        { path: "/", view: Home },
        { path: "/order/:id", view: DetailOrder },
        { path: "/product", view: Product },
        { path: "/category", view: Category } ,
        { path: "/order", view: Order },
        { path: "/statistic", view: Statistic },
       
    ];