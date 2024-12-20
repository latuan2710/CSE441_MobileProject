import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import Notification from "../../Alert/Notification";
import SubcategoryModal from "../modal/SubcategoryModal";
import "../../Style/style.css";
import { deleteSubcategoryById, getAllSubcategories } from "../../Controller/apiServices";
import DeleteConfirmModal from "../modal/DeleteConfirmModal";

const SubcategoriesTable = () =>
{
  const [ successMessage, setSuccessMessage ] = useState( "" ); // State for the success message
  const [ subcategories, setSubcategories ] = useState( [] );
  const [ modal, setModal ] = useState( false );
  const [ modalId, setModalId ] = useState( null );
  const [ refresh, setRefresh ] = useState( 0 );
  const account = JSON.parse( localStorage.getItem( "account" ) );

  const [ deleteModal, setDeleteModal ] = useState( false );
  const [ selectedId, setSelectedId ] = useState( null );

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
      const fetchData = async () =>
      {
        const response = await getAllSubcategories();
        setSubcategories( response );
        console.log( response );
      };
      fetchData();
    }
  }, [ refresh ] );

  const totalPages = Math.ceil( subcategories.length / itemsPerPage );
  const displayed = subcategories.slice(
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

  const handleDelete = async () =>
  {
    try
    {
      const response = await deleteSubcategoryById( selectedId );
      if ( response.status === 200 || response.status === 204 )
      {
        setSuccessMessage( "Category deleted successfully!" );
        setTimeout( () =>
        {
          setSuccessMessage( "" );
        }, 2000 );
        setModal( false );
        setRefresh( ( pre ) => pre + 1 );
      } else
      {
        console.error( "Unexpected response status:", response.status );
        alert( "Failed to delete the category. Please try again." );
      }
    } catch ( error )
    {
      console.error( "Error deleting category:", error.message );
      alert( "An error occurred while deleting the category. Please try again." );
    }
  };

  const openDeleteModal = ( id ) =>
  {
    setSelectedId( id ); // Set the ID of the item to be deleted
    setDeleteModal( true ); // Open the modal
  };
  return (
    <div>
      {/* Show success message */ }
      <Notification.SuccessMessage message={ successMessage } />
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Subcategories Listing</CardTitle>
            <Button color="primary" onClick={ () => openModal( null ) }>
              Add Subcategory
            </Button>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              { displayed.map( ( tdata, index ) => (
                <tr key={ index } className="border-top">
                  <td
                    className="clickable-row"
                    onClick={ () => openModal( tdata.id ) }
                  >
                    { tdata.name }
                  </td>
                  <td
                    className="clickable-row"
                    onClick={ () => openModal( tdata.id ) }
                  >
                    { tdata.category.name }
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={ () => openDeleteModal( tdata.id ) }
                    >
                      Delete
                    </Button>
                    { deleteModal && (
                      <DeleteConfirmModal
                        message={ "Are you sure?" }
                        modal={ deleteModal }
                        setModal={ setDeleteModal }
                        deleteFunction={ () =>
                        {
                          handleDelete( selectedId );
                          setDeleteModal( false );
                        } }
                      />
                    ) }
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

      {/* Category Modal */ }
      { account.role === "ADMIN" && modal && (
        <SubcategoryModal
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

export default SubcategoriesTable;
