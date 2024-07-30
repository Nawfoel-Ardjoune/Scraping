document.getElementById('scrape').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
});

document.getElementById('linkedinSearch').addEventListener('click', () => {
  const query = document.getElementById('searchBox').value;
  if (query) {
    const encodedValue = encodeURIComponent(query);
    const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodedValue}`;
    chrome.tabs.create({ url: linkedinSearchUrl });
  }else {
    console.log("Erreur : Rien reçu de la searchbox");
  }
});



//============//
//Faire un Bouton pour récupérer un seul profile//
//============//
