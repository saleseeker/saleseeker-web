import { getCookie, createCookie, eraseCookie } from "../common/Helper"

const SUBSCRIPTION_EMAIL_ADDRESS = "SubscriptionEmailAddress";
const SUBSCRIPTION_ALERT_THRESHOLD = "SubscriptionAlertThreshold";
const SUBSCRIPTION_SITES = "SubscriptionSites";

const SettingGateway = {
    GetDefaultSubscriptionValues: () => {

        const emailAddress = getCookie(SUBSCRIPTION_EMAIL_ADDRESS);

        if (!emailAddress)
            return {
                emailAddress: '',
                alertThreshold: '10',
                siteIDs: null
            };

        const sites = getCookie(SUBSCRIPTION_SITES);
        return {
            emailAddress: getCookie(SUBSCRIPTION_EMAIL_ADDRESS),
            alertThreshold: getCookie(SUBSCRIPTION_ALERT_THRESHOLD),
            siteIDs: sites ? sites.split(',') : null
        };
    },

    SaveDefaultSubscriptionValues: (subscriptionValues) => {
        createCookie(SUBSCRIPTION_EMAIL_ADDRESS, subscriptionValues.emailAddress);
        createCookie(SUBSCRIPTION_ALERT_THRESHOLD, subscriptionValues.alertThreshold);

        if (subscriptionValues.siteIDs)
            createCookie(SUBSCRIPTION_SITES, subscriptionValues.siteIDs.join(','));
        else
            eraseCookie(SUBSCRIPTION_SITES)
    }
};

export default SettingGateway;