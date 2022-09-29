export interface AddProduct {
  productName: string;
  productDescription: string;
  productPrice: number;
  productDiscount?: number;
  productImg: string;
  category: string;
  brand?: string;
  productSize: string;
  productColor?: string;
  productQuantity: number;
}
