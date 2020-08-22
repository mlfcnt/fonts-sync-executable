# fonts-sync-executable

Projet dont le but est de permettre la synchronisation de polices d'écritures entre plusieurs ordinateurs tournant sur Windows, Linux et macOS.

#### Lancer le projet en dev
- git clone git@github.com:mlfcnt/fonts-sync-executable.git
- cd fonts-sync-executable/
- cd src/server/ && yarn &&  cd ../client && yarn
- yarn build
- cd ../server && touch .env
- replacer les infos du .env
- yarn start
- Ouvrir http://localhost:4000/ dans le navigateur

##### Commandes utiles

- `pkg . --out-path bin` : permet de compiler le projet en executables disponibles dans le dossier /bin
  &nbsp;  
  &nbsp;
