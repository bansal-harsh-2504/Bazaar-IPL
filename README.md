
# Ecommerce Website with IPL Theme

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Environment Variables](#environment-variables)
3. [Team Assignment Logic](#team-assignment-logic)
4. [Website URL](#website-url)

---

## Setup Instructions

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ipl-teams-website.git
   ```

2. Run the frontend:
   ```bash
   cd frontend && npm run dev
   ```

3. Run the backend:
   ```bash
   cd backend && npm run server
   ```

---

## Environment Variables

### Frontend

Make sure to add the following environment variables in your `.env` file in the `frontend` directory:

```env
PORT=4000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
CURRENCY='usd'
DELIVERY_CHARGE=10
```

### Backend

Add the following environment variables in your `.env` file in the `backend` directory:

```env
PORT=4000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
CURRENCY='usd'
DELIVERY_CHARGE=10
```

---

## Team Assignment Logic

The team assignment logic randomly assigns an IPL team from a predefined list of teams:

```javascript
const teams = ['Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers Bangalore', 'Delhi Capitals', 'Kolkata Knight Riders', 'Punjab Kings', 'Rajasthan Royals', 'Sunrisers Hyderabad'];

const iplTeam = teams[Math.floor(Math.random() * teams.length)];
```

---

## Hosted Website URL

You can access the live version of the website at the following URL:

[https://bazaar-ipl.vercel.app/](https://bazaar-ipl.vercel.app/)
