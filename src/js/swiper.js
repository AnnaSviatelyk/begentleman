import Swiper, { Pagination } from "swiper";
Swiper.use([Pagination]);

const swiperInstances = {}

export const createSwiper = (container) => {
    let isShownPagination = false

    let enabled = window.matchMedia('(max-width: 1024px)').matches;
    if (enabled) {
        if (!swiperInstances[container]) {
            isShownPagination = true

            swiperInstances[container] = new Swiper(container, {
                slidesPerView: 3,
                spaceBetween: 30,

                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },

                    600: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },

                    750: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                },

                pagination: {
                    el: isShownPagination ? '.swiper-pagination' : null,
                    clickable: true,
                }
            })
        }
    } else {
        if (swiperInstances[container]) {
            isShownPagination = false
            swiperInstances[container].destroy();
            swiperInstances[container] = null

        }
    }
}