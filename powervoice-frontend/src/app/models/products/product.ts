import { Category } from "../categorys/category";

export interface Product {
    id: number;
    name: string;
    productCategory: Array<Category>;
}
