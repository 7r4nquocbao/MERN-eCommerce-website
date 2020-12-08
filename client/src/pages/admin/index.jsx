import React, { useEffect, useState } from 'react';
import ProductTable from '../../components/admin/product-table';
import { createProduct, deleteProduct, fetchProductData } from '../../slices/product-slice';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MessageIcon from '@material-ui/icons/Message';
import { withStyles } from '@material-ui/core/styles';
import OrderList from '../../components/admin/order-list';
import './style.scss';
import ChatApp from '../../components/admin/chat-app';
import { fetchOrderData } from '../../slices/order-slice';
import { useDispatch } from 'react-redux';

function Admin(props) {

    const dispatch = useDispatch();

    const [recentPage, setRecentPage] = useState('Products');
    const handleChange = (event, newValue) => {
        setRecentPage(newValue);
    };

    useEffect(() => {
        console.log("get data...")
        dispatch(fetchOrderData());
        dispatch(fetchProductData())
    }, [dispatch]);

    const displayContent = () => {
        switch (recentPage) {
            case 'Products':
                return <ProductTable />;
            case 'Orders':
                return <OrderList />;
            case 'Users':
                return <ProductTable />;
            case 'Messages':
                return <ChatApp />;
            case 'Dashboard':
                return <ProductTable />;
        }
    }

    return (
        <div className="App container mt-5">
            <h1>App.</h1>
            {displayContent()}
            <BottomNavigation value={recentPage} color="secondary" onChange={handleChange} className="fixed-bottom">
                <BottomNavigationAction label="Products" value="Products" icon={<StorageRoundedIcon />}/>
                <BottomNavigationAction label="Orders" value="Orders" icon={<ReceiptIcon />} />
                <BottomNavigationAction label="Users" value="Users" icon={<PeopleAltIcon />} />
                <BottomNavigationAction label="Messages" value="Messages" icon={<MessageIcon />} />
                <BottomNavigationAction label="Dashboard" value="Dashboard" icon={<DashboardIcon />} />
            </BottomNavigation>
        </div>
        
    )
}

export default Admin;