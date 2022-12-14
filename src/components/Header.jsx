import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

const logo = require('./../images/radar-white.png');

const drawerWidth = 240;
const navItems = ['Home', 'Browse', 'Subscriptions', 'Settings'];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SaleSeeker
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={`/${item}`}>
               <ListItemText primary={item} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Container>
      <AppBar component="nav">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <img id='header-logo' src={logo} />
            <Typography
              variant="h5"
              component="div"
              sx={{ display: { sm: 'block', marginLeft: '10px' }, justifyContent: 'left' }}
            >
              SaleSeeker
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: '15px' }}>
            {navItems.map((item) => (
              <Button key={item}>
                <Link to={`/${item}`} className='navbar-link'>
                  {item}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Container>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
