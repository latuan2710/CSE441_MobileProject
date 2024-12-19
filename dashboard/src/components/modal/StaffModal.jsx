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
import { addStaff, getStaffById, updateStaff } from "../../Controller/apiServices";

export default function StaffModal ( {
  modal,
  setModal,
  id,
  setSuccessMessage,
  setRefresh,
} )
{
  const [ username, setUsername ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ phone, setPhone ] = useState( "" );
  const [ address, setAddress ] = useState( "" );
  const [ avatar, setAvatar ] = useState( null );
  const [ preview, setPreview ] = useState( "" );
  const [ status, setStatus ] = useState( "" );

  const avatarRef = useRef();

  // Fetch user data if updating
  useEffect( () =>
  {
    const fetchStaff = async () =>
    {
      if ( id !== null )
      {
        try
        {
          const data = await getStaffById( id );
          setUsername( data.username );
          setEmail( data.email );
          setPhone( data.phone );
          setAddress( data.address );
          setPreview( data.avatar );
          setStatus( data.status );
        } catch ( error )
        {
          console.error( "Error fetching user:", error.message );
        }
      }
    };
    fetchStaff();
  }, [ id ] );

  const handleFileChange = ( e ) =>
  {
    const file = e.target.files[ 0 ];
    if ( file )
    {
      setAvatar( file );
      setPreview( URL.createObjectURL( file ) );
    } else
    {
      setAvatar( null );
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
        await updateStaff( id, { id, phone, address, status }, avatar );
        setSuccessMessage( "User updated successfully!" );
      } else
      {
        await addStaff( { username, email, password, phone, address }, avatar );
        setSuccessMessage( "User added successfully!" );
      }
      setTimeout( () => setSuccessMessage( "" ), 2000 );
      setModal( false );
      setRefresh( ( prev ) => prev + 1 );
    } catch ( error )
    {
      console.error( `Error ${ id ? "updating" : "adding" } staff:`, error.message );
      alert( `An error occurred while ${ id ? "updating" : "adding" } the staff.` );
    }
  };

  return (
    <Modal isOpen={ modal } toggle={ () => setModal( false ) } size="lg">
      <ModalHeader toggle={ () => setModal( false ) }>
        { id ? "Update User" : "Add User" }
      </ModalHeader>
      <ModalBody>
        <Form encType="multipart/form-data" onSubmit={ handleSubmit }>
          {/* Avatar Upload */ }
          <FormGroup>
            <Label for="avatar">Avatar</Label>
            <Input
              ref={ avatarRef }
              type="file"
              name="avatar"
              id="avatar"
              onChange={ handleFileChange }
              required={ !id ? true : false }
            />
            { preview && (
              <img
                src={ preview }
                alt="Avatar Preview"
                className="img-thumbnail mt-3"
                width="100"
              />
            ) }
          </FormGroup>

          {/* Username */ }
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={ username }
              onChange={ ( e ) => setUsername( e.target.value ) }
              required
              disabled={ id ? true : false }
            />
          </FormGroup>


          {/* Email */ }
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ ( e ) => setEmail( e.target.value ) }
              required
              disabled={ id ? true : false }
            />
          </FormGroup>


          {/* Password */ }
          { !id && (
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={ password }
                onChange={ ( e ) => setPassword( e.target.value ) }
                required
              />
            </FormGroup>
          ) }

          {/* Phone */ }
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={ phone }
              onChange={ ( e ) => setPhone( e.target.value ) }
              required
            />
          </FormGroup>

          {/* Address */ }
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={ address }
              onChange={ ( e ) => setAddress( e.target.value ) }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={ status }
              onChange={ ( e ) => setStatus( e.target.value === "true" ) }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Input>
          </FormGroup>

          <ModalFooter>
            <Button color="secondary" onClick={ () => setModal( false ) }>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              { id ? "Update User" : "Add User" }
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
