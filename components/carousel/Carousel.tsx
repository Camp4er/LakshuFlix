import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CarouselItem from './CarouselItem';
import CarouselIndicator from './CarouselIndicator';

export interface CarouselProps {
  width?: number;
  height?: number;
  items: React.ReactNode[];
}

function Carousel({ width, height, items }: CarouselProps) {
  // State Variables
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Function to handle click on the previous button
  function handlePrevItemBtn() {
    setActiveIndex((prev) => (prev + 1 < items.length ? prev + 1 : prev));
  }

  // Function to handle click on the next button
  function handleNextItemBtn() {
    setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }

  return (
    <div className='carousel-container mt-10' style={{ width, height }}>
      {/* Previous Button */}
      {activeIndex > 0 && (
        <button
          className='carousel-btn-switch-card-left carousel-btn-switch-card'
          onClick={handleNextItemBtn} // Corrected function
        >
          <IoIosArrowBack />
        </button>
      )}

      {/* Carousel */}
      {items.map((item, index) => (
        <CarouselItem key={index} index={index} activeIndex={activeIndex}>
          {item}
        </CarouselItem>
      ))}

      {/* Next Button */}
      {activeIndex < items.length - 1 && (
        <button
          className='carousel-btn-switch-card-right carousel-btn-switch-card'
          onClick={handlePrevItemBtn} // Corrected function
        >
          <IoIosArrowForward />
        </button>
      )}

      {/* Carousel Indicator */}
      <CarouselIndicator
        activeIndex={activeIndex}
        length={items.length}
        onSetActiveIndex={setActiveIndex}
      />
    </div>
  );
}

export default Carousel;
