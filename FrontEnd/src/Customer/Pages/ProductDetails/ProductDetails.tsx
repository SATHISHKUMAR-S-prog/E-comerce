import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Button, Divider, CircularProgress } from '@mui/material';
import {
  Add,
  AddShoppingCart,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import SimilarProduct from './SimilarProduct';
import ReviewCard from '../Reviews/ReviewCard';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../../State/Customer/ProductSlice';
import { addItemToCart } from '../../../State/Customer/CartSlice';
import { enqueueSnackbar } from 'notistack';
import { addProductToWishList } from '../../../State/Customer/WishListSlice';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const { productId,categoryId } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        await dispatch(fetchProductById(Number(productId))).unwrap();
      } catch {
        enqueueSnackbar('Failed to fetch product details. Please try again.', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prev) => (increment ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleAddToCart = async () => {
    try {
      const request = { productId: Number(productId), quantity, sizes: 'FREE' };
      await dispatch(addItemToCart({ request, jwt: localStorage.getItem('jwt') })).unwrap();
      enqueueSnackbar('Product added to cart.', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } catch {
      enqueueSnackbar('Failed to add product to cart.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const handleWishlist = async () => {
    try {
      if (productId) {
        await dispatch(addProductToWishList({ productId: Number(productId) })).unwrap();
        enqueueSnackbar('Product added to wishlist.', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    } catch {
      enqueueSnackbar('Failed to add product to wishlist.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="px-5 lg:p-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images?.map((item, index) => (
              <img
                key={index}
                onClick={() => setActiveImage(index)}
                className="lg:w-full w-[50px] rounded-md cursor-pointer"
                src={item}
                alt={`Product ${index}`}
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img className="w-full rounded-md" src={product.product?.images[activeImage]} alt="Active Product" />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-primary-color">
            {product.product?.seller?.businessDetails?.businessName || 'Unknown Seller'}
          </h1>
          <p className="text-gray-500 font-semibold">{product.product?.title || 'No Title Available'}</p>

          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: '17px' }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>

          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">₹ {product.product?.sellingPrice || 0}</span>
            <span className="line-through text-gray-400">₹{product.product?.mrpPrice || 0}</span>
            <span className="text-primary-color font-semibold">{product.product?.discountPercent || 0}%</span>
          </div>
          <p className="text-sm">Inclusive of all taxes. Free shipping above ₹1500</p>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% Cash Back Guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Cash On Delivery Available</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button disabled={quantity === 1} onClick={() => handleQuantityChange(false)}>
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => handleQuantityChange(true)}>
                <Add />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: '1rem' }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: '1rem' }}
              onClick={handleWishlist}
            >
              Wishlist
            </Button>
          </div>

          <div className="mt-5">{product.product?.description || 'No description available.'}</div>

          <div className="mt-7 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Products</h1>
        <div className="pt-5 flex sm:justify-center items-center">
          <SimilarProduct categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
