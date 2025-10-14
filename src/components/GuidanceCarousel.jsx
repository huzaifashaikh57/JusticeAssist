
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './GuidanceCarousel.css';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const GuidanceCarousel = ({ guidanceData, onReportClick, onSlideChange }) => {
  return (
    <div className="guidance-carousel-container">
      <div className="swiper-wrapper-container">
        <Swiper
          onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
          grabCursor={true}
          centeredSlides={true}
          slideToClickedSlide={true}
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="swiper_container"
        >
          {guidanceData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="slide-content">
                <video controls className="slide-video" muted loop>
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button onClick={() => onReportClick(item.category)} className="report-btn">
                  Guidance Form
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-button-prev slider-arrow"></div>
      <div className="swiper-button-next slider-arrow"></div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default GuidanceCarousel;
