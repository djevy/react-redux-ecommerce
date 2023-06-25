import Typography from "@mui/material/Typography";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-layout">
      <Typography variant="h5" component="h3" sx={{ display: { sm: "block" } }}>
        Developed by <a className="my-link" href="https://darrenrevans.co.uk/">Darren Evans</a>
      </Typography>
    </div>
  );
};

export default Footer;
