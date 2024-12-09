import { Col, Row } from "reactstrap";
import BrandsTable from "../../components/dashboard/BrandsTable";

const Brands = () => {
  return (
    <Row>
      <Col lg="12">
        <BrandsTable />
      </Col>
    </Row>
  );
};
export default Brands;
