import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import Notification from "../../Alert/Notification";
import "../../Style/style.css";
import BrandModal from "../modal/BrandModal";
import { getAllBrands } from "../../Controller/apiServices";

const BrandsTable = () =>
{
  const [ successMessage, setSuccessMessage ] = useState( "" );
  const [ brands, setBrands ] = useState( [] );
  const [ modal, setModal ] = useState( false );
  const [ modalId, setModalId ] = useState( null );
  const [ refresh, setRefresh ] = useState( 0 );
  const account = JSON.parse( sessionStorage.getItem( "account" ) );

  const [ currentPage, setCurrentPage ] = useState( 1 );
  const itemsPerPage = 6;

  useEffect( () =>
  {
    if ( account === null )
    {
      navigator( "/login" );
    } else
    {
      const fetchBrands = async () =>
      {
        const response = await getAllBrands();
        setBrands( response );
      };
      fetchBrands();
    }
  }, [ refresh ] );

  const totalPages = Math.ceil( brands.length / itemsPerPage );
  const displayed = brands.slice(
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

  return (
    <div>
      {/* Show success message */ }
      <Notification.SuccessMessage message={ successMessage } />
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Brands Listing</CardTitle>
            <Button color="primary" onClick={ () => openModal( null ) }>
              Add Brand
            </Button>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              { displayed.map( ( tdata, index ) => (
                <tr
                  key={ index }
                  className="border-top clickable-row"
                  onClick={ () => openModal( tdata.id ) }
                >
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={ tdata.logo }
                        className="rounded-circle"
                        alt={ tdata.name }
                        width="45"
                        height="45"
                      />
                    </div>
                  </td>
                  <td>{ tdata.name }</td>
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

      {/* Add/Edit Brand Modal */ }
      { account.role === "ADMIN" && modal && (
        <BrandModal
          id={ modalId }
          modal={ modal }
          setModal={ setModal }
          setSuccessMessage={ setSuccessMessage }
          setRefresh={ setRefresh }
        />
      ) }
    </div>
  );
};

export default BrandsTable;
