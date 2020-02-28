# Marvel Applaudostudios JCORTES 

This project was created with REDUX, REACT HOOKS FORMS and MATERIAL UI. In addition, the script to create the docker image has been created and this application has the PWA configuration

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run docker`

Builds image from nginx alpine (with ssl); is necesary replace certificates with your own, and copy the app's build folder to image. Is necesary execute 'npm run build'

### `npm run production`

This command execute "build" and "docker" scripts consecutively. n this way the application would be in a docker ready to be published in kubernetes or other similar application
