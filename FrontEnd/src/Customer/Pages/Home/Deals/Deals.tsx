import React from 'react'
import DealsCard from './DealsCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from '../../../../State/Store';
import Slider from 'react-slick';


const Deals = () => {
 const {customer} = useAppSelector(store => store)

 var settings = {
  dots: true,
  infinite: true,
  autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
  slidesToShow: 6,
  slidesToScroll: 1,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};
    
  return (
    <div className='lg:pt-20 pt-10'>
      <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center'>TODAY'S DEAL</h1>
      <div className='pb-5 lg:px-20'>
        <div className='items-center justify-between gap-2'>
        <Slider {...settings}>
            {customer.homepageData?.deals.map( (item,index) =>   <DealsCard key={index} item={item} />)}
        </Slider>
        </div>
      </div>
    </div>
  )
}

export default Deals