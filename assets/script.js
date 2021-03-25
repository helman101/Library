let library = [];
const container = document.querySelector('.container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const button = document.querySelector('#btn');
const read = document.querySelector('#read');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('#form');

const Book = (title, author, pages, read) => {
  const changeRead = () => {
    read = !read
  };

  const info = () => {
    let alreadyRead = (read) ? 'already read' : 'not read yet';
    (alreadyRead, title)
    return `${title} by ${author}, ${pages} pages, ${alreadyRead}`;
  };

  return {title, author, pages, read, info, changeRead};
};

const BookModule = (() => {
  const removeBook = (id) => {
    library.splice(id, 1);
    LibraryModule.saveLibrary();
    displayHtmlModule.showBooks(); // eslint-disable-line
  };

  const changeRead = (button) => {
    const { id } = button.parentNode;
    const para = button.parentNode.querySelector('p');
    library[id].changeRead()
    para.innerHTML = library[id].info();
    LibraryModule.saveLibrary();
  };
  return {removeBook, changeRead};
})();

const displayHtmlModule = (() => {
  const showBooks = () => {
    container.innerHTML = '';
    for (let i = 0; i < library.length; i += 1) {
      const content = document.createElement('div');
      content.setAttribute('id', i);
      const text = document.createElement('p');
      text.textContent = library[i].info();

      const removeBtn = document.createElement('button');
      removeBtn.addEventListener('click', BookModule.removeBook.bind(this, i));
      removeBtn.textContent = 'Remove';

      const changeReadBtn = document.createElement('button');
      changeReadBtn.addEventListener('click', BookModule.changeRead.bind(this, changeReadBtn));
      changeReadBtn.textContent = 'Readed?';

      content.appendChild(text);
      content.appendChild(changeReadBtn);
      content.appendChild(removeBtn);
      container.appendChild(content);
    };
  };

  const showForm = () => {
    form.classList.toggle('hidden');
    button.classList.toggle('hidden');
  };

  return {showBooks, showForm};
})();

const LibraryModule = (() => {
  const saveLibrary = () => {
    localStorage.lib = JSON.stringify(library);
  }

  const addBookToLibrary = () => {
    const newBook = Book(title.value, author.value, pages.value, read.checked);

    library.push(newBook);

    saveLibrary();
    displayHtmlModule.showBooks();
  }

  const loadLibrary = () => {
    const books = JSON.parse(localStorage.lib);
    for (let i = 0; i < books.length; i += 1) {
      let prototype = Book(books[i].title, books[i].author, books[i].pages, books[i].read) 
      Object.assign(books[i], prototype);
    }
    
    return books;
  }

  return {saveLibrary, addBookToLibrary, loadLibrary}
})();

if (localStorage.lib) {
  library = LibraryModule.loadLibrary();
  displayHtmlModule.showBooks();
}

button.addEventListener('click', LibraryModule.addBookToLibrary);

newBookBtn.addEventListener('click', displayHtmlModule.showForm);