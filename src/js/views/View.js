import icons from '../../img/icons.svg';

export default class View {
    _data;

    render(data){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }
    update(data){
      this._data = data;
      const newMarkup = this._generateMarkup();
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*')) //Array from prebacuje NODE listu u Niz
      const curElements = Array.from(this._parentElement.querySelectorAll('*'))

      newElements.forEach((newEl, i)=> {
        const curEl = curElements[i];

        //Updates TEXT
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
          curEl.textContent = newEl.textContent;
        }

        //Updates ATR
        if(!newEl.isEqualNode(curEl)){
          Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
        }
      })

    }
    _clear(){
        this._parentElement.innerHTML='';
    }
    renderSpinner(){
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
        this._parentElement.innerHTML='';
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
      }
    renderError(msg = this._errorMsg) {
      const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
      `
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }
    renderMessage(msg = this._message){
      const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
      `
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }
}