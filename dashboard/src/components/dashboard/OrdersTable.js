import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import Notification from "../../Alert/Notification";
import { getAllOrders, changeOrderStatus } from "../../Controller/apiServices";
import OrderModal from "../modal/OrderModal";

import "../../Style/style.css";

const OrdersTable = () =>
{
  const [ successMessage, setSuccessMessage ] = useState( "" );
  const [ orders, setOrders ] = useState( [] );
  const [ modal, setModal ] = useState( false );
  const [ modalId, setModalId ] = useState( null );
  const [ refresh, setRefresh ] = useState( 0 );
  const account = JSON.parse( localStorage.getItem( "account" ) );
  // Paging States
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const itemsPerPage = 6; // Number of items per page

  useEffect( () =>
  {
    if ( account === null )
    {
      navigator( "/login" );
    } else
    {
      const fetchData = async () =>
      {
        try
        {
          const response = await getAllOrders();
          setOrders( response );
        } catch ( error )
        {
          console.error( "Error fetching data:", error );
        }
      };
      fetchData();
    }
  }, [ refresh ] );

  const totalPages = Math.ceil( orders.length / itemsPerPage );
  const displayed = orders.slice(
    ( currentPage - 1 ) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = ( pageNumber ) =>
  {
    if ( pageNumber >= 1 && pageNumber <= totalPages )
    {
      setCurrentPage( pageNumber );
    }
  };

  const openModal = ( id ) =>
  {
    setModal( true );
    setModalId( id );
  };


  const handleStatusChange = async ( id, status ) =>
  {
    try
    {
      await changeOrderStatus( id, status ); // Wait for the API call to complete
      setSuccessMessage( `Order status updated to ${ status }` );
      setRefresh( ( prev ) => prev + 1 ); // Trigger a re-fetch of the data
    } catch ( error )
    {
      console.error( "Error updating order status:", error );
    }
  };

  return (
    <div>
      {/* Show success message */ }
      <Notification.SuccessMessage message={ successMessage } />
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Orders Listing</CardTitle>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>User name</th>
                <th>Receiver Name</th>
                <th>Receiver Address</th>
                <th>Receiver Phone</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { displayed.map( ( tdata, index ) => (
                <tr
                  key={ index }
                  className="border-top clickable-row"
                  onClick={ () => openModal( tdata.id ) }
                >
                  <td>{ tdata.user.username }</td>
                  <td>{ tdata.receiverName }</td>
                  <td>{ tdata.receiverAddress }</td>
                  <td>{ tdata.receiverPhone }</td>
                  <td>${ tdata.totalPrice }</td>
                  <td style={ { fontWeight: "900" } }>{ tdata.status }</td>
                  <td>
                    <div
                      onClick={ ( e ) => e.stopPropagation() } // Prevent triggering row click
                    >
                      { [ "PENDING", "SHIPPING", "COMPLETED", "CANCELLED" ].map( ( status ) => (
                        <Button
                          key={ status }
                          color={
                            status === "PENDING"
                              ? "warning"
                              : status === "SHIPPING"
                                ? "info"
                                : status === "COMPLETED"
                                  ? "success"
                                  : "danger"
                          }
                          size="sm"
                          className="me-1"
                          onClick={ ( e ) =>
                          {
                            e.stopPropagation(); // Prevent row click
                            handleStatusChange( tdata.id, status );
                          } }
                          hidden={ tdata.status === status } // Disable button if status matches current
                        >
                          { status }
                        </Button>
                      ) ) }
                    </div>
                  </td>

                </tr>
              ) ) }
            </tbody>
          </Table>

          {/* Pagination Controls */ }
          <div className="d-flex justify-content-center mt-3">
            <Button
              color="secondary"
              disabled={ currentPage === 1 }
              onClick={ () => handlePageChange( currentPage - 1 ) }
            >
              Previous
            </Button>
            <span className="mx-3">
              Page { currentPage } of { totalPages }
            </span>
            <Button
              color="secondary"
              disabled={ currentPage === totalPages }
              onClick={ () => handlePageChange( currentPage + 1 ) }
            >
              Next
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Add/Edit Oders Modal */ }
      {
        account.role === "ADMIN" && modal && (
          <OrderModal
            id={ modalId }
            modal={ modal }
            setModal={ setModal }
            setSuccessMessage={ setSuccessMessage }
            setRefresh={ setRefresh }
          />
        )
      }
    </div >
  );
};

export default OrdersTable;
