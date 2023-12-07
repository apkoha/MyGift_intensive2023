const swiperThumb = new Swiper(".gift__swiper_thumb", {
  spaceBetween: 16,
  slidesPerView: 6,
  freeMode: true,
});

const swiperMain = new Swiper(".gift__swiper_card", {
  spaceBetween: 16,
  thumbs: {
    swiper: swiperThumb,
  },
});
