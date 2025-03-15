import PropTypes from "prop-types";

export default function OrdersNavigationPanel({ pathname }) {
  return (
    <section className="w-full h-[60px] dark:bg-gray-900 bg-gray-200 flex justify-center items-center">
      <div className="lg:grid lg:grid-cols-3 xs:w-full md:w-3/4 lg:w-2/4 xs:flex xs:justify-between">
        <span
          className={`${
            pathname.includes("ordenes")
              ? "xs:bg-[#8941FF] lg:border-black dark:border-[#8941FF] xs:text-white xs:font-bold"
              : " lg:border-gray-300"
          } xs:border-r-[1px] xs:border-gray-900 lg:border-r-0 xs:h-[60px] xs:flex xs:items-center xs:w-1/3 xs:justify-center xs:px-2 lg:bg-transparent lg:rounded-none lg:w-auto lg:text-black lg:px-0  lg:border-b-4 text-center`}
        >
          <a href="/ordenes" className="cursor-pointer dark:text-white xs:text-xs lg:text-lg">
            Ordenes creadas
          </a>
        </span>
        <span
          className={`${
            pathname.includes("entregados")
              ? "xs:bg-[#8941FF] lg:border-black dark:border-[#8941FF] xs:text-white xs:font-bold"
              : " xs:text-black lg:border-gray-300"
          }  xs:border-r-[1px] xs:border-gray-900 lg:border-r-0 xs:h-[60px] xs:flex xs:items-center xs:w-1/3 xs:justify-center xs:px-2 lg:bg-transparent lg:rounded-none lg:w-auto lg:text-black lg:px-0 lg:border-b-4 text-center`}
        >
          <a
            href="/entregados"
            className="cursor-pointer dark:text-white xs:text-xs lg:text-lg"
          >
            Ordenes entregadas
          </a>
        </span>
        <span
          className={`${
            pathname.includes("cancelados")
              ? "xs:bg-[#8941FF] lg:border-black dark:border-[#8941FF] xs:text-white xs:font-bold"
              : " lg:border-gray-300"
          } xs:h-[60px] xs:flex xs:items-center xs:w-1/3 xs:justify-center xs:px-2 lg:bg-transparent lg:rounded-none lg:w-auto lg:text-black lg:px-0 lg:border-b-4 text-center`}
        >
          <a
            href="/cancelados"
            className="cursor-pointer dark:text-white xs:text-xs lg:text-lg"
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
