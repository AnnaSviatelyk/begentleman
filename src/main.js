import './main.scss'
import mockData from './js/mockData'
import { DOMstrings } from './js/domStrings'
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'

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
    return (`<a class="all-products__product" href="product-page.html">
    <div class="all-products__product-image" style='background-image: url(${require('./images/' + product.image)})'></div>
    <div class="all-products__product-description">
        <span class="all-products__category">${product.category}</span>
        <h4 class="product-heading all-products__product-heading">${product.title}</h4>
        <p>${product.description}</p>
        <span>$${product.price}</span>
    </div>
</a>`)
}

renderData(mockData);

//Filters 
const categoriesSelector = document.querySelector(DOMstrings.selector)
if (categoriesSelector) {
    categoriesSelector.addEventListener('click', function () {
        this.classList.toggle(DOMstrings.selectorActive);
    });
}

//Category
const selectCategoryHandler = (category) => {
    //Add eventlistener to every item in NodeList
    category.addEventListener('click', function () {
        //Replace text in default category to selected one 
        const categoryName = this.querySelector('p').textContent;
        document.querySelector(DOMstrings.selectorOptionText).textContent = categoryName;

        //Remove active class from others 
        document.querySelector(DOMstrings.selectorOptionActive).classList.remove(DOMstrings.selectorOptionActiveClass);

        //Add active class to selected category in list 
        this.classList.add(DOMstrings.selectorOptionActiveClass);
        filterProductsByCategory(categoryName)

    });
}

//Filter by category
const filterProductsByCategory = (category) => {
    const filteredData = mockData.filter(cur => cur.category === category)
    if (category === 'All products') {
        noProductsFound(filteredData)
        renderData(mockData)
    } else {
        noProductsFound(filteredData)
        renderData(filteredData)
    }
}

const selectorOptions = document.querySelectorAll(DOMstrings.selectorOption);
selectorOptions.forEach(cur => {
    selectCategoryHandler(cur)
})

//Add eventListeners
const registerToggeleActiveClassListener = (optionClass, optionClassActive, filterBy) => {
    const filterOptions = document.querySelectorAll(optionClass);
    filterOptions.forEach(cur => {
        cur.addEventListener('click', function () {
            const parameterName = cur.textContent
            const parameterID = cur.id
            document.querySelector('.' + optionClassActive).classList.remove(optionClassActive);
            cur.classList.add(optionClassActive);
            filterByParameter(parameterName, parameterID, filterBy)
        })
    })
}
registerToggeleActiveClassListener(DOMstrings.filterSize, DOMstrings.filterSizeSelected, 'size');
registerToggeleActiveClassListener(DOMstrings.filterFit, DOMstrings.filterFitSelected, 'fit');
registerToggeleActiveClassListener(DOMstrings.filterColor, DOMstrings.filterColorSelected, 'color');

//Filter by fit 
const filterByParameter = (parameterName, parameterID, filterBy) => {
    if (filterBy === 'fit') {
        const filteredData = mockData.filter(cur => cur.fit === parameterName.toLowerCase())
        renderData(filteredData)
    } else if (filterBy === 'size') {
        const filteredData = mockData.filter(cur => cur.size.includes(parseFloat(parameterName)))
        renderData(filteredData)
    }
    else if (filterBy === 'color') {
        const filteredData = mockData.filter(cur => cur.color === parameterID)
        noProductsFound(filteredData)
        renderData(filteredData)
    }
}
//Pagination
registerToggeleActiveClassListener(DOMstrings.paginationLink, DOMstrings.paginationLinkActive)
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

//Price range
const slider = document.getElementById('slider');
noUiSlider.create(slider, {
    start: [99, 300],
    connect: true,
    range: {
        'min': 0,
        'max': 1000
    }
});

slider.noUiSlider.on('update', (values) => {
    document.querySelector(DOMstrings.lowerPriceInRange).textContent = `$${parseInt(values[0])}`
    document.querySelector(DOMstrings.higherPriceInRange).textContent = `$${parseInt(values[1])}`
});

slider.noUiSlider.on('end', (values) => {
    const filteredData = mockData.filter(cur => cur.price >= (parseInt(values[0])) && cur.price <= (parseInt(values[1])))
    renderData(filteredData)
    noProductsFound(filteredData)

})

const noProductsFound = (filteredData) => {
    if (filteredData.length === 0) {
        document.querySelector(DOMstrings.emptyFilter).style.display = 'flex'
        document.querySelector(DOMstrings.paginationContainer).style.display = 'none'
    } else {
        document.querySelector(DOMstrings.emptyFilter).style.display = 'none'
        document.querySelector(DOMstrings.paginationContainer).style.display = 'flex'
    }

}

//Clean filters
document.querySelector(DOMstrings.cleanFilters).addEventListener('click', () => {
    renderData(mockData)

})





