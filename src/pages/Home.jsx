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
            setDefaultSubscriptionValues(SettingGateway.GetDefaultSubscriptionValues());
            setSites(await SaleSeekerGateway.GetSites());
            const items = await SaleSeekerGateway.GetItems();
            setFeaturedProducts(items);
          })();
    },[]);
    
    return (
        <Container>
            <Hero/>
           <br/>
            <Typography variant="h5">Featured Products</Typography>
            <Box className="carousel">
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
            </Box>
            <br/>
            <Typography variant="h5">My Subscriptions</Typography>
            <Box className="carousel">
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
            </Box>
            <br />
            <Footer />
        </Container>
    );
}