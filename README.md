# E-Filing of Protests
## Goal
As part of a university project, we are going to look into the documentation of REST APIs with the OpenAPI specification. To further reinforce the meaning of a well documented api, a prototype for the e-filing of protests in Germany is going to be created in this repository.

Demo: https://www.youtube.com/watch?v=A6cmJHiSboc

## Setup
- Tested with Node v12.16.3
- Start API
    - `cd api`
    - define environment variables for database `touch .env` with the following contents:
    ```
    SQL_HOST=192.168.0.1
    SQL_USER=mike
    SQL_PASSWORD=MySecretPassword
    SQL_DATABASE=efiling
    API_BASE_URL=http://localhost/
    ```
    - you might want to change the base url in the `swagger.yml` if you want it to work
    - `npm init` to install dependencies
    - `node .` to start up the API

- Start frontend
    - use apache, nginx or startup a dev server i.e. with live-server (`npm i live-server`)
    - you might want to change the API URL in both `index.html` files if you are not running the API on your localhost

- MySQL table
    - uuid : varchar(128)
    - vorname : varchar(128)
    - nachname : varchar(128)
    - motto : varchar(256)
    - route : text
    - kontakt : varchar(128)
    - teilnehmer : int(11)
    - hilfsmittel : text
    - start : datetime
    - ende : datetime
    - status : enum('offen','inBearbeitung','abgestimmt','abgesagt')
    - bearbeiter : varchar(128)
    - erstellt_am : timestamp

## Approach
| Nr | Task | Status|
|----|------|-------|
|1.     |Define requirements      |✅      |
|2.     |Create API contract|✅      |
|3.     |Create REST API    |✅    |
|4.     |Generate documentation website   |✅     |
|5.     |Create external frontend      |✅      |
|6.     |Create internal frontend      |✅      |
|7.     |Final testing     |✅      |
|8.     |Write seminar paper    |✅      |

Legend: ✅ Done, 🔁 Doing, 🔴 Open

## Tools
- [Visual Studio Code](https://code.visualstudio.com/) as the development tool
- [Swagger Editor](https://editor.swagger.io) for the creation of the API contract
- [Express for Node.js](https://expressjs.com/) to develop the API
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) to generate the API docs
- [Bootstrap](https://getbootstrap.com) as a frontend framework
