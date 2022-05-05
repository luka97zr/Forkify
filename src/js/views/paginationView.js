import View from './View.js';
import icons from '../../img/icons.svg';


class PaginatioView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup(){
        const currPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(currPage)

        //Page 1 and there are other pages
        if(currPage === 1 && numPages > 1) {
            return  `
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                    <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        //Last page
        if(currPage === numPages && numPages >1) {
            return `
            <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
            `
            
        }
        //Other page
        if(currPage < numPages){
            return `
            <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                    <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        //Only 1 page
        return ''
    }

    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage)
        })
    }
}

export default new PaginatioView();