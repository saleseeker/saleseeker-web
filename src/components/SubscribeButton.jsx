import React, { Fragment, useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Dialog, DialogContentText, DialogContent, DialogTitle } from '@mui/material';
import DefaultSubscribeValues from './DefaultSubscribeValues';
import { Link } from 'react-router-dom'
import SettingGateway from '../gateways/SettingGateway';
import SaleSeekerGateway from '../gateways/SaleSeekerGateway';

const SubscribeButton = ({ item, sites, subscriptions, defaultSubscriptionValues }) => {

    const [open, setOpen] = useState(false);
    const [subscriptionValues, setSubscriptionValues] = useState(null);

    useEffect(() => {
        setSubscriptionValues(defaultSubscriptionValues);
    }, [defaultSubscriptionValues]);

    const handleClick = (subscription) => {
        setOpen(true);
        if (!subscription && defaultSubscriptionValues.emailAddress != '')
            setOpen(true);
        else
            SaleSeekerGateway.SaveSubscription(defaultSubscriptionValues.emailAddress, item.id, defaultSubscriptionValues.alertThreshold, defaultSubscriptionValues.siteIDs);
    };

    const handleSubscribe = (e) => {
        SettingGateway.SaveDefaultSubscriptionValues(subscriptionValues);
        SaleSeekerGateway.SaveSubscription(subscriptionValues.emailAddress, item.id, subscriptionValues.alertThreshold, subscriptionValues.siteIDs);
        e.preventDefault();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const subscription = (subscriptions != null) ? subscriptions.find(s => s.itemID == item.id) : {};

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
                        <Box sx={{ float: 'right' }}>
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