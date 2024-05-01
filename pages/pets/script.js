const CONTAINER = document.querySelector('.pets__slider');
const NEXT_BTN = document.querySelector('.pets__next');
const PREV_BTN = document.querySelector('.pets__prev');
const FIRST_BTN = document.querySelector('.pets__first');
const LAST_BTN = document.querySelector('.pets__last');
const PAGE = document.querySelector('.pets__num');
const URL = '../main/pets.json';
let NUMBER_OF_PAGES = 6;
const popUp = document.querySelector('.popup');
const overlay = document.querySelector('.modal-overlay')
const MEDIA_QUERY_BIGSCREEN = window.matchMedia('(min-width: 1280px)');
const MEDIA_QUERY_TABLET = window.matchMedia('(min-width: 768px)');
const MEDIA_QUERY_MOBILE = window.matchMedia('(min-width: 320px)');

const BURGER_BTN = document.querySelector('.burger');
const MENU = document.querySelector('.sidebar');
const HEADER_LOGO = document.querySelector('.header__logo');
const HEADER_LINKS = document.querySelectorAll('.sidebar__link');
const OVERLAY = document.querySelector('.modal-overlay');
const BODY = document.querySelector('body');

let index =  1;

PAGE.innerHTML = index;

function checkBtn() {
    
    if (index === 1) {
        PREV_BTN.classList.add('inactive');
        FIRST_BTN.classList.add('inactive');
    }
    if (index > 1) {
        PREV_BTN.classList.remove('inactive');
        FIRST_BTN.classList.remove('inactive');
    } 


    if (MEDIA_QUERY_BIGSCREEN.matches && index < 6) {
        NEXT_BTN.classList.remove('inactive');
        LAST_BTN.classList.remove('inactive');
    } else if (MEDIA_QUERY_BIGSCREEN.matches && index === 6) {
        NEXT_BTN.classList.add('inactive');
        LAST_BTN.classList.add('inactive');
    } else if (MEDIA_QUERY_TABLET.matches && index < 8) {
        NEXT_BTN.classList.remove('inactive');
        LAST_BTN.classList.remove('inactive');
    } else if (MEDIA_QUERY_TABLET.matches && index === 8) {
        NEXT_BTN.classList.add('inactive');
        LAST_BTN.classList.add('inactive');
    } else if (MEDIA_QUERY_MOBILE.matches && index < 16) {
        NEXT_BTN.classList.remove('inactive');
        LAST_BTN.classList.remove('inactive');
    } else if (MEDIA_QUERY_MOBILE.matches && index === 16) {
        NEXT_BTN.classList.add('inactive');
        LAST_BTN.classList.add('inactive');
    }



}


function calculateStep() {
    let visiblePart = document.querySelector('.pets__window');
    let result = window.getComputedStyle(visiblePart).getPropertyValue('width');

    let gap = window.getComputedStyle(CONTAINER).getPropertyValue('column-gap');

    return parseInt(result, 10) + parseInt(gap, 10)
}


async function getData(path) {
    let response = await fetch(path);
    let data = await response.json();

    return data
}


async function addCards() {
    const pets = await getData(URL) 

    for(let i = 0 ; i < NUMBER_OF_PAGES; i++) {

        pets.sort(() => Math.random() - 0.5);

        for(let pet of pets) {

            let card = document.createElement('li');
            card.classList.add('pets__item');
    
            let img = document.createElement('img');
            img.classList.add('pets__img');
            img.setAttribute('alt', `${pet.type}`);
            img.setAttribute('width', '270');
            img.src = pet.img;
    
            let heading = document.createElement('h2');
            heading.classList.add('pets__card-heading');
            heading.innerHTML = `${pet.name}`;
    
            let btn = document.createElement('button');
            btn.classList.add('pets__btn');
            btn.innerHTML = 'Learn more';
    
            card.append(img);
            card.append(heading);
            card.append(btn);
    
            CONTAINER.append(card);
        }
    }

    let cards = CONTAINER.querySelectorAll('.pets__item');
    cards.forEach(card => card.addEventListener('click', () => {
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

addCards();

function moveToNext() {
    let step = calculateStep();
    if (MEDIA_QUERY_MOBILE.matches && index >= 16) return
    if (MEDIA_QUERY_TABLET.matches && index >= 8) return
    if (MEDIA_QUERY_BIGSCREEN.matches && index >= 6) return
    
    index++;
    PAGE.innerHTML = index;
    CONTAINER.style.transform = `translateX(${-step * (index - 1)}px)`;
}

function moveToPrev() {
    let step = calculateStep();
    if(index <= 1) return
    index--;
    PAGE.innerHTML = index;
    CONTAINER.style.transform = `translateX(${-step * (index - 1)}px)`;
}

function goToLast() {
    let step = calculateStep();

    if (MEDIA_QUERY_MOBILE.matches) index = 16;
    if (MEDIA_QUERY_TABLET.matches) index = 8;
    if (MEDIA_QUERY_BIGSCREEN.matches) index = 6;    
    PAGE.innerHTML = index;
    CONTAINER.style.transform = `translateX(${-step * (index - 1)}px)`;
}

function goToFirst() {
    let step = calculateStep();
    index = 1;
    PAGE.innerHTML = index;
    CONTAINER.style.transform = `translateX(${-step * (index - 1)}px)`;
}


NEXT_BTN.addEventListener('click', moveToNext);
PREV_BTN.addEventListener('click', moveToPrev);
LAST_BTN.addEventListener('click', goToLast);
FIRST_BTN.addEventListener('click', goToFirst);
CONTAINER.addEventListener('transitionend', checkBtn);
window.addEventListener('resize', () => {
    CONTAINER.style.transform = 'translateX(0px)';
    index = 1;
    PAGE.innerHTML = index;
})

/*  BURGER   */




let flag = true;


function handleMenu() {
    if (flag) {
        flag = false

        HEADER_LOGO.style.opacity = '0'
        MENU.style.right = '0px';
        OVERLAY.style.display = 'block';
        BODY.style.overflow = 'hidden';
        BODY.style.height = '100vh';
        BURGER_BTN.style.transform = 'rotate(90deg)'
    } else {
        flag = true;

        HEADER_LOGO.style.opacity = '1'
        MENU.style.right = '-500px';
        OVERLAY.style.display = 'none';
        BODY.style.overflow = 'auto';
        BODY.style.height = 'auto';
        BURGER_BTN.style.transform = 'rotate(0deg)'
    }
}

function hideMenu() {
    flag = true;
    OVERLAY.style.display = 'none';
    MENU.style.right = '-500px';
    BURGER_BTN.style.transform = 'rotate(0deg)';
    HEADER_LOGO.style.opacity = '1';
    BODY.style.overflow = 'auto';
    BODY.style.height = 'auto';
}

HEADER_LINKS.forEach(link => link.addEventListener('click', hideMenu))
BURGER_BTN.addEventListener('click', handleMenu);


OVERLAY.addEventListener('click', hideMenu)


window.addEventListener('resize', ()=>{
    hideMenu()
})