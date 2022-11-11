import { ConnectWithoutContact } from "@mui/icons-material";
import axios from "axios"
import configData from "../config.json";
import { itemMocks, sitesMock, subscriptionMock } from "../Mocks";

const SaleSeekerGateway = {
    GetSites: async () => {
        return sitesMock;
        return await axios.get(`${configData.SALESEEKER_API_URL}/Sites`);
    },
    GetSubscriptions: async (emailAddress) => {
        //return subscriptionMock;
        try {
            const getSubscriptions = await axios.get(`${configData.SALESEEKER_API_URL}/subscribe?email=${emailAddress}`,
            {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImlhdCI6MTY2MjcyODM2OCwiZXhwIjoxNjk0MjY0Mzk3LCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCIsInN1YiI6IkpXVFNlcnZpY2VBY2Nlc3NUb2tlbiJ9.KMRzEFusF1dlC9Bye7ReZaGI2eUVEHHBTZJ4pmYZXeA'
                }
            });
            return getSubscriptions.data.result && getSubscriptions.data.result.length > 0 ? getSubscriptions.data.result[0].subscriptions : [];
        } catch(err) {
            console.log(err);
        }
        return [];
    },
    CreateSubscription: async (emailAddress, itemID, notificationThreshold, sites) => {
        axios.post(`${configData.SALESEEKER_API_URL}/subscribe`, {
            itemID, notificationThreshold, sites, email: emailAddress
        }, {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImlhdCI6MTY2MjcyODM2OCwiZXhwIjoxNjk0MjY0Mzk3LCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCIsInN1YiI6IkpXVFNlcnZpY2VBY2Nlc3NUb2tlbiJ9.KMRzEFusF1dlC9Bye7ReZaGI2eUVEHHBTZJ4pmYZXeA'
            }
        });
    },
    UpdateSubscription: async (emailAddress, itemID, notificationThreshold, sites) => {
        axios.put(`${configData.SALESEEKER_API_URL}/subscribe`, {
            itemID, notificationThreshold, sites, email: emailAddress
        }, {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImlhdCI6MTY2MjcyODM2OCwiZXhwIjoxNjk0MjY0Mzk3LCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCIsInN1YiI6IkpXVFNlcnZpY2VBY2Nlc3NUb2tlbiJ9.KMRzEFusF1dlC9Bye7ReZaGI2eUVEHHBTZJ4pmYZXeA'
            }
        });
    },    
    DeleteSubscription: async (emailAddress, itemID) => {
        axios.delete(`${configData.SALESEEKER_API_URL}/subscribe?itemId=${itemID}&email=${emailAddress}`, {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImlhdCI6MTY2MjcyODM2OCwiZXhwIjoxNjk0MjY0Mzk3LCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCIsInN1YiI6IkpXVFNlcnZpY2VBY2Nlc3NUb2tlbiJ9.KMRzEFusF1dlC9Bye7ReZaGI2eUVEHHBTZJ4pmYZXeA'
            }
        });
    },    
    GetItems: async () => {
        try {
            const getItems = await axios.get(`${configData.SALESEEKER_API_URL}/ui/items`);
            return getItems.data.result;
        }
        catch(err) {
            console.log(err);
        };
    }
};

export default SaleSeekerGateway;