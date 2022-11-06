import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, Select, MenuItem, Switch, Grid, Checkbox } from '@mui/material';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';
import SettingGateway from '../gateways/SettingGateway';

const Subscribe = ({ item, sites, subscriptions }) => {
    const getSite = (id) => sites.find(s => s.id == id);
    const subscription = subscriptions.filter(s => s.itemId == item.id);
    const [alertThreshold, setAlertThreshold] = useState(subscription && subscription.length > 0 ? subscription[0].notificationThreshold : 10);
    const [subscriptionSites, setSubscriptionSites] = useState(subscription && subscription.length > 0 ? subscription.map(s => s.siteId) : null);
    const [subscribed, setSubscribed] = useState(subscription && subscription.length > 0);
    const siteIDs = sites.map(s => s.id);

    const handleThresholdChange = (e) => {
        setAlertThreshold(e.target.value);

        if (subscribed)
            SaveSubscription();
    }

    const handleSitesChange = (e) => {
        setSubscriptionSites(getSiteIDArray(e.target.value));
        
        if (subscribed)
            SaveSubscription();
    }

    const handleSubscriptionToggle = (e) => {
        setSubscribed(e.target.value);

        SaveSubscription();
    };

    const SaveSubscription = () => {

        var defaultSubscriptionValues = SettingGateway.GetDefaultSubscriptionValues();
        if (subscribed)
            SaleSeekerGateway.SaveSubscription(defaultSubscriptionValues.emailAddress, item.id, alertThreshold, subscriptionSites);
        else
            SaleSeekerGateway.DeleteSubscription(defaultSubscriptionValues.emailAddress, item.itemId);
    };

    const getSiteIDArray = (sites) => {
        if (sites === '')
            return [];
        else if (sites.length == siteIDs.length)
            return null;
        return sites;
    }

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
                                            value={alertThreshold}                                            
                                            label="Alert Threshold"
                                            size="small"
                                            onChange={handleThresholdChange}
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
                                            value={subscriptionSites ? subscriptionSites : siteIDs}
                                            label="Targetted Stores"
                                            multiple
                                            size="small"
                                            onChange={handleSitesChange}
                                            renderValue={(selected) => selected.length > 1 ? `${getSite(selected[0]).name} and ${selected.length - 1} more` : getSite(selected[0]).name}
                                            sx={{ marginTop: '5px' }}
                                        >
                                            {
                                                item.siteItems.map(siteItem => {
                                                    var site = getSite(siteItem.siteId);
                                                    return (
                                                    <MenuItem key={siteItem.siteId} value={siteItem.siteId}>
                                                        <Checkbox checked={subscriptionSites == null || subscriptionSites.find(s => s == siteItem.siteId) != null}/>
                                                        <img alt={site.name} src={site.logo} style={{ maxHeight: 20 }}></img>
                                                    </MenuItem>
                                                )})
                                            }
                                        </Select>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'right', width: '100%', marginRight: '40px', marginTop: '60px' }}>
                                <Switch checked={subscription != null && subscription.length > 0} onChange={handleSubscriptionToggle} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>              
            </Container>
        </Box>
    );
};

export default Subscribe;