import { Col, Row } from "reactstrap";
import SubcategoriesTable from "../../components/dashboard/SubcategoriesTable";

const Subcategories = () =>
{
  return (
    <Row>
      <Col lg="12">
        <SubcategoriesTable />
      </Col>
    </Row>
  );
};

export default Subcategories;
