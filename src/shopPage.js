import './main.scss'
import mockData from './js/mockData'
import { DOMstrings } from './js/domStrings'
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'
import { registerActiveClass } from './js/helpers'
import { initBurgerMenuClickListener } from './js/helpers'

let isMobile = false

const checkIsMobile = () => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    isMobile = width < 600 ? true : false
}

window.addEventListener('load', checkIsMobile)
window.addEventListener('resize', checkIsMobile)

initBurgerMenuClickListener(DOMstrings.burgerMenuIcon, DOMstrings.burgerMenuContainer)

//Rendering Data 
const renderData = (array) => {
    const productsContainer = document.querySelector('.all-products__products-container')
    let content = ''
    array.forEach(cur => {
        if (productsContainer) {
            const item = getHtmlString(cur)
            content = content + item
        }
    })

    productsContainer.innerHTML = content
}

const getHtmlString = (product) => {
    return (
        `<a class="card card--shop-page" href="product-page.html">
        <div class="card__image-container">
    <div class="card__image" style='background-image: url(${require('./images/' + product.image)})'></div>
    </div>
    <div class="card__info">
        <span class="card__category">${product.category}</span>
        <h4 class="card__heading">${product.title}</h4>
        <p class='card__description'>${product.description}</p>
        <span class="card__price">$${product.price}</span>
    </div>
</a>`
    )
}

renderData(mockData);

//Filters
//Creating object for all filters 
const defaultFilters = {
    category: null,
    fit: null,
    size: null,
    price: null,
    color: null
}

let filtersContainer = { ...defaultFilters }

//FilterData function
const filterData = () => {
    // get active filters
    const activeFilters = Object.keys(filtersContainer).filter(key => filtersContainer[key])

    // filter data
    const filteredData = mockData.filter(item => {

        let matches = true
        activeFilters.forEach(cur => {
            if (!matches) {
                return
            }

            if (cur === 'size') {
                matches = matches && item.size.includes(filtersContainer[cur])
            } else if (cur === 'price') {
                matches = matches && item.price >= filtersContainer.price[0] && item.price <= filtersContainer.price[1]

            } else {
                matches = matches && item[cur] === filtersContainer[cur]
            }
        })

        return matches
    })

    if (!isMobile) {
        renderData(filteredData)
        noProductsFound(filteredData)
    } else {
        document.querySelector(DOMstrings.applyFilters).addEventListener('click', () => {
            renderData(filteredData)
            noProductsFound(filteredData)
        })
    }
}

const categoriesSelector = document.querySelectorAll(DOMstrings.selector)
if (categoriesSelector) {
    categoriesSelector.forEach(selector => {
        selector.addEventListener('click', function () {
            this.classList.toggle(DOMstrings.selectorActive);
        });
    })
}

//Add and Remove Filter 
const openMobileFilters = () => {
    document.querySelector(DOMstrings.filterMobile).style.display = 'block'
    document.querySelector(DOMstrings.backdrop).style.display = 'block'
}

const closeMobileFilters = () => {
    document.querySelector(DOMstrings.filterMobile).style.display = 'none'
    document.querySelector(DOMstrings.backdrop).style.display = 'none'
}

document.querySelector(DOMstrings.openFilter).addEventListener('click', openMobileFilters)
document.querySelector(DOMstrings.closeFilter).addEventListener('click', closeMobileFilters)
document.querySelector(DOMstrings.applyFilters).addEventListener('click', closeMobileFilters)

window.addEventListener('resize', () => {
    if (!isMobile) {
        closeMobileFilters()
    }
})

//Eventlisteners on Category
const selectCategoryHandler = (category) => {
    //Add eventlistener to every item in NodeList
    category.addEventListener('click', function () {
        //Replace text in default category to selected one 
        const categoryName = this.querySelector('p').textContent
        document.querySelectorAll(DOMstrings.selectorOptionText).forEach(selector => {
            selector.textContent = categoryName;
        })

        //Remove active class from others 
        document.querySelectorAll(DOMstrings.selectorOptionActive).forEach(selector => {
            selector.classList.remove(DOMstrings.selectorOptionActiveClass);
        })

        //Add active class to selected category in list 
        this.classList.add(DOMstrings.selectorOptionActiveClass);

        filterProductsByCategory(categoryName)


    });
}

//Filter by category
const filterProductsByCategory = (category) => {
    if (category === 'All products') {
        filtersContainer.category = null
    } else {
        filtersContainer.category = category
    }
    filterData()
}

const selectorOptions = document.querySelectorAll(DOMstrings.selectorOption);

selectorOptions.forEach(cur => {
    selectCategoryHandler(cur)
})

//Add EventListeners on fit, size and color
const registerToggeleActiveClassListener = (optionClass, optionClassActive, filterBy) => {
    const filterOptions = document.querySelectorAll(optionClass);
    filterOptions.forEach(cur => {
        cur.addEventListener('click', function () {
            const parameterName = cur.textContent
            const parameterID = cur.id
            const selectedFilter = document.querySelector('.' + optionClassActive)

            if (cur.classList.contains(optionClassActive)) {
                document.querySelector('.' + optionClassActive).classList.remove(optionClassActive);
                if (filterBy === 'size') {
                    filtersContainer.size = null
                } else if (filterBy === 'fit') {
                    filtersContainer.fit = null
                } else if (filterBy === 'color') {
                    filtersContainer.color = null
                }
                filterData()
                return
            }

            if (selectedFilter) {
                document.querySelector('.' + optionClassActive).classList.remove(optionClassActive);
            }
            cur.classList.add(optionClassActive);
            updateFiltersCotainerWithActiveFilters(parameterName, parameterID, filterBy)
        })
    })
}
registerToggeleActiveClassListener(DOMstrings.filterSize, DOMstrings.filterSizeSelected, 'size');
registerToggeleActiveClassListener(DOMstrings.filterFit, DOMstrings.filterFitSelected, 'fit');
registerToggeleActiveClassListener(DOMstrings.filterColor, DOMstrings.filterColorSelected, 'color');

//Filter Data By Parameter (fit, size, color)
const updateFiltersCotainerWithActiveFilters = (parameterName, parameterID, filterBy) => {
    if (filterBy === 'fit') {
        filtersContainer.fit = parameterName.toLowerCase()
        filterData()
    } else if (filterBy === 'size') {
        filtersContainer.size = parseFloat(parameterName)
        filterData()
    } else if (filterBy === 'color') {
        filtersContainer.color = parameterID
        filterData()
    }
}

//Price range filter
const priceRange = document.querySelectorAll('.slider')

priceRange.forEach(slider => {
    noUiSlider.create(slider, {
        start: [99, 300],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        }
    });
})


//Update prices in UI
priceRange.forEach(slider => {
    slider.noUiSlider.on('update', (values) => {
        document.querySelectorAll(DOMstrings.lowerPriceInRange).forEach(price => {
            price.textContent = `$${parseInt(values[0])}`
        })

        document.querySelectorAll(DOMstrings.higherPriceInRange).forEach(price => {
            price.textContent = `$${parseInt(values[1])}`
        })
    });
})

//Update filtersContainer with current price range 
priceRange.forEach(slider => {
    slider.noUiSlider.on('change', (values) => {
        filtersContainer.price = values
        filterData()
    })

    slider.noUiSlider.on('end', (values) => {
        filtersContainer.price = values
        filterData()
    })
})


//Function for pagination and noproducts found toggle
const noProductsFound = (filteredData) => {
    if (filteredData.length === 0) {
        document.querySelector(DOMstrings.emptyFilter).style.display = 'flex'
        document.querySelector(DOMstrings.paginationContainer).style.display = 'none'
    } else if (filteredData.length === mockData.length) {
        document.querySelector(DOMstrings.emptyFilter).style.display = 'none'
        document.querySelector(DOMstrings.paginationContainer).style.display = 'flex'
    } else {
        document.querySelector(DOMstrings.emptyFilter).style.display = 'none'
        document.querySelector(DOMstrings.paginationContainer).style.display = 'none'
    }
}

//Clean filters
document.querySelectorAll(DOMstrings.cleanFilters).forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll(DOMstrings.selectorOptionText).forEach(selector => {
            selector.textContent = 'All products'
        })

        filtersContainer = { ...defaultFilters }
        priceRange.forEach(slider => {
            slider.noUiSlider.reset()
        })

        removeAllActiveClassesFromFilters()
        filterData()
    })

})

const removeAllActiveClassesFromFilters = () => {
    const filterFitActive = document.querySelector('.' + DOMstrings.filterFitSelected)
    const filterSizeActive = document.querySelector('.' + DOMstrings.filterSizeSelected)
    const filterColorActive = document.querySelector('.' + DOMstrings.filterColorSelected)
    if (filterFitActive) {
        filterFitActive.classList.remove(DOMstrings.filterFitSelected)
    }
    if (filterSizeActive) {
        filterSizeActive.classList.remove(DOMstrings.filterSizeSelected)
    }
    if (filterColorActive) {
        filterColorActive.classList.remove(DOMstrings.filterColorSelected)
    }
}

//Pagination
registerActiveClass(DOMstrings.paginationLink, DOMstrings.paginationLinkActive)
const paginationPageChange = () => {
    const arrowBack = document.querySelector(DOMstrings.arrowBack);
    const arrowNext = document.querySelector(DOMstrings.arrowNext);
    const pages = document.querySelectorAll(DOMstrings.paginationLink);


    arrowBack.addEventListener('click', () => {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains(DOMstrings.paginationLinkActive) && i > 0) {
                pages[i].classList.remove(DOMstrings.paginationLinkActive);
                pages[i - 1].classList.add(DOMstrings.paginationLinkActive);
                return
            };
        };
    });

    arrowNext.addEventListener('click', () => {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains(DOMstrings.paginationLinkActive) && i < pages.length - 1) {
                pages[i].classList.remove(DOMstrings.paginationLinkActive);
                pages[i + 1].classList.add(DOMstrings.paginationLinkActive);
                return
            }
        }
    });
};
paginationPageChange();