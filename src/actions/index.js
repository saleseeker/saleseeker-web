import axios from 'axios';
const baseUrl = process.env.REACT_APP_LOCAL_ROOT_API_HOST;
const token = process.env.REACT_APP_BEARER_TOKEN;
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

export const getItems = () => async dispatch => {
    const url = baseUrl + '/api/ui/items';
    const res = await axios.get(url, config);
    const pr = res.data;
    console.log("items : ",pr);
    return pr;
};

export const getItem = (id) => async dispatch => {
    const url = `${baseUrl}/api/ui/items/${id}`;
    const res = await axios.get(url,config);
    const pr = res.data;
    console.log("item : ",pr);
    return pr;
}

export const getSites = () => async dispatch => {
    const url = `${baseUrl}/api/ui/sites}`;
    const res = await axios.get(url,config);
    const pr = res.data;
    console.log("sites : ",pr);
    return pr;
}

export const getSite = (id) => async dispatch => {
    const url = `${baseUrl}/api/ui/sites/${id}`;
    const res = await axios.get(url,config);
    const pr = res.data;
    console.log("site : ",pr);
    return pr;
}