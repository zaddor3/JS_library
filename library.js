class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        // Växla lässtatus mellan 'Yes' och 'No'
        this.read = this.read === 'Yes' ? 'No' : 'Yes';
        }
}

class Library {
    constructor(){
        this.books = [];
        this.form = document.querySelector("#myForm")
        this.container = document.querySelector(".bookContainer")
        this.initEventListeners() 
    }

    initEventListeners(){
        this.form.addEventListener("submit", (event) => {
            event.preventDefault(); // Stoppa standardbeteendet
            this.addBookToLibrary(event.target) 
        })
    }

    addBookToLibrary(form) {
        const formData = new FormData(form);
        const newBook = new Book(
            formData.get('title'),
            formData.get('author'),
            formData.get('pages'),
            formData.get('readBook')
        );
        this.books.push(newBook);
        this.displayBooks()
        form.reset()
    }

    displayBooks(){
        this.container.innerHTML = ''; // Rensa container först
        this.books.forEach((book, index) => {
            const renderBook = document.createElement("div");
            renderBook.classList.add("book");
            renderBook.style.backgroundColor = "lightgray";
            renderBook.style.border = "3px solid black";
            renderBook.style.borderRadius = "5px";
            
            renderBook.innerHTML = `
                <h2>${book.title}</h2>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Read:</strong> ${book.read}</p>
            `;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener('click', () => this.removeBook(index));

            const toggleButton = document.createElement("button");
            toggleButton.textContent = "Toggle Read Status";
            toggleButton.addEventListener('click', () => this.toggleReadStatus(index));

            renderBook.appendChild(removeButton);
            renderBook.appendChild(toggleButton);
            this.container.appendChild(renderBook);
        });
    }

    removeBook(index) {
        this.books.splice(index, 1); // Ta bort boken från arrayen
        this.displayBooks(); // Uppdatera visningen
    }

    toggleReadStatus(index) {
        this.books[index].toggleReadStatus();
        this.displayBooks();
    }
}

const library = new Library()
