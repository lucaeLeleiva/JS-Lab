(function (window) {
    'use strict';

    window.webapp = window.webapp || {};
    if (typeof window.webapp.main === 'undefined') {
        const main = {
            isReady: false,
            neededScript: [
                './js/menu.js',
				'./js/card.js',
            ],
            addNeededScripts: function () {
                for (let i = 0; i < main.neededScript.length; i++) {
                    let scriptTag = document.createElement('script');
                    scriptTag.src = main.neededScript[i];
                    document.head.appendChild(scriptTag);
                }
            },
            inicializar: function () {
                main.addNeededScripts();
                main.isReady = true;
            },
        };
        window.webapp.main = main;
        window.addEventListener('load', window.webapp.main.inicializar, false);
    }
    if (typeof window.webapp.isReady === 'undefined') {
        const isReady = {
            interval: 0,
            checkReady: function () {
                let isReady = true;
                for (let key in window.webapp) {
                    if(window.webapp[key].isReady === false){
                        isReady = window.webapp[key].isReady;
                    }
                }
                if(isReady === true){
                    document.body.classList.remove('loader');
                    window.clearInterval(isReady.interval);
                }

            },
            inicializar: function () {
                isReady.interval = window.setInterval(isReady.checkReady, 10);
    		},
        };

        window.webapp.isReady = isReady;
        window.addEventListener('load', window.webapp.isReady.inicializar, false);
    }
})(window);