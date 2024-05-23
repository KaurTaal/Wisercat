# Wisercat
Wisercat test assignment


## Database

To set up the database you need to run a docker container. If Docker isn't installed then you can install it from [here](https://www.docker.com/products/docker-desktop/).

Creating the database:
* Create Docker image: ```docker build -t wc-db-image .```
* Create Docker container: ```docker run -d --name wc-db-container -p 5432:5432 wc-db-image```

You can check the status of running containers using the command ```docker ps```.


## Backend

Before running the backend make sure your computer has Java 17 installed. To check which Java version you have run the command ```java --version```.
If needed you can install Java 17 [here](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).

Make also sure you have Gradle. A thorough installation guide can be found [here](https://gradle.org/install/).
To run the backend successfully ensure that the docker container is running.

Running:
- Open a terminal in ``wisercat/backend``
- Run the command ``gradle bootRun``

If you can access this [endpoint](HTTP://localhost:8081/api/health/check), the backend is up and running.

## Frontend

To run frontend you need to have Node.js installed. If it's missing you can install it [here](https://nodejs.org/en/download) (use the LTS version).

Running:
- Open a terminal in ``wisercat/frontend``
- Run the command ``npm install``
- Run the command ``npm run start``

The application should now be available by going to `http://localhost:4200`
