import React, { useState, useEffect } from 'react';
import { Typography, Button } from "@mui/material";
import { Container, Box } from '@mui/system';
import Item from '../components/Item';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SettingGateway from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const logo = require('./../images/radar.png');

export default function Home() {
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '125px', marginBottom: '20px', gap: '20px' }}>
                <Box className="category-card">
                    <Typography variant="h5">Beers</Typography>
                </Box>
                <Box className="category-card">
                    <Typography variant="caption">Whiskeys</Typography>
                </Box>
                <Box className="category-card">
                    <Typography variant="caption">Wine</Typography>
                </Box>
                <Box className="category-card">
                    <Typography variant="caption">Ciders</Typography>
                </Box>
            </Box>
            {/* <br /> */}
            {/* <Typography variant="h5">My Subscriptions</Typography> */}
            {/* <Box className="carousel">
                {featuredProducts.map((item,index)=>{
                    return (
                    <Box 
                        sx={{
                            p: 0.5
                        }} 
                        key={item.name}>
                        { sites && <Item item={item} sites={sites} subscriptions={subscriptions} defaultSubscriptionValues={defaultSubscriptionValues}/>}
                    </Box>
                    )
                })}
            </Box> */}
            </Box>
            <br />
            <Footer />
        </Box>
    );
}