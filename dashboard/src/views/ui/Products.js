import { Col, Row } from "reactstrap";
import ProductsTable from "../../components/dashboard/ProductsTable";

const Products = () =>
{
  return (
    <Row>
      <Col lg="12">
        <ProductsTable />
      </Col>

    </Row>
  );
};

export default Products;
