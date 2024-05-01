const visible = document.querySelector('.friends__window');
const container = document.querySelector('.friends__slider');
const nextBtn = document.querySelector('.right');
const prevBtn = document.querySelector('.left');

const BURGER_BTN = document.querySelector('.burger');
const MENU = document.querySelector('.sidebar');
const HEADER_LOGO = document.querySelector('.header__logo');
const HEADER_LINKS = document.querySelectorAll('.sidebar__link');
const BODY = document.querySelector('body');

let index = 1;

let popUp = document.querySelector('.popup');
const overlay = document.querySelector('.modal-overlay')

const getCards = () => document.querySelectorAll('.friends__card');

async function getData() {
    let response = await fetch('pets.json');
    let data = await response.json();
    data.sort(() => Math.random() - 0.5);
    return data
}

async function appendSlides() {
    const pets =  await getData();
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pets.length; i++) {
        let card = document.createElement('div');
        card.classList.add('friends__card');

        let img = document.createElement('img');
        img.classList.add('friends__img');
        img.setAttribute('alt', `${pets[i].type}`);
        img.setAttribute('width', '270');
        img.src = pets[i].img;

        let heading = document.createElement('h2');
        heading.classList.add('friends__card-heading');
        heading.innerHTML = `${pets[i].name}`;

        let btn = document.createElement('button');
        btn.classList.add('friends__btn');
        btn.setAttribute('name', 'btn')
        btn.innerHTML = 'Learn more'

        card.append(img);
        card.append(heading);
        card.append(btn);

        fragment.append(card);
    }

    container.append(fragment);

    
    for(let i = 0; i < 3; i++) {
        let card = document.createElement('div');
        card.classList.add('friends__card');
        card.setAttribute('name', 'card')

        let img = document.createElement('img');
        img.classList.add('friends__img');
        img.setAttribute('alt', `${pets[i].type}`);
        img.setAttribute('width', '270');
        img.src = pets[i].img;

        let heading = document.createElement('h2');
        heading.classList.add('friends__card-heading');
        heading.innerHTML = `${pets[i].name}`;

        let btn = document.createElement('button');
        btn.classList.add('friends__btn');
        btn.innerHTML = 'Learn more'

        card.append(img);
        card.append(heading);
        card.append(btn);

        container.append(card)
    }

    for(let i = pets.length - 1; i >= 5; i--) {
        let card = document.createElement('div');
        card.classList.add('friends__card');
        card.setAttribute('name', 'card')

        let img = document.createElement('img');
        img.classList.add('friends__img');
        img.setAttribute('alt', `${pets[i].type}`);
        img.setAttribute('width', '270');
        img.src = pets[i].img;

        let heading = document.createElement('h2');
        heading.classList.add('friends__card-heading');
        heading.innerHTML = `${pets[i].name}`;

        let btn = document.createElement('button');
        btn.classList.add('friends__btn');
        btn.innerHTML = 'Learn more'

        card.append(img);
        card.append(heading);
        card.append(btn);

        container.prepend(card)
    }

    calculateNumberOfCards();
    let step = calculateStep();
    container.style.transform = `translateX(${-step}px)`;


    let cards = container.querySelectorAll('.friends__card');
    
    cards.forEach(card => card.addEventListener('click', () => {

        // let name = btn.previousElementSibling.innerHTML;
        let popUpLayout;
        for (let i = 0; i < pets.length; i++) {
            
            if (card.childNodes[1].innerHTML === pets[i].name) {
                popUpLayout =  `
                <img
          class="popup__img"
          src="../../assets/images/${pets[i].name.toLowerCase()}.png"
          alt="cute puppy"
          width="500"
        />
        <div class="popup__text">
          <h2 class="popup__heading">${pets[i].name}</h2>
          <p class="popup__subheading">${pets[i].type} - ${pets[i].breed}</p>
          <p class="popup__info">
            ${pets[i].description}
          </p>
          <ul class="popup__list">
            <li class="popup__item">
              <span class="popup__main">Age: </span>${pets[i].age}
            </li>
            <li class="popup__item">
              <span class="popup__main">Inoculations: </span>${pets[i].inoculations}
            </li>
            <li class="popup__item">
              <span class="popup__main">Diseases: </span>${pets[i].diseases}
            </li>
            <li class="popup__item">
              <span class="popup__main">Parasites: </span>${pets[i].parasites}
            </li>
          </ul>
          <button class="popup__btn">
            <span class="material-icons-outlined"> close </span>
          </button>
        </div>
                `
            }
        }
        popUp.innerHTML = popUpLayout;

        overlay.style.display = 'block';
        popUp.style.left = '50%';
        popUp.style.top = '50%';
        popUp.style.transform = `translate(-50%, -50%)`;

        BODY.style.overflow = 'hidden';
        BODY.style.height = '100vh';


        let closeBtns = document.querySelectorAll('.popup__btn');

        closeBtns.forEach(btn => {
            btn.addEventListener('click', ()=>{
                overlay.style.display = 'none';
                popUp.style.left = '-100%';
                BODY.style.overflow = 'auto';
                BODY.style.height = 'auto';
            })
        })

        overlay.addEventListener('click', ()=> {
            overlay.style.display = 'none';
            popUp.style.left = '-100%';
        })

    }))
}


function calculateNumberOfCards() {
    let cards = getCards();
    let windowWidth = window.getComputedStyle(visible).getPropertyValue('width');
    let computedWindowWidth = parseInt(windowWidth, 10)
    let cardWidth = window.getComputedStyle(cards[0]).getPropertyValue('width');
    let computedCardWidth = parseInt(cardWidth, 10)
    return Math.floor(computedWindowWidth / computedCardWidth)

}

function calculateStep() {

    let gap = window.getComputedStyle(container).getPropertyValue('column-gap');
    let computedGap = parseInt(gap, 10);

    let windowWidth = parseInt(window.getComputedStyle(visible).getPropertyValue('width'),10)
    return windowWidth + computedGap
}


async function start() {
    await appendSlides();
}

start()

function calculateTwoSteps() {
    const cards = getCards();
    let gap = window.getComputedStyle(container).getPropertyValue('column-gap');
    let computedGap = parseInt(gap, 10);
    let cardWidth = window.getComputedStyle(cards[0]).getPropertyValue('width');
    let computedCardWidth = parseInt(cardWidth, 10);
    return computedCardWidth * 2 + computedGap * 2
}

function moveItRight() {

    let step = calculateStep();
    let numberOfCards = calculateNumberOfCards();
    

    if (numberOfCards === 3) {

        if(index >= 4) return
        index++;
        container.style.transition = '.7s ease-out';

        if (index === 4) {
            container.style.transform = `translateX(-3960px)`;
        } else {
            container.style.transform = `translateX(${-step * index}px)`;
        }

    }

    

    if (numberOfCards === 2) {

        if (index >= 5) return
        index++;
        container.style.transition = '.7s ease-out';
        container.style.transform = `translateX(${-step * index}px)`;
    
    }

    if (numberOfCards === 1) {
      
        if (index >= 9) return
        index++;
        container.style.transition = '.7s ease-out';
        container.style.transform = `translateX(${-step * index}px)`;

    }
    


}


function moveItLeft() {

    let step = calculateStep();
    let numberOfCards = calculateNumberOfCards();

    if (numberOfCards === 3) {

        if (index <= 0) return
        index--;
        container.style.transition = '.7s ease-out';

        if (index === -2) {
            container.style.transform = `translateX(-2880px)`;
        } else {
            container.style.transform = `translateX(${-step * index}px)`;
        }
    }

    

    if (numberOfCards === 2) {

        if (index <= 0) return
        index--;
        container.style.transition = '.7s ease-out';
        container.style.transform = `translateX(${-step * index}px)`;
    }

    if (numberOfCards === 1) {

        if (index <= 0) return
        index--;
        container.style.transition = '.7s ease-out';
        container.style.transform = `translateX(${-step * index}px)`;
    }

}

container.addEventListener('transitionend', () => {
    let numberOfCards = calculateNumberOfCards();
    let step = calculateStep();

    if (numberOfCards === 3 && index === 4) {
        container.style.transition = 'none';
        index = 1;
        container.style.transform = `translateX(${-step * index}px)`;
    }

    if (numberOfCards === 3 && index === -2) {
        container.style.transition = 'none';
        index = 1;
        container.style.transform = `translateX(-2880px)`;
    }

    if (numberOfCards === 3 && index === 0) {
        container.style.transition = 'none';
        index = 3;
        container.style.transform = `translateX(-2880px)`;
    }

    if(numberOfCards === 2 && index === 5) {
        container.style.transition = 'none';
        index = 1;
        container.style.transform = `translateX(${-step * index}px)`;
    }

    if(numberOfCards === 2 && index === 0) {
        container.style.transition = 'none';
        index = 4;
        container.style.transform = `translateX(${-step * index}px)`;
    }

    if(numberOfCards === 1 && index === 9) {
        container.style.transition = 'none';
        index = 1;
        container.style.transform = `translateX(${-step * index}px)`;
    }

    if(numberOfCards === 1 && index === 0) {
        container.style.transition = 'none';
        index = 8;
        container.style.transform = `translateX(${-step * index}px)`;
    }
})


nextBtn.addEventListener('click', moveItRight);
prevBtn.addEventListener('click', moveItLeft)

/* BURGER */

let flag = true;


function handleMenu() {
    if (flag) {
        flag = false

        HEADER_LOGO.style.opacity = '0'
        MENU.style.right = '0px';
        overlay.style.display = 'block';

        BODY.style.overflow = 'hidden';
        BODY.style.height = '100vh';

        BURGER_BTN.style.transform = 'rotate(90deg)'
    } else {
        flag = true;

        HEADER_LOGO.style.opacity = '1'
        MENU.style.right = '-500px';
        overlay.style.display = 'none';

        BODY.style.overflow = 'auto';
        BODY.style.height = 'auto';

        BURGER_BTN.style.transform = 'rotate(0deg)'
    }
}

function hideMenu() {
    flag = true;
    overlay.style.display = 'none';
    MENU.style.right = '-500px';
    BURGER_BTN.style.transform = 'rotate(0deg)';
    HEADER_LOGO.style.opacity = '1';
    BODY.style.overflow = 'auto';
    BODY.style.height = 'auto';
}

HEADER_LINKS.forEach(link => link.addEventListener('click', hideMenu))
BURGER_BTN.addEventListener('click', handleMenu);


overlay.addEventListener('click', hideMenu)

window.addEventListener('resize', ()=>{
    hideMenu()
})