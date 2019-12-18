/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';
import axios from 'axios';

class App extends Component {

    componentDidMount () {
        insights.chrome.init();
        // TODO change this to your appname
        // TODO should the sample app webpack just rewrite this automatically?
        insights.chrome.identifyApp('fflag testing');

        // axios.get('https://dog.ceo/api/breeds/image/random')
        // .then(response => {
        //     console.log(response.data);
        // })
        // .catch(error => {
        //     console.log(error);
        // });
        let urlForHelloFlag = 'http://unleash-server-unleash-test.5a9f.insights-dev.openshiftapps.com/api/client/features/hello';
        axios.get(urlForHelloFlag, {
            headers: {
                'Access-Control-Allow-Origin': 'http://unleash-server-unleash-test.5a9f.insights-dev.openshiftapps.com'
                //'Content-Security-Policy': 'upgrade-insecure-requests'
            }
        })
        .then(respone =>{
            console.log(respone);
        })
        .catch(error =>{
            console.log(error);
        });

        this.appNav = insights.chrome.on('APP_NAVIGATION', event => this.props.history.push(`/${event.navId}`));
    }

    componentWillUnmount () {
        this.appNav();
    }

    render () {
        return (
            <Routes childProps={ this.props } />
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

/**
 * withRouter: https://reacttraining.com/react-router/web/api/withRouter
 * connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md
 *          https://reactjs.org/docs/higher-order-components.html
 */
export default withRouter (connect()(App));
