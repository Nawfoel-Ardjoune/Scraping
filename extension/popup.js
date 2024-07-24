document.getElementById('scrapeProfiles').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: scrapeProfiles,
      },
      (results) => {
        document.getElementById('info').innerText = 'Scraping done!';
      }
    );
  });
});

function scrapeProfiles() {
  chrome.runtime.sendMessage({ action: 'scrapeProfiles' });
}

// Ici la partie pour garder la session ouverte
//=============================================//
chrome.cookies.get({ url: "https://www.linkedin.com", name: "li_at" }, (cookie) => {
  if (cookie) {
    console.log('LinkedIn session is active');
    // Vous pouvez utiliser le cookie pour effectuer des requêtes authentifiées si nécessaire
  } else {
    console.log('No active LinkedIn session');
  }
});
//============================================//