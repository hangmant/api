# Hangwoman API

API for Hangwoman game

## Environments

* REST
https://hangwoman-api.herokuapp.com/api

* GraphQL
https://hangwoman-api.herokuapp.com/graphql

* Frontend
https://hangwoman-cms.herokuapp.com

## Wiki

https://github.com/hangwoman/api/wiki



## Prerequisites

```
node ^16
```

**pm2**

Install [pm2](https://pm2.keymetrics.io/)

```
npm install pm2 -g
```


The follow scripts describe how to run develompent mode:

## Install

```sh
npm ci
```

## Run 

Run all services:

```sh
pm2 start
```

## Deploying to Heroku git

Login to Heroku

```
heroku login
```


Link repository

```
git remote set-url heroku https://git.heroku.com/hangwoman-api.git
```


Publish changes

```
git push heroku master
```