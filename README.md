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
  The session is optional but is needed if you want to fetch previously learned questions.
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

### /user

CRUD requests to the mongoDB database for users.
