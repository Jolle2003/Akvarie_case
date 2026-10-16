

/* afspil mp3 med nemo der taler */

window.addEventListener("load", function () {
    const nemoLyd = new Audio("Lyd/nemoside1lyd.mp3");

    function afspilLyd() {
        nemoLyd.play();
        nemoLyd.onended = function () {
            setTimeout(afspilLyd, 7000);
        };
    }

    afspilLyd();
});