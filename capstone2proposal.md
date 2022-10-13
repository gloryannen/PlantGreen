# Project Proposal: PlantGreen

"PlantGreen" is a web app that allows users to search for plant information. This will make it easier for plant parents to identify care and usage of their plants.

- Because anyone can have plants, this site is catered to anyone in search of plant information.

# Technologies

- React frontend, NodeJS backend, PostgreSQL for database system

#Data

- This app will use the [Plant.id API](https://github.com/flowerchecker/Plant-id-API) to access data such as:
  - Wikipedia plant information
  - Common and scientific names
  - Edible/medicinal parts
  - Propagation methods
  - Plant images

# DB Schema

- The database schema consist of tables:
  - User - username, email, password
  - User Saved Plants

# API Issues

- If data isn't being received, please check that the API isn't offline.
  - https://github.com/flowerchecker/Plant-id-API/wiki

1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.

# Application Functionality

- Sign Up / Login
- Save plant information
- Page showing all saved plants

# User Flow

- Sign Up / Login Page - This will be the landing page for all users coming into the application.
- User Home Page - After login in or signing up, users will see:
  - Navigation bar - Search, Saved Plants, Profile, Logout
  - Search - Form that takes in common plant name(s) to lookup a plant. Upon submission, it will retreive any matched data from API.
  - Saved Plants - Details page with information such as:
    - Number of plants saved.
    - Saved plants and their corresponding information.
  - Profile - Option to update profile information or delete account.
