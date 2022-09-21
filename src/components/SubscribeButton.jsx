import React, { Fragment, useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Dialog, DialogContentText, DialogContent, DialogTitle } from '@mui/material';
import find from 'lodash.find'
import DefaultSubscribeValues from './DefaultSubscribeValues';
import { Link } from 'react-router-dom'
import { saveDefaultSubscriptionValues } from '../gateways/SettingsGateway';

const SubscribeButton = ({ item, sites, subscriptions, defaultSubscriptionValues }) => {

    const [open, setOpen] = useState(false);
    const [subscriptionValues, setSubscriptionValues] = useState(null);
    
    useEffect(() => {
        setSubscriptionValues(defaultSubscriptionValues);
    }, [defaultSubscriptionValues]);

    const handleClick = (subscription) => {
        console.log(subscriptions)
        if (!subscription && defaultSubscriptionValues.emailAddress == '')
            setOpen(true);
    };

    const handleSubscribe = (e) => {
        console.log(subscriptionValues)
        saveDefaultSubscriptionValues(subscriptionValues);
        e.preventDefault();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const subscription = find(subscriptions, s => s.itemID == item.id);
    
    return (
        <Fragment>
            <ButtonGroup variant='text' sx={{ backgroundColor: '#D9D9D9', width: '100%', marginLeft: '5px', minWidth: '175px' }}>
                <Button onClick={() => handleClick(subscription)} sx={{ width: '100%', color: 'black', textTransform: 'none', fontWeight: 'bold' }}>{subscription ? 'Unsubscribe' : 'Subscribe'}</Button>
                {subscription && <Button sx={{ lineHeight: '1' }}><Link to={`/subscriptions/${item.id}`}><img src={require('../images/settings_icon.png')} alt="Buy" style={{ width: '20px' }} /></Link></Button>}
            </ButtonGroup>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubscribe}>
                        <DialogContentText>
                            <p>
                                To subscribe to this item, please enter your email address here. We
                                will send alerts each time it goes on sale for the following settings:
                            </p>
                        </DialogContentText>
                        {subscriptionValues && <DefaultSubscribeValues sites={sites} defaultSubscriptionValues={subscriptionValues} setDefaultSubscriptionValues={setSubscriptionValues} />}
                        <br />
                        <Box sx={{float:'right'}}>
                        <Button type="submit">Subscribe</Button>
                            <Button onClick={handleClose}>Cancel</Button>                        
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default SubscribeButton;