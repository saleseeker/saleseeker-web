import React from 'react';
import { Typography } from "@mui/material";
import { Container, Box } from '@mui/system';
import ShopPrices from '../components/ShopPrices';
import { itemMocks, sitesMock } from "./../Mocks";

export default function Home() {
    return (
        <Container>
            <Box sx={{ backgroundColor: 'gray' }}>
                <Typography>Hero</Typography>
            </Box>
            <Typography variant="h3">Home</Typography>
            <ShopPrices item={itemMocks[0]} sites={sitesMock} />
        </Container>
    );
}