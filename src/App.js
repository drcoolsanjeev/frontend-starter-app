/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';
import axios from 'axios';
import toggleFeature from './Utilities/unleash';

async function registerUnleash() {
    let registerURL = 'http://localhost:4242/api/client/register';
    axios.post(registerURL, {
        appName: 'tester',
        instanceId: 'test',
        strategies: [ 'default', 'userWithId', 'accountWithId' ],
        started: new Date().toISOString(),
        interval: 1000
    }).then(response => {
        console.log('Unleash server registered');
    }).catch(error => {
        console.log('Error during register:', error);
    });
}

class App extends Component {

    async componentDidMount () {
        insights.chrome.init();
        registerUnleash();
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
