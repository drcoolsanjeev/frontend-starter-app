import React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons/';
import propTypes from 'prop-types';
import './Error.styles.scss';

import {
    Title,
    EmptyState,
    EmptyStateVariant,
    EmptyStateIcon,
    EmptyStateBody
} from '@patternfly/react-core';

const Error = ({ errorTitle, errorDescription }) => {

    // const renderButtonLabel = () => {
    //     return ('Go back!');
    // };

    const renderDescription = () => {
        console.log('This is our error description: ', errorDescription);
        if (errorDescription.length > 0) {
            return (
                <Stack>
                    <StackItem>
                        {errorDescription}
                    </StackItem>
                </Stack>
            );
        }

        return (
            <Stack>
                <StackItem>
                    There was a problem accessing the request. Please try again.
                </StackItem>
                <StackItem>
                    If the problem persists, contact <a href="https://access.redhat.com/support?extIdCarryOver=true&sc_cid=701f2000001Css0AAC">
                    Red Hat Supprt</a> or check out our <a href="status.redhat.com"> status page</a> for known outages.
                </StackItem>
            </Stack>
        );
    };

    return (
        <EmptyState variant={EmptyStateVariant.large}>
            <EmptyStateIcon icon={ExclamationCircleIcon} />
            <Title headingLevel='h4' size='lg'>
                {errorTitle}
            </Title>
            <EmptyStateBody>
                <>
                    {renderDescription}
                </>
            </EmptyStateBody>

        </EmptyState>
    );
};

Error.propTypes = {
    errorTitle: propTypes.string,
    errorDescription: propTypes.string
};

Error.defaultProps = {
    errorTitle: 'Error',
    errorDescription: 'There was a problem accessing the request. Please try again.'
};

export default Error;
