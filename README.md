# project scoop

## About
Co-working Space Management Program still under the development. In development environment, webpack-dev-server will be launched together with Express.js server that has Hot Module Replacement enabled using react-hot-loader.   
Both of client-side and server-side codes are written in ES6 syntax.

The port of Express.js server is 3000 and port of webpack-dev-server is 3001.

## Installation
```
npm install -g webpack babel
npm install
```

## Scripts
### clean
```bash
# removes build directory and bundle.js
npm run clean
```
### build
```bash
# transpiles ES6 codes of both client-side and server-side
npm run build
```
### start
```bash
# starts the server with production environment
npm run start
```
### development
```bash
# starts the server with development environment
# this will automatically do clean & build & run the server
npm run dev
```
