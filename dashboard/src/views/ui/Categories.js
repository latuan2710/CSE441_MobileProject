import { Col, Row } from "reactstrap";
import CategoriesTable from "../../components/dashboard/CategoriesTable";

const Categories = () => {
  return (
    <Row>
      <Col lg="12">
        <CategoriesTable />
      </Col>
    </Row>
  );
};

export default Categories;
