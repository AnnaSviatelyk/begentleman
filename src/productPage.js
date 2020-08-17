import './main.scss'
import { DOMstrings } from './js/domStrings'
import { initBurgerMenuClickListener } from './js/helpers'
import { createSwiper } from './js/swiper'

window.addEventListener('load', () => createSwiper('.swiper-add-products'))
window.addEventListener('resize', () => createSwiper('.swiper-add-products'))

window.addEventListener('load', () => createSwiper('.swiper-top-picks-product-page'))
window.addEventListener('resize', () => createSwiper('.sswiper-top-picks-product-page'))

//Toggle burger menu
initBurgerMenuClickListener(DOMstrings.burgerMenuIcon, DOMstrings.burgerMenuContainer)

//Add active class to selected size 
const registerActiveClass = (optionClass, optionClassActive) => {
    const filterOptions = document.querySelectorAll(optionClass);
    filterOptions.forEach(cur => {

        cur.addEventListener('click', function () {
            const selectedOption = document.querySelector('.' + optionClassActive)
            if (cur.classList.contains(optionClassActive)) {
                document.querySelector('.' + optionClassActive).classList.remove(optionClassActive)
                return

            }

            if (selectedOption) {
                document.querySelector('.' + optionClassActive).classList.remove(optionClassActive)
            }
            cur.classList.add(optionClassActive);

        })
    })
}
registerActiveClass(DOMstrings.productColor, DOMstrings.productColorSelected)
registerActiveClass(DOMstrings.productSize, DOMstrings.productSizeSelected)

//Photo slider 

//Get html
const getProductImagesHtml = (images, selectedImageIndex = 0) => {
    let test = ''
    images.forEach((image, index) => {
        if (index !== selectedImageIndex) {
            test += `<div class="product-description__more-images-item"  style="background-image: url(images/${images[index]})"></div>`
        }
        console.log(test)
    })
    return (`<div style="background-image: url(images/${images[selectedImageIndex]})" class="product-description__image-main"></div>
        <div class="product-description__more-images">
                ${test}
                </div>`)
}

//Insert images on page
const mockImages = ['product-desc-1.jpg', 'product-desc-2.jpg', 'product-desc-3.jpg', 'product-desc-4.jpg']
const slider = document.querySelector('#slider')
let activeImageIndex = 0
slider.insertAdjacentHTML('beforeend', getProductImagesHtml(mockImages, activeImageIndex))


//Add eventlisteners on arrows
document.querySelector(DOMstrings.flippingImageArrowRight).addEventListener('click', () => {
    activeImageIndex = activeImageIndex + 1
    if (activeImageIndex <= mockImages.length - 1) {
        slider.innerHTML = getProductImagesHtml(mockImages, activeImageIndex)
    }
})

document.querySelector(DOMstrings.flippingImageArrowLeft).addEventListener('click', () => {
    activeImageIndex = activeImageIndex - 1

    if (activeImageIndex >= 0 && activeImageIndex <= mockImages.length - 1) {
        slider.innerHTML = getProductImagesHtml(mockImages, activeImageIndex)
    }
})

