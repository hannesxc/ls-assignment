import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Employee from './components/Employee';
import { GlobalContext } from './contexts/GlobalContext'

function App() {
  const [ id, setID] = useState(0)
  const empType = {
    id: id,
    name: '',
    gender: '',
    age: '',
    desg: '',
    dept: '',
    date: '',
    available: false
  }
  const [ data, setData ] = useState([])
  const [ edit, handleEdit ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ available, setAvailability ] = useState(0)
  const [ empData, setEmpData ] = useState(empType)

  const changeAvail = (id) => {
    data.forEach( emp => {
      if (emp.id === id) {
        emp.available = !emp.available
        if (emp.available === true) {
          setAvailability(available + 1)
        } else {
          setAvailability(available - 1)
        }
      }
    })
  }

  const handleDelete = (id) => {
    setData(data.filter( emp => { return emp.id !== id }))
  }
  
  return (
    <GlobalContext.Provider value={{data, setData, empData, setEmpData, edit, handleEdit}}>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="question-dashboard">
              <div className="card mt-4 mb-3 mb-md-4">
                <div className="card-body p-3">
                  <h5 className="text-secondary mb-2">Available: <span
                    className="font-weight-bold ml-1 text-dark">{available}</span></h5>
                  <h5 className="text-secondary">Total: <span className="font-weight-bold ml-1 text-dark">{data.length}</span></h5>
                  <button className="btn btn-primary mt-4" data-toggle="modal" data-target="#addEmployeeModal" onClick={() => {
                    setEmpData(empType)
                    setID(id + 1)
                    console.log(id)
                  }}>
                    <i className="fa fa-plus"></i>&nbsp; Add Employee
                  </button>
                </div>
              </div>
              <input type="text" className="searchbox" placeholder='Search by name or department' onChange={(e) => {
                setSearch(e.target.value.toLowerCase())
              }}/>
              <div className="table-responsive mt-3 mt-md-4 mb-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Available</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*eslint-disable-next-line*/}
                    {data && data.map( emp => {
                      if (emp.name.toLowerCase().includes(search) || emp.dept.toLowerCase().includes(search)) {
                        return (
                        <tr key={emp.id}>
                          <td>{emp.name}</td>
                          <td>{emp.dept}</td>
                          <td>
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck1" checked={emp.available} onChange={() => {
                                changeAvail(emp.id)
                              }}/>
                                <label className="custom-control-label" htmlFor="customCheck1"></label>
                            </div>
                          </td>
                          <td>
                            <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#addEmployeeModal" onClick={() => {
                              setEmpData(emp)
                              handleEdit(true)
                            }}>
                              <i className="fa fa-edit"></i>&nbsp; Edit
                            </button>
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
                              handleDelete(emp.id)
                            }}>
                              <i className="fa fa-trash"></i>&nbsp; Delete
                            </button>
                          </td>
                        </tr>
                      )}
                    })}
                    {/*<tr>
                      <td>Peter Doe</td>
                      <td>Deployment</td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                            <label className="custom-control-label" htmlFor="customCheck2"></label>
                        </div>
                      </td>
                      <td>
                        <button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#addEmployeeModal">
                          <i className="fa fa-edit"></i>&nbsp; Edit
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-sm">
                          <i className="fa fa-trash"></i>&nbsp; Delete
                        </button>
                      </td>
                    </tr>*/}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Employee />
    </GlobalContext.Provider>
  );
}

export default App;
