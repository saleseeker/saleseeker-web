import React, { useState, useEffect } from 'react';
import { Button, Pagination, Typography, TextField, Select, MenuItem } from "@mui/material";
import { Container, Box } from '@mui/system';
import Item from '../components/Item';
import SettingGateway from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';
import Footer from './../components/Footer';

export default function Browse() {

    const [catalogueItems, setCatalogueItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [sort, setSort] = useState("name");
    const [calledAPI, setCalledAPI] = useState(false);
    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(null);
    const [sites, setSites] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);

    useEffect(() => {
        setDefaultSubscriptionValues(SettingGateway.GetDefaultSubscriptionValues());

        (async () => {
            setSites(await SaleSeekerGateway.GetSites());
            const items = await SaleSeekerGateway.GetItems();
            setFilteredItems(items);
            setCatalogueItems(items);
            setPageCount(calculatePageCount(items.length));
            setSubscriptions(await SaleSeekerGateway.GetSubscriptions());
          })();
    },[]);

    const filterItems = () => {
        if (searchQuery == "" || searchQuery.length == 0){
            setFilteredItems(catalogueItems.sort(getSortFunction()));
            return;
        }
        const filteredItems = catalogueItems
        .filter(item => { 
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()); 
        })
        .sort(getSortFunction());
        setFilteredItems(filteredItems);
    }

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handlePageChange = (event, value) => {
        setPaginationIndex(value);
    }

    const handleSortChange = (event) => {
        setSort(event.target.value);
    }

    const calculatePageCount = (itemCount) => {
        return Math.ceil(itemCount / 12);
    }

    const getSortFunction = () => {
        const sortFunction = (a, b) => {
            if (1 === 1){
                return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : 0;
            }
            return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : 0;
        }
        return sortFunction;
    }

    return (
        <Box className="page">
            <Box sx={{ paddingLeft: 10, paddingRight: 10 }}>
                <Typography variant="h4">Browse</Typography>
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
                        Sort: 
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Sort By"
                        placeholder='Sort By'
                        onChange={handleSortChange}
                        size='small'
                    >
                        <MenuItem value="name">Alphabetical (A-Z)</MenuItem>
                        <MenuItem value="nameDesc">Alphabetical (Z-A)</MenuItem>
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
                    {filteredItems?.map((item,index)=>{
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
                <Box sx={{display:'flex', justifyContent: 'center', marginTop: 3, marginBottom: 3}}>
                    <Pagination count={pageCount} page={paginationIndex} onChange={handlePageChange}></Pagination>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}