# Routes

## POST /auth/register

Creates a new user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Haddad",
  "phone_number": "+9701234567891",
  "password": "secret-password"
}
```

### Response

If the user is successfully created, the server will respond with a status code of 201 and a JSON object representing the new user:

```json
{
  "id": "mongo-random-id",
  "first_name": "Adham",
  "last_name": "Haddad",
  "phone_number": "+9701234567891"
}
```

<hr />

## POST /auth/login

Authenticate user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "phone_number": "+9701234567891",
  "password": "secret-password"
}
```

### Response

If the user is exists and authenticated successfully, the server will respond with a status code of 200 and a JSON object representing the authenticated user:

```json
{
  "id": "mongo-random-id",
  "first_name": "Adham",
  "last_name": "Haddad",
  "phone_number": "+9701234567891"
}
```

<hr />


## PATCH /auth/change-password/:id

Change user password by id.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "current_password": "current-secret-password",
  "new_password": "new-secret-password"
}
```

### Response

If the user is exists, authenticated, and insert passwords successfully, the server will respond with a status code of 200 and a JSON object representing the user:

```json
{
  "id": "mongo-random-id",
  "first_name": "Adham",
  "last_name": "Haddad",
  "phone_number": "+9701234567891"
}
```

<hr/>



## GET /users/:id

Get a user by id.

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
{
  "id": "mongo-random-id",
  "first_name": "Adham",
  "last_name": "Haddad",
  "phone_number": "+9701234567891",
  "created_at": ""
}
```

## GET /users/:email

Get a user by id.

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
[{
  "id": "mongo-random-id",
  "first_name": "Adham",
  "last_name": "Haddad",
  "phone_number": "+9701234567891"
}]
```

<hr />

## PATCH /users/:id

Update a user by id.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Ashraf",
  "phone_number": "+9701234567890"
}
```

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
{
  "id": "mongo-random-id",
  "first_name": "Adham",
  "last_name": "Ashraf",
  "phone_number": "+9701234567890"
}
```

<hr />

## DELETE /users/:id

Delete a user by id.

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
{
  "id": "mongo-random-id",
  "first_name": "Adham",
  "last_name": "Haddad",
  "phone_number": "+9701234567891"
}
```
