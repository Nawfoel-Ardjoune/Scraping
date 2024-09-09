# Projet De Data Extracting Tool

## CONTEXT
Ce projet est à des fins purement éducatives, personnelles et non lucratives. Il est réalisé dans le cadre de mon stage de validation de master 1 informatique.

## Description
Ce Programme est une extension web destiné à facilité la recherche de profiles.

## LES TECHNOLOGIES
Dans cette partie sera détailler les différents aspect du programme

### Le Programme
+ HTML : pour réaliser l'interface
+ CSS : Pour le style de l'interface
+ Javascript : L'ensemble des fonctions

### Les Fichiers
+ Popup.html : Interface de l'extension
+ Popup.css : Fichier de style de l'interface
+ popup.js : Fichier de gestion des fonctions de la page web
+ background.js : Fichier de sauvegarde des profiles des différentes pages
+ manifest.json : Fichier descriptif de l'extension pour le navigateur

### Environnement de Développement

- Virtual Studio Code.
- Git : Pour le controle des versions.
- Asana : Pour la gestion de projet.

## ETUDE
Le programme étant réaliser dans le cadre d'un stage de gestion de projet. Je tente ici d'y introduire cet aspect.
### Les Besoins

* Trouver des profiles.
* Pour la recherche :
  * Par mots clef.
  * Par poste (agglomératiion des intitulé de poste).
* Résultat enregistrable.
* Interface graphique.
* Zone d'exploration des résultats.
* Liens vers les profiles.
  
### Les données
Ce programme est capable de sauvegarder les informations des profiles dans un fichier CSV exploitable par tout les Tableurs.
Les données devrais être :  
* Liens du profile.
* Nom complet.
* Localisation.
* Descriptif.

### Installation

Ce extension est designer pour fonctionner sur microsoft edge, les protocoles sont les même que sur chrome.
1. télécharger l'extensions
2. Installer l'extension dans votre navigateur:
       ici le lien pour edge : https://support.microsoft.com/fr-fr/microsoft-edge/ajouter-d%C3%A9sactiver-ou-supprimer-des-extensions-dans-microsoft-edge-9c0ec68c-2fbc-2f2c-9ff0-bdc76f46b026.  
       1. Rendez-vous dans la section extension des paramètres de votre navigateur.  
       2. Activez le mode développer.  
       3. cliquez sur "charger une extension compresser" en haut de la section extension.  
       4. Une fenêtre va s'ouvrir, choississez l'extension que vous venez de télécharger.  
       5. Activer l'extension.  
3. C'est à vous de l'utiliser

## Documentation
 L’utilisateur clique sur l’icône de l’extension, ce qui ouvre une petite fenêtre (l'interface).
 On y trouve :  
 — Un menu déroulant lorque l'on passe la souris sur "réseaux" avec deux options, une pour vous rendre sur le site de
 LinkedIn et l’autre sur le site d’Indeed.  
 — À côté du bouton déroulant se trouve un champ pour que l’utilisateur y
 entre le poste des profils qu’il recherche, le but est d’abord d’y entrer votre
 recherche avant de cliquer sur l’un des choix du menu déroulant. Ce qui ouvre une page vers les profiles rechercher ou vers la page de connexion du site.  
 — On retrouve ensuite un bouton de collecte qui sert à sauvegarder la page
 sur laquelle nous sommes. Les profiles seront sauvegarder dans un fichier CSV exploitable par la majorité des tableurs.  
 — Un champ suit le bouton de collecte et sert à indiqué le nombre de page que l'on souhaite sauvegarder. Des petit boutons à droite de ce champs permettent d'incrémenter et ou de décrémenter le nombre de page que l'on souhaite collecter.  