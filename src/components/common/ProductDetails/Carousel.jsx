import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import '../../css/base.css'
import '../../css/sandbox.css'
import '../../css/embla.css'

const OPTIONS = {}

const Carousel = ({slides, pics}) => (
  <main className="sandbox">
    <section className="sandbox__carousel">
      <EmblaCarousel slides={Array.from(Array(slides).keys())} pics={pics} options={OPTIONS} />
    </section>
  </main>
)

export default Carousel;


