function scrapeProfiles() {
  const profiles = [];
  document.querySelectorAll('li.reusable-search__result-container').forEach(profileElement => {
    let lien, name, description, region;
    try{
      lien = profileElement.querySelector('a.app-aware-link ').href;
      name = profileElement.querySelector('span[aria-hidden="true"]').textContent;
      description = profileElement.querySelector('div.entity-result__primary-subtitle').textContent;
      region = profileElement.querySelector('div.entity-result__secondary-subtitle').textContent;
      const profile = { name, region, description, lien };
      profiles.push(profile);
    }catch (error) {
      console.error(error);
    }
  });

  profiles.forEach(profile => {
    saveProfile(profile);
  });
}

function saveProfile(profile) {
  chrome.runtime.sendMessage({ action: 'saveProfile', profile });
}
