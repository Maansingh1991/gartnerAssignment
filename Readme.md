# Gartner Assignment

Setting Up docker image for mongodb, please make sure docker(https://www.docker.com/get-started) is already installed


```
docker pull mongo
```

```
docker run --name my-mongodb -p 27017:27017 -d mongo
```

### To check creation of mongo db is successful
```
docker ps

```


## Backend Installation

1. Clone the repository.
2. Install the dependencies using the following command:



```
npm install
```


## Configuration

Update Mongo db configure in config/database.js.Replace below url

```
 await mongoose.connect('mongodb://localhost:27017/mydatabase')
```

2. Start the application using the following command:


```
npm start
```

## Usage



1. Open your browser and navigate to `http://localhost:8000` to access the application.

## Project Structure

The structure of the project:
```
bin/
config/
middleware/
models/
node_modules/
public/
routes/
test/
views/
app.js
Dockerfile
package-lock.json
package.json
```

## Testing

To run the tests, use the following command:

```
npm test
```

## Frontend installation
- Set environment variable process.env.baseUrl otherwise by default app with run on 3000 port
- Install
```
npm install
```
inside client folder

- Run
```
npm start
```

