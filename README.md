# PROJET DE SCRAPPING
---

## CONTEXT :
  Ce projet est à des fins purement éducatives, personnel et non lucrative. Il est fait dans le cadre de mon stage de validatin de Master 1.

## LES TECHNOLOGIES :
  ### Le Programme :
  + Python : 
    + BeautifulSoup : Pour analyser et extraire les données des pages web.
    + Scrapy : Un framework de web scraping plus robuste et flexible.
    + Selenium : Pour interagir avec des pages web dynamiques en utilisant un navigateur web.
  + Electron : Pour les application de bureau HTML/CSS et Javascript.
  + MySql : pour la base de données (potentiellement).

  ### Environnement de Développement :
  - Virtual Studio Code.
  - Git : Pour le controle des versions.
  - Trello : Pour la gestion de projet.

## ETUDE :
  ### Les Besoins :
  * Trouver des profiles.
  * Pour la recherche :
    * Par mots clef.
    * Par poste (agglomératiion des intitulé de poste).
  * Historique des recherche.
  * Résultat enregistrable.
  * Interface graphique.
  * Zone d'exploration des résultats.
  * Liens vers les profiles.
  
  ### Les données :
    Les données devrais être :
    * Liens.
    * Nom.
    * Adresse mail.
    * Descriptif.

  ### Réalisation :
    1. [] Programmation du Script :
        1. [] Phase de connexion.
           1. [x] Connexion à la page.
              1. [x] Connexion.
                 1. [X] Options pour les popup.
                 2. [] Options de crédibilité.
              2. [] Coffection de meilleures Requêtes.
                 1. [] Redirections vers les pages des profiles désiré.
                 2. [] Enregistrement des intitulés de poste. 
        2. [] Extraire les informations.
           1. [] Parcourt de la Page.
              1. [] Sélectionner les Profiles.
              2. [] Extraire les données
           2. [] Parcourir Les autres profiles. 
    2. Phase de Traitement
       1.  [] Crée une structure ou un tableaux qui contient les informations par personnes.
       2.  [] Vérifier que les informations, ne pas faire de doublons.
       3.  [] Enregistré ou mettre à jours la base de donnée.
    3. L'interface :
        1. [] Concevoir un interface utilisateur ergonomique en web. 
        2. [] Ajouter les fonctionnalitées.
        3. [] Ajouter un volet déroulant pour les intitulé de postes.
        4. [] Transformer cet interface web en application graphique.
    4. Juridique
       1. [] Envoyé un mail pour les autorisations du bot. // robots.txt
    5. Maintenance et mise à jours
       1. [] Ajouter des fonctionnalités.
       2. [] Faire un dashbord pour le backoffice.

  ### Divers :
    [] En apprendre plus sur les requêtes
    [] Voir comment sont fait les module de profile et extraire les informations pertinante. 