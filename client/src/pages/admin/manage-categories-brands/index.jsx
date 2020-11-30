import React from 'react';
import data from '../../../constants/local-db.json';

function ManageCatBra(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="input-group">                    
                        <input type="text" className="form-control" placeholder="Category"/>
                        <div className="input-group-prepend">
                            <button className="btn btn-secondary">Add</button>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group">                    
                        <input type="text" className="form-control" placeholder="Brand"/>
                        <div className="input-group-prepend">
                            <button className="btn btn-secondary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageCatBra;