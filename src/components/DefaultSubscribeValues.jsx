import React, { useState, useEffect } from 'react'
import { TextField, Typography, Stack, Select, MenuItem, Checkbox } from '@mui/material';
import map from 'lodash.map';

const DefaultSubscribeValues = ({ sites, defaultSubscriptionValues, setDefaultSubscriptionValues }) => {

    const allSiteIDs = map(sites, s => s.id.toString());

    function handleEmailChange(e)
    {
        setDefaultSubscriptionValues({...defaultSubscriptionValues, emailAddress: e.target.value});
    }

    function handleAlertThresholdChange(e)
    {
        setDefaultSubscriptionValues({...defaultSubscriptionValues, alertThreshold: e.target.value});
    }

    function handleSitesChange(e)
    {
        setDefaultSubscriptionValues({...defaultSubscriptionValues, siteIDs: getSiteIDArray(e.target.value)});
    }

    function getSiteIDArray(sites)
    {
        if (sites === '')
            return [];     
        else if (sites.length == allSiteIDs.length) 
            return null;  
        return sites;
    }

    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction="row">
                <Typography sx={{ width: '140px' }}>Email Address:</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="emailAddress"
                    type="email"
                    size="small"
                    variant="outlined"
                    sx={{ width: '300px' }}
                    value={defaultSubscriptionValues.emailAddress}
                    required
                    onChange={handleEmailChange}
                />
            </Stack>
            <Stack spacing={2} direction="row">
                <Typography sx={{ width: '140px' }} id="alert-threshold-select-label">Alert Threshold:</Typography>
                <Select
                    labelId="alert-threshold-select-label"
                    id="alert-threshold-select"
                    value={defaultSubscriptionValues.alertThreshold}
                    label="Alert Threshold"
                    size="small"
                    onChange={handleAlertThresholdChange}
                >
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={7.5}>7.5%</MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={15}>15%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                    <MenuItem value={25}>25%</MenuItem>
                </Select>
            </Stack>
            <Stack spacing={2} direction="row">
                <Typography sx={{ width: '140px' }} id="targetted-stores-select-label">Targetted Stores:</Typography>
                <Select
                    labelId="targetted-stores-select-label"
                    id="targetted-stores-select"
                    value={defaultSubscriptionValues.siteIDs ? defaultSubscriptionValues.siteIDs : allSiteIDs}
                    label="Targetted Stores"
                    multiple
                    required
                    size="small"
                    onChange={handleSitesChange}
                    renderValue={(selected) => selected.length > 1 ? `${sites[selected[0]].name} and ${selected.length - 1} more` : sites[selected[0]].name}
                >
                    {
                        map(sites, site => (
                            <MenuItem key={site.id} value={site.id.toString()}>
                                <Checkbox key={site.id} checked={defaultSubscriptionValues.siteIDs == null || defaultSubscriptionValues.siteIDs.join(',').indexOf(site.id) > -1} />
                                <img alt={site.name} src={site.logo} style={{ maxHeight: 20 }}></img>
                            </MenuItem>
                        ))
                    }
                </Select>
            </Stack>
        </Stack>
    );
};

export default DefaultSubscribeValues;