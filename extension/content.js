// Content.js est un fichier dédié aux fonctions qui sont appelées par popup.js

// Vérifier si 'Profiles' est déjà défini pour éviter la redéclaration
if (typeof Profiles === 'undefined') {
  var Profiles = []; // ou const Profiles = [];
}

// Fonction de collecte
function scrape(array) {
  // Collecte des éléments qui formeront le profil
  document.querySelectorAll('li.reusable-search__result-container').forEach(profileElement => {
    try { 
      // Récupération des données du profil
      const lien = profileElement.querySelector('a.app-aware-link').href;
      const name = profileElement.querySelector('span[aria-hidden="true"]').textContent.trim();
      const description = profileElement.querySelector('div.entity-result__primary-subtitle').textContent.trim();
      const region = profileElement.querySelector('div.entity-result__secondary-subtitle').textContent.trim();
      
      // Création du profil
      const profile = { name, region, description, lien };
      array.push(profile);
    } catch (error) {
      console.error("Erreur lors de la collecte : ", error);
    }
  });
  // Appel automatique à la fonction de sauvegarde des profils
  return array;
}


// Fonction qui sauvegarde les profils en format CSV avec encodage UTF-8
async function saveAsCSV(array) {
  try {
    // Ajout d'un horodatage au nom du fichier
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const suggestedName = `ListeDesProfils_${timestamp}.csv`;

    // Sélection du fichier de sauvegarde
    const handle = await window.showSaveFilePicker({
      suggestedName,
      types: [{
        description: 'Fichiers CSV',
        accept: { 'text/csv': ['.csv'] }
      }]
    });

    const writable = await handle.createWritable();

    // Ajouter le BOM UTF-8 au début du fichier pour assurer la compatibilité avec les accents
    const utf8Bom = '\uFEFF';
    await writable.write(utf8Bom);

    // Créer l'en-tête du fichier CSV
    const headers = 'Nom,Région,Description,Lien\n';
    await writable.write(headers);

    // Créer les lignes du fichier CSV
    for (const profile of array) {
      // Utilisation de guillemets pour encadrer les champs susceptibles de contenir des virgules
      const row = `${profile.name},"${profile.region}","${profile.description}",${profile.lien}\n`;
      await writable.write(row);
    }

    await writable.close();
    console.log('Fichier CSV UTF-8 créé avec succès');
  } catch (err) {
    console.error('Échec de la création du fichier CSV :', err);
    // Tentative de réessayer en cas d'échec
    if (confirm('La sauvegarde a échoué. Voulez-vous réessayer ?')) {
      await saveAsCSV(array);
    }
  }
}


// Exécution de la collecte avec sauvegarde automatique
scrape(Profiles);
saveAsCSV(Profiles);
