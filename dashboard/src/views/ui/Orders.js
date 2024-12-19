import { Col, Row } from "reactstrap"
import OrdersTable from "../../components/dashboard/OrdersTable"

const Orders = () =>
{
    return (
        <Row>
            <Col lg="12">
                <OrdersTable />
            </Col>

        </Row>
    );
};
export default Orders;