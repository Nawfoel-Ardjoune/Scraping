"""
Nom du programme : scraper.py
Description : Ce programme à pour but de récupérer des profiles d'emplois
Auteur:  Moi
Date : 17/07/2024
Version 0.1.0
"""

import requests
from bs4 import BeautifulSoup
import time

def connecter(url, session=None, username=None, password=None, api_key=None, headers=None, data=None, timeout=30, verify_ssl=True, proxies=None):
    """
    Se connecte à un site web avec les paramètres spécifiés.

    Args:
        url (str): URL du site.
        username (str, optional): Nom d'utilisateur. Par défaut None.
        password (str, optional): Mot de passe. Par défaut None.
        api_key (str, optional): Clé API ou token. Par défaut None.
        headers (dict, optional): Headers HTTP additionnels. Par défaut None.
        data (dict, optional): Données de la requête. Par défaut None.
        timeout (int, optional): Délai d'attente avant expiration de la requête. Par défaut 30 secondes.
        verify_ssl (bool, optional): Vérifier le certificat SSL. Par défaut True.
        proxies (dict, optional): Proxies à utiliser pour la connexion. Par défaut None.

    Returns:
        response: Réponse de la requête.
    """
    # Créer une session pour retenir les cookies
    if session :
        session = requests.Session()
    
    # Ajouter les headers
    if headers:
        session.headers.update(headers)
    
    # Ajouter les identifiants ou clé API dans les headers
    if api_key:
        session.headers.update({'Authorization': f'Bearer {api_key}'})
    elif username and password:
        session.auth = (username, password)
    
    # Faire la requête
    try:
        response = session.post(url, data=data, timeout=timeout, verify=verify_ssl, proxies=proxies)
        response.raise_for_status()  # Lève une exception pour les codes d'état HTTP 4xx/5xx
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la connexion : {e}")
        return None
    
    return response

#Parser le contenu de la réponse
def parsing(response):
    soup = BeautifulSoup(response.content, 'html.parser') #'html parser' possible

  ### LE METTRE DANS UN TEST ###
  #Supposons que le pop-up ait une classe 'cookie-consent'
  #popup = soup.find(class_='cookie-consent')
  #if popup:
  #  popup.decompose() #je supprime le popup
  ###

  # Chercher notre text
  #for elem in soup.find_all('p'):
  #  paragraph_text = elem.get_text().lower()
  #  for mot in mot_clef :
  #    if mot.lower() in paragraph_text:
  #              print(f'je sauvegarde : {elem.get_text()}') 

#else:
#    print(f'Échec de la requête: {rep.status_code}')

###
def main():
    """
    Fonction principale de mon programme
    
    Args :
        Void
    
    Return: 
        Void
    """
    print("Début du main")
    time.sleep(2)
    url = "https://en.wikipedia.org/wiki/Main_Page"
    #username = "votre_nom_utilisateur"
    #password = "votre_mot_de_passe"
    #data = {"username": username, "password": password}
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ,'Cookie': 'consent=accepted'  # Ajouter un cookie de consentement si j'arrive pas à passer outre vois plus bas
    }
    

    response = connecter(url)

    if response:
        print("Connexion réussie!")
        print("Réponse du serveur :", response.text)
    else:
        print("Échec de la connexion.")

    print("fin du main")
    time.sleep(2)

if __name__=="__main__":
    main()