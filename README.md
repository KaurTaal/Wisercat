# Wisercat
Wisercat test assignment

## Database & Backend

In order to start the database and backend you need to have Docker installed. If Docker isn't installed then you can install it from [here](https://www.docker.com/products/docker-desktop/).

Running database & backend:
* Open a terminal in `wisercat/backend`.
* Run the command `gradlew clean`
* Run the command `gradlew bootJar`
* Run the command `docker compose up --build`

You can check the status of running containers using the command ```docker ps```.

If you can access this [swagger ui](http://localhost:8081/swagger-ui.html), the backend of the application is up and running.

## Frontend

To run frontend you need to have Node.js installed. If it's missing you can install it [here](https://nodejs.org/en/download) (use the LTS version).

Running:
- Open a terminal in ``wisercat/frontend``
- Run the command ``npm install``
- Run the command ``npm run start``

The application should now be available by going to `http://localhost:4200`
