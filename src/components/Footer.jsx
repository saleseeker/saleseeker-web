import React from 'react';
import { Typography, Button } from "@mui/material";
import { Container, Box } from '@mui/system';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const logo = require('./../images/radar-white.png');

const Footer = () => {
    return (
        <Box id="footer-container" sx={{ backgroundColor: 'blue', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: 1, borderColor: 'gray' }}> 
                <Box sx={{ flex: 1 }}>
                    <img id='footer-logo' src={logo} />
                    <Typography className="footer">SaleSeeker</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <List>
                        <ListItem>
                            <Link to="/Browse" className="footer footer-link">Browse</Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Subscriptions" className="footer footer-link">Subscriptions</Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Settings" className="footer footer-link">Settings</Link>
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ flex: 1 }}>
                </Box>
            </Box>
            <Typography sx={{ paddingTop: 1, paddingBottom: 1 }} variant="caption" className="footer">© Copyright SaleSeeker 2022</Typography>
        </Box>
    );
}

export default Footer;