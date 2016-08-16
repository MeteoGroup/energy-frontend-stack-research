# Angular2 components dynamic loader

This project provides a library which will allow you to create multiple instances of the Angular2 „main” component(s) (standalone applications).

Currently project is provided with settings for **2.0.0-rc4** version of Angular2. It has been originally written for version 2.0.0-beta.15.

## Installation
Go to the main directory and install the npm packages by running `npm install`.

Then install all required typings for TypeScript by running `npm run typings install`.

## Example
To compile TypeScript code and start the server run `npm start` (from the repo's main directory).

Server will start listening on the port 3000 so now just click on the following link (or type it into the browser)  [http://localhost:3000/app/example.html](http://localhost:3000/app/example.html). 

## Testing
Code is covered only with the unit tests which have been developed with support of the Jasmine framework.
No e2e or headless testing have been provided!

To run the tests start server (`npm start`) and open  [http://localhost:3000/tests/testsRunner.html](http://localhost:3000/tests/testsRunner.html).
