import { Category } from '../categorys/category';
import { Product } from '../products/product';
import { EStatusFeatures } from '../status-features/e-status-features'
import { User } from '../users/user';

export interface Feature {
id: number;
userId: number;
user: User;
viewsAmount: number;
category: Category;
product: Product;
categoryId: number;
productId: number;
report: boolean;
status: EStatusFeatures;
publishDate:string;
title:string;
titleUpdate: string;
descriptionUpdate: string;
description:string;
likes:number;
}