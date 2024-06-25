// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Carosello
    let index = 0;
    const images = document.querySelectorAll('.carousel img');
    setInterval(() => {
        images[index].style.display = 'none';
        index = (index + 1) % images.length;
        images[index].style.display = 'block';
    }, 3000);

    // Caricamento documenti dal file XML
    fetch('documenti.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            const documents = xml.getElementsByTagName('document');

            const documentList = document.getElementById('documentList');
            for (let doc of documents) {
                const title = doc.getElementsByTagName('title')[0].textContent;
                const id = doc.getAttribute('id');
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `document.html?id=${id}`;
                link.textContent = title;
                listItem.appendChild(link);
                documentList.appendChild(listItem);
            }
        })
        .catch(error => console.error('Errore nel caricamento del file XML:', error));
});
