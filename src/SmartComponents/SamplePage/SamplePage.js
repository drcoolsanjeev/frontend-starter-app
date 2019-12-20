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
        this.state = { featureHello: false };
    }

    async componentDidMount() {
        await checkFeature('hello').then(response => {
            this.setState({
                featureHello: response
            });
        })

        //console.log('33', Hello);
    }



    createButton1(){
        if(this.state.featureHello === true){
            return <Button variant='primary' id='defaultStrat'> Unleash Feature Enabled </Button>;
        } else{
            return <Button variant='primary' id='defaultStrat'> Unleash Feauture not Enabled </Button>;
        }

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
                        { this.createButton1() }
                        <Button variant='secondary'> Unleash-by AccountID </Button>
                        <Button variant='tertiary'> Unleash-by UserID </Button>
                        { /* <Button variant='danger'> PF-Next Danger Button </Button> */ }
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
