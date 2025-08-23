# End-To-End-K8S-Deployment

##  For local development

1. Clone the repository
2. Create a `.env` file in the root directory and add your database connection string
3. Run the following commands to set up your database:

4. Go to the backend directory
   ```
   cd backend
   ```
5. Run the following commands to set up your database:
   ```
   npx prisma migrate dev --name init
   npx prisma generate
   ```
6. Install the dependencies
   ```
   npm install
   ```
7. Start the development server
   ```
   npm run dev
   ```
8. Get back to the root directory
   ```
   cd ..
   ```
9. Go to the frontend directory
   ```
   cd frontend
   ```

10. Install the dependencies
   ```
   npm install
   ```
11. Start the development server
   ```
   npm run dev
   ``


## For Docker

## Run the PostgreSQL container

1. Create the Docker network

```bash
docker network create k8s-network
```
2. Run the PostgreSQL container
```bash
docker run -d \
  --name postgres-db \
  --network k8s-network \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15
```
3. The Database URL will be `postgres://admin:secret@localhost:5432/postgres`

4. If we want to connect to the database from another container, we can use the service name `postgres-db` as the hostname:

    so that mean if we want to run out backend also on the container we can use the same network and connect to the database using the service name `postgres-db` as the hostname.

   ```
   postgres://admin:secret@postgres-db:5432/postgres
   ```
## For Dockerized the backend 
1. Build the Docker image
```bash
docker build -f docker/dockerfile-backend -t debjyoti08/crud-application ./backend 
```

2. Run the Docker container
```bash
docker run -d -e DATABASE_URL="postgresql://admin:secret@postgres-db:5432/postgres" --name backend --network k8s-network -p 3000:3000 debjyoti08/crud-application
```

3. Build the frontend Docker image
```bash
docker build -f docker/dockerfile-frontend -t debjyoti08/crud-application-frontend ./frontend
```
4. Run the Docker container
```bash
docker run -d --name frontend --network k8s-network -p 80:80 debjyoti08/crud-application-frontend
```

## Using Docker Compose
```bash
docker-compose up --build
```

## For accessing the application
1. Open your browser and go to `http://localhost:80` for the frontend
2. The backend API will be accessible at `http://localhost:3000`

## Application View After Deploy by Docker Compose/Docker
![Homepage](./public/home.png)