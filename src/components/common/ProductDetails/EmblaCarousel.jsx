import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import useProductContext from '../../hooks/useProductContext'
import { Thumb } from './EmblaCarouselThumbsButton'
import zoom from '../../../../image/zoom.svg'
import '../../css/imageModal.css'


const EmblaCarousel = (props) => {

  const { openImageModal } = useProductContext()
  const { slides, options, pics } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })
 
  const imageByIndex = (index) => pics[index % pics.length]

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <>
    <div className="embla mt-4 lg:mt-0">
      <div className="embla__viewport lg:h-[22em]" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
              < img src={zoom} alt="" style={{width: "34px"}} onClick={(e) => {openImageModal(imageByIndex(index))}}/>
              </div>
              <img
                className="embla__slide__img"
                src={imageByIndex(index)}
                
              />
            
            </div>
          ))}
        </div>
      </div>

      

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={imageByIndex(index)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default EmblaCarousel
