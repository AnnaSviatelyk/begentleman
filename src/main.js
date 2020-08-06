import './main.scss'
import { DOMstrings } from './js/domStrings'
import { initBurgerMenuClickListener } from './js/helpers'
import { createSwiper } from './js/swiper'


window.addEventListener('load', () => createSwiper('.swiper-main'))
window.addEventListener('resize', () => createSwiper('.swiper-main'))

initBurgerMenuClickListener(DOMstrings.burgerMenuIcon, DOMstrings.burgerMenuContainer)






