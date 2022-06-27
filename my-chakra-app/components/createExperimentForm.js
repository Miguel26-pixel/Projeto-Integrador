import React from 'react';


const Eform = () => {
    return (
        <div>
        <div className='row mt-5 align-center'>
            <div className='col-md-4 card m-auto shadow-lg'>
            <form action={"/api/create/experiment/"} method="POST">
                <div className='card-body'>
                    <div className="form-group p-4">
                        <label htmlFor='name'>Name</label>
                        <input className='form-control' />
                    </div>
                    <div className="form-group p-4">
                        <label htmlFor='info'>More info</label>
                        <input className='form-control'/>
                    </div>
                    <div className="form-group p-4">
                        <label htmlFor='image'>Image</label>
                        <input type="file" className='form-control'/>
                    </div>

                    <div className="form-group p-4">
                        <input type='submit' className='btn btn-success'/>
                    </div>
                </div>
            </form>

            </div>
        </div>
        </div>
    )
}

export default Eform;