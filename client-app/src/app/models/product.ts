/* We are creating an TypeScript interface, so that
   our application becomes smarter and knows that we 
   are dealing with products as an entity
   and throw errors if we make typos in the products
   attributes and so on... 
*/

export interface Product {
  
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  brand: string;
  quantityInStock?: number;

}
