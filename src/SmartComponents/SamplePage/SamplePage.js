/* eslint-disable no-console */
/* eslint-disable*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import asyncComponent from '../../Utilities/asyncComponent';
import './sample-page.scss';
import checkFeature from '../../Utilities/unleash';
import { connect } from 'react-redux';

import { Section, Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';

import { Button } from '@patternfly/react-core';

const SampleComponent = asyncComponent(() => import('../../PresentationalComponents/SampleComponent/sample-component'));
// const PageHeader2 = asyncComponent(() => import('../../PresentationalComponents/PageHeader/page-header'));
// const PageHeaderTitle2 = asyncComponent(() => import('../../PresentationalComponents/PageHeader/page-header-title'));
/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class SamplePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userButton: false,
            accountButton: false,
            gaButton: false,
        };
    }

    async componentDidMount() {
        await checkFeature('user-feature').then(userResponse => {
            this.setState({
                userButton: userResponse
            });
        });
        await checkFeature('account-feature').then(accountResponse => {
            this.setState({
                accountButton: accountResponse
            });
        });
        await checkFeature('released-feature').then(gaResponse => {
            this.setState({
                gaButton: gaResponse
            });
        });
    }

    createButtons(){
        let buttons = [];
        const { userButton, accountButton, gaButton } = this.state
        if (userButton === true){
            buttons.push(<Button variant='primary'> User Button Enabled </Button>);
        }
        if (accountButton === true) {
            buttons.push(<Button variant='secondary'> Account Button Enabled </Button>);
        }
        if (gaButton === true) {
            buttons.push(<Button variant='tertiary'> GA release Button Enabled </Button>);
        }
        return buttons;

    }

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Sample Insights App'/>
                    <p> This is page header text </p>
                </PageHeader>
                <Main>
                    <h1> Sample Component </h1>
                    <SampleComponent> Sample Component </SampleComponent>
                    <h1> Cards </h1>
                    <h1> Buttons </h1>
                    <Section type='button-group'>
                        { this.createButtons().map( button => {
                           return (
                               <React.Fragment>
                                    { button }
                                </React.Fragment>
                           );
                        }) }
                    </Section>
                </Main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    featureHello: state.helloEnabled
})

export default withRouter(connect(mapStateToProps)(SamplePage));
