import React, { useEffect } from 'react';
import SimilarProductCard from './SimilarProductCard';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllProducts } from '../../../State/Customer/ProductSlice';

const SimilarProduct = ({ categoryId }: any) => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store);

  useEffect(() => {
    if (categoryId) {
      const category = categoryId
      dispatch(fetchAllProducts({ category }));
      console.log(category)
    }
  }, [categoryId, dispatch]);

  return (
    <div className="grid items-center lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4 gap-y-8 justify-center">
      {product.products.length > 0 ? (
        product.products.map((product, index) => (
          <SimilarProductCard key={index} product={product} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">No similar products found.</p>
      )}
    </div>
  );
};


export default SimilarProduct;
