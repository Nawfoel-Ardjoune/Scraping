//Content.js est un fichier dédier aux fonctions qui sont appelé par popup.js
const Profiles = [];//Ici le tableau de profiles


//Fonction de collecte
function scrape(array, callback) {
  //Collecte des elements qui formerons le profile
  document.querySelectorAll('li.reusable-search__result-container').forEach(profileElement => {
    let lien, name, description, region;
    try { //ce try empeche la sélection des pub sans interrompre le programme
      lien = profileElement.querySelector('a.app-aware-link').href;
      name = profileElement.querySelector('span[aria-hidden="true"]').textContent.trim();
      description = profileElement.querySelector('div.entity-result__primary-subtitle').textContent.trim();
      region = profileElement.querySelector('div.entity-result__secondary-subtitle').textContent.trim();
      
      //On fabrique le 'profile' que l'on envoit dans la liste des 'Profiles'
      const profile = {name, region, description, lien};
      array.push(profile);
    } catch (error) {
      console.error("Une erreur dans la récolte: ",error);
    }
  });
  //appel automatique à la fonction de sauvegarde des profiles
  callback(array);
}

//Fonction qui sauvegarde mes profiles
async function save(array) {
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: 'ListeDesProfiles.txt',
      types: [{
        description: 'Text Files',
        accept: { 'text/plain': ['.txt'] }
      }]
    });

    const writable = await handle.createWritable();
    for (const profile of array) {
      const profileText = `Name: ${profile.name}\nRegion: ${profile.region}\nDescription: ${profile.description}\nLien: ${profile.lien}\n============================\n\n`;
      await writable.write(profileText);
    }
    await writable.close();
    console.log('File created successfully');
  } catch (err) {
    console.error('File creation failed:', err);
  }
}

scrape(Profiles, save);
