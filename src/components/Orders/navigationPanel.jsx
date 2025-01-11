import PropTypes from "prop-types";

export default function OrdersNavigationPanel({ pathname }) {
  return (
    <section className="w-full h-[60px] bg-gray-200 flex justify-center items-center">
      <div className="lg:grid lg:grid-cols-3 xs:w-full md:w-3/4 lg:w-2/4 xs:flex xs:justify-between">
        <span
          className={`${
            pathname.includes("ordenes")
              ? "xs:bg-[#7b2cfa] lg:border-black xs:text-white xs:font-bold"
              : " lg:border-gray-300"
          } xs:h-[60px] xs:flex xs:items-center xs:w-1/3 xs:justify-center xs:px-2 lg:bg-transparent lg:rounded-none lg:w-auto lg:text-black lg:px-0  border-b-2 text-center`}
        >
          <a href="/ordenes" className="cursor-pointer  xs:text-xs lg:text-lg">
            Ordenes creadas
          </a>
        </span>
        <span
          className={`${
            pathname.includes("entregados")
              ? "xs:bg-[#7b2cfa] lg:border-black xs:text-white xs:font-bold"
              : " xs:text-black lg:border-gray-300"
          } xs:h-[60px] xs:flex xs:items-center xs:w-1/3 xs:justify-center xs:px-2 lg:bg-transparent lg:rounded-none lg:w-auto lg:text-black lg:px-0  border-b-2 text-center`}
        >
          <a
            href="/entregados"
            className="cursor-pointer  xs:text-xs lg:text-lg"
          >
            Ordenes entregadas
          </a>
        </span>
        <span
          className={`${
            pathname.includes("cancelados")
              ? "xs:bg-[#7b2cfa] lg:border-black xs:text-white xs:font-bold"
              : " lg:border-gray-300"
          } xs:h-[60px] xs:flex xs:items-center xs:w-1/3 xs:justify-center xs:px-2 lg:bg-transparent lg:rounded-none lg:w-auto lg:text-black lg:px-0  border-b-2 text-center`}
        >
          <a
            href="/cancelados"
            className="cursor-pointer  xs:text-xs lg:text-lg"
          >
            Ordenes canceladas
          </a>
        </span>
      </div>
    </section>
  );
}

OrdersNavigationPanel.propTypes = {
  pathname: PropTypes.string,
};
