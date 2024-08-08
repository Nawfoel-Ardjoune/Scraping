function scrape() {
  //Fonction qui récolte les profiles
  const profiles = [];
  document.querySelectorAll('li.reusable-search__result-container').forEach(profileElement => {
    let lien, name, description, region;
    try { //ce try empeche la sélection des pub sans interrompre le programme
      lien = profileElement.querySelector('a.app-aware-link').href;
      name = profileElement.querySelector('span[aria-hidden="true"]').textContent.trim();
      description = profileElement.querySelector('div.entity-result__primary-subtitle').textContent.trim();
      region = profileElement.querySelector('div.entity-result__secondary-subtitle').textContent.trim();
      //On fabrique le 'profile' que l'on envoit dans la liste des 'profiles'
      const profile = { name, region, description, lien };
      profiles.push(profile);
    } catch (error) {
      console.error("Une erreur dans la récolte: ",error);
    }
  });
  //appel automatique à la fonction de sauvegarde des profiles
  save(profiles);
}

//Fonction qui sauvegarde mes profiles
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
