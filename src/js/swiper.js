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
                spaceBetween: 16,
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