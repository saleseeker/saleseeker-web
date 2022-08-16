import React from 'react';
import { Typography } from "@mui/material";
import Item from '../components/Item';
import { itemMock, sitesMock } from "./../Mocks";

export default function Home() {
    return (
        <div>
            <Typography variant="h3">Home</Typography>
            <Item item={itemMock} sites={sitesMock} />
        </div>
    );
}