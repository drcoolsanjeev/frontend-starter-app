import React from 'react';
import { withRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { Button, StackItem, Stack, Title } from '@patternfly/react-core';
// import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
// import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/';
import Error from './Error/Error';
// import asyncComponent from '../../Utilities/asyncComponent';

// const SampleComponent = asyncComponent(() => import('../../Components/SampleComponent/sample-component'));
import './sample-page.scss';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const SamplePage = () => {
    // const dispatch = useDispatch();

    // const handleAlert = () => {
    //     dispatch(
    //         addNotification({
    //             variant: 'success',P
    //             title: 'Notification title',
    //             description: 'notification description'
    //         })
    //     );
    // };

    return (
        <>
            <Error />
            {/* <h1>Hello</h1> */}
        </>
    );
};

export default withRouter(SamplePage);
