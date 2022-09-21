import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import { Button, Typography, Box } from '@mui/material';
import { sitesMock } from '../Mocks';
import DefaultSubscribeValues from '../components/DefaultSubscribeValues';
import { getDefaultSubscriptionValues, saveDefaultSubscriptionValues } from '../gateways/SettingsGateway';

export default function Settings() {

    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(null);
    const [sites, setSites] = useState(null);

    useEffect(() => {
        setDefaultSubscriptionValues(getDefaultSubscriptionValues());
        setSites(sitesMock);
    },[]);

    const handleSave = () => {
        
        saveDefaultSubscriptionValues(defaultSubscriptionValues);
    };

    return (
        <Container>
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