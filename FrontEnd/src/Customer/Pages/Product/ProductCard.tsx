import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { Button } from '@mui/material';
import { Favorite, ModeComment } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { Product } from '../../../Types/ProductType';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { addProductToWishList } from '../../../State/Customer/WishListSlice';
import { enqueueSnackbar } from 'notistack';

const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((store) => store);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, item.images.length]);

  const handleWishlist = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (item.id) {
      dispatch(addProductToWishList({ productId: item.id }))
        .unwrap()
        .then(() => {
          const isInWishlist = wishlist.wishList?.products.some(
            (product) => product.id === item.id
          );

          enqueueSnackbar(
            isInWishlist
              ? 'Added to wishlist'
              : 'Product removed from wishlist',
            {
              variant: 'info',
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            }
          );
        })
        .catch((err) => {
          enqueueSnackbar('An error occurred. Please try again.', {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
        });
    }
  };

  return (
    <div
      className="group px-4 relative"
      onClick={() =>
        navigate(
          `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
        )
      }
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="card"
      >
        {item.images.map((image, index) => (
          <img
            key={index}
            className="object-top card-media"
            src={image}
            alt={item.title}
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}

        {isHovered && (
          <div className="indicator flex flex-col items-center space-y-2">
            <div className="flex gap-3">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleWishlist}
              >
                <Favorite sx={{ color: teal[500] }} />
              </Button>
              {/* <Button variant="contained" color="secondary">
                <ModeComment sx={{ color: teal[500] }} />
              </Button> */}
            </div>
          </div>
        )}
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1>{item.seller?.businessDetails.businessName}</h1>
          <p>{item.title}</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">₹ {item.sellingPrice}</span>
          <span className="thin-line-through text-gray-400">
            ₹ {item.mrpPrice}
          </span>
          <span className="text-primary-color font-semibold">
            {item.discountPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
