/* eslint-disable no-console */
import axios from 'axios';

async function checkFeature(feature) {
    let url = 'http://localhost:4242/api/client/features/';
    let result = false;
    await axios.get(url + feature, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => {
        const thisUserId = '100';
        const thisAccountId = '1';
        console.log('unleash.js:', response.data);
        if (response.data) {
            if (response.data.enabled) {
                response.data.strategies.forEach(s => {
                    if (s.name === 'default') {
                        result = true;
                    } else if (s.name === 'userWithId') {
                        s.parameters.userIds.split(',').forEach(userId => {
                            if (userId === thisUserId) {
                                result = true;
                            }
                        });
                    } else if (s.name === 'accountWithId') {
                        s.parameters.accountIds.split(',').forEach(accountId => {
                            if (accountId === thisAccountId) {
                                result = true;
                            }
                        });
                    }
                });
            }
        }
    })
    .catch(error => {
        console.log(error);
    });
    return result;
}

export default checkFeature;
