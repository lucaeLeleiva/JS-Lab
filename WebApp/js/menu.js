(function (window) {
    'use strict';

    window.webapp = window.webapp || {};
    if (typeof window.webapp.menu == 'undefined') {
        const menu = {
            isReady: true,
            neededScript: [],
            addNeededScripts: function () {
                for (let i = 0; i < menu.neededScript.length; i++) {
                    let scriptTag = document.createElement('script');
                    scriptTag.src = menu.neededScript[i];
                    document.head.appendChild(scriptTag);
                }
            },
            menuItems: [
                {
                    contenedor: 'head',
                    tag: 'link',
                    contenido: '',
                    propiedades: [{
                            atributo: 'rel',
                            valor: 'shortcut icon',
                        },
                        {
                            atributo: 'href',
                            valor: (new Date().getHours() > 19 || new Date().getHours() < 7) ?
                        './images/beer-icon-small.png':
                        './images/coffee-cup2.png',
                        },
                    ],
                },
                {
                    contenedor: 'body',
                    tag: 'nav',
                    contenido: '',
                    propiedades: [
                        {
                            atributo: 'id',
                            valor: 'nav-bar',
                        },
                        {
                            atributo: 'classList',
                            valor: 'nav-bar',
                        },
                    ], 
                },
                {
                    contenedor: 'nav-bar',
                    tag: 'a',
                    contenido: (new Date().getHours() > 19 || new Date().getHours() < 7) ?
                        '<img src="./images/beer-icon-small.png" />':
                        '<img src="./images/coffee-cup (1).png" />',
                    propiedades: [{
                            atributo: 'href',
                            valor: './index.html',
                        },
                        {
                            atributo: 'classList',
                            valor: 'boton-home boton-link',
                        },
                    ],
                },
                {
                    contenedor: 'body',
                    tag: 'main',
                    contenido: '',
                    propiedades: [
                        {
                            atributo: 'id',
                            valor: 'main-seccion',
                        },
                        {
                            atributo: 'classList',
                            valor: 'main',
                        },
                    ],
                },
                {
                    contenedor: 'body',
                    tag: 'footer',
                    contenido: '',
                    propiedades: [
                        {
                            atributo: 'id',
                            valor: 'footer',
                        },
                        {
                            atributo: 'classList',
                            valor: 'footer',
                        },
                    ],
                }, 
                {
                    contenedor: 'footer',
                    tag: 'a',
                    contenido: 'MadeByMe',
                    propiedades: [{
                            atributo: 'href',
                            valor: 'https://github.com/lucaeLeleiva',
                        },
                        {
                            atributo: 'classList',
                            valor: 'footer-item boton-link',
                        },
                        {
                            atributo: 'target',
                            valor: '_blank',
                        },
                    ],
                },  
            ],
            dibujarMenu: function () {
                for (let i = 0; i < menu.menuItems.length; i++) {
                    let tag = document.createElement(menu.menuItems[i].tag);
                    tag.innerHTML = menu.menuItems[i].contenido;
                    for (let j = 0; j < menu.menuItems[i].propiedades.length; j++) {
                        tag[menu.menuItems[i].propiedades[j].atributo] += menu.menuItems[i].propiedades[j].valor;
                    }
                    document.getElementById(menu.menuItems[i].contenedor).appendChild(tag);
                }
                
            },
            inicializar: function () {
                menu.addNeededScripts();
                menu.dibujarMenu();
                menu.isReady = true;
            },
        };
        window.webapp.menu = menu;
        window.webapp.menu.inicializar();
    }
})(window);