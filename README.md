# Moment Energy

## Setup

### 1. Install dependencies

```bash
cd api-server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your MongoDB Atlas connection string:

```bash
cp api-server/.env.example api-server/.env
```

Edit `api-server/.env`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=3000
```

### 3. Build the client

```bash
cd client && npm run build
```

## Running the server

```bash
cd api-server && npm start
```

The app will be available at `http://localhost:3000`.

## Seeding data

To seed 24 hours of sample voltage measurements:

```bash
cd api-server && npm run seed:voltage
```
