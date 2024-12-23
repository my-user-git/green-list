import items from './data.js';

export function myList() {
    const list = document.getElementById('myList');

    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);

        // Обновляем JSON-LD с элементами на странице
        const ldJson = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
        ldJson.itemListElement.push({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Thing",
                "name": item
            }
        });
        document.querySelector('script[type="application/ld+json"]').textContent = JSON.stringify(ldJson);
    });

    return items;
}

myList();