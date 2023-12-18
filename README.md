> A nextjs14 backend to feed crud responses to my poke-mart ecommerce site.

# Poke-Mart Eccommerce Backend with Next.js 14

Initially I had a backend for this project in Express.js but I realized there were limited free options available to deploy it. So I decided to recreate the backend in a Next.js project, only using it as an api, and it works surprisingly well allowing me to deploy it using Vercel. Now my react frontend can do crud operations to the MongoDB database from an actual url instead of my local machine using localhost. This was made mostly as a demo for the frontend, the actual project would ideally be deployed with an Express.js backend to demonstrate my proficiency in the MERN stack.

## API Documentation

Base URL

> https://pkmart-backend.vercel.app/api/

## Endpoints

### /checkout

Checking out items from the store.

- **Method:** [POST]
- **Path:** `/checkout`
- **Request Header:**
  ```
      {
  		'apiKey': 'your-api-key'
  	}
  ```
- **Request Body:**
  ```
      [{
        id: string,
        name: string,
        quantity: number
      }]
  ```
- **Response:**
  - **Success:** [200]
  ```json
  {
    "url": "stripecheckoutsessionurl"
  }
  ```

### /item

Getting all items in the shop.

- **Method:** [GET]
- **Path:** `/item`
- **Response:**

  - **Success:** [200]

  ```json
  [
    {
      "_id": "6310511e59211e6e12ca98c4",
      "name": "Potion",
      "price": 1,
      "stock": 99,
      "__v": 0,
      "desc": "A spray-type medicine for treating wounds. It can be used to restore 20 HP to a single Pokémon."
    }
  ]
  ```

Creating a new item.

- **Method:** [POST]
- **Path:** `/item`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Request Body:**
  ```
    {
        name: string,
        price: number,
        stock: number,
        desc: string
    }
  ```
- **Response:**
  - **Success:** [200]
  ```json
  {
    "_id": "6310511e59211e6e12ca98c4",
    "name": "Potion",
    "price": 1,
    "stock": 99,
    "__v": 0,
    "desc": "A spray-type medicine for treating wounds. It can be used to restore 20 HP to a single Pokémon."
  }
  ```

Getting a single item from the shop.

- **Method:** [GET]
- **Path:** `/item/dynamic/[itemId]`
- **Response:**

  - **Success:** [200]

  ```json
  {
    "_id": "6310511e59211e6e12ca98c4",
    "name": "Potion",
    "price": 1,
    "stock": 99,
    "__v": 0,
    "desc": "A spray-type medicine for treating wounds. It can be used to restore 20 HP to a single Pokémon."
  }
  ```

Deleting an item from the shop.

- **Method:** [DELETE]
- **Path:** `/item/dynamic/[itemId]`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Response:**
  - **Success:** [200]
  ```json
  { "message": "Pokeball has been deleted." }
  ```

Updating an Item in the shop.

- **Method:** [PATCH]
- **Path:** `/item/dynamic/[itemId]`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Request Body:**
  ```
  {
    _id: string | null,
    name: string | null,
    price: number | null,
    stock: number | null,
    __v: number | null,
    desc: string | null
  }
  ```
- **Response:**
  - **Success:** [200]
  ```json
  {
    "_id": "39023049230948changedid092384",
    "name": "changed name",
    "price": 999,
    "stock": 999,
    "__v": 999,
    "desc": "this description has been changed"
  }
  ```

### /user

Get all users.

- **Method:** [GET]
- **Path:** `/user`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Response:**

  - **Success:** [200]

  ```json
  [
    {
      "_id": "a9sdf7a9sd7f6",
      "email": "test@test.com",
      "password": ";laksjdfasd97f6asd9f",
      "admin": true,
      "__v": 0
    }
  ]
  ```

Get a single user.

- **Method:** [GET]
- **Path:** `/user/dynamic/[userId]`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Response:**

  - **Success:** [200]

  ```json
  {
    "_id": "asdfas79df6a",
    "email": "test@test.com",
    "password": "asf;aslkdfj;asldkfj",
    "admin": true,
    "__v": 0
  }
  ```

Delete a single user.

- **Method:** [DELETE]
- **Path:** `/user/dynamic/[userId]`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Response:**

  - **Success:** [200]

  ```json
  {
    "_id": "3290343242",
    "email": "test@test.com",
    "password": ";alskdf;alsdfjas;dlfkj",
    "admin": true,
    "__v": 0
  }
  ```

Update a user.

- **Method:** [PATCH]
- **Path:** `/user/dynamic/[userId]`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Request Body:**
  ```
  {
  _id: string | null,
  email: string | null,
  password: string | null,
  admin: boolean| null,
  __v: number| null
  }
  ```
- **Response:**
  - **Success:** [200]
  ```json
  {
    "_id": "39023049230948changedid092384",
    "name": "changed name",
    "price": 999,
    "stock": 999,
    "__v": 999,
    "desc": "this description has been changed"
  }
  ```

Login a user.

- **Method:** [POST]
- **Path:** `/user/login`
- **Request Body:**
  ```
  {
    email: string,
    password: string
  }
  ```
- **Response:**
  - **Success:** [200]
  ```json
  { "email": "email@email.com", "token": "tokentoken", "admin": false }
  ```

Create a user.

- **Method:** [POST]
- **Path:** `/user/register`
- **Request Header:**
  ```
    {
  	    "apiKey": "your-api-key"
  	}
  ```
- **Request Body:**
  ```
  {
    email: string,
    password: string,
    admin: boolean
  }
  ```
- **Response:**
  - **Success:** [200]
  ```json
  { "email": "email@email.com", "token": "tokentoken", "admin": false }
  ```
