export const dataTag = [
    { caring: 'Забота о каждом нуждающемся' },
    { development: 'Развитие регионов и транспортной инфраструктуры страны' },
    { culture: 'Культура, история, традиции' },
    { education: 'Образование и передовая наука' },
    { village: 'Развитие села' },
    { family: 'Крепкая семья' },
    { ecology: 'Экология для жизни' },
    { tourism: 'Развитие туризма' },
    { regions: 'Развитие новых регионов' },
    { state: 'Государство для человека' },
    { policy: 'Внешняя и оборонная политика' },
    { health: 'Здоровье человека' },
    { economics: 'Экономика развития' },
    { civil: 'Гражданская солидарность и молодежная политика' },
    { job: 'Хорошая работа — достаток в доме' },
    { life: 'Удобная и комфортная жизнь' },
]

export const dataLocalArr = dataLocal(dataTag);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function dataLocal(tags) {
    const countItems = 36;
    const dataLocalArr = [];

    let dataTemplate = {};

    const dataImg = [
        './images/item/image_1.png',
        './images/item/image_2.png',
        './images/item/image_3.png',
    ]

    const dataH3 = [
        'Закупаем лекарства от 14 самых затратных редких болезней',
        'Введен Единый электронный сертификат',
        'Дополнительные гарантии трудоустройства людей с инвалидностью',
    ]

    const dataDesc = [
        'С 1 января 2023 года фонд «Круг добра» начал закупать лекарства от 14 самых затратных редких болезней. Дети с редкими заболеваниями будут обеспечены нужными лекарствами.',
        'Введен Единый электронный сертификат для приобретения технических средств реабилитации, лекарственных препаратов, медицинских изделий для людей с ограниченными возможностями здоровья.',
        'Установлены дополнительные гарантии трудоустройства людей с инвалидностью: обязанность работодателя будет считаться выполненной только после трудоустройства инвалида.',
    ]

    const dataSvg = [
        './images/svg/like.svg',
        './images/svg/like-lite.svg',
    ]

    for (let i = 0; i < countItems; i++) {

        const randomIndex = Math.floor(Math.random() * tags.length);
        const randomTag = tags[randomIndex];

        dataTemplate = {
            id: getRandomInt(countItems),
            img: dataImg[getRandomInt(dataImg.length)],
            h3: dataH3[getRandomInt(dataH3.length)],
            desc: dataDesc[getRandomInt(dataDesc.length)],
            tag: [randomIndex, randomTag],
            cat: randomIndex,
            svg: dataSvg[getRandomInt(dataSvg.length)],
            like: getRandomInt(500),
        }

        dataLocalArr.push(dataTemplate);
    }

    return dataLocalArr;
}


