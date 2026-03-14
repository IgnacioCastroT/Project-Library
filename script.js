const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._read = read;
        this._id = crypto.randomUUID();
    }

    about() {
        return `Nombre: ${this._title} | Autor: ${this._author} | Páginas: ${this._pages} | Leído: ${this._read}`;
    }
}

// Referencias al DOM
let addBook = document.querySelector(".Btn-add");
let form = document.querySelector(".container-form");
let form_agregar = document.querySelector(".form-agregar");
let form_cancelar = document.querySelector(".form-cancelar");

// Variable para saber si estamos editando
let editingId = null;

// Mostrar formulario para AGREGAR
addBook.addEventListener("click", () => {
    editingId = null;
    limpiarForm();
    document.querySelector(".title-form").textContent = "Nuevo Libro";
    form_agregar.textContent = "Agregar";
    form.style.display = "flex";
});

// Cancelar
form_cancelar.addEventListener("click", () => {
    form.style.display = "none";
    editingId = null;
    limpiarForm();
});

// Agregar o Guardar cambios
form_agregar.addEventListener("click", () => {
    let titulo  = document.querySelector("#titulo").value;
    let autor   = document.querySelector("#autor").value;
    let paginas = document.querySelector("#pages").value;
    let leido   = document.querySelector("#read").checked;

    if (!titulo || !autor || !paginas) return;

    if (editingId) {
        // Modo edición: modificar el libro existente
        let libro = myLibrary.find(book => book._id === editingId);
        libro._title  = titulo;
        libro._author = autor;
        libro._pages  = paginas;
        libro._read   = leido ? "si" : "no";
        editingId = null;
    } else {
        // Modo agregar: crear libro nuevo
        addBookToLibrary(titulo, autor, paginas, leido);
    }

    form.style.display = "none";
    limpiarForm();
    displayBooks();
});

// Agregar libro al array
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read ? "si" : "no");
    myLibrary.push(book);
}

// Limpiar campos del formulario
function limpiarForm() {
    document.querySelector("#titulo").value  = "";
    document.querySelector("#autor").value   = "";
    document.querySelector("#pages").value   = "";
    document.querySelector("#read").checked  = false;
}

// Renderizar cards
function displayBooks() {
    const booksContainer = document.querySelector(".books");
    booksContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="title">${book._title}</div>
            <div class="author">Autor(a): ${book._author}</div>
            <div class="pages">N° Paginas: ${book._pages}</div>
            <div class="read">Leido: ${book._read}</div>

            <div class="botonera">
                <button class="btn-edit btn-modificar" data-id="${book._id}">
                    Editar
                    <svg class="svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231z"></path>
                    </svg>
                </button>

                <button class="btn-edit btn-borrar" data-id="${book._id}">
                    Eliminar
                    <svg class="svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231z"></path>
                    </svg>
                </button>
            </div>
        `;

        booksContainer.appendChild(card);
    });
}

// Delegación de eventos para Editar y Eliminar
document.querySelector(".books").addEventListener("click", (e) => {

    // Eliminar
    let btnBorrar = e.target.closest(".btn-borrar");
    if (btnBorrar) {
        let id = btnBorrar.dataset.id;
        let index = myLibrary.findIndex(book => book._id === id);
        myLibrary.splice(index, 1);
        displayBooks();
    }

    // Editar
    let btnModificar = e.target.closest(".btn-modificar");
    if (btnModificar) {
        let id = btnModificar.dataset.id;
        editCard(id);
    }
});

// Rellenar form con datos del libro a editar
function editCard(id) {
    let libro = myLibrary.find(book => book._id === id);

    document.querySelector("#titulo").value  = libro._title;
    document.querySelector("#autor").value   = libro._author;
    document.querySelector("#pages").value   = libro._pages;
    document.querySelector("#read").checked  = libro._read === "si";

    document.querySelector(".title-form").textContent = "Editar Libro";
    form_agregar.textContent = "Aceptar";

    editingId = id;
    form.style.display = "flex";
}

// Datos de ejemplo
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Dune", "Frank Herbert", 688, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Brave New World", "Aldous Huxley", 311, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 336, true);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, false);
addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 193, true);

displayBooks();