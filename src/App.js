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

class App extends Component {

    async componentDidMount () {
        insights.chrome.init();
        //let urlForHelloFlag = 'http://localhost:4242/api/client/features';
        // axios.get(urlForHelloFlag, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // })
        // .then(response =>{
        //     console.log('Bah...', response.data);
        // })
        // .catch(error =>{
        //     console.log(error);
        // });
        // let featureHello = toggleFeature('hello');
        // featureHello.then(response => {
        //     if (response) {
        //         console.log(response);
        //         document.getElementById('defaultStrat').style.color = 'brown';
        //     }
        // });

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
