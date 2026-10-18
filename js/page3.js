const fisk = [
    {
        id: 1,
        navn: "Turbo-snegl",
        image:"billeder/Snegl_julie.svg",
        tekst: "Hej! Jeg er en turbo-snegl. <br> Jeg er brun, grå og grøn med en stribet spiralskal og en blød krop. <br> Jeg bliver 3–7 cm stor. <br> Min livret er alger, og jeg bor på sten i det varme hav. <br> Jeg kan ikke svømme, men kravler langsomt rundt!",
        lyd: "Lyd/turbolyd.mp3"
    },

    {
        id: 2,
        navn: "Kanariegylte",
        image:"billeder/Kanariegylte-thomas.svg",
        tekst: "Hej! Jeg er en kanariegylte. <br> Jeg er gul med små mørke pletter og har en lang, slank krop. <br> Jeg kan blive 12 cm lang. <br> Min livret er små krebsdyr og orme. <br> Jeg bor ved koralrev i Det Indiske Ocean og Stillehavet og elsker at svømme og gemme mig i sandet!",
        lyd: "Lyd/gyltelyd.mp3"
    },

    {
        id: 3,
        navn: "Sohal-kirurg",
        image:"billeder/sohal_kirurg_thomas.svg",
        tekst: "Hej! Jeg er en sohal-kirurg.<br> Jeg er grå, hvid og blå med mørke striber og en flad, oval krop. <br> Jeg kan blive 40 cm lang.<br> Min livret er alger, og jeg bor ved koralrev i Rødehavet og Det Indiske Ocean. <br> Jeg svømmer hurtigt og passer på mit område!",
        lyd: "Lyd/sohallyd.mp3"
    },

    {
        id: 4,
        navn: "Pincetfisk",
        image:"billeder/Pincetfisk_julie.svg",
        tekst: "Hej! Jeg er en pincetfisk. <br> Jeg er gul, hvid og sort med en mørk plet ved halen. <br> Jeg har en flad krop og en lang snude og kan blive 22 cm lang. <br> Min livret er små krebsdyr og orme. <br> Jeg bor ved koralrev i Det Indiske Ocean og Stillehavet, hvor jeg svømmer roligt og finder mad i sprækker!",
        lyd: "Lyd/pincetlyd.mp3"
    },

    {
        id: 5,
        navn: "Rævefjæs",
        image: "Billeder/ræve_fjæs_line.svg",
        tekst: "Hej! Jeg hedder rævefjæs. <br> Jeg er gul med et sort-hvidt ansigt og en flad krop med en spids snude. <br> Jeg kan blive 25–30 cm lang. <br> Min livret er alger og planter. <br> Jeg bor ved koralrev i det vestlige Stillehav og svømmer alene eller med en ven!",
        lyd: "Lyd/ravefjaslyd.mp3"
    },

    {
        id: 6,
        navn: "Klovnefisk",
        image: "Billeder/Nemo_julie.svg",
        tekst: "Hej! Jeg hedder Nemo og er en klovnefisk. <br> Jeg er orange med tre hvide striber og har en lille, oval krop. <br> Jeg kan blive 11 cm lang. <br> Min livret er små krebsdyr og plankton. <br> Jeg bor ved koralrev i Stillehavet og svømmer små ture tæt på min søanemone!",
        lyd: "Lyd/nemolyd.mp3"
    },

    {
        id: 7,
        navn: "Paletkirurg",
        image: "Billeder/palet_kirurg_line.svg",
        tekst: "Hej! Jeg er en paletkirurg. <br> Jeg er blå med en gul hale, sorte mønstre og en flad, oval krop. <br> Jeg kan blive 30 cm lang. <br> Min livret er alger og små havdyr. <br> Jeg bor ved koralrev i Indo-Stillehavet og elsker at svømme rundt alene eller med andre fisk!",
        lyd: "Lyd/paletlyd.mp3"
    }
];

    function showFish(fishId) {
    let factsContainer = document.getElementById("fishfacts");

    let valgtFisk = fisk[fishId - 1];

    factsContainer.innerHTML = `
        <div class="fishfacts-content">

            <!-- Fisken til venstre -->
            <div class="facts-fish">
                <img src="${valgtFisk.image}" alt="${valgtFisk.navn}">
            </div>

            <!-- Boblen til højre -->
            <div class="factsbox">
                <h2>${valgtFisk.navn}</h2>
                <p>${valgtFisk.tekst}</p> 

            
                <div class="lydknapper">
                    <!-- lydknap -->
                    <button
                        class="lydknap"
                        type="button"
                        onclick="playFishAudio(${valgtFisk.id})">
                        <img src="Billeder/Lydknap.svg" alt="lydknap">
                    </button> 
                 
                    <!-- pauseknap -->
                    <button
                        class="pauseknap"
                        type="button"
                        onclick="pauseFishAudio()">
                        <img src="Billeder/pauseknap.svg" alt="pauseknap">
                    </button>
                </div>
            </div>

        </div>
    `;
}

function pauseFishAudio() {
    if (aktuelLyd) {
        aktuelLyd.pause();
    }
}


/** Afspil lyden **/

let aktuelLyd = null;

function playFishAudio(fishId) {
    const valgtFisk = fisk[fishId - 1];

    if (!valgtFisk || !valgtFisk.lyd) return;

    if (aktuelLyd) {
        aktuelLyd.pause();
        aktuelLyd.currentTime = 0;
    }

    aktuelLyd = new Audio(valgtFisk.lyd);
    aktuelLyd.play();
}
