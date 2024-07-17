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

def connecter(url, method='GET', username=None, password=None, api_key=None, headers=None, data=None, timeout=30, verify_ssl=True, proxies=None, use_session=False):
    """
    Se connecte à un site web avec les paramètres spécifiés.

    Args:
        url (str): URL du site.
        method (str): Méthode HTTP à utiliser ('GET', 'POST', etc.). Par défaut 'POST'.
        username (str, optional): Nom d'utilisateur. Par défaut None.
        password (str, optional): Mot de passe. Par défaut None.
        api_key (str, optional): Clé API ou token. Par défaut None.
        headers (dict, optional): Headers HTTP additionnels. Par défaut None.
        data (dict, optional): Données de la requête. Par défaut None.
        timeout (int, optional): Délai d'attente avant expiration de la requête. Par défaut 30 secondes.
        verify_ssl (bool/str, optional): Vérifier le certificat SSL. Peut être un chemin vers un certificat. Par défaut True.
        proxies (dict, optional): Proxies à utiliser pour la connexion. Par défaut None.
        use_session (bool, optional): Utiliser une session pour la requête. Par défaut False.

    Returns:
        response: Réponse de la requête.
    """
    # Sélectionner la méthode de requête
    method = method.upper()
    if method not in ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']:
        raise ValueError(f"Méthode HTTP non supportée: {method}")
    
    # Créer une session ou utiliser une simple requête
    session = None
    if use_session:
        session = requests.Session()
        if headers:
            session.headers.update(headers)
        if api_key:
            session.headers.update({'Authorization': f'Bearer {api_key}'})
        elif username and password:
            session.auth = (username, password)
    else:
        session = requests

    # Préparer les arguments de la requête
    request_args = {
        'url': url,
        'timeout': timeout,
        'verify': verify_ssl,
        'proxies': proxies
    }
    if headers:
        request_args['headers'] = headers
    if data:
        if method == 'GET':
            request_args['params'] = data
        else:
            request_args['data'] = data

    # Faire la requête
    try:
        if method == 'GET':
            response = session.get(**request_args)
        elif method == 'POST':
            response = session.post(**request_args)
        elif method == 'PUT':
            response = session.put(**request_args)
        elif method == 'DELETE':
            response = session.delete(**request_args)
        elif method == 'PATCH':
            response = session.patch(**request_args)
        response.raise_for_status()  # Lève une exception pour les codes d'état HTTP 4xx/5xx
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la connexion : {e}")
        return None

    # Fermer la session si utilisée
    if use_session:
        session.close()
    
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
    

    response = connecter(url, headers=headers)

    if response:
        print("Connexion réussie!")
        print("Réponse du serveur :", response.status_code)
    else:
        print("Échec de la connexion.")

    print("fin du main")
    time.sleep(2)

if __name__=="__main__":
    main()