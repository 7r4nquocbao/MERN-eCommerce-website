import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse, DialogActions } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.scss'
import { createPromotionCode } from '../../../slices/promotion-slice';
import { blue, green, red } from '@material-ui/core/colors';

function Promotion(props) {

    const promotionCodes = useSelector(state => state.promotionCodes);
    const dispatch = useDispatch();

    const [openCollapse, setOpenCollapse] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [keyword, setKeyword] = useState('');

    const [codeLabel, setCodeLabel] = useState({
        title: '----',
        discount: '--',
    });

    const [updateId, setUpdateId] = useState('new');

    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput1 = ({ value, onClick }) => (
        <button className="btn btn-light" onClick={onClick}
            style={{width: '300px', fontWeight: 700}}>
            {value}
        </button>
    );

    let nextDay = new Date();
    nextDay.setDate(new Date().getDate() + 1);

    const [endDate, setEndDate] = useState(nextDay);
    const ExampleCustomInput2 = ({ value, onClick }) => (
        <button className="btn btn-light" onClick={onClick}
            style={{width: '300px', fontWeight: 700}}>
            {value}
        </button>
    );

    const calcStatus = (start, end) => {
        const s = new Date(start);
        const e = new Date(end);

        if(new Date() < s) {
            return <label style={{color: blue[700], fontWeight: 700}}>Coming</label>;
        } else if (new Date() <= e) {
            return <label style={{color: green[700], fontWeight: 700}}>Available</label>;
        } else if (new Date() > e) {
            return <label style={{color: red[700], fontWeight: 700}}>Expired</label>;
        }
    }

    const displayCodes = () => {
        let data = promotionCodes.filter(item => item.code.toLowerCase().includes(keyword.toLowerCase()));

        return (
            data.map((item, index) => {
                return (
                    <tr index={index}>
                        <td>{index + 1}</td>
                        <td>{item.code}</td>
                        <td>{new Date(item.startDate).toLocaleDateString()}</td>
                        <td>{new Date(item.endDate).toLocaleDateString()}</td>
                        <td>{calcStatus(item.startDate, item.endDate)}</td>
                        <td>
                            <button className="btn btn-secondary"
                                onClick={() => updateCode(item)}
                            >
                                Modify
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }

    const updateCode = (data) => {
        const codeArr = data.code.split('');
        const a = codeArr[0]  + codeArr[1] + codeArr[2] + codeArr[3];
        const b = codeArr[4] + codeArr[5];
        
        setCodeLabel({
            title: a,
            discount: b
        })

        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
        setUpdateId(data._id);
        console.log(data);
        setOpenDialog(true);
    } 

    const changeCodeTitle = (text) => {
        let a = text.split('');
        let codeText = '';
        for (let index = 0; index < 4; index++) {
            if(a[index]) {
                codeText += a[index].toUpperCase();
            } else {
                codeText += '-';
            }
        }
        setCodeLabel({...codeLabel, title: codeText});
    }

    const changeCodeDiscount = (num) => {
        let b = num;
        let c = '';
        if(parseInt(b)<10) {
            c = `0${parseInt(b)}`;
        } else if(!parseInt(b)) {
            c = '--';
        } else if (parseInt(b)>99) {
            c = '99';
        } else {
            c = b;
        }
        setCodeLabel({...codeLabel, discount: c});
    }

    const displayLabel = () => {
        const codeText = codeLabel.title + codeLabel.discount;
        return (
            <div className="d-flex justify-content-center">
                <label className="code-label">{codeText.split('')[0]}</label>
                <label className="code-label">{codeText.split('')[1]}</label>
                <label className="code-label">{codeText.split('')[2]}</label>
                <label className="code-label">{codeText.split('')[3]}</label>
                <label className="code-label ml-5">{codeText.split('')[4]}</label>
                <label className="code-label">{codeText.split('')[5]}</label>
            </div>
        )
    }

    const handleCreateCode = () => {
        let newCode = {
            _id: updateId,
            code: codeLabel.title + codeLabel.discount,
            startDate: startDate,
            endDate: endDate,
            description: `Discount ${parseInt(codeLabel.discount) || 0}`,
            discount: parseInt(codeLabel.discount) || 0
        }
        dispatch(createPromotionCode(newCode));
        resetCodeForm();
        
    }

    const resetCodeForm = () => {
        setCodeLabel({
            title: '----',
            discount: '--',
        });
        setStartDate(new Date());
        let nextDay = new Date();
        nextDay.setDate(new Date().getDate() + 1);
        setEndDate(nextDay);
        setOpenDialog(false);
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6">
                    <div className="input-group mb-2">
                        <input type="text" className="form-control" onChange={(e) => setKeyword(e.target.value)}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Search</span>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end mb-2">
                        <button className="btn btn-light" onClick={() => setOpenDialog(true)}>Add code</button>
                    </div>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">CODE</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {displayCodes()}
                </tbody>
            </table>

            <Collapse style={{backgroundColor: 'blue'}} in={openCollapse} timeout="auto" unmountOnExit>
                <h3>Is description but nothing now.</h3>
            </Collapse>
            <Dialog
                open={openDialog}
                maxWidth="md"
                fullWidth
            >
                <h2 className="text-center p-5">Promotion Code</h2>
                {displayLabel()}
                <div className="pt-5 pb-5" style={{paddingLeft: '20%',paddingRight: '20%'}}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Title</label>
                            <input type="text" className="form-control" maxLength={4}
                                onChange={(e) => changeCodeTitle(e.target.value)}
                                value={codeLabel.title.replaceAll("-", '')}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Discount</label>
                            <div className="input-group mb-2">
                                <input type="number" className="form-control" min={0} max={99} maxLength={2}
                                    onChange={(e) => changeCodeDiscount(e.target.value)}
                                    value={parseInt(codeLabel.discount)}
                                />                                
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">%</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label className="mr-4">Start date</label>
                                </td>
                                <td>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => date >= new Date() ? setStartDate(date) : console.log(date)}
                                        customInput={<ExampleCustomInput1 />}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="mr-4">End date</label>
                                </td>
                                <td>
                                    <DatePicker
                                        startDate={endDate}
                                        selected={endDate}
                                        onChange={date => date > startDate ? setEndDate(date) : console.log(date)}
                                        customInput={<ExampleCustomInput2 />}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <DialogActions>
                    <button onClick={() => resetCodeForm(false)} className="btn btn-secondary" style={{width: '200px'}}>
                        Close
                    </button>
                    <button onClick={() => handleCreateCode()} className="btn btn-success" style={{width: '200px'}}>
                        Save
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Promotion;