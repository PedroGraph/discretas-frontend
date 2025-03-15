import PropTypes from 'prop-types';
import { memo } from 'react'

function Hero({text}) {
    const imageSelected = Math.floor(Math.random() * 2);
    return(
        <section className="flex flex-col justify-center items-center w-full z-10 relative overflow-hidden">
        <img
          src={`/orders/image-order-${
            imageSelected > 0 ? imageSelected : 2
          }.jpg`}
          alt="image-order"
          className="xs:max-h-[100px] lg:max-h-[200px] object-cover w-full "
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1 font-bold text-white xs:text-xl lg:text-4xl">
          {text}
        </span>
      </section>
    )
}

export default memo(Hero)

Hero.propTypes = {
  text: PropTypes.string
}