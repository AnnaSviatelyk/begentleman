import Swiper, { Pagination } from "swiper";
Swiper.use([Pagination]);





export const createSwiper = (container) => {
    let init = false
    let swiper = Swiper
    let isShownPagination = false

    let enabled = window.matchMedia('(max-width: 1024px)').matches;
    if (enabled) {
        if (!init) {
            init = true
            isShownPagination = true
            console.log(init)
            swiper = new Swiper(container, {
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
        if (init) {
            isShownPagination = false
            swiper.destroy();
            init = false;
            console.log(init)
        }
    }
}