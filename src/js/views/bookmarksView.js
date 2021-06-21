import View from './view.js';
import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorM = 'No bookmarks yet.';
  _message = '👯‍♂️';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(' ');
  }
}

export default new BookmarksView();
