import React, { useState, useEffect } from 'react';
import { Button, Pagination, Typography, TextField, Select, MenuItem } from "@mui/material";
import { Container, Box } from '@mui/system';
import Item from '../components/Item';
import SettingGateway from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';
import Footer from './../components/Footer';
import { ContentPasteSearchOutlined } from '@mui/icons-material';

export default function Browse() {

    const [catalogueItems, setCatalogueItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
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
            return;
        }
        const filteredItems = catalogueItems.filter(item => { 
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()); 
        });
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

    const calculateCataloguePageStartIndex = () => {
        return (paginationIndex-1) * 12;
    }
    
    const calculateCataloguePageEndIndex = () => {
        return ((paginationIndex-1) * 12) + 12;
    }

    const getSortedList = () => {
        if (sort === 'name'){
            return filteredItems.sort((a, b) => {
                let fa = a[sort].toLowerCase(),
                    fb = b[sort].toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }
        else {
            return filteredItems.sort((a, b) => {
                return a[sort] - b[sort];
            });
        }
        
    }

    return (
        <Box className="page">
            <Box sx={{ paddingLeft: 30, paddingRight: 30 }}>
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
                        color="secondary" 
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
                        <MenuItem value="avePrice">Price (Low-High)</MenuItem>
                    </Select>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'left',
                        marginTop: 3,
                    }} 
                    >
                    {getSortedList().sort().slice(calculateCataloguePageStartIndex(), calculateCataloguePageEndIndex()).map((item,index)=>{
                        return (
                        <Box 
                            sx={{
                                p: 0.5, 
                                flex: 1,
                            }} 
                            key={item.name}>
                            { sites && <Item item={item} sites={sites} subscriptions={subscriptions} defaultSubscriptionValues={defaultSubscriptionValues}/>}
                        </Box>
                        )
                    })}
                </Box>
                <br />
                <Box sx={{display:'flex', justifyContent: 'center', marginTop: 3, marginBottom: 3}}>
                    <Pagination count={pageCount} page={paginationIndex} onChange={handlePageChange}></Pagination>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}