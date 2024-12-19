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
  addUser,
  getUserById,
  updateUser,
} from "../../Controller/apiServices";

export default function OrderModal ( {
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
    const fetchUser = async () =>
    {
      if ( id !== null )
      {
        try
        {
          const data = await getUserById( id );
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
    fetchUser();
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
        await updateUser( id, { id, phone, address, status }, avatar );
        setSuccessMessage( "User updated successfully!" );
      } else
      {
        await addUser( { username, email, password, phone, address }, avatar );
        setSuccessMessage( "User added successfully!" );
      }
      setTimeout( () => setSuccessMessage( "" ), 2000 );
      setModal( false );
      setRefresh( ( prev ) => prev + 1 );
    } catch ( error )
    {
      console.error( `Error ${ id ? "updating" : "adding" } user:`, error.message );
      alert( `An error occurred while ${ id ? "updating" : "adding" } the user.` );
    }
  };

  return (
    <Modal isOpen={ modal } toggle={ () => setModal( false ) } size="lg">
      <ModalHeader toggle={ () => setModal( false ) }>
        Order detail
      </ModalHeader>
      <ModalBody>

      </ModalBody>
    </Modal>
  );
}
