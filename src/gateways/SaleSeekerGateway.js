import { ConnectWithoutContact } from "@mui/icons-material";
import axios from "axios"
import configData from "../config.json";
import { itemMocks, sitesMock, subscriptionMock } from "../Mocks";

const SaleSeekerGateway = {
    GetSites: async () => {
        return sitesMock;
        return await axios.get(`${configData.SALESEEKER_API_URL}/Sites`);
    },
    //TODO - Move email to header
    //TODO - return one subscription per item with sites array in response
    //TODO - remove Brian hardcoded email address
    GetSubscriptions: async (emailAddress) => {
        //return subscriptionMock;
        try {
            // Hard coded email parameter for testing purposes
            const getSubscriptions = await axios.get(`${configData.SALESEEKER_API_URL}/subscribe/get?email=mrbtmkhabela@gmail.com`,
            {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImlhdCI6MTY2MjcyODM2OCwiZXhwIjoxNjk0MjY0Mzk3LCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCIsInN1YiI6IkpXVFNlcnZpY2VBY2Nlc3NUb2tlbiJ9.KMRzEFusF1dlC9Bye7ReZaGI2eUVEHHBTZJ4pmYZXeA'               
                }
            });
            return getSubscriptions.data.result[0].subscriptions;
        } catch(err) {
            console.log(err);
        }
        return [];
    },
    //TODO - Remove create/edit and have one end points to handle both. 
    //TODO - Move email to header
    SaveSubscription: async (emailAddress, itemID, alertThreshold, sites) => {
        axios.post(`${configData.SALESEEKER_API_URL}/subscribe`, {
            itemID, alertThreshold, sites
        }, {
            headers: {
                emailAddress: emailAddress
            }
        });
    },
    //TODO create delete
    DeleteSubscription: async (emailAddress, itemID) => {
        axios.delete(`${configData.SALESEEKER_API_URL}/subscribe/delete?itemId=${itemID}`, {
            headers: {
                emailAddress: emailAddress
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