
# Covid Slayer Front End


## Front End Stack

```bash
React JS (CRA)
Redux
Redux Thunk
Redux Persist
Custom css and designed components using styled-components
Axios
```

## Front End Available Pages
```bash
Login (/login)
Logout (/logout)
Register (/register)
Dashbard (/)
Game (/game)
Game History (/game/histories/:page/:pageSize)
```

## Installation

```bash
# clone the repo
$ git clone https://github.com/dbsolde/covid-slayer-frontend.git

# go into app directory
$ cd covid-slayer-frontend

# install app dependencies
$ npm i or yarn
```

## Basic usage

```bash

# To start
$ npm start

#local
The app will load to localhost:3000

#Production is deployed to netlify
https://angry-stonebraker-63f062.netlify.app

# Note: on local development please make sure to start the covid-slayer-api first

```


## Front End tasks summary
```bash
User can signup 
User can login
User cannot view dashboard, game histories or play game if not authenticated or token expired
User can view game histories
Log all action events in game and limit to latest 10 records
Configurable game time
Remember user
One source for app theme
Responsive web app
```

```bash
# Front End outstanding tasks
Unit Test
Dockerized game
```