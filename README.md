# Expense Tracker
This application uses React for Frontend, Express for Backend, and MySQL for database. 
The following functionalities are added and tested:
- End users can record expenses by entering
    - Name
    - Cost
    - Category
- End users can delete expenses
- End users can view all expenses
## Environtment variables
- Make sure there is a .env file located under /api, including the following environment variables:
  - PORT = (ex. 8080)
  - HOST = (ex. localhost)
  - MYSQL_USERNAME = (ex. root)
  - MYSQL_PASSWORD = (ex. password)
  - MYSQL_DB = (ex. renaissance-test)
## Database Setup 
- Make sure the host has MySQL set up and has database named as MYSQL_DB. 
- Keep the server on.

## API
- Run 'npm install' under /api
- Run 'npm start'

## Client
- On a different terminal window/tab,
  - Run 'npm install' under /client
  - Run 'npm start'

## Accessing Web Application
- Unless otherwise set, the application should be accessible through http://localhost:3000