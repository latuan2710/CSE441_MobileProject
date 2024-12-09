import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import apiServices from "../../Controller/apiServices";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);

  // Paging States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  const [newUser] = useState({
    avatar: "",
    imagePreview: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiServices.getAllUsers();
        setUsers(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Pagination logic: Calculate the Users to display based on the current page
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const displayed = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handleInputChange = (e) => {};
  const handleAddOrUpdate = () => {};

  // const toggleUserStatus = async ( id, currentStatus ) =>
  // {
  //     try
  //     {
  //         const response = currentStatus
  //             ? await apiServices.disableUser( id )
  //             : await apiServices.enableUser( id );

  //         if ( response.status === 200 )
  //         {
  //             setUsers( ( prevUsers ) =>
  //                 prevUsers.map( ( user ) =>
  //                     user.id === id ? { ...user, status: !currentStatus } : user
  //                 )
  //             );
  //         } else
  //         {
  //             console.error( "Failed to update user status" );
  //         }
  //     } catch ( error )
  //     {
  //         console.error( "Error toggling user status:", error );
  //     }
  // };

  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Users Listing</CardTitle>
            <Button color="primary" onClick={toggleModal}>
              Add User
            </Button>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt={tdata.name}
                        width="45"
                        height="45"
                      />
                    </div>
                  </td>
                  <td>{tdata.username}</td>
                  <td>{tdata.email}</td>
                  <td>{tdata.phone}</td>
                  <td>{tdata.address}</td>
                  <td>
                    <span
                      className={`rounded-circle d-inline-block`}
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: tdata.status ? "green" : "red",
                      }}
                    ></span>
                  </td>
                  {/* <td>
                                        <Button
                                            style={ {
                                                backgroundColor: !tdata.status ? "green" : "red",
                                                border: "none",
                                            } }
                                            onClick={ () => toggleUserStatus( tdata.id, tdata.status ) }
                                        >
                                            { !tdata.status ? "Enable" : "Disable" }
                                        </Button>
                                    </td> */}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-3">
            <Button
              color="secondary"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="mx-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              color="secondary"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Add User Modal */}
      <Modal isOpen={modal} toggle={toggleModal} size="xl">
        <ModalHeader toggle={toggleModal}>Add User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={handleInputChange}
              />
              {newUser.imagePreview && (
                <img
                  src={newUser.imagePreview}
                  alt="Preview"
                  className="img-thumbnail mt-3"
                  width="100"
                />
              )}
            </FormGroup>
            <FormGroup>
              <Label for="name">Username</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="brand">Email</Label>
              <Input
                type="text"
                name="brand"
                id="brand"
                value={newUser.brand}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Phone</Label>
              <Input
                type="text"
                name="category"
                id="category"
                value={newUser.category}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Address</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={newUser.price}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddOrUpdate}>
            Add User
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UsersTable;
