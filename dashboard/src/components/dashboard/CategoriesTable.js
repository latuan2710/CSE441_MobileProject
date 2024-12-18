import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import Notification from "../../Alert/Notification";
import CategoryModal from "../modal/CategoryModal";
import "../../Style/style.css";
import { getAllCategories } from "../../Controller/apiServices";

const CategoriesTable = () =>
{
  const [ successMessage, setSuccessMessage ] = useState( "" ); // State for the success message
  const [ categories, setCategories ] = useState( [] );
  const [ modal, setModal ] = useState( false );
  const [ modalId, setModalId ] = useState( null );
  const [ refresh, setRefresh ] = useState( 0 );
  const account = JSON.parse( sessionStorage.getItem( "account" ) );

  const [ currentPage, setCurrentPage ] = useState( 1 );
  const itemsPerPage = 6;

  const openModal = ( id = null ) =>
  {
    setModal( true );
    setModalId( id );
  };

  useEffect( () =>
  {
    if ( account === null )
    {
      navigator( "/login" );
    } else
    {
      const fetchCategories = async () =>
      {
        const response = await getAllCategories();
        setCategories( response );
      };
      fetchCategories();
    }
  }, [ refresh ] );

  const totalPages = Math.ceil( categories.length / itemsPerPage );
  const displayed = categories.slice(
    ( currentPage - 1 ) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const handlePageChange = ( pageNumber ) =>
  {
    if ( pageNumber >= 1 && pageNumber <= totalPages )
    {
      setCurrentPage( pageNumber );
    }
  };

  return (
    <div>
      {/* Show success message */ }
      <Notification.SuccessMessage message={ successMessage } />
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Categories Listing</CardTitle>
            <Button color="primary" onClick={ () => openModal( null ) }>
              Add Category
            </Button>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
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

      {/* Category Modal */ }
      { account.role === "ADMIN" && modal && (
        <CategoryModal
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

export default CategoriesTable;
