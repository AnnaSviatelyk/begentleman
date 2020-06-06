import './main.scss'
import mockData from './js/mockData'
import { DOMstrings } from './js/domStrings'

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
    if (filteredData.length === 0 && category !== 'All products') {
        renderData(filteredData)
        document.querySelector('.empty-filter-result').style.display = 'flex'
    } else if (category === 'All products') {
        renderData(mockData)
    } else {
        renderData(filteredData)

    }
}

const selectorOptions = document.querySelectorAll(DOMstrings.selectorOption);
selectorOptions.forEach(cur => {
    selectCategoryHandler(cur)
})

//Fit, Size
const registerToggeleActiveClassListener = (optionClass, optionClassActive) => {
    const filterOptions = document.querySelectorAll(optionClass);
    filterOptions.forEach(cur => {
        cur.addEventListener('click', function () {
            document.querySelector('.' + optionClassActive).classList.remove(optionClassActive);
            cur.classList.add(optionClassActive);
        })
    })
}
registerToggeleActiveClassListener(DOMstrings.filterSize, DOMstrings.filterSizeSelected);
registerToggeleActiveClassListener(DOMstrings.filterFit, DOMstrings.filterFitSelected);

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










