document.getElementById('scrape').addEventListener('click', () => {
  const nbPages = document.getElementById('nbPages').value || 1;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    scrapePages(activeTab.id, nbPages);
  });
});

function scrapePages(tabId, nbPages, currentPage = 1) {
  if (currentPage <= nbPages) {
    // Exécuter le script de collecte sur la page courante
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        // Simuler un défilement vers le bas pour charger le contenu
        window.scrollTo(0, document.body.scrollHeight);

        const profiles = [];
        document.querySelectorAll('li.reusable-search__result-container').forEach(profileElement => {
          try { 
            const lien = profileElement.querySelector('a.app-aware-link').href;
            const name = profileElement.querySelector('span[aria-hidden="true"]').textContent.trim();
            const description = profileElement.querySelector('div.entity-result__primary-subtitle').textContent.trim();
            const region = profileElement.querySelector('div.entity-result__secondary-subtitle').textContent.trim();

            const profile = { name, region, description, lien };
            profiles.push(profile);
          } catch (error) {
            console.error("Erreur lors de la collecte : ", error);
          }
        });

        chrome.runtime.sendMessage({ action: 'addProfiles', profiles: profiles }, response => {
          console.log(response.status);
        });
      }
    }, () => {
      console.log(`Scraping de la page ${currentPage} terminé.`);

      // Naviguer à la page suivante en cliquant sur le bouton de pagination avec un délai aléatoire
      if (currentPage < nbPages) {
        const delay = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500; // Augmenter le délai aléatoire entre 1500 et 3000 ms
        setTimeout(() => {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: (pageNumber) => {
              const button = document.querySelector(`button[aria-label="Page ${pageNumber}"]`);
              if (button) {
                button.click();
              } else {
                console.error(`Bouton pour la page ${pageNumber} non trouvé.`);
              }
            },
            args: [currentPage + 1]
          }, (results) => {
            if (chrome.runtime.lastError) {
              console.error("Erreur lors de l'exécution du script de pagination : ", chrome.runtime.lastError);
              handleServerError(tabId, nbPages, currentPage);
              return;
            }
            
            // Attendre que la page suivante soit chargée avant de scraper à nouveau
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
              if (info.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                setTimeout(() => { 
                  scrapePages(tabId, nbPages, currentPage + 1);
                } ,2000);
              }
            });
          });
        }, delay);
      } else {
        // Sauvegarder les profils après avoir scrappé toutes les pages
        chrome.runtime.sendMessage({ action: 'saveProfiles' }, response => {
          console.log(response.status);
        });
      }
    });
  }
}

function handleServerError(tabId, nbPages, currentPage) {
  // Gérer les erreurs du serveur en ajoutant un délai plus long
  const retryDelay = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000; // Attendre entre 30 et 60 secondes
  console.warn(`Erreur serveur rencontrée. Reprise dans ${retryDelay / 1000} secondes...`);
  setTimeout(() => {
    scrapePages(tabId, nbPages, currentPage);
  }, retryDelay);
}



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