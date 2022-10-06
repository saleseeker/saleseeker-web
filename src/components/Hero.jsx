import React from 'react';
import { Typography, Button } from "@mui/material";
import { Container, Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const logo = require('./../images/radar.png');

const Hero = () => {
    const navigate = useNavigate();
    
    function navigateToCatalogue () {
        navigate('/browse');
    }

    return (
        <Container id="home-hero">
            <Box id="home-hero-text-content-container">
                <Typography variant="h4">Have no fear, we'll find you cheap beer!</Typography>
                <Typography>Welcome to SaleSeeker! Your one stop for the hottest deals online.</Typography>
                <Button onClick={navigateToCatalogue} variant="contained" sx={{
                    marginTop: 1
                }}>Seek Now</Button>
            </Box>
            <Box id="home-hero-graphic-container">
                <img id="hero-icon" src={logo} />
            </Box>
        </Container>
    );
}

export default Hero;