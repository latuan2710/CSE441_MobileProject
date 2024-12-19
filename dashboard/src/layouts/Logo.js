import { Link } from "react-router-dom";

const Logo = () =>
{
  return (
    <Link to="/starter">
      <img src={ require( "../assets/images/logos/baki.png" ) } alt="Logo" style={ {
        maxWidth: '70px',
        maxHeight: '60px',
        filter: 'invert( 1 )'
      } }
      />
    </Link>
  );
};

export default Logo;
