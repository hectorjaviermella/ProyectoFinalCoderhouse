/*export const generateUserErrorInfo = (product) => {
    return `* pTitle: needs to be a string, received ${product.pTitle}
      * pDescription: needs to be a string, received ${product.pDescription}
      * pCode: needs to be a string, received ${product.pCode}
      * pPrice: needs to be a string, received ${product.pPrice}
      * pStatus: needs to be a string, received ${product.pStatus}
      * pStock: needs to be a string, received ${product.pStock}
      * pCategory: needs to be a string, received ${product.pCategory}`;
    };
*/


export const addProductErrorInfo = (product) => {
  return `* pTitle: needs to be a string, received ${product.pTitle}
  * pDescription: needs to be a string, received ${product.pDescription}
  * pCode: needs to be a string, received ${product.pCode}
  * pPrice: needs to be a string, received ${product.pPrice}
  * pStatus: needs to be a string, received ${product.pStatus}
  * pStock: needs to be a string, received ${product.pStock}
  * pCategory: needs to be a string, received ${product.pCategory}`;};
  

export const CartErrorInfo = (cart,quantity) => {
  return `One or more properties were incomplete or invalid:
  * cid (Cart ID): required String, received ${cart.cid}
  * pid (Product ID): required String, received ${cart.pid}
  * quantity: required Number, received ${quantity}`
};

export const authenticationErrorInfo = () => {
  return "Access denied to the page. Authentication credentials were incorrect.";
};
