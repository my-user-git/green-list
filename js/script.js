import { dataLocalArr, dataTag } from './data.js';

const imageList = document.getElementById('imageList');
const cardsList = document.getElementById('cardsList');

function listFunction() {
    dataLocalArr.forEach((item, index) => {
        addItem(item, index);

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
}

listFunction();


function addItem(element) {
    const itemLi = document.createElement('li');
    const itemImg = document.createElement('img');
    const itemArticle = document.createElement('article');
    const itemWrap = document.createElement('div');
    const itemH3 = document.createElement('h3');
    const itemDesc = document.createElement('p');
    const itemSocial = document.createElement('div');
    const itemTag = document.createElement('p');
    const itemlikeWrap = document.createElement('div');
    const itemSvg = document.createElement('img');
    const itemLike = document.createElement('p');

    const key = Object.keys(element.tag)[0];

    itemLi.className = `achievements__item ${key}`;
    itemLi.setAttribute('data-cat-category', `${element.cat}`);
    itemArticle.className = 'achievements__article'
    itemImg.className = 'achievements__img';
    itemWrap.className = 'achievements__wrap';
    itemH3.className = 'achievements__heading-h3';
    itemDesc.className = 'achievements__desc';
    itemSocial.className = 'achievements__social';
    itemTag.className = 'achievements__tag';
    itemlikeWrap.className = 'achievements__wrap-like';
    itemSvg.className = 'achievements__svg';
    itemLike.className = 'achievements__like';


    itemImg.src = element.img;
    itemH3.innerHTML = element.h3;
    itemDesc.innerHTML = element.desc;
    itemTag.innerHTML = Object.values(element.tag[1]);
    itemLike.innerHTML = element.like;
    itemSvg.src = element.svg;

    appendChildren(itemlikeWrap, [itemSvg, itemLike]);
    appendChildren(itemSocial, [itemTag, itemlikeWrap]);
    appendChildren(itemWrap, [itemH3, itemDesc, itemSocial]);
    appendChildren(itemArticle, [itemImg, itemWrap]);
    appendChildren(itemLi, [itemArticle]);

    cardsList.appendChild(itemLi);
}

function appendChildren(element, items) {
    items.forEach(function (children) {
        element.appendChild(children);
    });
}

function filterFunction() {
    const imageList = document.getElementById('imageList');
    const filterTags = document.getElementById('filterTags');
    const selectedCategories = new Set();
    const filter = document.getElementById('filter');

    function createOption(element) {
        element.forEach((item, index) => {
            let option = document.createElement('option');
            option.setAttribute('data-cat-category', index);
            option.value = Object.keys(item);
            option.text = Object.values(item);
            filter.appendChild(option);
        })
    }

    createOption(dataTag)

    const protect = document.querySelector('.priorities__bears-protect');
    let protectFlag = false;

    filter.addEventListener('change', function (event) {
        if (!protectFlag) {
            protect.classList.add('protect-index');
            protectFlag = true;
        }
        const change = event.target;
        const selectedOption = change.options[change.selectedIndex];
        const selectedCategoryName = change.options[change.selectedIndex].text;
        const catCategory = selectedOption.dataset.catCategory;
        const selectedCategory = catCategory;
        selectedCategories.add(selectedCategory);
        updateDisplay();
        createFilterTag(selectedCategory, selectedCategoryName);
    });

    function createFilterTag(category, name) {
        const tagList = document.createElement('li');
        tagList.classList.add('priorities__tag-item');
        tagList.textContent = name;
        tagList.innerHTML += `<span class="remove" data-cat-category="${category}">&times;</span>`;
        filterTags.appendChild(tagList);
    }

    filterTags.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove')) {
            const categoryToRemove = event.target.getAttribute('data-cat-category');
            selectedCategories.delete(categoryToRemove);
            updateDisplay();
            event.target.parentElement.remove();
        }
    });

    let flag = false;

    filterTags.addEventListener('DOMSubtreeModified', function () {
        if (filterTags.children.length === 0) {
            flag = true;
            selectedCategories.clear();
            updateDisplay(flag);
            flag = false;
        }
    });

    function updateDisplay(flag) {
        const images = imageList.querySelectorAll('li');
        const cards = cardsList.querySelectorAll('li');
        const itemsAll = [];

        itemsAll.push(images, cards);

        itemsAll.forEach((nodeList, index) => {
            nodeList.forEach((node, indexIn) => {
                if (index === 0) {
                    if (selectedCategories.has(node.getAttribute('data-cat-category'))) {
                        // node.classList.add('opacity');
                        console.log(indexIn);
                        node.style.zIndex = `${56 - indexIn}`;
                    } else {
                        // node.classList.remove('opacity');
                        node.removeAttribute('style');
                        if (!node.classList.contains('opacity')) {
                            // node.style.opacity = '.2';
                        }
                    }
                    if (flag) {
                        node.style.opacity = '1';
                    }
                } else if (index === 1) {
                    if (!selectedCategories.has(node.getAttribute('data-cat-category'))) {
                        node.classList.add('hidden');
                    } else {
                        node.classList.remove('hidden');
                    }
                    if (flag) {
                        node.classList.remove('hidden');
                        protect.classList.remove('protect-index');
                        protectFlag = false;
                    }
                }
            });
        });
    }
}

filterFunction();

(function bearsFunction() {
    const bannerBears = document.querySelector('.priorities__bears')

    for (let i = 0; i <= 15; i++) {
        const itemLi = document.createElement('li');
        const itemPic = document.createElement('picture');
        const itemImg = document.createElement('img');
        const itemSource = document.createElement('source');

        itemLi.className = 'priorities__bears-item';
        itemPic.className = 'priorities__bears-pic';
        itemSource.className = 'priorities__bears-source';

        itemLi.setAttribute('data-cat-category', i);

        itemImg.src = `./images/bears/desktop/hero-bear${i + 1}.png`;

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1200 && window.innerWidth >= 992) {
                itemSource.srcset = `./images/bears/tablet/hero-tablet-bear${i + 1}.png`;
            } else if (window.innerWidth <= 992 && window.innerWidth >= 768) {
                itemSource.srcset = `./images/bears/small_tablet/hero-tablet-small-bear${i + 1}.png`;
            } else if (window.innerWidth <= 768) {
                itemSource.srcset = `./images/bears/small_tablet/hero-mobile-bear${i + 1}.png`;
            }
        });

        appendChildren(itemPic, [itemImg, itemSource]);
        appendChildren(itemLi, [itemPic]);

        bannerBears.appendChild(itemLi);
    }
})()

