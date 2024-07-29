document.getElementById('scrape').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
});

document.getElementById('linkedin').addEventListener('click', () => {
  const query = document.getElementById('searchBox').value;
  if (query) {
    const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`;
    chrome.tabs.create({ url: linkedinSearchUrl });
  }
});


//============//
//Faire un Bouton pour récupérer un seul profile//
//============//
