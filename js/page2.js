/* afspil mp3 med nemo speak */
let nemoLyd;

window.addEventListener("load", function () {
    nemoLyd = new Audio("Lyd/nemoside2lyd.mp3");

    function afspilLyd() {
        nemoLyd.play();

        nemoLyd.onended = function () {
            setTimeout(function () {
                if (!document.hidden) {
                    afspilLyd();
                }
            }, 7000);
        };
    }

    afspilLyd();
});

/* Stop lyden, når man forlader side 2 */

window.addEventListener("pagehide", function () {
    if (nemoLyd) {
        nemoLyd.pause();
        nemoLyd.currentTime = 0;
    }
});