const myLibrary = [];
const myForm = document.querySelector("#myForm")
const container = document.querySelector(".bookContainer")

myForm.addEventListener("submit", function(event){
    event.preventDefault(); // Stoppa standardbeteendet
    addBookToLibrary(event.target)
})


function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    };

function addBookToLibrary(form) {
    const formData = new FormData(form);
    const newBook = new Book(
        formData.get('title'),
        formData.get('author'),
        formData.get('pages'),
        formData.get('readBook')
    );
    myLibrary.push(newBook);
    displayBooks()
    form.reset()
}

function displayBooks(){
    container.innerHTML = ''; // Rensa container först
    myLibrary.forEach((book,index) => {
    const renderBook = document.createElement("div")
    renderBook.classList.add("book")
    renderBook.style.backgroundColor = "lightgray"
    renderBook.style.border = "3px solid black"
    renderBook.style.borderRadius = "5px"
    
    renderBook.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> ${book.read}</p>
        <button onclick="removeBook(${index})">Remove</button>
        <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
    `
    container.appendChild(renderBook)
    });
    
}

function removeBook(index) {
    myLibrary.splice(index, 1); // Ta bort boken från arrayen
    displayBooks(); // Uppdatera visningen
}

function toggleReadStatus(index) {
    // Växla lässtatus mellan 'Yes' och 'No'
    myLibrary[index].read = myLibrary[index].read === 'Yes' ? 'No' : 'Yes';
    displayBooks(); // Uppdatera visningen
}