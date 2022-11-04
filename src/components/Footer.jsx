import React from 'react';
import { Typography } from "@mui/material";
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const logo = require('./../images/radar-white.png');

const Footer = () => {
    return (
        <Box id="footer-container" sx={{ backgroundColor: '#1976d2', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottom: 1, borderBottomColor: "white" }}> 
                <Box sx={{ flex: 1, paddingLeft: 2 }}>
                    <img id='footer-logo' src={logo} />
                    <Typography className="footer" sx={{ fontWeight: "bold" }} variant="h6">SaleSeeker</Typography>
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
                    <Typography>Connect with us</Typography>
                </Box>
            </Box>
            <Typography sx={{ paddingTop: 1, paddingBottom: 1, marginLeft: 2 }} variant="caption" className="footer">© Copyright SaleSeeker 2022</Typography>
        </Box>
    );
}

export default Footer;