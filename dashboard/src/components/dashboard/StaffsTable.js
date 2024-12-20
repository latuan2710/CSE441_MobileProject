import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import Notification from "../../Alert/Notification";
import { getAllStaffs } from "../../Controller/apiServices";
import "../../Style/style.css";
import StaffModal from "../modal/StaffModal";

const StaffsTable = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const account = JSON.parse(localStorage.getItem("account"));

  // Paging States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    if (account === null) {
      navigator("/login");
    } else {
      const fetchData = async () => {
        try {
          const staffsResponse = await getAllStaffs();
          setStaffs(staffsResponse);
          console.log(staffs);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [refresh]);

  const totalPages = Math.ceil(staffs.length / itemsPerPage);
  const displayed = staffs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const openModal = (id) => {
    setModal(true);
    setModalId(id);
  };

  return (
    <div>
      {/* Show success message */}
      <Notification.SuccessMessage message={successMessage} />
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Staffs Listing</CardTitle>
            <Button color="primary" onClick={() => openModal(null)}>
              Add Staff
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
              </tr>
            </thead>
            <tbody>
              {displayed.map((tdata, index) => (
                <tr
                  key={index}
                  className="border-top clickable-row"
                  onClick={() => openModal(tdata.id)}
                >
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt={tdata.avatar}
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
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: tdata.status ? "green" : "red",
                      }}
                    ></div>
                  </td>
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

      {/* Add/Edit Staffs Modal */}
      {account.role === "ADMIN" && modal && (
        <StaffModal
          id={modalId}
          modal={modal}
          setModal={setModal}
          setSuccessMessage={setSuccessMessage}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default StaffsTable;
