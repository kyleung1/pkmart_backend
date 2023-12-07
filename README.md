> A nextjs14 backend to feed crud responses to my poke-mart ecommerce site.

# Poke-Mart Eccommerce Backend with Next.js 14

Initially I had a backend for this project in Express.js but I realized there were limited free options available to deploy it. So I decided to recreate the backend in a Next.js project, only using it as an api, and it works surprisingly well allowing me to deploy it using Vercel. Now my react frontend can do crud operations to the MongoDB database from an actual url instead of my local machine using localhost. This was made mostly as a demo for the frontend, the actual project would ideally be deployed with an Express.js backend to demonstrate my proficiency in the MERN stack.

## API Documentation

Base URL

> https://pkmart-backend.vercel.app/api/

### /checkout

```
method: 'POST',
headers: {
			'apiKey': 'your-rapidapi-key',
		},
body: {
    [{  id: string;
        name: string;
        quantity: number;
        }]
}
```

### /item

### /user
