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

## APIs

### **GET /anchor/year_apy**

Returns an APY of the anchor

- Success
  - Status Code: 200
  - Response
    ```javascript
    {
      yearApy: [number];
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
