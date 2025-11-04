import React, { use } from 'react'
import Products from './Products';

const LatestProducts = ({latestProductPromise}) => {

    const products = use(latestProductPromise);
    console.log(products);
    

  return (
    <div className='w-11/12 mx-auto'>
        <h2 className='text-4xl text-center font-bold text-black mb-4'>Latest <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-violet-500'> Product</span></h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
            {
            products.map(product => <Products key={product._id} product={product}></Products> )
        }
        </div>
        
    </div>
  )
}

export default LatestProducts