import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  adHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); //if you dont return you will get undefined

    //1, with more pages to go
    if (curPage === 1 && numPages > 1) {
      return `</button>
       <button data-goto="${
         curPage + 1
       }"class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
       </button>`;
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>`;
    }
    //other page?
    if (curPage < numPages) {
      return `</button>
      <button data-goto="${
        curPage + 1
      }"class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
      </button> 
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>`;
    }
    //2 no other pages >10 results
    return '';
  }
}

export default new PaginationView();
