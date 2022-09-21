import React, { useState, useEffect, Fragment } from 'react'
import { Typography, Box, Stack, TextField, Button } from "@mui/material";
import Subscribe from '../components/Subscribe';
import { defaultSubscriptionValueMock, itemMocks, sitesMock, subscriptionMock } from '../Mocks';
import { useParams } from 'react-router-dom'
import find from 'lodash.find';
import map from 'lodash.map';
import { getDefaultSubscriptionValues, saveDefaultSubscriptionValues } from '../gateways/SettingsGateway';

export default function Subscriptions() {
    const params = useParams();
    const [items, setItems] = useState(null);
    const [sites, setSites] = useState(null);
    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);
    const [hasEmailAddress, setHasEmailAddress] = useState(false);

    useEffect(() => {
        setItems(itemMocks);
        setSites(sitesMock);
        setSubscriptions(subscriptionMock);

        var defaultValues = getDefaultSubscriptionValues();
        setDefaultSubscriptionValues(defaultValues);
        if (defaultValues.emailAddress != '')
            setHasEmailAddress(true);
    },[]);

    const handleSave = () => {
        saveDefaultSubscriptionValues(defaultSubscriptionValues);
        setHasEmailAddress(true);
    };

    const handleEmailChange = (e) => {
        setDefaultSubscriptionValues({ ...defaultSubscriptionValues, emailAddress: e.target.value });
    }

    function renderEmail() {
        return (
            <form onSubmit={handleSave}>
                <Stack spacing={2} direction="row">
                    <Typography sx={{ width: '120px' }}>Email Address:</Typography>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        type="email"
                        size="small"
                        variant="outlined"
                        sx={{ width: '300px' }}
                        value={defaultSubscriptionValues.emailAddress}
                        onChange={handleEmailChange}
                    />
                </Stack>
                <Button type="submit" variant="contained" sx={{ marginTop: '10px' }}>View Subscriptions</Button>
            </form>
        )
    }

    function renderSubscription() {
        const renderSubscribe = (itemID) => {
            const item = find(items, i => i.id == itemID);
            return (<Box sx={{ marginBottom: '15px' }}><Subscribe item={item} sites={sites} subscriptions={subscriptions} /></Box>);
        };

        if (params.itemID) {
            return (renderSubscribe(params.itemID))
        }

        return map(subscriptions, s => renderSubscribe(s.itemID));
    }

    return (
        <div>
            <Typography variant="h4">{params.itemID ? 'Subscription' : 'Subscriptions'}</Typography>
            <Box sx={{ marginTop: '10px' }}>
                {
                    defaultSubscriptionValues && !hasEmailAddress ?
                        renderEmail() :
                        defaultSubscriptionValues && items && sites && subscriptions && renderSubscription()}
            </Box>
        </div>



    );
}