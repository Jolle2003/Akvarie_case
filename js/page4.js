/* Her finder vi elementerne fra HTML, som vi skal bruge i JavaScript. */

// Vi samler alle kortene i en liste, så vi kan tilføje klikfunktioner til dem.
const kortene = [...document.querySelectorAll(".kort")];

// Vi finder spillepladen, så vi kan flytte kortene rundt på den.
const spilleplade = document.querySelector("#spilleplade");

// Vi finder beskeden, som fortæller barnet, hvad der sker.
const besked = document.querySelector("#besked");

// Vi finder tælleren og knappen.
const tæller = document.querySelector("#antal-par");
const spilIgen = document.querySelector("#spil-igen");

// Otte kort giver fire par.
const antalPar = kortene.length / 2;


/* Her er spillets hukommelse */

// null betyder, at intet første kort er valgt endnu.
let førsteKort = null;

// Låst betyder, at vi venter på, at to kort skal vendes tilbage.
let låst = false;

// Antal par der er fundet i en runde.
let fundnePar = 0;

// Ventetid før en ny runde starter.
let ventetid;


/* Sådan vendes et kort */

function vendKort(kort) {
  /*
    Stop, hvis:
    - vi venter på to andre kort
    - kortet allerede er åbent

    Det forhindrer også, at samme kort vælges to gange som et par.
  */
  if (låst || kort.classList.contains("vendt")) {
    return;
  }

  // CSS drejer kortet, når klassen "vendt" tilføjes.
  kort.classList.add("vendt");

  // Opdatérer beskrivelsen til skærmlæsere.
  kort.setAttribute("aria-label", kort.dataset.fisk);

  // Hvis det er detførste kort, barnet vælger
  if (førsteKort === null) {
    førsteKort = kort;
    besked.textContent = "Find en fisk magen til!";

    // Venter på næste tryk.
    return;
  }

  // Nu har vi to kort.
  const kortEt = førsteKort;
  const kortTo = kort;

  // Gør klar til det næste par.
  førsteKort = null;

  // Barnet må ikke vende et tredje kort imens, derfor låst.
  låst = true;

  // Sammenligner værdierne i data-fisk.
  const erEns =
    kortEt.dataset.fisk === kortTo.dataset.fisk;

  if (erEns) {
    // Vent, til det andet kort er vendt færdigt.
    ventetid = setTimeout(() => {

      // Lægger ét til antallet af fundne par.
      fundnePar++;

      tæller.textContent =
        `${fundnePar} af ${antalPar} par`;

      // Beskeder når hele spillet er gennemført
      if (fundnePar === antalPar) {
        besked.textContent = "Du fandt alle fiskene!";
      } else {
        besked.textContent = "Du fandt to ens!";
      }

      // Barnet må vælge igen.
      låst = false;

      // Vi beholder vendt, så parret forbliver åbent.
    }, 600);

  } else {
    // Fiskene er forskellige.
    besked.textContent = "Se godt efter …";

    // Vis dem et øjeblik, så barnet kan huske dem.
    ventetid = setTimeout(() => {
      // Fjerner vendt, og så CSS kan dreje kortene tilbage.
      kortEt.classList.remove("vendt");
      kortTo.classList.remove("vendt");

      kortEt.setAttribute("aria-label", "Vend kort");
      kortTo.setAttribute("aria-label", "Vend kort");

      besked.textContent = "Prøv igen!";

      // Venter på, at tilbagevendingen er færdig.
      ventetid = setTimeout(() => {
        låst = false;
      }, 600);

    }, 1800);
  }
}


/* Her tilføjes klikfunktioner til kortene fra vores HTML */

// Tilføj en klikfunktion til hvert HTML-kort.
kortene.forEach(kort => {
  kort.addEventListener("click", () => {
    vendKort(kort);
  });
});


/* Spil igen knappen --> hvordan man starter et nyt spil */

function startSpil() {
  // Stop en eventuel ventetid fra sidste runde.
  clearTimeout(ventetid);

  // Nulstil spillets hukommelse.
  førsteKort = null;
  låst = false;
  fundnePar = 0;

  besked.textContent = "Find to ens fisk!";
  tæller.textContent = `0 af ${antalPar} par`;

  // Luk alle kort, og fjern markeringen af par.
  kortene.forEach(kort => {
    kort.classList.remove("vendt", "fundet");
    kort.setAttribute("aria-label", "Vend kort");
  });

  /*
    Bland kortene ved at bytte pladser i listen.
    Math.random() vælger et tilfældigt tal.
  */
  for (let i = kortene.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [kortene[i], kortene[j]] =
      [kortene[j], kortene[i]];
  }

  /*
    Flyt de eksisterende HTML-kort til
    deres nye rækkefølge på spillepladen.
    Der bliver ikke oprettet nye kort.
  */
  kortene.forEach(kort => {
    spilleplade.append(kort);
  });
}


/* Hvordan man starter et nyt spil */

// Start en ny runde ved tryk på Spil igen.
spilIgen.addEventListener("click", startSpil);

// Start første runde, når siden åbnes.
startSpil();