// src/business/validators/bookValidator.js
class BookValidator {
    validateBookData(data) {
        const { title, author, isbn } = data;

        if (!title || !author || !isbn) {
            throw new Error('Title, author, and ISBN are required');
        }

        return true;
    }

    validateISBN(isbn) {
        // ✔ รับเฉพาะตัวเลข 13 หลัก (ISBN-13)
        const cleanISBN = isbn.replace(/-/g, '');

        if (!/^\d{13}$/.test(cleanISBN)) {
            throw new Error('ISBN must be 13 digits');
        }

        return true;
    }

    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new Error('Invalid book ID');
        }
        return numId;
    }
}

module.exports = new BookValidator();
