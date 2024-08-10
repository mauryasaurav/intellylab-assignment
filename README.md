# IntellyLabs Assignment

Need to create an interactive UI application with having registration page where user needs to
register itself as Admin user and Normal user and then user needs to sign-in with the registration
details and then on the basis of role (Admin/Normal) display the menu bar on left side.

Admin User Menu Options:
1) Dashboard
2) User List
3) User Management

Normal User Menu Options:
1) Dashboard
2) User List

Below all points needs to be covered.
1) UI should be in React Js
2) Create at least two UI test cases
3) Integrate Routing and Guard Components for Authorization.
4) Hide the menu options on the dashboard on the basis of role provide to user.
5) Required fields condition should be there for UI and backend.
6) Backend should be in go lang.
7) Create at least two unit test cases
8) Need to save the credentials details in DB – HSQL DB/PostgreSQL/MySQL

Note - Need to create a readme file in which all steps should be written to run the UI and backend
code.

# Golang Backend
GORM, Clean Architecture, CRUD Api, postres, jwt-gom gin-gonic

## Pre-requisites
- [Gorm](https://github.com/go-gorm/gorm)
- [Go JWT](**https://medium.com/swlh/proxy-server-in-golang-43e2365d9cbc**)


## Installation
A little intro about the installation. 
```
$ https://github.com/mauryasaurav/intellylab-assignment.git
$ cd intellylab-assignment/server
```

## Check the config.toml file and Add PostgreSQL database details accordingly.
```
[env]
port = "5001"

[postgres]
host     = "localhost"
port     = 5432
user     = "postgres"
password = "password"
dbname   = "intellylab_assignment3"
sslmode  = "disable"
```

## Final Step
```
$ go mod tidy
$ go run cmd/main.go
```

# React Frontend
Chakra UI, Axios


## Pre-requisites
- [ChakraUI](https://v2.chakra-ui.com/docs/components)

## Installation

A little intro about the installation. 
```
$ cd intellylab-assignment/client
$ npm install
$ npm start
```