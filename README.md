# Luna Gajwa Server

A Restful API Server that provides data from terra, luna, anchor like these libraries.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy with Docker

1. Create a file `.env` then set environment variables in the file
   ```
   API_SERVER_PORT=[API Server Port Number]
   ```
2. Run commands
   ```bash
   $ docker-compose build --no-cache
   $ docker-compose up -d
   ```

## Redeploy with Docker after changing source code

1. Down the container

   ```bash
   $ docker-compose down
   ```

2. Remove a volume of the server container

   ```bash
   $ docker volume rm luna-gajwa-server_webapp
   ```

   you can check the volume name through a command 'docker volume ls'.

3. Build

   ```bash
   $ docker-compose build --no-cache
   ```

4. Up the container
   ```bash
   $ docker-compose up -d
   ```

## APIs

### **GET /anchor/apy**

Returns an APY of the anchor

- Success
  - Status Code: 200
  - Response
    ```javascript
    {
      apy: [number];
    }
    ```
- Bad Request
  - Status Code: 400
  - Response
    ```javascript
    {
      status: 400,
      error: [message]
    }
    ```

### **GET /anchor/collateral_value/[wallet address]**

Returns a collateral value of the address

- Success
  - Status Code: 200
  - Response
    ```javascript
    {
      collateralValue: [number];
    }
    ```
- Bad Request
  - Status Code: 400
  - Response
    ```javascript
    {
      status: 400,
      error: [message]
    }
    ```

### **GET /anchor/borrowed_value/[wallet address]**

Returns a borrowed value of the address

- Success
  - Status Code: 200
  - Response
    ```javascript
    {
      borrowedValue: [number];
    }
    ```
- Bad Request
  - Status Code: 400
  - Response
    ```javascript
    {
      status: 400,
      error: [message]
    }
    ```

### **GET /anchor/ltv/[wallet address]**

Returns a borrow limit, a borrowed value and a ltv ratio of the address

- Success
  - Status Code: 200
  - Response
    ```javascript
    {
      borrowLimit: [number],
      borrowedValue: [number],
      ltv: [number],
    }
    ```
- Bad Request
  - Status Code: 400
  - Response
    ```javascript
    {
      status: 400,
      error: [message]
    }
    ```

## License

Nest is [MIT licensed](LICENSE).
