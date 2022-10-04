import React from 'react';
import { Typography, Button } from "@mui/material";
import { Container, Box } from '@mui/system';

const logo = require('./../images/radar.png');

const Footer = () => {
    return (
        <Container id="footer-container">
            <Typography>Copyright SaleSeeker 2022</Typography>
        </Container>
    );
}

export default Footer;