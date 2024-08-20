// Stocker les références des onglets ouverts
if (typeof openedTabs == "undefined"){
  let openedTabs = [];
}

// Action du click sur le bouton de collecte
document.getElementById('scrape').addEventListener('click', () => {
  // Test de la valeur du nombre de page
  if (!document.getElementById('nbPages').value){
    nbPages = 1;
    console.log("Par default NbPages ==",nbPages);
  } else {
    let nbPages = document.getElementById('nbPages').value;
    console.log("Avec valeur Nombre de pages == ", nbPages);
  }
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    files: ['content.js']
    }); // Ajouter ici l'appel aux fonctions de content.js
  });
});

//Action du click sur le bouton de Linkedin
document.getElementById('linkedinSearch').addEventListener('click', () => {
  const query = document.getElementById('searchBox').value;
  if (query) {
    const encodedValue = encodeURIComponent(query);
    const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?geoUrn=%5B"104246759"%5D&keywords=${encodedValue}`;
    chrome.tabs.create({ url: linkedinSearchUrl });
  }else {
    console.log("Erreur : Une erreur dans la requête du site Linkedin");
  }
});

//Action du click sur le bouton de Indeed
document.getElementById('indeedSearch').addEventListener('click', () => {
  const query = document.getElementById('searchBox').value;
  if (query) {
    const encodedValue = encodeURIComponent(query);
    const indeedSearchUrl = `https://resumes.indeed.com/search?q=${encodedValue}&l=Île-de-France`;
    chrome.tabs.create({ url: indeedSearchUrl });
  }else {
    console.log("Erreur : Une erreur dans la requête du site indeed");
  }
});

//Action du click sur la lecture des fichiers
document.getElementById('formFile').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      console.log('Selected file:', file.name);
      // Add your code to handle the selected file
  }
});

//Fonction de delais pour ne par surcharger et se faire bloquer
function delay(callback) {
  const minTime = 350;
  const maxTime = 1350;
  const randomDelay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  setTimeout(callback, randomDelay);
}

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

// Fonction pour ouvrir de nouveaux onglets et en fonctions de nbPages
// Cette fonction n'est pas terminé
function openNewTabs(nbPages) {
  // Ouvrir les nouveaux onglets
  for (let i = 0; i<nbPages;i++){
    //Fabriquer des tabs pour recuperer les informations 
    openedTabs.push(window.open('https://example.com', '_blank'));
  }
  // Appeler une fonction sur chaque onglet après un délai pour s'assurer qu'ils sont bien ouverts
  setTimeout(() => {
    openedTabs.forEach((tab, index) => {
      if (tab) {
        // Exemple : écrire un message dans la console de l'onglet
        tab.console.log(`Hello from tab ${index + 1}`);
        // Ou changer le titre de l'onglet
        tab.document.title = `New Tab ${index + 1}`;
      } else {
        console.log(`Tab ${index + 1} could not be opened or was blocked by the browser.`);
      }
    });
  }, 1000); // Délai de 1 seconde pour que les onglets se chargent correctement
}

