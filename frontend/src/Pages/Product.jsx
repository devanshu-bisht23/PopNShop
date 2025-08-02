import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

// grab all product data using context.
const Product = () => {

  const {all_product} = useContext(ShopContext) // will give the entire product
  const {productId} = useParams(); // another react hook 

  const product = all_product.find((e)=> e.id === Number(productId)) // product stored in product for us to displpay it later

  //now we have to display the product in our page
  return (
    <div> 
       <Breadcrum product = {product}/>
       <ProductDisplay product = {product} />
       <DescriptionBox/>
       <RelatedProducts/>
    </div>
  )
}

export default Product
