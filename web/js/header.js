"use strict";

var header = document.querySelector('.header');
var headerInfo = header.querySelector('.header__info');
var headerBlock = header.querySelector('.header__block');
var headerInfoMenu = header.querySelector('.header__info-menu');
var headerTopMenuItems = headerInfoMenu.querySelectorAll('.g-link');
var headerMiddleMenuItems = header.querySelectorAll('.topmenu__item-link');
var headerMenuButton = header.querySelector('.header__menu-button');
var isMobileMenuVisible = false;
var isMobileCatalogVisible = false;

function initMobileMenu() {
  var mobileMenu = document.createElement('div');
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
  var firstMobileMenuList = document.createElement('ul');
  var secondMobileMenuList = document.createElement('ul');
  var arrMnu = [{
    link: 'Услуги',
    href: '#',
    sublink: ['Пункт усуги 1', 'Пункт усуги 2', 'Пункт усуги 3']
  }, {
    link: 'Отраслевые решения',
    href: '#'
  }, {
    link: 'Подбор решения',
    href: '#',
    sublink: ['Пункт подбор решения 1', 'Пункт подбор решения 2']
  }, {
    link: '% Распродажа',
    href: '#'
  }];
  var arrMnu2 = [{
    link: 'О компании',
    href: '#'
  }, {
    link: 'Доставка и оплата',
    href: '#'
  }, {
    link: 'Сервис и поддержка',
    href: '#'
  }, {
    link: 'Контакты',
    href: '#'
  }];
  createsMenuLists(arrMnu, firstMobileMenuList);
  createsMenuLists(arrMnu2, secondMobileMenuList);

  function createsMenuLists(arr, wrap) {
    arr.forEach(function (el, i) {
      var listItemElement = document.createElement('li');
      listItemElement.classList.add('unitLi');

      if (el.sublink) {
        listItemElement.innerHTML = "\n                <li>\n                    <a href=\"".concat(el.href, "\" class=\"mnuSub\" data-linkvalue=").concat(i, ">").concat(el.link, "</a>\n                    <svg class=\"svg-sprite-icon icon-r\">\n    \t\t\t\t    <use xlink:href=\"web/images/sprite/symbol/sprite.svg#r\"></use>\n    \t\t\t    </svg>\n                </li>\n                <ul>\n                </ul>\n            ");
        var subListItemElement = document.createElement('ul');
        subListItemElement.classList.add('hideSubs');
        subListItemElement.setAttribute('data-ulvalue', i);
        el.sublink.forEach(function (elem) {
          subListItemElement.innerHTML += "\n                        <li>\n                            <a href=\"#\">".concat(elem, "</a>\n                        </li>\n                    ");
          listItemElement.append(subListItemElement);
        });
      } else {
        listItemElement.innerHTML = "\n                <li>\n                    <a href=\"".concat(el.href, "\">").concat(el.link, "</a>\n                </li>\n            ");
      }

      Object.assign(listItemElement.style, {
        fontWeight: '500',
        margin: '0 0 16px 0',
        fontSize: '18px'
      });
      wrap.append(listItemElement);
    });
  }

  Object.assign(firstMobileMenuList.style, {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    margin: '0 0 24px 0',
    padding: '0 0 8px 0'
  });
  var bottomBlock = document.createElement('div');
  bottomBlock.innerHTML = "\n        <a href=\"tel: 84952293084\">+7(495)229-30-84</a>\n        <span>\u0421 9-18 \u0441 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430 \u043F\u043E \u043F\u044F\u0442\u043D\u0438\u0446\u0443</span>\n    ";
  Object.assign(bottomBlock.style, {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  });
  var menuPhone = bottomBlock.querySelector('a');
  Object.assign(menuPhone.style, {
    fontSize: '24px',
    margin: '0 0 17px 0',
    fontWeight: '700',
    letterSpacing: '4px'
  });
  menuPhone.classList.add('g-link');
  menuPhone.classList.add('ffRubik');
  var menuDescription = bottomBlock.querySelector('span');
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
    var mobileMenu = document.querySelector('.mobile-menu');
    header.removeChild(mobileMenu);
    isMobileMenuVisible = !isMobileMenuVisible;
  }
}

document.addEventListener('click', function (e) {
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
});
var submenu = document.querySelector('.submenu');
var submenuColumns = submenu.querySelectorAll('.submenu__column');
var catalogButton = document.querySelector('.header__catalog');
var submenuLists = [];
document.addEventListener('click', function (e) {
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

  if (!e.target.closest('.nested-list') && !e.target.closest('.mobile-catalog-first-level') && !e.target.closest('.header__catalog') && isMobileCatalogVisible == true) {
    catalogButton.classList.remove('active');
    destroyCatalogDrop();
    isMobileCatalogVisible = false;
  }
});
submenuColumns.forEach(function (column) {
  var lists = column.querySelectorAll('ul');
  lists.forEach(function (list) {
    return submenuLists.push(list);
  });
});

function initCatalogDrop() {
  var menuElements = [];
  submenuLists.forEach(function (list) {
    var title = list.querySelector('span').innerHTML;
    var links = list.querySelectorAll('a');
    var menuList = {
      title: title,
      nestedLinks: []
    };
    links.forEach(function (link) {
      var linkName = link.innerHTML;
      var linkHref = link.getAttribute('href');
      var menuElement = {
        linkTitle: linkName,
        linkHref: linkHref
      };
      menuList.nestedLinks.push(menuElement);
    });
    menuElements.push(menuList);
  });
  var catalogDrop = document.createElement('div');
  catalogDrop.classList.add('mobile-catalog-drop');
  var catalogFirstLevel = document.createElement('ul');
  catalogFirstLevel.classList.add('mobile-catalog-first-level');
  menuElements.forEach(function (element) {
    var firstLevelItem = document.createElement('li');
    firstLevelItem.innerHTML = "\n            ".concat(element.title, "\n        ");
    catalogFirstLevel.append(firstLevelItem);
    firstLevelItem.addEventListener('click', function () {
      return showNestedList(element);
    });
  });
  catalogDrop.append(catalogFirstLevel);

  function showNestedList(element) {
    var nestedList = document.createElement('ul');
    nestedList.classList.add('nested-list');
    var nestedListHeader = document.createElement('button');
    nestedListHeader.classList.add('nested-list-header__button');
    nestedListHeader.innerHTML = "\n            ".concat(element.title, "\n        ");
    nestedListHeader.addEventListener('click', function () {
      return destroyNestedList();
    });
    nestedList.append(nestedListHeader);
    var nestedGrayBtn = document.createElement('a');
    nestedGrayBtn.classList.add('nested-gray');
    nestedGrayBtn.classList.add('g-link');
    nestedGrayBtn.innerHTML = 'Смотреть все товары категории';
    nestedList.append(nestedGrayBtn);
    element.nestedLinks.forEach(function (nestedLink) {
      var nestedLinkElement = document.createElement('li');
      nestedLinkElement.classList.add('nested-link-element');
      nestedLinkElement.innerHTML = "\n                <a href=\"".concat(nestedLink.linkHref, "\">").concat(nestedLink.linkTitle, "</a>\n            ");
      nestedList.append(nestedLinkElement);
    });
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
  var catalogDrop = header.querySelector('.mobile-catalog-drop');
  header.removeChild(catalogDrop);
}

document.addEventListener('click', function (e) {
  // accordion
  var targets = document.querySelectorAll('.mnuSub');
  var contents = document.querySelectorAll('.hideSubs');

  if (e.target.classList.contains('mnuSub')) {
    e.preventDefault();
    contents.forEach(function (cont) {
      if (e.target.getAttribute('data-linkValue') == cont.getAttribute('data-ulValue')) {
        if (cont.style.maxHeight) {
          cont.style.maxHeight = null;
          e.target.classList.remove('active');
        } else {
          cont.style.maxHeight = cont.scrollHeight + "px";
          e.target.classList.add('active');
        }
      }
    });
  }
});