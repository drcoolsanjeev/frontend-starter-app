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
            feature: {
                name: null,
                enabled: false,
                strategies: [{
                  name: null,
                  parameters: { data: null } 
                }]
            },
            userWithId: 45,
            accountWithId: 0
        };
    }

    async componentDidMount() {
        await checkFeature('multiStrat').then(response => {
            console.log(response)
            this.setState({
                feature: response
            });
        })
    }
    createButtons(){
        let buttons = [];
        const { feature, userWithId, accountWithId } = this.state
        if(feature.enabled === true){
            buttons.push(<Button variant='primary'> Unleash Feature Enabled </Button>);
            feature.strategies.map((strategy) => {
                if (strategy.name.includes('Id')){
                    let name = []
                    name.push(strategy.name)
                    let keys = Object.keys(strategy.parameters)
                    if (strategy.parameters[keys[0]].includes(this.state[name[0]])) {
                        buttons.push(<Button variant='primary'> Unleash Feature Enabled for { strategy.name } { this.state[name[0]] }</Button>);
                    }else{
                        buttons.push(<Button variant='primary'> Unleash Feature Not Enabled for { strategy.name } { this.state[name[0]] }</Button>);
                    }

                }
            })
        } else{
            buttons.push(<Button variant='primary'> Unleash Feauture not Enabled </Button>);
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
                        {/* <Button variant='secondary'> Unleash-by AccountID </Button>
                        <Button variant='tertiary'> Unleash-by UserID </Button> */}
                        <Button variant='danger'> PF-Next Danger Button </Button>
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
