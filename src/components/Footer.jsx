import React from 'react';
import { Typography } from "@mui/material";
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const logo = require('./../images/radar-white.png');
const instagram = require('./../assets/images/instagram.png');
const facebook = require('./../assets/images/facebook.png');
const twitter = require('./../assets/images/twitter.png');


const Footer = () => {
    return (
        <Box id="footer-container" sx={{ backgroundColor: '#1976d2', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottom: 1, borderBottomColor: "white" }}> 
                <Box sx={{ flex: 2, paddingLeft: 2 }}>
                    <img id='footer-logo' src={logo} />
                    <Typography className="footer" sx={{ marginLeft: 3 }} variant="h6">SaleSeeker</Typography>
                </Box>
                <Box sx={{ flex: 1.5 }}>
                    <List>
                        <ListItem>
                            <Link to="/Browse" className="footer footer-link">
                                <Typography variant="h6" >Browse</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Subscriptions" className="footer footer-link">
                                <Typography variant="h6">Subscriptions</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Settings" className="footer footer-link">
                                <Typography variant="h6">Settings</Typography>
                            </Link>
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ flex: 1.5 }}>
                    <List>
                        <ListItem>
                            <Link to="/Browse" className="footer footer-link">
                                <Typography variant="h6">Careers</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Browse" className="footer footer-link">
                                <Typography variant="h6">About Us</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Browse" className="footer footer-link">
                                <Typography variant="h6">Contact</Typography>
                            </Link>
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, alignItems: 'center', height: "100%", marginRight: 20 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                        <a href="https://facebook.com" target="_blank"> 
                            <img className="social-icon" src={facebook} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank">
                            <img className="social-icon" src={instagram} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank">
                            <img className="social-icon" src={twitter} />
                        </a>
                    </Box>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>Connect with Us</Typography>
                </Box>
            </Box>
            <Typography sx={{ paddingTop: 1, paddingBottom: 1, marginLeft: 2 }} variant="caption" className="footer">© Copyright SaleSeeker 2022</Typography>
        </Box>
    );
}

export default Footer;