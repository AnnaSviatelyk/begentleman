import './main.scss';

//Dropdown 

//var pseudo = (document.querySelector('.selector') ':before').getPropertyValue('border-color');



document.querySelector('.selector').addEventListener('click', function () {
    this.classList.toggle('selector--active');
});

var selectorOptions = document.querySelectorAll('.selector__option');
for (var i = 0; i < selectorOptions.length; i++) {
    //Add eventlistener to every item in NodeList
    selectorOptions[i].addEventListener('click', function () {
        //Replace text in default category to selected one 
        var categoryName = this.querySelector('p').textContent;
        document.querySelector('.selector__option--all p').textContent = categoryName;

        //Remove active class from others 
        document.querySelector('.selector__option--active').classList.remove('selector__option--active');


        //Add active class to selected category in list 
        this.classList.add('selector__option--active');
    });
}


registerToggeleActiveClassListener('.filter__size', 'filter__size--selected');
registerToggeleActiveClassListener('.filter__fit-option', 'filter__fit-option--selected');
registerToggeleActiveClassListener('.pagination__link', 'pagination__link--active')


function registerToggeleActiveClassListener(optionClass, optionClassActive) {
    var filterOptions = document.querySelectorAll(optionClass);
    for (var i = 0; i < filterOptions.length; i++) {
        filterOptions[i].addEventListener('click', function () {
            document.querySelector('.' + optionClassActive).classList.remove(optionClassActive);
            this.classList.add(optionClassActive);
        })
    }
}
paginationPageChange();

function paginationPageChange() {
    var arrowBack = document.querySelector('.pagination__arrow--prev');
    var arrowNext = document.querySelector('.pagination__arrow--next');
    var pages = document.querySelectorAll('.pagination__link');


    arrowBack.addEventListener('click', function () {
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('pagination__link--active') && i > 0) {
                pages[i].classList.remove('pagination__link--active');
                pages[i - 1].classList.add('pagination__link--active');
                return
            };
        };
    });

    arrowNext.addEventListener('click', function () {
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('pagination__link--active') && i < pages.length - 1) {
                pages[i].classList.remove('pagination__link--active');
                pages[i + 1].classList.add('pagination__link--active');
                return
            }

        }
    });

};











