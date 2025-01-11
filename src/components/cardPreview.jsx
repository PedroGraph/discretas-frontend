import PropTypes from "prop-types";

const CardPreview = ({ cardData }) => {
  return (
    <div className="relative w-96 h-56 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white shadow-xl">
      <div className="absolute top-4 right-4">
        <svg
          className="w-12 h-12 text-white/80"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22 4H2v16h20V4zm-2 14H4V8h16v10z" />
        </svg>
      </div>

      <div className="mt-8">
        <div className="text-2xl tracking-wider font-mono">
          {cardData.number || "•••• •••• •••• ••••"}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div>
          <div className="text-xs text-white/60">Titular de la tarjeta</div>
          <div className="font-medium tracking-wide">
            {cardData.name || "NOMBRE TITULAR"}
          </div>
        </div>

        <div>
          <div className="text-xs text-white/60">Expira</div>
          <div className="font-medium">{cardData.expiry || "MM/YY"}</div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;

CardPreview.propTypes = {
  cardData: PropTypes.shape({
    number: PropTypes.string,
    name: PropTypes.string,
    expiry: PropTypes.string,
  }).isRequired,
};
