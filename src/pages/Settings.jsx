import React, { useState, useEffect } from 'react'
import { Button, Typography, Box, Container } from '@mui/material';
import DefaultSubscribeValues from '../components/DefaultSubscribeValues';
import SettingGateway from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const Settings = () => {

    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(null);
    const [sites, setSites] = useState(null);

    useEffect(() => {
        setDefaultSubscriptionValues(SettingGateway.GetDefaultSubscriptionValues());
        (async () => {
            setSites(await SaleSeekerGateway.GetSites());
          })();
    },[]);

    const handleSave = () => {
        
        SettingGateway.SaveDefaultSubscriptionValues(defaultSubscriptionValues);
    };

    return (
        <Container className="page">
            <form onSubmit={handleSave}>
                <Typography variant="h4">
                    Default Subscription Values
                </Typography>
                <Box sx={{ marginTop: '20px' }}>
                    {defaultSubscriptionValues && <DefaultSubscribeValues sites={sites} defaultSubscriptionValues={defaultSubscriptionValues} setDefaultSubscriptionValues={setDefaultSubscriptionValues} />} 
                </Box>
                <Button type="submit" variant="contained" sx={{ marginTop: '10px' }}>Save</Button>
            </form>
        </Container>
    );
};

export default Settings;