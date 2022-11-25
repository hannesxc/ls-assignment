import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'

const Employee = () => {

    const { data, setData, empData, setEmpData, edit, handleEdit } = useContext(GlobalContext)

    const handleChange = () => {
        if (isNaN(empData.age)) {
            alert("Age should be a numeric value")
        } else if (empData.name && empData.age && empData.dept && empData.desg && empData.gender && empData.date) {
            setData([...data, empData])
        } else {
            alert("Please fill all the fields and try saving again!")
        }
    }

    return (
        <div className="modal fade" id="addEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="addEmployeeModal"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header pt-3 pb-2">
                        {edit ? <h5 className="modal-title" id="exampleModalCenterTitle">Edit Employee</h5> :
                        <h5 className="modal-title" id="exampleModalCenterTitle">Add Employee</h5>}
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-row ">
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="mb-1">Name</label>
                                    <input type="text" className="form-control" id="" placeholder="Your Name" onChange={(e) => {
                                        setEmpData({...empData, name: e.target.value})
                                    }} value={empData.name}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="mb-1">Gender</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => {
                                        setEmpData({...empData, gender: e.target.value})
                                    }}>
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="mb-1">Age</label>
                                    <input type="text" className="form-control" id="" placeholder="Your Age" onChange={(e) => {
                                        setEmpData({...empData, age: e.target.value})
                                    }} value={empData.age}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="mb-1">Designation</label>
                                    <input type="text" className="form-control" id="" placeholder="Your designation" onChange={(e) => {
                                        setEmpData({...empData, desg: e.target.value})
                                    }} value={empData.desg}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="mb-1">Department</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => {
                                        setEmpData({...empData, dept: e.target.value})
                                    }}>
                                        <option>Select</option>
                                        <option>Frontend</option>
                                        <option>Backend</option>
                                        <option>Testing</option>
                                        <option>Deployment</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="" className="mb-1">Joining Date</label>
                                    <input type="date" className="form-control" id="" placeholder="" onChange={(e) => {
                                        setEmpData({...empData, date: e.target.value})
                                    }}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger btn-sm" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success btn-sm" data-dismiss="modal" onClick={() => {
                            handleChange()
                            edit ? handleEdit(!edit) : handleEdit(edit)
                        }}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee