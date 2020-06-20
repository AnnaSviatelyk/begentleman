
//Register active class
export const registerActiveClass = (optionClass, optionClassActive) => {
    const filterOptions = document.querySelectorAll(optionClass);
    filterOptions.forEach(cur => {
        cur.addEventListener('click', function () {
            const selectedPage = document.querySelector('.' + optionClassActive)

            if (selectedPage) {
                document.querySelector('.' + optionClassActive).classList.remove(optionClassActive);
            }
            cur.classList.add(optionClassActive);
        })
    })
}


const closeMenu = (event, icon, menu) => {
    const classList = event.target.classList
    if (event.target !== menu && !classList.contains('vertical-menu__navigation') && !classList.contains('vertical-menu__navigation-link')) {
        icon.style.display = 'flex'
        menu.style.display = 'none'
        document.removeEventListener('click', closeMenu)
    }
}

export const initBurgerMenuClickListener = (menuIcon, menuContainer) => {
    const icon = document.querySelector(menuIcon)
    const menu = document.querySelector(menuContainer)

    icon.addEventListener('click', (event) => {
        event.stopPropagation()
        icon.style.display = 'none'
        menu.style.display = 'block'
    })

    document.addEventListener('click', (event) => closeMenu(event, icon, menu))

}