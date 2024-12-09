import React, { useEffect, useState } from "react";
import
{
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import apiServices from '../../Controller/apiServices';

const ProductsTable = () =>
{
  const [ products, setProducts ] = useState( [] );
  const [ brands, setBrands ] = useState( {} );
  const [ categories, setCategories ] = useState( {} );
  const [ modal, setModal ] = useState( false );
  const [ newProduct, setNewProduct ] = useState( {
    image: "",
    imagePreview: "",
    name: "",
    brand: "",
    category: "",
    price: "",
    stockQuantity: "",
  } );

  // Paging States
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const itemsPerPage = 6;  // Number of items per page

  useEffect( () =>
  {
    const fetchProducts = async () =>
    {
      try
      {
        const response = await apiServices.getAllProducts();
        setProducts( response );  // Assuming response is an array of all products
      } catch ( error )
      {
        console.error( "Error fetching products:", error );
      }
    };

    fetchProducts();
  }, [] );

  useEffect( () =>
  {
    const fetchBrands = async () =>
    {
      const brandMap = {};
      for ( const product of products )
      {
        try
        {
          const brand = await apiServices.getNameBrandById( product.brandId );
          brandMap[ product.brandId ] = brand;
        } catch ( error )
        {
          console.error( "Error fetching brand:", error );
        }
      }
      setBrands( brandMap );
    };

    const fetchCategories = async () =>
    {
      const categoryMap = {};
      for ( const product of products )
      {
        try
        {
          const category = await apiServices.getNameCategoryById( product.subcategoryId );
          categoryMap[ product.subcategoryId ] = category.name;
        } catch ( error )
        {
          console.error( "Error fetching category:", error );
        }
      }
      setCategories( categoryMap );
    };
 
    if ( products.length > 0 )
    {
      fetchBrands();
      fetchCategories();
    }
  }, [ products ] );

  const toggleModal = () => setModal( !modal );

  const handleInputChange = ( e ) =>
  {
    const { name, value, files } = e.target;
    if ( name === "image" && files && files[ 0 ] )
    {
      const reader = new FileReader();
      reader.onload = ( event ) =>
      {
        setNewProduct( ( prev ) => ( {
          ...prev,
          image: files[ 0 ],
          imagePreview: event.target.result,
        } ) );
      };
      reader.readAsDataURL( files[ 0 ] );
    } else
    {
      setNewProduct( { ...newProduct, [ name ]: value } );
    }
  };

  const handleAddProduct = () =>
  {
    // Logic to add a new product (e.g., API call to save the product)
    console.log( "New Product: ", newProduct );
    toggleModal();
  };

  // Pagination logic: Calculate the products to display based on the current page
  const totalPages = Math.ceil( products.length / itemsPerPage );
  const displayedProducts = products.slice( ( currentPage - 1 ) * itemsPerPage, currentPage * itemsPerPage );

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
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h5">Products Listing</CardTitle>
            <Button color="primary" onClick={ toggleModal }>
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
                <th>Price</th>
                <th>Stock Quantity</th>
              </tr>
            </thead>
            <tbody>
              { displayedProducts.map( ( tdata, index ) => (
                <tr key={ index } className="border-top">
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
                  <td>{ brands[ tdata.brandId ] || "Loading..." }</td>
                  <td>{ categories[ tdata.subcategoryId ] || "Loading..." }</td>
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

      {/* Add Product Modal */ }
      <Modal isOpen={ modal } toggle={ toggleModal } size="xl">
        <ModalHeader toggle={ toggleModal }>Add Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input type="file" name="image" id="image" onChange={ handleInputChange } />
              { newProduct.imagePreview && (
                <img
                  src={ newProduct.imagePreview }
                  alt="Preview"
                  className="img-thumbnail mt-3"
                  width="100"
                />
              ) }
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={ newProduct.name }
                onChange={ handleInputChange }
              />
            </FormGroup>
            <FormGroup>
              <Label for="brand">Brand</Label>
              <Input
                type="text"
                name="brand"
                id="brand"
                value={ newProduct.brand }
                onChange={ handleInputChange }
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="text"
                name="category"
                id="category"
                value={ newProduct.category }
                onChange={ handleInputChange }
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={ newProduct.price }
                onChange={ handleInputChange }
              />
            </FormGroup>
            <FormGroup>
              <Label for="stockQuantity">Stock Quantity</Label>
              <Input
                type="text"
                name="stockQuantity"
                id="stockQuantity"
                value={ newProduct.stockQuantity }
                onChange={ handleInputChange }
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ handleAddProduct }>
            Add Product
          </Button>
          <Button color="secondary" onClick={ toggleModal }>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductsTable;
