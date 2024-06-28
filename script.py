import requests
from bs4 import BeautifulSoup
import scrapy 

#Les Parametres
url = 'https://fr.wikipedia.org/wiki/Cic%C3%A9ron'
#Imitation des navigateur de recherche
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    #,'Cookie': 'consent=accepted'  # Ajouter un cookie de consentement si j'arrive pas à passer outre
}
#Les mots clef utilisé pour la recherche
mot_clef = ["italie"]


#Request de connexion au site
rep = requests.get(url,headers=headers) 

if rep.status_code == 200:
  # Parser le contenu de la réponse
  soup = BeautifulSoup(rep.content, 'lxml')

  ### LE METTRE DANS UN TEST ###
  # Supposons que le pop-up ait une classe 'cookie-consent'
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
