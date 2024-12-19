import React, { useEffect, useState } from "react";
import
{
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import { getOrderById } from "../../Controller/apiServices";
import "../../Style/style.css";

export default function OrderModal ( {
  modal,
  setModal,
  id,
  setSuccessMessage,
  setRefresh
} )
{
  const [ orderDetails, setOrderDetails ] = useState( [] );
  const [ receiverInfo, setReceiverInfo ] = useState( {} );

  useEffect( () =>
  {
    const fetchOrderDetails = async () =>
    {
      if ( id !== null )
      {
        try
        {
          const order = await getOrderById( id );
          setOrderDetails( order.orderDetails );
          setReceiverInfo( {
            name: order.receiverName,
            address: order.receiverAddress,
            phone: order.receiverPhone,
          } );
        } catch ( error )
        {
          console.error( "Error fetching order details:", error.message );
        }
      }
    };
    fetchOrderDetails();
  }, [ id ] );

  return (
    <Modal isOpen={ modal } toggle={ () => setModal( false ) } size="lg">
      <ModalHeader toggle={ () => setModal( false ) } className="modal-header-custom">
        Order Details
      </ModalHeader>
      <ModalBody className="modal-body-custom">
        {/* Order Details Table */ }
        <Table responsive striped bordered className="order-details-table">
          <thead className="table-header-custom">
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            { orderDetails.map( ( detail, index ) => (
              <tr key={ index }>
                <td>
                  <img
                    src={ detail.product.image }
                    alt={ detail.product.name }
                    className="product-image"
                    style={ { maxWidth: '100px' } }
                  />
                </td>
                <td>{ detail.product.name }</td>
                <td>{ detail.product.brand.name }</td>
                <td>{ detail.product.subcategory.category.name }</td>
                <td>${ detail.product.price.toFixed( 2 ) }</td>
                <td>{ detail.quantity }</td>
                <td>${ ( detail.quantity * detail.product.price ).toFixed( 2 ) }</td>
              </tr>
            ) ) }
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter className="modal-footer-custom">
        <Button color="secondary" onClick={ () => setModal( false ) }>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
