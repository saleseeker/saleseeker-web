import React, { useState, useEffect, Fragment } from 'react'
import { Typography, Box, Stack, TextField, Button } from "@mui/material";
import Subscribe from '../components/Subscribe';
import { useParams } from 'react-router-dom'
import SettingGateway  from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const Subscriptions = () => {
    const params = useParams();
    const [items, setItems] = useState(null);
    const [sites, setSites] = useState(null);
    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);
    const [hasEmailAddress, setHasEmailAddress] = useState(false);

    useEffect(() => {
        
        (async () => {
            setSites(await SaleSeekerGateway.GetSites());
            setItems(await SaleSeekerGateway.GetItems());
            setSubscriptions(await SaleSeekerGateway.GetSubscriptions());
          })();

        

        var defaultValues = SettingGateway.GetDefaultSubscriptionValues();
        setDefaultSubscriptionValues(defaultValues);
        if (defaultValues.emailAddress != '')
            setHasEmailAddress(true);
    },[]);

    const handleSave = () => {
        SettingGateway.SaveDefaultSubscriptionValues(defaultSubscriptionValues);
        setHasEmailAddress(true);
    };

    const handleEmailChange = (e) => {
        setDefaultSubscriptionValues({ ...defaultSubscriptionValues, emailAddress: e.target.value });
    }

    const renderEmail = () => {
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

    const renderSubscription = () => {
        const renderSubscribe = (itemID) => {
            const item = items.find(i => i.id == itemID);
            return (<Box sx={{ marginBottom: '15px' }}><Subscribe item={item} sites={sites} subscriptions={subscriptions} /></Box>);
        };

        if (params.itemID) {
            return (renderSubscribe(params.itemID))
        }

        return subscriptions.map(s => renderSubscribe(s.itemID));
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
};

export default Subscriptions;