import { Col, Row } from "reactstrap"
import UsersTable from "../../components/dashboard/UsersTable"

const Users = () =>
{
    return (
        <Row>
            <Col lg="12">
                <UsersTable />
            </Col>

        </Row>
    );
};
export default Users;