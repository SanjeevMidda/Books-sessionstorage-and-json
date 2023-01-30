// Researched MDN for JSON, constructor functions, DOM traversal, sessionStorage and array methods.
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// Empty array where our books will be stored once added.
let books = [];

// Constructor function holds the basic values of each book we add.
function NewBook(author, title, genre, pages){
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.pages = pages;
}

// Website has three main functions: add a book, load a book onto the viewer's screen, and delete a book.
// First function "addBook" will execute once we press the 'add' button.
function addBook(){

    // Selecting all input fields in our form element.
    let form = document.querySelectorAll("form input");
    
    // Grabbing the values our user enters and storing them.
    let bookAuthor = form[0].value;
    let bookTitle = form[1].value;
    let bookGenre = form[2].value;

    // By default "value" is normally saved as a string, however using "Number" method to convert to a numerical value.
    let bookPages = Number(form[3].value);

    // Creating a new instance from the values our user has entered.
    let newBook = new NewBook(bookAuthor, bookTitle, bookGenre, bookPages);

    // Adding the instance created above into our "books" array.
    books.push(newBook);

    // Saving the items contained in our "books" array into sessionStorage. This will allow us to access the data later when we need to display it on-screen.
    sessionStorage.setItem("newBook", JSON.stringify(books));

    // Each input field on-screen will be cleared each time a user enters a new book. Using "forEach" method to loop through each input field, instead of writing individually,
    form.forEach(clearValue => {
        clearValue.value = "";
    });

    // Calling our "loadBook" function to add the newly created book to the user's display.
    loadBook();

}

// Second function loads the books the user has saved on-screen.
function loadBook(){

    // Where our books will be displayed within. Created div here for styling purposes.
    let bookList = document.querySelector(".booklist");

    // Each time we add a book on-screen we will clear the current content to prevent multiple entries being displayed each time.
    bookList.innerHTML = "";

    // Accessing the books in sessionStorage, and saving into our "books" array for reference. "Parse" is used to convert data from text to an object to use within our code. 
    books = JSON.parse(sessionStorage.getItem("newBook"));

    // We use the "forEach" method to create several elements and render these on-screen. "index" used to assign a specific id. 
    books.forEach((showBooks, index) => {

        // Creating a containing div to hold the contents of each book. Classname added for styling purposes.
        let newContainer = document.createElement("div");
        newContainer.classList.add("container");

        // A paragraph element created to hold the contents of each book. Template literal used to inject the values alongside text.
        let newElement = document.createElement("p");
        newElement.innerHTML = `AUTHOR: ${showBooks.author} <br>
        TITLE: ${showBooks.title}, <br>
        GENRE: ${showBooks.genre}, <br>
        PAGES: ${showBooks.pages}`;

        // Classname added for styling purposes. 
        newElement.classList.add("newElementStyles");

        // User will be able to edit the content displayed on-screen.
        newElement.setAttribute("contenteditable", "true");

        // Each paragraph element will have a specific id. This will allow us to target it when we need to delete it.
        newElement.id = index;

        // Adding our book content's paragraph into our container. 
        newContainer.appendChild(newElement);

        // Creating our delete book button. 
        let deleteButton = document.createElement("button");

        // Trash can emoticon will represent the "text" inside our button.
        deleteButton.innerHTML = "🗑";

        // When the button is clicked our "deleteBook" function will run.
        deleteButton.addEventListener("click", deleteBook);

        // Adding our delete button to its containing div.
        newContainer.appendChild(deleteButton);

        // Adding our containing div into it's parent div.
        bookList.appendChild(newContainer);

    });
}

// This function will allow our user to delete a book.
function deleteBook(){

    // We use "this" to establish where the click event was fired from, traverse the DOM to its adjacent sibling, grab its "ID" and store it in a new variable.
    idValue = this.previousSibling.id;

    // Using the value from "idValue" we use Splice to remove this book from our "books" array.
    books.splice(idValue, 1);

    // To remove the element from the DOM, and from the user's display, the "remove" method is used.
    this.parentElement.remove();

    // SessionStorage is updated to reflect a book has just been removed.
    sessionStorage.setItem("newBook", JSON.stringify(books));

}

/*
    Thinking
        1. This website allows the user to add, edit, store and remove their books.
*/