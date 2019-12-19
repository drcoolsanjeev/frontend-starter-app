/* eslint-disable no-console */
import axios from 'axios';

async function checkFeature(feature) {
    let url = 'http://localhost:4242/api/client/features/';
    let result = false;
    axios.get(url + feature, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => {
        result =  response.data.enabled;
        console.log('unleash.js:' + result);
    })
    .catch(error => {
        console.log(error);
    });
    return result;
}

export default checkFeature;
