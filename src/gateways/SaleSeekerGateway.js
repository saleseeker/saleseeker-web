import axios from "axios"
import configData from "../config.json";
import { itemMocks, sitesMock, subscriptionMock } from "../Mocks";

const SaleSeekerGateway = {
    GetSites: async () => {
        return sitesMock;
        return await axios.get(`${configData.SALESEEKER_API_URL}/Sites`);
    },
    GetSubscriptions: async (emailAddress) => {
        return subscriptionMock;
        return axios.get(`${configData.SALESEEKER_API_URL}/Subscriptions`, {
            headers: {
                emailAddress: emailAddress
            }
        });
    },
    SaveSubscription: async (emailAddress, itemID, alertThreshold, sites) => {
        axios.post(`${configData.SALESEEKER_API_URL}/Subscriptions`, {
            itemID, alertThreshold, sites
        }, {
            headers: {
                emailAddress: emailAddress
            }
        });
    },
    GetItems: async () => {
        return itemMocks;
        return await axios.get(`${configData.SALESEEKER_API_URL}/Items`);
    }
};

export default SaleSeekerGateway;