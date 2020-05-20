import React, { useRef, useState, useEffect, Fragment } from 'react';
import { useStore } from 'react-redux';
import { PageHeader, PageHeaderTitle, Main } from '@redhat-cloud-services/frontend-components';
import { Grid, GridItem } from '@patternfly/react-core';
import { entitiesReducer } from '../../store/reducers';
import { withRouter, matchPath } from 'react-router-dom';
import * as pfReactTable from '@patternfly/react-table';
import { register } from '../../store';

const Inventory = () => {
    const inventory = useRef(null);
    const [ ConnectedInventory, setInventory ] = useState();
    const store = useStore();
    const loadInventory = async () => {
        const {
            inventoryConnector,
            mergeWithEntities,
            INVENTORY_ACTION_TYPES
        } = await insights.chrome.loadInventory({
            reactRouterDom: { withRouter, matchPath },
            pfReactTable
        });
        register({
            ...mergeWithEntities(entitiesReducer(INVENTORY_ACTION_TYPES))
        });

        const { InventoryTable } = inventoryConnector(store);
        setInventory(() => InventoryTable);
    };

    useEffect(() => {
        loadInventory();
    }, []);

    return <Fragment>
        <PageHeader className="pf-m-light">
            <PageHeaderTitle title='Inventory'/>
        </PageHeader>
        <Main>
            <Grid gutter="md">
                <GridItem span={ 12 }>
                    {
                        ConnectedInventory &&
                        <ConnectedInventory
                            store={ store }
                            ref={ inventory }
                        />
                    }
                </GridItem>
            </Grid>
        </Main>
    </Fragment>;
};

export default Inventory;
