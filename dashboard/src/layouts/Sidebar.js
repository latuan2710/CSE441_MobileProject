import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Staffs",
    href: "/staffs",
    icon: "bi bi-people-fill",
  },
  {
    title: "Users",
    href: "/users",
    icon: "bi bi-person-circle",
  },
  {
    title: "Products",
    href: "/products",
    icon: "bi bi-box-seam",
  },
  {
    title: "Brands",
    href: "/brands",
    icon: "bi bi-tags",
  },
  {
    title: "Categories",
    href: "/categories",
    icon: "bi bi-list-ul",
  },
  {
    title: "Cards",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/grid",
    icon: "bi bi-columns",
  },
];

const Sidebar = () =>
{
  const showMobilemenu = () =>
  {
    document.getElementById( "sidebarArea" ).classList.toggle( "showSidebar" );
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={ { background: `url(${ probg }) no-repeat` } }
      >
        <div className="p-3 d-flex">
          <img src={ user1 } alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={ () => showMobilemenu() }
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">Steave Rojer</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          { navigation.map( ( navi, index ) => (
            <NavItem key={ index } className="sidenav-bg">
              <Link
                to={ navi.href }
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={ navi.icon }></i>
                <span className="ms-3 d-inline-block">{ navi.title }</span>
              </Link>
            </NavItem>
          ) ) }
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
