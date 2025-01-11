import PropTypes from "prop-types";

export default function HamburguerIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 18L20 18"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M4 12L20 12"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

HamburguerIcon.propTypes = {
    className: PropTypes.string
}
