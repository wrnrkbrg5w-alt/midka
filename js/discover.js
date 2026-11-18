const apiForm = document.getElementById('api-search-form');
const apiQuery = document.getElementById('api-query');
const apiStatus = document.getElementById('api-status');
const apiResults = document.getElementById('api-results');

async function requestGoogleBooks(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=9&printType=books`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Google Books returned ${response.status}.`);
    const data = await response.json();
    return (data.items || []).map(item => {
        const info = item.volumeInfo || {};
        return {
            title: info.title || 'Untitled book',
            authors: (info.authors || ['Author not listed']).join(', '),
            description: info.description || 'No description provided.',
            link: info.infoLink || ''
        };
    });
}

async function requestOpenLibrary(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=9`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Open Library returned ${response.status}.`);
    const data = await response.json();
    return (data.docs || []).map(book => ({
        title: book.title || 'Untitled book',
        authors: (book.author_name || ['Author not listed']).join(', '),
        description: book.first_sentence ? [].concat(book.first_sentence).join(' ') : `First published ${book.first_publish_year || 'date not listed'}.`,
        link: book.key ? `https://openlibrary.org${book.key}` : ''
    }));
}

function renderResults(books, source) {
    apiResults.replaceChildren();
    books.forEach(book => {
        const col = document.createElement('div'); col.className = 'col';
        const card = document.createElement('article'); card.className = 'card border-0 shadow-sm p-3 h-100';
        const title = document.createElement('h2'); title.className = 'h5'; title.textContent = book.title;
        const author = document.createElement('p'); author.className = 'text-muted small'; author.textContent = book.authors;
        const description = document.createElement('p'); description.className = 'small';
        description.textContent = book.description.replace(/<[^>]*>/g, '').slice(0, 260);
        card.append(title, author, description);
        if (book.link) {
            const link = document.createElement('a'); link.href = book.link; link.target = '_blank'; link.rel = 'noopener';
            link.className = 'btn btn-sm btn-outline-primary mt-auto align-self-start'; link.textContent = 'View book details'; card.append(link);
        }
        col.append(card); apiResults.append(col);
    });
    apiStatus.textContent = `${books.length} books found via ${source}.`;
}

async function searchBooks(query) {
    apiStatus.textContent = 'Loading books...'; apiResults.replaceChildren();
    try {
        const books = await requestGoogleBooks(query);
        if (books.length) { renderResults(books, 'Google Books'); return; }
    } catch (error) {
        apiStatus.textContent = 'Google Books is temporarily unavailable; trying Open Library...';
    }
    try {
        const books = await requestOpenLibrary(query);
        if (!books.length) { apiStatus.textContent = 'No results found. Try another title or author.'; return; }
        renderResults(books, 'Open Library (backup)');
    } catch (error) {
        apiStatus.textContent = 'Both book services are unavailable right now. Check your internet connection and select Search books to retry.';
    }
}

apiForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = apiQuery.value.trim();
    if (!query) { apiStatus.textContent = 'Enter a title or author to search.'; apiQuery.focus(); return; }
    searchBooks(query);
});
searchBooks(apiQuery.value.trim());
