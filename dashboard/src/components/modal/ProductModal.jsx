import { useEffect, useRef, useState } from "react";
import
  {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "reactstrap";
import
  {
    addProduct,
    getAllBrands,
    getAllCategories,
    getAllSubcategories,
    getProductById,
    updateProduct,
    deleteProductById,
  } from "../../Controller/apiServices";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function ProductModal ( {
  modal,
  setModal,
  id,
  setSuccessMessage,
  setRefresh,
} )
{
  const [ name, setName ] = useState( "" );
  const [ image, setImage ] = useState( null );
  const [ preview, setPreview ] = useState( "" );
  const [ brands, setBrands ] = useState( [] );
  const [ subcategories, setSubcategories ] = useState( [] );
  const [ brandId, setBrandId ] = useState( "" );
  const [ subcategoryId, setSubcategoryId ] = useState( "" );
  const [ price, setPrice ] = useState( "" );
  const [ stockQuantity, setStockQuantity ] = useState( "" );
  const [ deleteModal, setDeleteModal ] = useState( false );

  const imageRef = useRef();

  // Fetch brands and categories on modal open
  useEffect( () =>
  {
    const fetchDropdownData = async () =>
    {
      try
      {
        const brandsData = await getAllBrands();
        const subcategoriesData = await getAllSubcategories();
        setBrands( brandsData );
        setSubcategories( subcategoriesData );
      } catch ( error )
      {
        console.error( "Error fetching dropdown data:", error.message );
      }
    };

    fetchDropdownData();
  }, [] );

  // Fetch product data if updating
  useEffect( () =>
  {
    const fetchProduct = async () =>
    {
      if ( id !== null )
      {
        const data = await getProductById( id );
        setName( data.name );
        setPreview( data.image );
        setBrandId( data.brand.id );
        setSubcategoryId( data.subcategory.id );
        setPrice( data.price );
        setStockQuantity( data.stockQuantity );
      }
    };
    fetchProduct();
  }, [ id ] );

  const handleFileChange = ( e ) =>
  {
    const file = e.target.files[ 0 ];
    if ( file )
    {
      setImage( file );
      setPreview( URL.createObjectURL( file ) );
    } else
    {
      setImage( null );
      setPreview( "" );
    }
  };

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    try
    {
      if ( id )
      {
        // Updating existing product
        await updateProduct( id, { name, brandId, subcategoryId, price, stockQuantity }, image );
        setSuccessMessage( "Product updated successfully!" );
      } else
      {
        // Adding new product
        await addProduct( { name, brandId, subcategoryId, price, stockQuantity }, image );
        setSuccessMessage( "Product added successfully!" );
      }
      setTimeout( () =>
      {
        setSuccessMessage( "" );
      }, 2000 );
      setModal( false );
      setRefresh( ( pre ) => pre + 1 );
    } catch ( error )
    {
      console.error(
        `Error ${ id ? "updating" : "adding" } product:`,
        error.message
      );
      alert( `An error occurred while ${ id ? "updating" : "adding" } the product.` );
    }
  };

  const handleDelete = async () =>
  {
    try
    {
      const response = await deleteProductById( id );
      if ( response.status === 200 || response.status === 204 )
      {
        setSuccessMessage( "Product deleted successfully!" );
        setTimeout( () =>
        {
          setSuccessMessage( "" );
        }, 2000 );
        setModal( false );
        setRefresh( ( pre ) => pre + 1 );
      } else
      {
        console.error( "Unexpected response status:", response.status );
        alert( "Failed to delete the product. Please try again." );
      }
    } catch ( error )
    {
      console.error( "Error deleting product:", error.message );
      alert( "An error occurred while deleting the product. Please try again." );
    }
  };

  return (
    <>
      <Modal isOpen={ modal } toggle={ () => setModal( false ) } size="xl">
        <ModalHeader>{ id ? "Update Product" : "Add Product" }</ModalHeader>
        <ModalBody>
          <Form encType="multipart/form-data" onSubmit={ handleSubmit }>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                ref={ imageRef }
                type="file"
                name="image"
                id="image"
                onChange={ handleFileChange }
                required={ !id ? true : false }
              />
              { preview && (
                <img
                  src={ preview }
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
                value={ name }
                onChange={ ( e ) => setName( e.target.value ) }
                required
                disabled={ id ? true : false }
              />
            </FormGroup>

            <FormGroup>
              <Label for="brandId">Brand</Label>
              <Input
                type="select"
                name="brandId"
                id="brandId"
                value={ brandId }
                onChange={ ( e ) => setBrandId( e.target.value ) }
                required
              >
                <option value="">Select Brand</option>
                { brands.map( ( brand ) => (
                  <option key={ brand.id } value={ brand.id }>
                    { brand.name }
                  </option>
                ) ) }
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="subcategoryId">Subcategory</Label>
              <Input
                type="select"
                name="subcategoryId"
                id="subcategoryId"
                value={ subcategoryId }
                onChange={ ( e ) => setSubcategoryId( e.target.value ) }
                required
              >
                <option value="">Select Subcategory</option>
                { subcategories.map( ( subcategory ) => (
                  <option key={ subcategory.id } value={ subcategory.id }>
                    { subcategory.name }
                  </option>
                ) ) }
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={ price }
                onChange={ ( e ) => setPrice( e.target.value ) }
                required
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <Label for="stockQuantity">In Stock Quantity</Label>
              <Input
                type="number"
                name="stockQuantity"
                id="stockQuantity"
                value={ stockQuantity }
                onChange={ ( e ) => setStockQuantity( e.target.value ) }
                required
                min="0"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ () => setModal( false ) }>
            Cancel
          </Button>
          { id && (
            <Button
              color="danger"
              onClick={ () => setDeleteModal( true ) }
            >
              Delete
            </Button>
          ) }
          <Button color="primary" onClick={ handleSubmit }>
            { id ? "Update Product" : "Add Product" }
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */ }
      <DeleteConfirmModal
        modal={ deleteModal }
        setModal={ setDeleteModal }
        deleteFunction={ handleDelete }
        message="Are you sure you want to delete this product?"
      />
    </>
  );
}
