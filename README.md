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

1. Programmation du Script :
    - [ ] Phase de connexion
        - [x] Connexion à la page
            - [x] Connexion
                - [x] Options pour les pop-ups
                - [ ] Options de crédibilité
            - [ ] Correction de meilleures requêtes
                - [ ] Redirections vers les pages des profils désirés
                - [ ] Enregistrement des intitulés de poste
    - [ ] Extraire les informations
        - [ ] Parcours de la page
            - [ ] Sélectionner les profils
            - [ ] Extraire les données
        - [ ] Parcourir les autres profils
2. Phase de traitement
    - [ ] Créer une structure ou un tableau qui contient les informations par personne
    - [ ] Vérifier les informations pour éviter les doublons
    - [ ] Enregistrer ou mettre à jour la base de données
3. L'interface
    - [ ] Concevoir une interface utilisateur ergonomique en web
    - [ ] Ajouter des fonctionnalités
    - [ ] Ajouter un volet déroulant pour les intitulés de postes
    - [ ] Transformer cette interface web en application graphique
4. Juridique
    - [ ] Envoyer un mail pour les autorisations du bot // robots.txt
5. Maintenance et mises à jour
    - [ ] Ajouter des fonctionnalités
    - [ ] Faire un dashboard pour le backoffice


### Divers :
- [] En apprendre plus sur les requêtes
- [] Voir comment sont fait les module de profile et extraire les informations pertinante. 