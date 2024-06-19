import React, { useState } from 'react';

export interface CardProps {
  index: number;
  activeIndex: number;
  children?: React.ReactNode;
}

const CarouselItem = ({ index, activeIndex, children }: CardProps) => {
  const [scaled, setScaled] = useState<boolean>(false);
  const offset = (index - activeIndex) / 4;
  const direction = Math.sign(index - activeIndex);
  const absOffset = Math.abs(offset);

  const cssTransformProperties = `
    rotateY(${offset * 55}deg)
    scaleY(${1 + absOffset * -0.5})
    translateX(${direction * -3.5}rem)
    translateZ(${absOffset * -35}rem)
    scale(${scaled && index === activeIndex ? 6.5 : 1})
  `;

  const cssOpacity = Math.abs(index - activeIndex) >= 3 ? '0' : '1';
  const cssDisplay = Math.abs(index - activeIndex) >= 3 ? 'none' : 'block';

  return (
    <div
      className='carousel-item'
      style={{
        transform: cssTransformProperties,
        opacity: cssOpacity,
        display: cssDisplay,
        zIndex: scaled ? 100 : 1,
      }}
      onClick={() => setScaled(!scaled)}
    >
      <div className='h-full w-full'>{children}</div>
    </div>
  );
};

export default CarouselItem;
