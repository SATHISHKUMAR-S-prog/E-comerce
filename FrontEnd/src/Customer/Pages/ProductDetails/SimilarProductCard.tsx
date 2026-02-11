import React from 'react';
import { Favorite } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../Types/ProductType';

const SimilarProductCard = ({ product }:{product: Product}) => {
  // Safely access product properties
  const title = product?.title || 'No Title';
  const category = product?.category?.name || 'No Category'; // Adjust based on the actual structure
  const image = product?.images?.[0] || 'https://via.placeholder.com/150';
  const sellingPrice = product?.sellingPrice || '0';
  const mrpPrice = product?.mrpPrice || '0';
  const discountPercent = product?.discountPercent || '0';
  const navigate = useNavigate()

  return (
    <div className="w-full items-center flex flex-col group px-4 relative bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 justify-center" onClick={() => navigate( `/product-details/${product.category?.categoryId}/${product.title}/${product.id}`) }>
      {/* Image Section */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-md items-center"
          src={image}
          alt={title}
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-200">
          <Favorite sx={{ color: teal[500] }} />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        <div className="mb-2">
          <h1 className="font-bold text-sm text-gray-800 truncate">{title}</h1>
          <p className="text-xs text-gray-500 truncate">{category}</p>
        </div>
        <div className="price flex items-center gap-3 text-sm">
          <span className="font-sans text-gray-800">₹ {sellingPrice}</span>
          <span className="line-through text-gray-400">₹ {mrpPrice}</span>
          <span className="text-primary-color font-semibold">
            {discountPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};


export default SimilarProductCard;
