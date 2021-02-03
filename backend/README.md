## Weather widget backend
A small middleware Node.js server between the frontend application and the [OpenWeatherMap API](https://openweathermap.org/api).

### Get started
Clone this project and run `npm install` to install required dependencies.

#### Setting up environment
The server also requires a few important environment variables to be set.
- `API_KEY_OPENWEATHERMAP` - Your secret API key for OpenWeatherMap (free upon registering)
- `HOST` - The application host
- `PORT` - The port at which to listen 


### Run app
```
npm start
```
### Run tests
Jest is used as test framework and can be run as follows
```
npm test
```
This will run all test files, here indentified by the `*.test.js` pattern.
