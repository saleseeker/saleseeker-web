import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@mui/material";
import { Container, Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SettingGateway from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const logo = require('./../images/radar.png');

export default function Home() {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState(null);
    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [sites, setSites] = useState(null);

    useEffect(() => {
        (async () => {
            const userSettings = SettingGateway.GetDefaultSubscriptionValues();
            setDefaultSubscriptionValues(userSettings);
            if (userSettings)
                setSubscriptions(await SaleSeekerGateway.GetSubscriptions());
            setSites(await SaleSeekerGateway.GetSites());
            setFeaturedProducts(await SaleSeekerGateway.GetItems());
          })();
    },[]);

    const getHottestDeals = () => {
        return featuredProducts.sort((a, b) => {
            return a["avePrice"] - b["avePrice"];
        });
    }

    const navigateToBrowsePage = () => {
        navigate('/browse');
    }
    
    return (
        <Box>
            <Hero/>
            <Box sx={{ padding: 5 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>Latest Products</Typography>
                    <Box className="carousel">
                    {featuredProducts.slice(7, 13).map((item,index)=>{
                        return (
                        <Box 
                            sx={{
                                p: 1
                            }}
                            key={item.name}>
                            { sites && <Item item={item} sites={sites} subscriptions={subscriptions} defaultSubscriptionValues={defaultSubscriptionValues}/>}
                        </Box>
                        )
                    })}
                    </Box>
                </Box>
                <br/>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>Categories</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '150px', marginBottom: '20px', gap: '20px' }}>
                    <Box id="beer-category-card" className="category-card" onClick={navigateToBrowsePage}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: 3 }}>Beers</Typography>
                    </Box>
                    <Box id="wine-category-card" className="category-card" onClick={navigateToBrowsePage}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: 3 }}>Wine</Typography>
                    </Box>
                    <Box id="whiskey-category-card" className="category-card" onClick={navigateToBrowsePage}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: 3 }}>Whiskey</Typography>
                    </Box>
                    <Box id="champagne-category-card" className="category-card" onClick={navigateToBrowsePage}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: 3 }}>Champagne</Typography>
                    </Box>
                </Box>
                <br />
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>Hottest Deals</Typography>
                    <Box className="carousel">
                    {getHottestDeals().slice(0,6).map((item,index)=>{
                        return (
                        <Box 
                            sx={{
                                p: 1
                            }}
                            key={item.name}>
                            { sites && <Item item={item} sites={sites} subscriptions={subscriptions} defaultSubscriptionValues={defaultSubscriptionValues}/>}
                        </Box>
                        )
                    })}
                    </Box>
                </Box>
            </Box>
            <br />
            <Footer />
        </Box>
    );
}