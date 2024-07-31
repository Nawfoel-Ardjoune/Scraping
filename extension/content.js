function scrape() {
  const profiles = [];
  document.querySelectorAll('li.reusable-search__result-container').forEach(profileElement => {
    let lien, name, description, region;
    try {
      lien = profileElement.querySelector('a.app-aware-link').href;
      name = profileElement.querySelector('span[aria-hidden="true"]').textContent.trim();
      description = profileElement.querySelector('div.entity-result__primary-subtitle').textContent.trim();
      region = profileElement.querySelector('div.entity-result__secondary-subtitle').textContent.trim();
      const profile = { name, region, description, lien };
      profiles.push(profile);
      //console.log(profile);
    } catch (error) {
      console.error(error);
    }
  });

  save(profiles);
}

async function save(profiles) {
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: 'profiles.txt',
      types: [{
        description: 'Text Files',
        accept: { 'text/plain': ['.txt'] }
      }]
    });

    const writable = await handle.createWritable();
    for (const profile of profiles) {
      const profileText = `Name: ${profile.name}\nRegion: ${profile.region}\nDescription: ${profile.description}\nLien: ${profile.lien}\n============================\n`;
      await writable.write(profileText);
    }
    await writable.close();
    console.log('File created successfully');
  } catch (err) {
    console.error('File creation failed:', err);
  }
}

scrape();
