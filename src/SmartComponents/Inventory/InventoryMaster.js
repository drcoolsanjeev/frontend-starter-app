import React, { useRef, useState, useEffect, Fragment } from 'react';
import { useStore } from 'react-redux';
import { PageHeader, PageHeaderTitle, Main } from '@redhat-cloud-services/frontend-components';
import { Grid, GridItem } from '@patternfly/react-core';
import { withRouter, matchPath } from 'react-router-dom';
import * as pfReactTable from '@patternfly/react-table';
import { register, addNewListener } from '../../store';
import { sortableInventory } from '../../store/reducers';

const Inventory = () => {
    const [ sortBy, onSort ] = useState({
        index: 1,
        key: 'updated',
        direction: 'desc'
    });
    const [ searchText, setSearchText ] = useState('');
    const [ items, setItems ] = useState([ 'a6054824-39c7-45ba-ab3b-efdf31ffb902', '6f5f4e15-1442-48f2-814c-406374abba24' ]);
    const inventory = useRef(null);
    const [ ConnectedInventory, setInventory ] = useState();
    const store = useStore();

    addNewListener({
        actionType: 'LOAD_ENTITIES_FULFILLED',
        callback: (data) => {
            console.log(data, 'ffff');
        }
    });

    const filterConfigItems = [{
        label: 'Filter by name',
        filterValues: {
            key: 'text-filter',
            onChange: (event, value) => setSearchText(value),
            value: searchText
        }
    }];
    const activeFiltersConfig = {
        filters: searchText.length > 0 && [({ category: 'Description', chips: [{ name: searchText }]})] || [],
        onDelete: () => setSearchText('')
    };
    const loadInventory = async () => {
        const {
            inventoryConnector,
            mergeWithEntities,
            INVENTORY_ACTION_TYPES
        } = await insights.chrome.loadInventory({
            reactRouterDom: { withRouter, matchPath },
            pfReactTable
        });
        register(mergeWithEntities(sortableInventory(INVENTORY_ACTION_TYPES, pfReactTable)));

        const { InventoryTable } = inventoryConnector(store);
        setInventory(() => InventoryTable);
    };

    useEffect(() => {
        loadInventory();
    }, []);

    const handleRefresh = (options) => {
        console.log(options);
        if (inventory && inventory.current) {
            inventory.current.onRefreshData(options);
        }
    };

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
                            items={ items }
                            sortBy={ sortBy }
                            onSort={ (...data) => {
                                setItems(items.reverse());
                                if (inventory && inventory.current) {
                                    inventory.current.onRefreshData();
                                }

                                onSort(...data);
                            } }
                            hasCheckbox={ false }
                            page={ 1 }
                            total={ 2 }
                            isLoaded
                            perPage={ 10 }
                            onRefresh={ handleRefresh }
                            filterConfig={ { items: filterConfigItems } }
                            activeFiltersConfig={ activeFiltersConfig }
                        />
                    }
                </GridItem>
            </Grid>
        </Main>
    </Fragment>;
};

export default Inventory;
