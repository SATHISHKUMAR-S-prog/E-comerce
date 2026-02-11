import React, { useEffect, useState } from 'react'
import Menu from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, Storefront } from '@mui/icons-material';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../Data/Category/MainCategory';
import { useNavigate } from 'react-router-dom';
import store, { useAppDispatch, useAppSelector } from '../../State/Store';
import { SellerMenu1, SellerMenu2 } from '../../Data/DrawerList/SellerDrawerList';
import { AdminMenu1, AdminMenu2 } from '../../Data/DrawerList/AdminDrawerList';
import { CustomerMenu1, CustomerMenu2 } from '../../Data/DrawerList/UserDrawerlist';
import { logout } from '../../State/AuthSlice';
import { sellerLogout } from '../../State/Seller/SellerSlice';

const NavBar = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"))
    const [seletedCategory,setSelectedCategory] =useState("men") // by default men
    const [showCategorySheet, setShowCategorySheet] = useState(false)
    const navigate = useNavigate()
    const {auth, seller} = useAppSelector(store => store)
    const [open, setOpen] = React.useState(false);
  
    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    const handleLogout = () => {
      if(auth.isLoggedIn){
        dispatch(logout(navigate))
      }
      if(seller.isLoggedIn){
        dispatch(sellerLogout(navigate))
      }
    }
  
    const menu1 = seller.isLoggedIn? SellerMenu1 : auth.user?.role==="ROLE_ADMIN"? AdminMenu1 : CustomerMenu1
    const menu2 = seller.isLoggedIn? SellerMenu2 : auth.user?.role==="ROLE_ADMIN"? AdminMenu2 : CustomerMenu2
  
    const DrawerList = (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menu1.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(text.path)}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menu2.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => {
                if (text.path === "/") handleLogout();
                else navigate(text.path);
              }}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

    const handleProfile =() => {
        seller.isLoggedIn? navigate("/seller/") : auth.user?.role==="ROLE_ADMIN"? navigate("/admin") : navigate("/account/orders")
    }

  return (
   <>
    <Box sx={{zIndex:2}} className='sticky top-0 left-0 right-0 bg-white'>
        <div className='flex items-center justify-between px-5 lg:px-20 h-[70px] border-b'>
            <div className='flex items-center gap-9'>
                <div className='flex items-center gap-2'>
                    {!isLarge && (seller.profile || auth.isLoggedIn ) && ( <div>
                      <IconButton onClick={toggleDrawer(true)} className="text-white z-10">
                        <Menu />
                      </IconButton>
                    </div>)}
                    <h1 onClick={() => navigate("/")} className='logo cursor-pointer text-lg md:text-2xl text-primary-color'>
                        Eccomerce 
                    </h1>
                </div>
                <ul className='flex items-center font-medium text-gray-800'>
                    {isLarge && mainCategory.map( item =>
                        <li key={item.categoryId}
                        onMouseLeave={() => setShowCategorySheet(false)}
                        onMouseEnter={() =>{ 
                            setShowCategorySheet(true)
                            setSelectedCategory(item.categoryId)
                        }}
                        className='mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center' >
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>
            <div className='flex gap-1 lg:gap-6 items-center'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                {
                   (seller.profile || auth.isLoggedIn )? <Button onClick={handleProfile} className='flex items-center gap-2'>
                        <Avatar 
                            sx={{width:29 ,height:29}}
                            src='https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png'/>
                        <h1 className ='font-semibold hidden lg:block'>
                            {auth.user?.fullname || seller.profile?.sellerName}
                        </h1>
                        </Button>//if user loged in shows user name
                         : <Button onClick={() => navigate("/login")} variant='contained'>Login</Button> //if user not login shows this
                }
                <IconButton onClick={() => navigate("/wishlist")}>
                    <FavoriteBorder sx={{fontSize:29}}/>
                </IconButton>
                <IconButton onClick={() => navigate("/cart")}>
                    <AddShoppingCart className='text-gray-700' sx={{fontSize:29}}/>
                </IconButton>
                { isLarge && !seller.isLoggedIn && <Button onClick={() => navigate("/become-seller")} startIcon={<Storefront />} variant='outlined'>
                    Become Seller
                </Button>}
            </div>
        </div>
       
        {showCategorySheet && <div
         onMouseLeave={() => setShowCategorySheet(false)}
         onMouseEnter={() => setShowCategorySheet(true)}
        className='categorySheet absolute top-[4.41rem] left-20 right-20 border '>
                <CategorySheet seletedCategory={seletedCategory} />
        </div>}
    </Box>
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
   </>
  )
}

export default NavBar