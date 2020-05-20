import React from 'react';
import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import { mergeArraysByKey } from '@redhat-cloud-services/frontend-components-utilities/files/helpers';
import { Tooltip } from '@patternfly/react-core';

export const entitiesReducer = ({ LOAD_ENTITIES_FULFILLED }) => applyReducerHash(
    {
        [LOAD_ENTITIES_FULFILLED]: (state) => {
            return {
                ...state,
                columns: mergeArraysByKey([
                    state.columns,
                    [{
                        key: 'reporter',
                        title: 'Reporter',
                        // eslint-disable-next-line react/display-name
                        renderFunc: (value, systemId) => {
                            return <Tooltip
                                position="left"
                                content={ <div>Reporter for system with ID {systemId}</div> }
                            >
                                <div>{value}</div>
                            </Tooltip>;
                        }
                    }]
                ], 'key')
            };
        }
    }
);

export const entitesDetailReducer = ({ LOAD_ENTITIES_FULFILLED }) => applyReducerHash(
    {
        [LOAD_ENTITIES_FULFILLED]: (state) => {
            return {
                ...state
            };
        }
    }
);

export const sortableInventory = ({ LOAD_ENTITIES_FULFILLED }, { sortable }) => applyReducerHash(
    {
        [LOAD_ENTITIES_FULFILLED]: (state) => {
            return {
                ...state,
                columns: state.columns.map((item) => ({
                    ...item,
                    transforms: [ sortable ]
                }))
            };
        }
    }
);
