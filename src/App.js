import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';

class App extends Component {

    componentDidMount () {
        insights.chrome.init();
        // TODO change this to your appname
        // TODO should the sample app webpack just rewrite this automatically?
        if (location.pathname.includes('starter-second')) {
            insights.chrome.identifyApp('starter-second');
        } else if (location.pathname.includes('starter-third')) {
            insights.chrome.identifyApp('starter-third');
        } else {
            insights.chrome.identifyApp('starter').then(() => {
                // Do something in here
                if (location.pathname.includes('starter/detail')) {
                    insights.chrome.appNavClick({ id: 'starter-detail' });
                } else if (location.pathname.includes('starter/inventory')) {
                    insights.chrome.appNavClick({ id: 'inventory' });
                }
            });
        }

        // event.domEvent event.navId
        this.appNav = insights.chrome.on('APP_NAVIGATION', (event) => {

            if (event.domEvent) {
                if ([ 'starter-detail' ].includes(event.navId)) {
                    this.props.history.push(`/detail`);
                } else {
                    this.props.history.push(`/${event.navId}`);
                }
            }
        });
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
