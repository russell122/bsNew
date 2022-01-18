const header = document.querySelector('.header');
const headerInfo = header.querySelector('.header__info');
const headerBlock = header.querySelector('.header__block');
const headerInfoMenu = header.querySelector('.header__info-menu');
const headerTopMenuItems = headerInfoMenu.querySelectorAll('.g-link');
const headerMiddleMenuItems = header.querySelectorAll('.topmenu__item-link');
const headerMenuButton = header.querySelector('.header__menu-button');
let isMobileMenuVisible = false;
let isMobileCatalogVisible = false;

function initMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    Object.assign(mobileMenu.style, {
        display: 'flex',
        flexFlow: 'column nowrap',
        width: 'calc(100vw - 24px)',
        maxWidth: '400px',
        transform: 'translate(12px, 12px)',
        padding: '32px',
        borderRadius: '15px',
        background: 'white',
        boxShadow: '0px 0px 18px rgba(0, 0, 0, 0.25)',
        zIndex: '999',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '550px'
    });
    const firstMobileMenuList = document.createElement('ul');
    const secondMobileMenuList = document.createElement('ul');

    let arrMnu = [
        {
            link: 'Услуги',
            href: '#',
            sublink: ['Пункт усуги 1', 'Пункт усуги 2', 'Пункт усуги 3']
        },
        {
            link: 'Отраслевые решения',
            href: '#',
        },
        {
            link: 'Подбор решения',
            href: '#',
            sublink: ['Пункт подбор решения 1', 'Пункт подбор решения 2']
        },
        {
            link: '% Распродажа',
            href: '#',
        }
    ];

    let arrMnu2 = [
        {
            link: 'О компании',
            href: '#',
        },
        {
            link: 'Доставка и оплата',
            href: '#',
        },
        {
            link: 'Сервис и поддержка',
            href: '#',
        },
        {
            link: 'Контакты',
            href: '#',
        },
    ];

    createsMenuLists(arrMnu, firstMobileMenuList)
    createsMenuLists(arrMnu2, secondMobileMenuList)

    function createsMenuLists(arr, wrap) {
        arr.forEach((el, i) => {
            const listItemElement = document.createElement('li');
            listItemElement.classList.add('unitLi')
            if (el.sublink) {
                listItemElement.innerHTML = `
                <li>
                    <a href="${el.href}" class="mnuSub" data-linkvalue=${i}>${el.link}</a>
                    <svg class="svg-sprite-icon icon-r">
    				    <use xlink:href="web/images/sprite/symbol/sprite.svg#r"></use>
    			    </svg>
                </li>
                <ul>
                </ul>
            `;
                const subListItemElement = document.createElement('ul');
                subListItemElement.classList.add('hideSubs')
                subListItemElement.setAttribute('data-ulvalue', i)
                el.sublink.forEach(elem => {
                    subListItemElement.innerHTML += `
                        <li>
                            <a href="#">${elem}</a>
                        </li>
                    `;
                    listItemElement.append(subListItemElement);
                })



            } else {
                listItemElement.innerHTML = `
                <li>
                    <a href="${el.href}">${el.link}</a>
                </li>
            `
            }


            Object.assign(listItemElement.style, {
                fontWeight: '500',
                margin: '0 0 16px 0',
                fontSize: '18px'
            });
            wrap.append(listItemElement);
        })
    }

    Object.assign(firstMobileMenuList.style, {
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        margin: '0 0 24px 0',
        padding: '0 0 8px 0'
    });

    const bottomBlock = document.createElement('div');
    bottomBlock.innerHTML = `
        <a href="tel: 84952293084">+7(495)229-30-84</a>
        <span>С 9-18 с понедельника по пятницу</span>
    `;
    Object.assign(bottomBlock.style, {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
    });

    const menuPhone = bottomBlock.querySelector('a');
    Object.assign(menuPhone.style, {
        fontSize: '24px',
        margin: '0 0 17px 0',
        fontWeight: '700',
        letterSpacing: '4px'
    });
    menuPhone.classList.add('g-link')
    menuPhone.classList.add('ffRubik')
    const menuDescription = bottomBlock.querySelector('span');
    Object.assign(menuDescription.style, {
        color: '#A3A3A3'
    });

    mobileMenu.append(firstMobileMenuList);
    mobileMenu.append(secondMobileMenuList);
    mobileMenu.append(bottomBlock);
    header.append(mobileMenu);
    isMobileMenuVisible = true;
}

function destroyMobileMenu() {
    if (isMobileMenuVisible) {
        const mobileMenu = document.querySelector('.mobile-menu');
        header.removeChild(mobileMenu);
        isMobileMenuVisible = !isMobileMenuVisible;
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.header__menu-button')) {
        if (!isMobileMenuVisible) {
            initMobileMenu();
            headerMenuButton.classList.add('active');
            if (catalogButton.classList.contains('active')) {
                catalogButton.classList.remove('active');
                destroyCatalogDrop();
                isMobileCatalogVisible = false;
            }
        } else {
            destroyMobileMenu();
            headerMenuButton.classList.remove('active');
        }
    }
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.header__menu-button')) {
        destroyMobileMenu();
        headerMenuButton.classList.remove('active');
    }
})

const submenu = document.querySelector('.submenu');
const submenuColumns = submenu.querySelectorAll('.submenu__column');
const catalogButton = document.querySelector('.header__catalog');
const submenuLists = [];

document.addEventListener('click', (e) => {
    if (e.target.closest('.header__catalog') && window.innerWidth <= 1199) {
        if (isMobileCatalogVisible) {
            destroyCatalogDrop();
            isMobileCatalogVisible = false;
            catalogButton.classList.remove('active');
        } else {
            initCatalogDrop();
            isMobileCatalogVisible = true;
            catalogButton.classList.add('active');
            if (headerMenuButton.classList.contains('active')) {
                headerMenuButton.classList.remove('active');
                destroyMobileMenu();
            }
        }
    }
    if ((!e.target.closest('.nested-list')) && !e.target.closest('.mobile-catalog-first-level') && !e.target.closest('.header__catalog') && isMobileCatalogVisible == true) {
        catalogButton.classList.remove('active');
        destroyCatalogDrop();
        isMobileCatalogVisible = false;
    }
})

submenuColumns.forEach(column => {
    const lists = column.querySelectorAll('ul');
    lists.forEach(list => submenuLists.push(list));
})
function initCatalogDrop() {
    const menuElements = [];
    submenuLists.forEach(list => {
        const title = list.querySelector('span').innerHTML;
        const links = list.querySelectorAll('a');
        const menuList = {
            title: title,
            nestedLinks: []
        }
        links.forEach(link => {
            const linkName = link.innerHTML;
            const linkHref = link.getAttribute('href');
            const menuElement = {
                linkTitle: linkName,
                linkHref: linkHref
            }
            menuList.nestedLinks.push(menuElement)
        });
        menuElements.push(menuList);
    });

    const catalogDrop = document.createElement('div');
    catalogDrop.classList.add('mobile-catalog-drop');
    const catalogFirstLevel = document.createElement('ul');
    catalogFirstLevel.classList.add('mobile-catalog-first-level')
    menuElements.forEach(element => {
        const firstLevelItem = document.createElement('li');
        firstLevelItem.innerHTML = `
            ${element.title}
        `;
        catalogFirstLevel.append(firstLevelItem);
        firstLevelItem.addEventListener('click', () => showNestedList(element))
    });
    catalogDrop.append(catalogFirstLevel);

    function showNestedList(element) {
        const nestedList = document.createElement('ul');
        nestedList.classList.add('nested-list');
        const nestedListHeader = document.createElement('button');
        nestedListHeader.classList.add('nested-list-header__button');
        nestedListHeader.innerHTML = `
            ${element.title}
        `;
        nestedListHeader.addEventListener('click', () => destroyNestedList());
        nestedList.append(nestedListHeader);

        const nestedGrayBtn = document.createElement('a');
        nestedGrayBtn.classList.add('nested-gray');
        nestedGrayBtn.classList.add('g-link');
        nestedGrayBtn.innerHTML = 'Смотреть все товары категории';
        nestedList.append(nestedGrayBtn);

        element.nestedLinks.forEach(nestedLink => {
            const nestedLinkElement = document.createElement('li');
            nestedLinkElement.classList.add('nested-link-element');
            nestedLinkElement.innerHTML = `
                <a href="${nestedLink.linkHref}">${nestedLink.linkTitle}</a>
            `;
            nestedList.append(nestedLinkElement);
        })

        catalogDrop.removeChild(catalogFirstLevel);
        catalogDrop.append(nestedList);

        function destroyNestedList() {
            catalogDrop.removeChild(nestedList);
            catalogDrop.append(catalogFirstLevel);
        }
    }
    header.append(catalogDrop);
}

function destroyCatalogDrop() {
    const catalogDrop = header.querySelector('.mobile-catalog-drop');
    header.removeChild(catalogDrop);
}


document.addEventListener('click', (e) => {
    // accordion
    let targets = document.querySelectorAll('.mnuSub');
    let contents = document.querySelectorAll('.hideSubs');

    if (e.target.classList.contains('mnuSub')) {
        e.preventDefault();
        contents.forEach(cont => {
            if (e.target.getAttribute('data-linkValue') == cont.getAttribute('data-ulValue')) {
                if (cont.style.maxHeight) {
                    cont.style.maxHeight = null;
                    e.target.classList.remove('active')
                } else {
                    cont.style.maxHeight = cont.scrollHeight + "px";
                    e.target.classList.add('active')
                }
            }
        });
    }

})