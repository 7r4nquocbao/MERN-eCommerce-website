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
      fontFamily: 'Quicksand',
    },
    column: {
        flexBasis: '33.33%',
    }
  }));

function OrderList(props) {

    var day1 = new Date("Sun Nov 29 2020 00:22:41 GMT+0700 (Indochina Time)");
    
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

    const getStep = (status) => {
        return orderStatus.findIndex(sts => sts.status === status);
    }

    const displayOrderData = (data, page) => {

        const start = (page - 1) * itemOnPage;
        const dataOnPage = data.slice(start, start + itemOnPage);

        return(
            dataOnPage && dataOnPage.map((item, index) => {
                return(
                    <tr key={index}>
                        <td>
                            <div className={classes.root}>
                                <Accordion color="secondary">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>#{item.orderCode.split("").reverse().join("").slice(0,7)}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>{item.name}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>{moment(item.date).fromNow()}</Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails className="d-block">
                                        <div className="row pl-5 pr-5 pb-5 pt-2">
                                            <div className="col">
                                                <table className="table">
                                                    <tfoot className="table-danger text-danger">
                                                        <tr>
                                                            <th scope="col">Total</th>
                                                            <th colSpan='2'>{Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(item.total)}</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            <div className="col form-shadow pt-3 pl-3">
                                                <div className="d-block">
                                                    <p>Customer name: <b>{item.name}</b></p>
                                                </div>
                                                <div className="d-block">
                                                    <p>Phone number: <b>{item.phone}</b></p>
                                                </div>
                                                <div className="d-block">
                                                    <p>Email: <b>{item.email}</b></p>
                                                </div>
                                                <div className="d-block">
                                                    <p>Address: <b>{item.address}</b></p>
                                                </div>
                                            </div>                                        
                                        </div>
                                        <div className="d-block pl-5 pr-5">
                                            <Stepper activeStep={getStep(item.status)} alternativeLabel>
                                                {orderStatus.map((label) => (
                                                <Step key={label.id}>
                                                    <StepLabel>
                                                        <p style={{fontFamily: 'Quicksand'}}>
                                                            {label.status}
                                                        </p>
                                                        
                                                    </StepLabel>
                                                </Step>
                                                ))}
                                            </Stepper>
                                        </div>
                                        <div className="d-flex justify-content-end p-5">
                                            <button className="btn btn-success">Modify</button>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
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
            {JSON.stringify(orderList)}
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