import React, { useState } from 'react';
import { Button, Pagination, Typography, TextField } from "@mui/material";
import { Container, Box } from '@mui/system';
import Item from '../components/Item';
import { itemMock, sitesMock } from "./../Mocks";

export default function Browse() {

    const [catalogueItems, setCatalogueItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    return (
        <Container>
            <Typography variant="h3">Browse</Typography>
            <Box 
                maxWidth="xl" 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'left',
                    marginTop: 2
                 }}      
            >
                <TextField 
                    placeholder='Search' 
                    size='small'
                    autoFocus='true'
                    sx={{
                        flexGrow: 1,
                        paddingRight: 2,
                    }}
                />
                <Button color="primary" variant="outlined">Search</Button>
            </Box>
            <Box
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: 3
                }} 
                >
                {catalogueItems.map((item,index)=>{
                    return (
                    <Box 
                        sx={{
                            p: 0.5
                        }}>
                        <Item item={itemMock} sites={sitesMock} />
                    </Box>
                    )
                })}
            </Box>
            <Box maxWidth="xl" sx={{display:'flex', justifyContent: 'center', marginTop: 3}}>
                <Pagination count={10} maxWidth="xl"></Pagination>
            </Box>
        </Container>
    );
}