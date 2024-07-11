# PROJET DE SCRAPPING
---

## CONTEXT
Ce projet est à des fins purement éducatives, personnel et non lucratif. Il est fait dans le cadre de mon stage de validatin de Master 1.

## LES TECHNOLOGIES

### Le Programme

+ Python : 
  + BeautifulSoup : Pour analyser et extraire les données des pages web.
  + Scrapy : Un framework de web scraping plus robuste et flexible.
  + Selenium : Pour interagir avec des pages web dynamiques en utilisant un navigateur web.
+ Electron : Pour les application de bureau HTML/CSS et Javascript.
+ MySql : pour la base de données (potentiellement).

### Environnement de Développement

- Virtual Studio Code.
- Git : Pour le controle des versions.
- Trello : Pour la gestion de projet.

## ETUDE

### Les Besoins

* Trouver des profiles.
* Pour la recherche :
  * Par mots clef.
  * Par poste (agglomératiion des intitulé de poste).
* Historique des recherche.
* Résultat enregistrable.
* Interface graphique.
* Zone d'exploration des résultats.
* Liens vers les profiles.
  
### Les données

Les données devrais être :  
* Liens.
* Nom.
* Adresse mail.
* Descriptif.

### Réalisation

1. Programmation du Script :
    1. - [Fonctionnel] Phase de connexion
           - [x] Connexion à la page
           - [x] Options pour les pop-ups
           - [ ] Options de crédibilité
           - [X] Redirections vers la page des profils
    2. - [Fonctionnel] Extraire les informations
           - [ ] Parcours de la page
           - [ ] Sélectionner les profils
           - [x] Extraire des données
           - [ ] Parcourir les autres profils
    3. - [ ] Phase de traitement
           - [ ] Base de données contenant les informations
           - [ ] Vérifier les informations pour éviter les doublons
           - [ ] Enregistrer ou mettre à jour la base de données
           - [ ] Retourner les informations sous forme d'un tableau excel
    4. - [ ] Divers
           - [ ] Enregistrement des intitulés de poste
           - [ ] Confections de requêtes complexe
           - [ ] Options pour les cookies
2. L'interface
  1.  - [ ] Concevoir une interface utilisateur ergonomique en web
  2.  - [ ] Implémentations des fonctionnalités aux bouttons.
  3.  - [ ] Transformer cette interface web en application graphique
      - [ ] Options De connexion (headers, auth, etc...)
      - [ ] Volet déroulant pour les intitulés de postes
      - [ ] Visibilité sur les résultats (photo de profile)
3. Juridique
    - [ ] Envoyer un mail pour les autorisations du bot // robots.txt
    - [ ] Voir avec des avocats.
4. Maintenance et mises à jour
    - [ ] étude des fonctionnalités type.
    - [ ] Dashboard pour le backoffice

### Divers
   - [ ] En apprendre plus sur les requêtes 

## Les Features
à remplir

## Documentation