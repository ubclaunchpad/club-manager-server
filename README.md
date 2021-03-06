# club-manager-server

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all of the required dependencies in the node_modules directory.

### `yarn start`

Runs the app in the development mode.

### `yarn start:watch`

Runs the app in the development mode with a watcher - changes to .ts files will trigger a reload.

### `yarn lint`

Runs ESLint to ensure that your code is conforming to standards.

## Docker 🐋

We use Docker to containerize our application and run (at some point) on our production servers. It is a good opportunity to simulate the behavior locally before going through the rigorous task of having to test, PR, merge, build, and then deploy just to find out that your new feature doesnt work. 

### Start the Container

Running Docker locally is pretty simple, you just need to make sure that it's installed on your machine.

1. Start by navigating to your terminal

2. You can test your Docker installation by doing the following:
    * Run `docker -v` to ensure that it has been installed correctly (and is a part of your PATH)
    * Run `docker run hello-world` to ensure that the installation appears to be working correctly

3. Run `docker build -t club-manager/server .`
    * This builds a Docker image based on the Dockerfile in our project directory
    * It is tagged as "club-manager/server" but you can call it something else if you prefer

4. Run `docker run -d -p 4000:4000 club-manager/server` to start the container up in detached mode
    * If you want to observe it in the foreground directly, you need to replace `-d` with `-t -i`
    * Refer to the [docker run documentation](https://docs.docker.com/engine/reference/run/) it has lots of other options you might find useful

### Stop the Container

When it's time to stop the container, you can do the following.

1. Run `docker ps` and node your container ID
2. Run `docker stop <container ID>`

## Docker Compose 🐳

This functionality is much more applicable to local development. It will handle setting up a local database (MongoDB) for you to use along with a development container that is running the server.

Docker compose is another application you will need to install for this to work.

### Start Docker Compose

1. Navigate to your terminal

2. Run `docker-compose build`

3. Run `docker-compose up`
    * At this point you should see via. logs that the server and database will have started up.

4. To exit you can ctrl+c and it should stop the containers. 

### Docker Compose Housekeeping

1. When you ctrl+c out, your containers will be in the "stop" state. At this point, you can run `docker-compose start` to resume where you left off.

2. Any subsequent changes to your package.json file or docker resources will require a fresh build. In this case you will need to run `docker-compose down` to clean up the containers and then rebuild.

3. I highly encourage you to review the docker-compose docs, or even just run `docker-compose` to see what else you can do.
