(function(window) {
    'use strict';

    window.webapp = window.webapp || {};
    if (typeof window.webapp.card === 'undefined') {
        const card = {
            isReady: false,
            neededScript: [],
            addNeededScripts: function() {
                for (let i = 0; i < card.neededScript.length; i++) {
                    let scriptTag = document.createElement('script');
                    scriptTag.src = card.neededScript[i];
                    document.head.appendChild(scriptTag);
                }
            },
            cards: [{
                    url: 'https://jsonplaceholder.typicode.com/photos/1',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/2',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/3',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/4',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/5',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/6',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/7',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/8',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/9',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/10',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/11',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/12',
                },
                {
                    url: 'https://jsonplaceholder.typicode.com/photos/13',
                },
            ],
            addCards: function() {
                for (let i = 0; i < card.cards.length; i++) {
                    let contenedor = document.createElement('div');
                    contenedor.classList.add('card');
                    contenedor.classList.add('loader');
                    document.getElementById('main-seccion').appendChild(contenedor);
                    window.webapp.card.request(contenedor, card.cards[i].url);
                }
            },
            request: function(contenedor, url) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        const respuesta = JSON.parse(xmlhttp.responseText);
                        const contenedorObjetivo = contenedor;
                        window.webapp.card.addCard(respuesta, contenedorObjetivo);
                        contenedor.classList.remove('loader');
                    }
                }
                xmlhttp.open('GET', url, true);
                xmlhttp.send();
            },
            addCard: function(info, contenedor) {
                let contenedorTitulo = document.createElement('div');
                let titulo = document.createElement('h4');
                let contenedorImagen = document.createElement('div');
                let imagen = document.createElement('img');

                contenedor.classList.add('card');
                titulo.innerText = info.title;
                imagen.src = info.url;
                imagen.classList.add('img');
                titulo.classList.add('titulo');

                contenedorTitulo.appendChild(titulo);
                contenedorImagen.appendChild(imagen);
                contenedorImagen.classList.add('contenedor-imagen');
                contenedorTitulo.classList.add('contenedor-titulo');

                contenedor.appendChild(contenedorTitulo);
                contenedor.appendChild(contenedorImagen);
            },
            inicializar: function() {
                card.addNeededScripts();
                card.addCards();
                window.clearInterval(card.isReady);
                card.isReady = true;
            },
            wait: function() {
                if (window.webapp.menu.isReady) {
                    card.inicializar();
                }
            }
        };
        window.webapp.card = card;
        if (typeof window.webapp.menu === 'undefined' || !window.webapp.menu.isReady) {
            window.webapp.card.isReady = setInterval(window.webapp.card.wait, 10);
        } else {
            window.webapp.card.inicializar();
        }
    }
})(window);