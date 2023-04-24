# Find English Language Parent Concepts

This ReactJS single page application takes a search term as input and outputs a hierarchical JSON structure with all the term’s English language parent (IsA) concepts, utilising the ConceptNet API (github.com/commonsense/conceptnet5/wiki/API). Requests to the API are throttled 1 per 100ms.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Folder structure

- `src/components`: React components used in the application
- `src/services`: Services injected into the applications via a dependency injection container
- `src/App.tsx`: main page of the application
- `__tests__`: Tests for each component is available in `__tests__` subfolders within the folders of each component.

## Libraries used
- TSyringe is used as the dependency injection container. 
    - This was chosen due to lightweight; it is developed by microsoft; and is actively maintained.
    - Using a dependency injection container allows us to quickly switch between third-party services when required.
    - It is also help avoid bad coding practices such as circular dependencies.
- Eslint is used as the linter. This is the most popular linter for typescript.
    - Having a linter makes it easier to debug and reduces development time.
    - There are multiple ways you can write typescript. Eslint allows us to maintain consistency across the codebase (e.g. use of single quotes vs double quotes, use of explicit return types).
- Tachyon was used as the CSS library.
    - It is fast and light weight, and also easy to learn.
- Jest and React testing library are used for testing. These libraries are by default installed when creating a React application.