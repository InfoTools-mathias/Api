# API Fonctionnement
Bienvenue dans la documentation de l'API !

## Branches
Il existe deux branches dites "stables": [master](https://github.com/InfoTools-mathias/Api/tree/master) (version finale) et [dev](https://github.com/InfoTools-mathias/Api/tree/dev) (version beta)

La version `beta` intègre des tests qui peuvent avoir des bugs.
La `master` a généralement moins de features mais aussi moins de bugs.

## Installation
Veillez à avoir [NodeJS](https://nodejs.org/en/) d'installé.

#### Clonnez le repo

En HTTPS:
```cmd
git clone https://github.com/InfoTools-mathias/Api.git
```

En SSH:
```cmd
git clone git@github.com:InfoTools-mathias/Api.git
```
#### Configuration

Déplacez vous dans le dossier contenant l'API et installez les dépendances:
```cmd
npm i
```

Synchronisez la base de donnée:
```cmd
npm run db
```

Démarrer Prisma Studio (modifier les données BDD depuis une interface web sur le port `5555`):
```cmd
npm run studio
```

Démarrez l'API !
```cmd
npm start
```

## Routes
Port: `5000`, route par défaut : `/api/v1`

🔒 (L'endpoint nécessite un token de type **Bearer** dans l'header **Authorization** ex: `Bearer my-token`) (L'éxécution ou non de certaines tâches dépends aussi du `type` de l'utilisateur a qui appartient le token)

### Utilisateurs

🔒`/users` **GET**, **POST**

🔒`/users/{ID}` **GET**, **DELETE**, **PUT**

### Produits

`/products` **GET**, 🔒**POST**

`/products/{ID}` **GET**, 🔒**DELETE**, 🔒**PUT**

### Catégories

`/categories` **GET**, 🔒**POST**

`/categories/{ID}` **GET**, 🔒**DELETE**, 🔒**PUT**


### RDV

🔒`/meetings` **GET**, **POST**

🔒`/meetings/{ID}` **GET**, **DELETE**, **PUT**


### Factures

Une facture est composée de lignes (liste). Une ligne est un objet contenant les information de l'article acheté, sa quantité et le prix unitaire.

🔒`/factures` **GET**, **POST**

🔒`/factures/{ID}` **GET**, **DELETE**, **PUT**

🔒`/factures/{ID}/lignes` **POST**

🔒`/factures/{ID}/lignes/{LIGNE_ID}` **DELETE** **PUT**


### Oauth

`/oauth/password` **POST** Permet de créer un token si l'email + MDP sont OK

🔒`/oauth/@me` **GET** Récupères les informations du compte auquel le token appartient

