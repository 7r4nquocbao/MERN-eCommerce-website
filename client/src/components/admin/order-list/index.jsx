import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import dataAdditional from '../../../constants/local-db.json';
import OrderItem from '../order-item';
import './style.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: 'solid 2px #e9ecef',
        display: 'block'
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: 'Cabin',
    },
    column: {
        flexBasis: '33.33%',
    }
  }));

function OrderList(props) {
    
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const {orderStatus} = dataAdditional;
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [actionOrder, setActionOrder] = useState(false);
    const orderList = useSelector(state => state.orders);
    const productList = useSelector(state => state.products);
    const itemOnPage = 10;
    const [page, setPage] = useState(1);

    const displayOrderData = (data, page) => {

        const start = (page - 1) * itemOnPage;
        const dataOnPage = data.slice(start, start + itemOnPage);

        return(
            dataOnPage && dataOnPage.map((item, index) => {
                return(
                    <tr key={index}>
                        <td>
                            <OrderItem orderId={item._id}/>
                        </td>
                    </tr>
                )
            })
        )
    }

    const calcPagination = () => {

        let arrPageNums = [];
        for (let index = 1; index <= Math.ceil(orderList.length / itemOnPage); index++) {
            arrPageNums.push(index);
        }

        return (
            arrPageNums.map(item => {
                return (
                    <li className={`page-item ${item === page ? 'active' : ''}`} key={item}><button className="page-link" onClick={() => setPage(item)}>{item}</button></li>
                )
            })
        )
    }
    
    return (
        <div className="container">
            <div className="d-flex justify-content-end">
                <button className="btn btn-light m-3">Refresh</button>
            </div>
            <table className="table table-hover table-shadow table-order">
                <thead>
                    <tr>
                        <th scope="col">#Code</th>
                    </tr>
                </thead>
                <tbody className="fix-tbody">
                    {displayOrderData(orderList, page)}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">#Code</th>
                    </tr>
                </tfoot>
            </table>

            <div>
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${page > 1 ? '' : 'disabled'}`}>
                        <button className="page-link" onClick={() => setPage(page-1)}>Prev</button>
                    </li>                    
                    {calcPagination()}
                    <li className={`page-item ${page < Math.ceil(orderList.length / itemOnPage) ? '' : 'disabled'}`}>
                        <button className="page-link" onClick={() => setPage(page+1)}>Next</button>
                    </li>
                </ul>
            </div>
                
        </div>
    );
}

export default OrderList;