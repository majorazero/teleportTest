# teleportTest


## Deployment Instructions
Run `npm install`.

The database the app will be looking for is a SQL database called 'database_development' with no password. Feel free to change it to match your SQL database in config/config.json

To start the server use `npm start`, it will be using port 3025. 

## Thoughts
- I think that's time so here's what I got.
- I normally work with Ruby on Rails for the backend professionally, but its not set up on my home computer so unfortunately, I had to make do with Node (what I learned back in bootcamp), which I am less familiar with now so excuse the mess.) Though I’ll admit it was a nice chance to see how I’d do with Node. 

### DATABASE

- Given more time, and more though about what how this is structured, product category, product type and demographic would probably be converted to integers so I can implement whatever the equivalent of enums are in Node.
-  I broke the product type into its own table just to make one my queries easier but I don’t think it should be its own table in reality. 


### API COMPOSITION

- products/:category/ seems like a bad idea since products/free_shipping is an endpoint already so i made it products/category/:category
- I just stuffed all my api in the controllers under apiRoutes, its honestly a little bit nonsensical. What I SHOULD have done was made a routes folder that organized the all the routes in their own file by category, and each route should really call some controller file in the controllers folder. So the routes should be fairly bare. Ideally, I’d probably also export most of the code in those controllers in service files or command files since controllers should be fairly sparse too.
- Lots of the code can be more modular and if I had more time I can probably optimize them by just figuring out the ORM queries for them instead of my crappy loops.

### General Questions
- Getting an array of companies by order of how cheap their cheapest product are without asking what the actual product is seems strange, is that intentional? 


