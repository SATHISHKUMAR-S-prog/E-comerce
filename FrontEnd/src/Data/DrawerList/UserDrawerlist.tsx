import { AccountBox, Logout, ShoppingBag} from "@mui/icons-material"
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

export const CustomerMenu1 = [
    {
        name:"Orders",
        path:"/account/orders",
        icon: <ShoppingBag className="text-primary-color"/>,
        activeIcon: <ShoppingBag className="text-white" />
},
    {
        name:"Profile",
        path:"/account/",
        icon: <AccountBox className="text-primary-color"/>,
        activeIcon: <AccountBox className="text-white" />
    },
    // {
    //     name:"saved card",
    //     path:"/account/saved-cart"
    // },
    {
        name:"Addresses",
        path:"/account/addresses",
        icon: <HolidayVillageIcon className="text-primary-color"/>,
        activeIcon: <HolidayVillageIcon className="text-white" />
    }
  ]

export const CustomerMenu2 =[
     {
        name:"Logout",
        path:"/",
        icon: <Logout className="text-primary-color"/>,
        activeIcon: <Logout className="text-white" />
    }
]