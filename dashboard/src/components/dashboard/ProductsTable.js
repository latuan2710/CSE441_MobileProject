import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import Notification from "../../Alert/Notification";
import { getAllBrands, getAllCategories, getAllProducts } from "../../Controller/apiServices";
import "../../Style/style.css";
import ProductModal from "../modal/ProductModal";

const ProductsTable = () =>
{
  const [ successMessage, setSuccessMessage ] = useState( "" );
  const [ products, setProducts ] = useState( [] );
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
          const productsResponse = await getAllProducts();
          setProducts( productsResponse );
        } catch ( error )
        {
          console.error( "Error fetching data:", error );
        }
      };
      fetchData();
    }
  }, [ refresh ] );

  const totalPages = Math.ceil( products.length / itemsPerPage );
  const displayed = products.slice(
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
            <CardTitle tag="h5">Products Listing</CardTitle>
            <Button color="primary" onClick={ () => openModal( null ) }>
              Add Product
            </Button>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Price</th>
                <th>In Stock</th>
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
                        src={ tdata.image }
                        className="rounded-circle"
                        alt={ tdata.name }
                        width="45"
                        height="45"
                      />
                    </div>
                  </td>
                  <td>{ tdata.name }</td>
                  <td>{ tdata.brand.name }</td>
                  <td>{ tdata.subcategory.name }</td>
                  <td>{ tdata.subcategory.category.name }</td>
                  <td>${ tdata.price }</td>
                  <td>{ tdata.stockQuantity }</td>
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

      {/* Add/Edit Products Modal */ }
      { account.role === "ADMIN" && modal && (
        <ProductModal
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

export default ProductsTable;
