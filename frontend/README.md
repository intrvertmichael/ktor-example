# ktor FrontEnd

Created with Next JS 14

Estimated Completion Time: 2 weeks ~ 14 hours

## Start the frontend

Before starting the frontend make sure the backend is running using the instructions on the root READ ME. To start the frontend, first navigate to the frontend folder inside of the root (`ktor-example/frontend`). Then run `npm install` to install dependencies. Finally run `npm run dev`. The frontend is running on localhost:3000.

## Run tests

To see the cypress tests in action run `npm run cypress:open` from the frontend folder inside of the root (`ktor-example/frontend`). Tests were created to test basic functionality such as Authentication and creating, editing, and deleting a Note.

## Challenges

Since I have little experience using Docker I had a feeling that the most challenging part about working on this project was going to be to deal with the BackEnd. Thankfully everything was so well created that the setup only required one command and using it was similar to using any endpoint. What ended up actually being the most challenging was dealing with session cookies. Since I am using server components then the cookies that were being added in the server were not being passed down to the client. This presented a new challenge I have not previously faced and exposed my lack of experience with cookies.

## TODO

- fix email update
