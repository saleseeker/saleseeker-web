import React from 'react';
import { Typography } from "@mui/material";
import { Container, Box } from '@mui/system';
import Subscribe from '../components/Subscribe';
import Item from '../components/Item';
import { itemMocks, sitesMock, subscriptionMock, defaultSubscriptionValueMock } from "./../Mocks";

export default function Home() {
    return (
        <Container>
            <Box sx={{ backgroundColor: 'gray' }}>
                <Typography>Hero</Typography>
            </Box>
            <Typography variant="h3">Home</Typography>
            <Item item={itemMocks[0]} sites={sitesMock} subscriptions={subscriptionMock} defaultSubscriptionValues={defaultSubscriptionValueMock}/>            
            {/* <Subscribe item={itemMocks[0]} sites={sitesMock} subscriptions={subscriptionMocks} /> */}

        </Container>
    );
}