# Appgr8 Tech Interview

### by Viktor Ivanovski

# Instructions

1. Postgress is initialized via Docker and can be found in [compose.yml](/server/database/docker/compose.yml)

> - To start the docker container, run `npm run db`
> - Make sure to run the [database migration](/server/database/data/db.sql) to create necessary table
> - Connection is configured in [.env](.env)

2. Start the Expressjs server located in [server.js](server/server.js)

> - To start the server, run `npm run server`
> - This starts the server on port 8000
> - Endpoints:
> > - @POST /liveEvent - process event data and stores it to db
> > > uses [data_processor.js](server/data_processor.js)
> > - @GET /userEvents/:userId - gets the relevant user from db

3. Start the client in [client.js](client/client.js)

> - To start the client, run `npm run client`
> - Client operations:
> > - Reads [clientEvents.jsonl](client/events/clientEvents.jsonl)
> > - Sends post request to `/userEvents/:userId` based on parsed data

# Corners cut:

1. No Authentication
2. Simple data processing logic - no special cases were taking in consideration