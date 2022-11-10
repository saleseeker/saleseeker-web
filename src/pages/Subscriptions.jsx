import React, { useState, useEffect, Fragment } from 'react'
import { Typography, Box, Stack, TextField, Button, Container } from "@mui/material";
import Subscribe from '../components/Subscribe';
import { useParams } from 'react-router-dom'
import SettingGateway  from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const Subscriptions = () => {
    const params = useParams();
    const [items, setItems] = useState(null);
    const [sites, setSites] = useState(null);
    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(SettingGateway.GetDefaultSubscriptionValues());
    const [subscriptions, setSubscriptions] = useState(null);
    const [hasEmailAddress, setHasEmailAddress] = useState(false);

    useEffect(() => {
        if (defaultSubscriptionValues.emailAddress != ""){
            fetch();
        }

        if (defaultSubscriptionValues.emailAddress != '')
            setHasEmailAddress(true);

    },[]);

    const handleSave = () => {
        setHasEmailAddress(true);
    };

    const fetch = async () => {
        setSites(await SaleSeekerGateway.GetSites());
        setItems(await SaleSeekerGateway.GetItems());
        setSubscriptions(await SaleSeekerGateway.GetSubscriptions(defaultSubscriptionValues.emailAddress));
    }

    const handleEmailChange = (e) => {
        setDefaultSubscriptionValues({ ...defaultSubscriptionValues, emailAddress: e.target.value });
    }

    const renderEmail = () => {
        return (
            <form>
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
                <Button type="submit" onClick={handleSave} variant="contained" sx={{ marginTop: '10px' }} color="secondary">View Subscriptions</Button>
            </form>
        )
    }

    const renderSubscription = () => {
        var distinctItems = {};
        const renderSubscribe = (itemId) => {
            if (!distinctItems[itemId])
            {
                distinctItems[itemId] = true;
                const item = items.find(i => i.id == itemId);
                return (<Box key={itemId} sx={{ marginBottom: '15px' }}><Subscribe item={item} sites={sites} subscriptions={subscriptions} /></Box>);
            }
            return <Fragment/>;
        };

        if (params.itemId) {
            return (renderSubscribe(params.itemId))
        }
        return (subscriptions.length === 0) ? (<Box>No Subscriptions</Box>) : subscriptions.map(s => renderSubscribe(s.itemId));
    }

    return (
        <Container className="page">
            <Typography variant="h4">{params.itemId ? 'Subscription' : 'Subscriptions'}</Typography>
            <Box sx={{ marginTop: '10px' }}>
                {
                    defaultSubscriptionValues && !hasEmailAddress ?
                        renderEmail() :
                        defaultSubscriptionValues && items && sites && subscriptions && renderSubscription()
                }
            </Box>
        </Container>
    );
};

export default Subscriptions;