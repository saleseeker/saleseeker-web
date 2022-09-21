import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography, Divider, Select, MenuItem, Switch, Grid, Checkbox, ListItemText } from '@mui/material';
import map from 'lodash.map';
import find from 'lodash.find'
import { formatCurrency } from '../common/Formatter'

function renderPrice(item, sites, minSiteItem) {
    const onSale = minSiteItem.price / item.avePrice < 0.97

    return onSale ?
        (<Fragment>
            <Box sx={{ display: { display: 'flex' } }}>
                <Typography sx={{ fontSize: '14px', color: 'red' }}>{formatCurrency(minSiteItem.price)}</Typography>
                <Typography sx={{ fontSize: '14px', textDecoration: 'line-through', marginLeft: '10px' }}>{formatCurrency(item.avePrice)}</Typography>
            </Box>
            <Box sx={{ display: { display: 'flex' } }}>
                <Typography sx={{ fontSize: '12px' }}>on sale at {sites[minSiteItem.siteID].name}</Typography>
            </Box>
        </Fragment>) :
        (<Fragment>
            <Typography sx={{ fontSize: '14px' }}>{formatCurrency(minSiteItem.price)}</Typography>
            <Box sx={{ display: { display: 'flex' } }}>
                <Typography sx={{ fontSize: '12px' }}>at {sites[minSiteItem.siteID].name}</Typography>
            </Box>
        </Fragment>);
}

const Subscribe = ({ item, sites, subscriptions }) => {
    const subscription = find(subscriptions, s => s.itemID == item.id);
    const siteIDs = map(sites, s => s.id);
    return (
        <Box sx={{ border: '1px solid grey', borderRadius: 2 }}>
            <Container sx={{ width: '100%' }}>
                <Grid container columnSpacing={{ xs: 0, sm: 10 }}>
                    <Grid item sm={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <img src={item.imageUrl} alt={item.name} style={{ maxHeight: "200px" }} />
                        </Box>
                    </Grid>
                    <Grid item sm={8} marginTop={{ sm: 3, md: 3 }} marginBottom={{ xs: 2 }}>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Box sx={{ marginLeft: '20px' }}>
                                <Typography variant="h4">{item.name}</Typography>
                                <Box sx={{ display: 'flex', marginTop: '20px' }}>
                                    <Box sx={{ width: '100px' }}>
                                        <Typography sx={{ fontSize: '12px' }} id="alert-threshold-select-label">Alert Threshold:</Typography>
                                        <Select
                                            labelId="alert-threshold-select-label"
                                            id="alert-threshold-select"
                                            value={subscription ? subscription.alertThreshold : '10'}                                            
                                            label="Alert Threshold"
                                            size="small"
                                            sx={{ marginTop: '5px' }}
                                        >
                                            <MenuItem value={5}>5%</MenuItem>
                                            <MenuItem value={7.5}>7.5%</MenuItem>
                                            <MenuItem value={10}>10%</MenuItem>
                                            <MenuItem value={15}>15%</MenuItem>
                                            <MenuItem value={20}>20%</MenuItem>
                                            <MenuItem value={25}>25%</MenuItem>
                                        </Select>
                                    </Box>
                                    <Box sx={{ paddingLeft: '40px', width: '160px' }}>
                                        <Typography sx={{ fontSize: '12px' }}>Targetted Stores:</Typography>
                                        <Select
                                            labelId="targetted-stores-select-label"
                                            id="targetted-stores-select"
                                            value={subscription ? subscription.sites : siteIDs}
                                            label="Targetted Stores"
                                            multiple
                                            size="small"
                                            renderValue={(selected) => selected.length > 1 ? `${sites[selected[0]].name} and ${selected.length - 1} more` : sites[selected[0]].name}
                                            sx={{ marginTop: '5px' }}
                                        >
                                            {
                                                map(item.siteItems, siteItem => (
                                                    <MenuItem key={siteItem.siteID} value={siteItem.siteID}>
                                                        <Checkbox checked={subscription == null || subscription.sites.indexOf(siteItem.siteID) > -1}/>
                                                        <img alt={sites[siteItem.siteID].name} src={sites[siteItem.siteID].logo} style={{ maxHeight: 20 }}></img>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'right', width: '100%', marginRight: '40px', marginTop: '60px' }}>
                                <Switch checked={subscription} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>              
            </Container>
        </Box>
    );
};

export default Subscribe;