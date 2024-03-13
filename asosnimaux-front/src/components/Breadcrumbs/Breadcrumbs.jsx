// Styles
import "./breadcrumbs.scss";

const Breadcrumbs = ({ children }) => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__links">
        {children}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;