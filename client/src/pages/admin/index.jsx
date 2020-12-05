import React, { useState } from 'react';
import ProductTable from '../../components/admin/product-table';
import { createProduct, deleteProduct } from '../../slices/product-slice';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withStyles } from '@material-ui/core/styles';
import './style.scss';
import OrderList from '../../components/admin/order-list';

function Admin(props) {
    const [recentPage, setRecentPage] = useState('Products');
    const handleChange = (event, newValue) => {
        setRecentPage(newValue);
    };

    const displayContent = () => {
        switch (recentPage) {
            case 'Products':
                return <ProductTable />;
            case 'Orders':
                return <OrderList />;
            case 'Users':
                return <ProductTable />;
            case 'Dashboard':
                return <ProductTable />;
        }
    }

    return (
        <div className="App container mt-5">
            <h1>App.</h1>
            {displayContent()}            
            <BottomNavigation value={recentPage} color="secondary" onChange={handleChange} className="fixed-bottom text-danger">
                <BottomNavigationAction label="Products" value="Products" icon={<StorageRoundedIcon />}/>
                <BottomNavigationAction label="Orders" value="Orders" icon={<ReceiptIcon />} />
                <BottomNavigationAction label="Users" value="Users" icon={<PeopleAltIcon />} />
                <BottomNavigationAction label="Dashboard" value="Dashboard" icon={<DashboardIcon />} />
            </BottomNavigation>
        </div>
        
    )
}

export default Admin;