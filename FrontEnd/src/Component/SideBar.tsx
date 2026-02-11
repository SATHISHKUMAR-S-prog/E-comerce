import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useAppSelector } from '../State/Store';
import { SellerMenu1, SellerMenu2 } from '../Data/DrawerList/SellerDrawerList';
import { AdminMenu1, AdminMenu2 } from '../Data/DrawerList/AdminDrawerList';
import { CustomerMenu1, CustomerMenu2 } from '../Data/DrawerList/UserDrawerlist';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const {auth, seller} = useAppSelector(store => store)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menu1 = seller.isLoggedIn? SellerMenu1 : auth.user?.role==="ROLE_ADMIN"? AdminMenu1 : CustomerMenu1
  const menu2 = seller.isLoggedIn? SellerMenu2 : auth.user?.role==="ROLE_ADMIN"? AdminMenu2 : CustomerMenu2

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
               
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
               
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

}
