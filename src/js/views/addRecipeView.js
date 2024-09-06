import View from './views.js';
class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message='RECIPE was sucessfully added';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseModal();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerCloseModal() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler){
    this._parentElement.addEventListener('submit',function(e){
      e.preventDefault();
      const dataArray=[...new FormData(this)];
      const data=Object.fromEntries(dataArray)
     handler(data);
    })
  }

  
  _genaratorMarkup() {}
}

export default new addRecipeView();
