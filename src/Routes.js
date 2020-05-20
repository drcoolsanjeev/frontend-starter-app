import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';
import some from 'lodash/some';

/**
 * Aysnc imports of components
 *
 * https://webpack.js.org/guides/code-splitting/
 * https://reactjs.org/docs/code-splitting.html
 *
 * pros:
 *      1) code splitting
 *      2) can be used in server-side rendering
 * cons:
 *      1) nameing chunk names adds unnecessary docs to code,
 *         see the difference with DashboardMap and InventoryDeployments.
 *
 */
const SamplePage = asyncComponent(() => import(/* webpackChunkName: "SamplePage" */ './SmartComponents/SamplePage/SamplePage'));
const Inventory = asyncComponent(() => import(/* webpackChunkName: "Rules" */ './SmartComponents/Inventory/InventorySlave'));
const InventoryMaster = asyncComponent(() => import(/* webpackChunkName: "Rules" */ './SmartComponents/Inventory/InventoryMaster'));
const InventoryDetail = asyncComponent(() => import(/* webpackChunkName: "Rules" */ './SmartComponents/Inventory/InventoryDetail'));
const paths = {
    samplepage: '/samplepage',
    rules: '/detail',
    inventory: '/inventory',
    inventoryDetail: '/inventory/:inventoryId',
    inventoryMasterDetail: '/detail/:inventoryId'
};

type Props = {
    childProps: any
};

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
    const root = document.getElementById('root');
    root.removeAttribute('class');
    root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
    root.setAttribute('role', 'main');

    return (<Route { ...rest } component={ Component } />);
};

InsightsRoute.propTypes = {
    component: PropTypes.func,
    rootClass: PropTypes.string
};

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = (props: Props) => {
    const path = props.childProps.location.pathname;

    return (
        <Switch>
            <InsightsRoute path={ paths.samplepage } component={ SamplePage } rootClass='samplepage'/>
            <InsightsRoute exact path={ paths.rules } component={ InventoryMaster } rootClass='rules'/>
            <InsightsRoute exact path={ paths.inventory } component={ Inventory } rootClass='inventory'/>
            <InsightsRoute path={ paths.inventoryDetail } component={ InventoryDetail } rootClass='inventory'/>
            <InsightsRoute path={ paths.inventoryMasterDetail } component={ InventoryDetail } rootClass='inventory'/>

            { /* Finally, catch all unmatched routes */ }
            <Route render={ () => some(paths, p => p === path) ? null : (<Redirect to={ paths.samplepage }/>) }/>
        </Switch>
    );
};
