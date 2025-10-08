import { Size } from "@/seed/seed";

export interface Product {
    id: string;
    description: string;
    images?: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    // type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}


export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: Size
    image: string;
}

export interface ProductImage{
    id: number;
    url: string;
    productId: string;
}

export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';
