import { useEffect, useState } from "react";
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
import { addSubcategory, getAllCategories, getAllSubcategories, getSubcategoryById, updateSubcategory } from "../../Controller/apiServices";

export default function SubcategoryModal ( {
  id,
  modal,
  setModal,
  setRefresh,
  setSuccessMessage,
} )
{
  const [ name, setName ] = useState( "" );
  const [ categories, setCategories ] = useState( [] );
  const [ categoryId, setCategoryId ] = useState( "" );

  useEffect( () =>
  {

    const fetchSubcategoyById = async () =>
    {
      if ( id !== null )
      {
        setName( "Loading" );
        const data = await getSubcategoryById( id );
        setCategoryId( data.category.id )
        setName( data.name );
      }
    };

    fetchSubcategoyById();

    const fetchCategories = async () =>
    {
      const data = await getAllCategories();
      setCategories( data );
    };
    fetchCategories();

  }, [] );

  const handleAdd = async () =>
  {
    try
    {
      const response = await addSubcategory( name, categoryId );
      if ( response.status === 201 || response.status === 200 )
      {
        setSuccessMessage( "Category added successfully!" );
        setTimeout( () =>
        {
          setSuccessMessage( "" );
        }, 2000 );
        setModal( false );
        setRefresh( ( pre ) => pre + 1 );
      } else
      {
        console.error( "Unexpected response status:", response.status );
        alert( "Failed to add the category. Please try again." );
      }
    } catch ( error )
    {
      console.error( "Error adding category:", error.message );
      alert( "An error occurred while adding the category. Please try again." );
    }
  };

  const handleUpdate = async () =>  
  {
    try
    {
      const response = await updateSubcategory( id, name, categoryId );
      if ( response.status === 201 || response.status === 200 )
      {
        setSuccessMessage( "Category updated successfully!" );
        setTimeout( () =>
        {
          setSuccessMessage( "" );
        }, 2000 );
        setModal( false );
        setRefresh( ( pre ) => pre + 1 );
      } else
      {
        console.error( "Unexpected response status:", response.status );
        alert( "Failed to update the category. Please try again." );
      }
    } catch ( error )
    {
      console.error( "Error adding category:", error.message );
      alert( "An error occurred while updating the category. Please try again." );
    }
  };

  return (
    <Modal isOpen={ modal } toggle={ () => setModal( false ) } size="xl">
      <ModalHeader>{ id ? "Subcategory Details" : "Add Subcategory" }</ModalHeader>
      <ModalBody>
        <Form>

          <FormGroup>
            <Label for="categoryId">Category</Label>
            <Input
              type="select"
              name="categoryId"
              id="categoryId"
              value={ categoryId }
              onChange={ ( e ) => setCategoryId( e.target.value ) }
              required
            >
              <option value="">Select Category</option>
              { categories.map( ( category ) => (
                <option key={ category.id } value={ category.id }>
                  { category.name }
                </option>
              ) ) }
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ ( e ) => setName( e.target.value ) }
            />
          </FormGroup>

        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={ () => setModal( false ) }>
          Cancel
        </Button>
        <Button color="primary" onClick={ id ? handleUpdate : handleAdd }>
          { id ? "Update Subcategory" : "Add Subcategory" }
        </Button>
      </ModalFooter>
    </Modal>
  );
}
