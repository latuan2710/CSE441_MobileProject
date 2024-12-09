import { Col, Row } from "reactstrap"
import StaffsTable from "../../components/dashboard/StaffsTable"

const Staffs = () =>
{
    return (
        <Row>
            <Col lg="12">
                <StaffsTable />
            </Col>

        </Row>
    );
};
export default Staffs;