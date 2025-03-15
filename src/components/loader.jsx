import "../css/loader.css";
import PropTypes from "prop-types";
export default function Loader({ className, section }) {
  return (
    <div
      className={`w-full ${
        section && "h-screen bg-white dark:bg-gray-900"
      } flex justify-center items-center`}
    >
      <div className={`loader ${className || ""}`} />
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
  section: PropTypes.bool,
};
