import React, { useState, useEffect } from 'react';
import { Button, Pagination, Typography, TextField, Select, MenuItem } from "@mui/material";
import { Container, Box } from '@mui/system';
import Item from '../components/Item';
import { itemMocks, sitesMock } from './../Mocks.js';
import * as actions from '../actions';
export default function Browse() {
    
    const items = actions.getItems();
    console.log("items : ",items);
    const[catalogueItems, setCatalogueItems] = useState(itemMocks);
    const [filteredItems, setFilteredItems] = useState(itemMocks);
    const [searchQuery, setSearchQuery] = useState("");
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [filter, setFilter] = useState("alphabetical");
    const [calledAPI, setCalledAPI] = useState(false);

    useEffect(() => {
        console.log();
        //TODO: Add API Call to Fetch Data from Backend
    });

    const filterItems = () => {
        if (searchQuery == "" || searchQuery.length == 0){
            setFilteredItems(catalogueItems);
            return;
        }
        const filteredArray = catalogueItems.filter(item => { return item.name.toLowerCase().includes(searchQuery.toLowerCase()); });
        setFilteredItems(filteredArray);
    }

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handlePageChange = (event, value) => {
        setPaginationIndex(value);
    }

    const handleFilterChange = () => {

    }

    return (
        <Container>
            <Typography variant="h3">Browse</Typography>
            <Box
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
                    autoFocus={true}
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    sx={{
                        flexGrow: 1,
                        paddingRight: 2,
                    }}
                />
                <Button 
                    color="primary" 
                    variant="outlined"
                    onClick={filterItems}>
                        Search
                </Button>
            </Box>
            <Box
                sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}>
                <Typography
                    sx={{ paddingRight: 1 }}>
                    Filters: 
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Sort By"
                    placeholder='Sort By'
                    onChange={handleFilterChange}
                    size='small'
                >
                    <MenuItem value="alphabetical">Alphabetical (A-Z)</MenuItem>
                    <MenuItem value="alphabeticalDesc">Alphabetical (Z-A)</MenuItem>
                    <MenuItem value="price">Price (Low-High)</MenuItem>
                    <MenuItem value="priceDesc">Price (High-Low)</MenuItem>
                </Select>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'left',
                    marginTop: 3
                }} 
                >
                {filteredItems.map((item,index)=>{
                    return (
                    <Box 
                        sx={{
                            p: 0.5
                        }} 
                        key={item.name}>
                        <Item item={item} sites={sitesMock}/>
                    </Box>
                    )
                })}
            </Box>
            <Box sx={{display:'flex', justifyContent: 'center', marginTop: 3}}>
                <Pagination count={10} page={paginationIndex} onChange={handlePageChange}></Pagination>
            </Box>
        </Container>
    );
}