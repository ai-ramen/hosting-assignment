import {useState,useEffect} from "react";
import { Table,Button, Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employee = () =>{
  //fetching data from database. Data is stored in "users" as array
  const[users, setUsers]=useState([]);
  useEffect(()=>{
    fetch('/empinfo')
    .then(response=>response.json())
    .then(response=>{
      console.log(response);
      setUsers(response)  
    })
    
  },[])
    
    const [view, setView] = useState(false);//see details
    const [update, setUpdate] = useState(false);//update
    const [del, setDel] = useState(false);//delete
    const [addem, setAdd] = useState({});//add new ? 
    const [selectedData, setSelectedData] = useState({});//data in selected cell
    const [text, setText] = useState(0);
    const [data, setData] = useState(users);

    const viewClose = () => setView(false);
   // const viewShow = () => setView(true);

    const updateClose = () => setUpdate(false);
  //  const updateShow = () => setUpdate(true);

    const delClose = () => setDel(false);
  //  const delShow = () => setDel(true);

    const addClose = () => setAdd(false);
    const addShow = () => setAdd(true);

  

  // when you click the button, data in the cell will be stored in setSelectedData   
  const hanldeClick1 = (selectedRec) => {
    setSelectedData(selectedRec);
    setView(true);
  };

  const hanldeClick2 = (selectedRec) => {
    setSelectedData(selectedRec);
    setUpdate(true);
  };

  const hanldeClick3 = (selectedRec) => {
    setSelectedData(selectedRec);
    setDel(true);
  };

  //data is updated on front end
  const handleUpdate = () => {
    console.log(selectedData);
    const name = document.getElementById("name-update");
   
    selectedData.name = name.value;
    
    console.log(selectedData);
    console.log(name.value);
    data.map((d)=>{
      d.id === selectedData.id
      ? { ...d, selectedData }
      : d
      
    })
    updateClose();
  }

  return (
    <>
    <Button variant="primary" onClick={addShow}>Add New Employee</Button>
    <div>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Role</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((v) => (
            <tr>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>@{v.role}</td>
              <td><Button variant="success" onClick={() => hanldeClick1(v)}>View</Button>
      <Button variant="warning" onClick={() => hanldeClick2(v)}>Update</Button>
      <Button variant="danger" onClick={() => hanldeClick3(v)}>Delete</Button>
              </td>
            </tr>
          ))}
  </tbody>
</Table>
    </div>

    
    {/*  pop up modal for view starts here */}
    <div>
      <Modal show={view} onHide={viewClose}>
        <Modal.Header closeButton>
          <Modal.Title>See Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table class="table">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First</th>
                <th scope="col">Role</th>
              </tr>
              <tr>
                <td>{selectedData?.id}</td>
                <td>{selectedData?.name}</td>
                <td>{selectedData?.role}</td>
              </tr>
          </table>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={viewClose}>
            Close
          </Button>
          <Button variant="primary" onClick={viewClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for view ends here */}

      {/*  pop up modal for Update starts here */}  
      <div>
      <Modal show={update} onHide={updateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table class="table">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First</th>
                <th scope="col">Role</th>
              </tr>
              <tr>
                <td>{selectedData?.id}</td>
                <input type="text" id ="name-update" defaultValue={selectedData?.name} name="email"/>
                
                <td>{selectedData?.role}</td>
              </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for Update ends here */} 

      {/*  pop up modal for Delete starts here */} 
      <div>
      <Modal show={del} onHide={delClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table class="table">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First</th>
                <th scope="col">Role</th>
              </tr>
              <tr>
                <td>{selectedData?.id}</td>
                <td>{selectedData?.name}</td>
                <td>{selectedData?.role}</td>
              </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={delClose}>
            Close
          </Button>
          <Button variant="primary" onClick={delClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for Delete ends here */} 

      {/*  pop up modal for add employee starts here */} 
      <div>
      <Modal show={addem} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <tr>
                <th scope="col">Id</th>
                <th scope="col">First</th>
                <th scope="col">Role</th>
              </tr>
        <tr>
                <td>{selectedData?.id}</td>
                <input type="text" id ="name-add"   name="email"/>
                
                <td>{selectedData?.role}</td>
              </tr>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      {/*  pop up modal for add employee ends here */} 

    </>
  );

}

export default Employee;
