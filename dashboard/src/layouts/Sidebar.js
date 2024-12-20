import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
    roles: [ "ADMIN", "STAFF" ], // Accessible roles
  },
  {
    title: "Staffs",
    href: "/staffs",
    icon: "bi bi-people-fill",
    roles: [ "ADMIN" ],
  },
  {
    title: "Users",
    href: "/users",
    icon: "bi bi-person-circle",
    roles: [ "ADMIN", "STAFF" ],
  },
  {
    title: "Products",
    href: "/products",
    icon: "bi bi-box-seam",
    roles: [ "ADMIN", "STAFF" ],
  },
  {
    title: "Brands",
    href: "/brands",
    icon: "bi bi-tags",
    roles: [ "ADMIN", "STAFF" ],
  },
  {
    title: "Categories",
    href: "/categories",
    icon: "bi bi-folder",
    roles: [ "ADMIN", "STAFF" ],
  },
  {
    title: "Subcategories",
    href: "/subcategories",
    icon: "bi bi-folder2",
    roles: [ "ADMIN", "STAFF" ],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: "bi bi-cart",
    roles: [ "ADMIN", "STAFF" ],
  },
];

const Sidebar = () =>
{
  const showMobilemenu = () =>
  {
    document.getElementById( "sidebarArea" ).classList.toggle( "showSidebar" );
  };
  let location = useLocation();
  const navigate = useNavigate();
  const account = JSON.parse( localStorage.getItem( "account" ) );

  useEffect( () =>
  {
    if ( account === null )
    {
      navigate( "/login" );
    }
  }, [ account, navigate ] );

  const filteredNavigation = navigation.filter( ( navi ) =>
    navi.roles.includes( account?.role )
  );

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      { account && (
        <div
          className="profilebg"
          style={ {
            background: `url(${ require( "../assets/images/bg/download.jpg" ) }) no-repeat`,
          } }
        >
          <div className="p-3 d-flex">
            <img
              src={
                account.avatar
                  ? account.avatar
                  : require( "../assets/images/users/user2.jpg" )
              }
              alt="user"
              width="50"
              className="rounded-circle"
            />
            <Button
              color="white"
              className="ms-auto text-white d-lg-none"
              onClick={ () => showMobilemenu() }
            >
              <i className="bi bi-x"></i>
            </Button>
          </div>
          <div className="bg-dark text-white p-2 opacity-75">
            { account.username }
          </div>
        </div>
      ) }

      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          { filteredNavigation.map( ( navi, index ) => (
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
