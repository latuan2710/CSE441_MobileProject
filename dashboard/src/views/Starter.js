import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";

import ProductsTable from "../components/dashboard/ProductsTable";
import BrandsTable from "../components/dashboard/BrandsTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Starter = () =>
{
  const navigate = useNavigate();
  const account = JSON.parse( localStorage.getItem( "account" ) );
  useEffect( () =>
  {
    if ( account === null )
    {
      navigate( "/login" );
    }
  } )
  return (
    <div>
      {/***Sales & Feed***/ }
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>

      {/***Items Tables ***/ }
      <Row>
        <Col lg="12">
          <ProductsTable />
        </Col>
      </Row>

      <Row>
        <Col lg="12">
          <BrandsTable />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
