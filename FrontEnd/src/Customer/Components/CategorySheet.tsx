import React from 'react'
import { menLevelTwo } from '../../Data/Category/levelTwoCategory/menLevelTwo'
import { womenLevelTwo } from '../../Data/Category/levelTwoCategory/womenLevelTwo'
import { HomeFurnitureLevelTwo } from '../../Data/Category/levelTwoCategory/Home_FurnitureLevelTwo'
import { electronicsLevelTwo } from '../../Data/Category/levelTwoCategory/ElectronicLevelTwo'
import { menLevelThree } from '../../Data/Category/LevelThreeCategory/menLevelThree'
import { womenLevelThree } from '../../Data/Category/LevelThreeCategory/womenLevelThree'
import { homeFurnitureLevelThree } from '../../Data/Category/LevelThreeCategory/Home_FurnitureLevelThree'
import { electronicsLevelThree } from '../../Data/Category/LevelThreeCategory/ElectronicLevelThree'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const CategoryTwo :{[key:string]:any[]} = {
    men:menLevelTwo,
    women:womenLevelTwo,
    home_furniture:HomeFurnitureLevelTwo,
    electronics:electronicsLevelTwo
}

const CategoryThree  :{[key:string]:any[]} ={
    men:menLevelThree,
    women: womenLevelThree,
    home_furniture: homeFurnitureLevelThree,
    electronics: electronicsLevelThree
}

const CategorySheet = ({seletedCategory,showCategorySheet}:any) => {

    const navigate = useNavigate()

    const childCategory = (catgory:any, parentCategoryId:any) => {
        return catgory.filter((child:any) => child.parentCategoryId == parentCategoryId);
    }

  return (
        <Box sx={{zIndex:2}} className='lg:h-[500px] shadow-lg overflow-y-auto bg-white'>
            <div className='flex text-sm flex-wrap'>
                {
                    CategoryTwo[seletedCategory]?.map( (item,index) => 
                        <div key={index} className={`p-8 lg:w-[20%] ${index%2 ===0 ? "bg-slate-50" : "bg-white" }`}>
                            <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>

                            <ul className='space-y-3'>
                                {childCategory(CategoryThree[seletedCategory],item.categoryId).map((item:any)=>
                                <div key={item.categoryId}>
                                    <li onClick={() => navigate(`/products/${item.categoryId}/${item.name}`)} className='hover:text-primary-color cursor-pointer'>
                                        {item.name}
                                    </li>
                                </div>
                                )}
                            </ul>
                        </div>
                    )
                }
            </div>
        </Box>
  )
}

export default CategorySheet