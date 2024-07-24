//Ici le code du scraper
// This script is injected into the LinkedIn search results page
function scrapeProfiles() {
  const profiles = [];
  document.querySelectorAll('.search-result__info').forEach(profileElement => {
    const name = profileElement.querySelector('.actor-name').innerText;
    const position = profileElement.querySelector('.subline-level-1').innerText;
    const description = profileElement.querySelector('.subline-level-2').innerText;
    const email = ""; // L'email ne peut être extrait que si visible ou trouvé dans le profil

    const profile = { name, position, description, email };
    profiles.push(profile);
  });

  profiles.forEach(profile => {
    saveProfile(profile);
  });
}

function saveProfile(profile) {
  chrome.runtime.sendMessage({ action: 'saveProfile', profile });
}
