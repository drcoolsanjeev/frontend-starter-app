/* eslint-disable no-console */
import axios from 'axios';

async function checkFeature(feature) {
    let url = 'http://localhost:4242/api/client/features/';
    let result;
    await axios.get(url + feature, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => {
        //console.log(feature, 'data:', response.data);
        result = response.data; // TODO: this won't work with multiple strategies
        console.log('unleash.js:', result);
        // this.setState({
        //     feature: response
        // });
    })
    .catch(error => {
        console.log(error);
    });
    return result;
}

export default checkFeature;
