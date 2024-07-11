import requests
from bs4 import BeautifulSoup

# Les Parametres
# Likedin : https://www.linkedin.com/search/results/people/+reste de la requete
# exemple : ?keywords=Gestionnaire%20de%20projets ici avec mot clef (voir les autres options type)
# potentielement voir le prestataire qui réalise ca.
# Il y a des accès premium
url = 'https://www.linkedin.com/search/results/people/?keywords=Gestionnaire%20de%20projets'

#Imitation des navigateur de recherche
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    #,'Cookie': 'consent=accepted'  # Ajouter un cookie de consentement si j'arrive pas à passer outre vois plus bas
}
#Les mots clef utilisé pour la recherche
mot_clef = ["italie"]

#Request de connexion au site
rep = requests.get(url,headers=headers) 

if rep.status_code == 200:
  # Parser le contenu de la réponse
  soup = BeautifulSoup(rep.content, 'lxml') #'html parser' possible

  ### LE METTRE DANS UN TEST ###
  #Supposons que le pop-up ait une classe 'cookie-consent'
  #popup = soup.find(class_='cookie-consent')
  #if popup:
  #  popup.decompose() #je supprime le popup
  ###

  # Chercher notre text
  for elem in soup.find_all('p'):
    paragraph_text = elem.get_text().lower()
    for mot in mot_clef :
      if mot.lower() in paragraph_text:
                print(f'je sauvegarde : {elem.get_text()}') 

else:
    print(f'Échec de la requête: {rep.status_code}')

###