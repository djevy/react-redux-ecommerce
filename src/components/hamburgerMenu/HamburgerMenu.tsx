import "./hamburgerMenu.css";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import {
  productCategories,
  productCollections,
} from "../products/allProductsSlice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const categories = useSelector(productCategories);
  const collections = useSelector(productCollections);
  // console.log("categories", categories)

  return (
    <div className="menu-container">
      <h3 className="menu-title">Menu</h3>
      <Divider />

      <div className="menu-layout">
        <Link to={`/`} className="menu-links">
          <h4>Home</h4>
        </Link>
        <Link to={`/sales`} className="buttons">
          <Button variant="contained" color="error">
            our sale
          </Button>
        </Link>

        <Accordion className="menu-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="inherit" />}
            aria-controls="panel-category-content"
            id="panel-category-header"
          >
            <Typography className="menu-accordion-title">
              Product Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {categories &&
              categories.map((category, i) => (
                <Link
                  to={`/products/${category?.toLocaleLowerCase()}`}
                  key={i}
                  className="menu-links"
                >
                  <Typography>{category}</Typography>
                </Link>
              ))}
          </AccordionDetails>
        </Accordion>
        <Accordion className="menu-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="inherit" />}
            aria-controls="panel-collection-content"
            id="panel-collection-header"
          >
            <Typography className="menu-accordion-title">
              Collections
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {collections &&
              collections.map((collection, i) => (
                <Link
                  to={`/products/${collection?.toLocaleLowerCase()}`}
                  key={i}
                  className="menu-links"
                >
                  <Typography>{collection}</Typography>
                </Link>
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default HamburgerMenu;
