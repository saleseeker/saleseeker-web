import React, { useState, useEffect } from 'react'
import { Typography, Box, Stack, TextField, Button, Container } from "@mui/material";
import Subscribe from '../components/Subscribe';
import { useParams } from 'react-router-dom'
import SettingGateway  from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const Subscriptions = () => {
    const params = useParams();
    const [items, setItems] = useState(null);
    const [sites, setSites] = useState(null);
    const [defaultSubscriptionValues, setDefaultSubscriptionValues] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [hasEmailAddress, setHasEmailAddress] = useState(false);
    const [email, setEmail] = useState(SettingGateway.GetDefaultSubscriptionValues().emailAddress ?? "");

    useEffect(() => {
        if (email != ""){
            fetch();
        }
    },[email]);

    const handleSave = () => {
        setHasEmailAddress(true);
    };

    const fetch = async () => {
        setSites(await SaleSeekerGateway.GetSites());
        setItems(await SaleSeekerGateway.GetItems());
        setSubscriptions(await SaleSeekerGateway.GetSubscriptions());
    }

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
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
                        value={email}
                        onChange={handleEmailChange}
                    />
                </Stack>
                <Button type="submit" onClick={handleSave} variant="contained" sx={{ marginTop: '10px' }}>View Subscriptions</Button>
            </form>
        )
    }

    const renderSubscription = () => {
        const renderSubscribe = (itemId) => {
            const item = items.find(i => i.id == itemId);
            return (<Box key={itemId} sx={{ marginBottom: '15px' }}><Subscribe item={item} sites={sites} subscriptions={subscriptions} /></Box>);
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
                    !hasEmailAddress ?
                        renderEmail() :
                        renderSubscription()
                }
            </Box>
        </Container>
    );
};

export default Subscriptions;