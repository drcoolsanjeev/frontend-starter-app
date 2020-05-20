/* eslint-disable camelcase */
import React, { useState, useEffect, Fragment } from 'react';
import { useStore, connect } from 'react-redux';
import { Skeleton, SkeletonSize, PageHeader, Main } from '@redhat-cloud-services/frontend-components';
import { Grid, GridItem } from '@patternfly/react-core';
import { entitesDetailReducer } from '../../store/reducers';
import { withRouter, matchPath, Link } from 'react-router-dom';
import * as pfReactTable from '@patternfly/react-table';
import { register } from '../../store';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import PropTypes from 'prop-types';

const Inventory = ({ entity }) => {
    const [ ConnectedInventory, setInventory ] = useState({});
    const store = useStore();
    const { InventoryDetail, AppInfo } = ConnectedInventory;
    const loadInventory = async () => {
        const {
            inventoryConnector,
            mergeWithDetail,
            INVENTORY_ACTION_TYPES
        } = await insights.chrome.loadInventory({
            reactRouterDom: { withRouter, matchPath },
            pfReactTable
        });
        register({
            ...mergeWithDetail(entitesDetailReducer(INVENTORY_ACTION_TYPES))
        });

        const { InventoryDetailHead, AppInfo } = inventoryConnector(store);
        setInventory({
            InventoryDetail: InventoryDetailHead,
            AppInfo
        });
    };

    useEffect(() => {
        loadInventory();
    }, []);

    return <Fragment>
        <PageHeader className="pf-m-light ins-inventory-detail" >
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link
                        to={ location.pathname.includes('starter/inventory') ? '/inventory' : '/detail' }
                    >
                        Inventory
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem isActive>
                    {
                        entity ?
                            entity.display_name :
                            <Skeleton size={ SkeletonSize.xs } />
                    }
                </BreadcrumbItem>
            </Breadcrumb>
            {InventoryDetail && <InventoryDetail hideBack showTags hideInvLink />}
        </PageHeader>
        <Main>
            <Grid gutter="md">
                <GridItem span={ 12 }>
                    {AppInfo && <AppInfo showTags />}
                </GridItem>
            </Grid>
        </Main>
    </Fragment>;
};

Inventory.propTypes = {
    entity: PropTypes.shape({
        display_name: PropTypes.string
    })
};

function mapStateToProps({ entityDetails }) {
    return {
        entity: entityDetails && entityDetails.entity
    };
}

export default connect(mapStateToProps)(Inventory);
