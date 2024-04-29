# Calculator

### A modified calculator written in TS with all the necessary arithmetic and memory operations available.

## Task

[Calculator task](https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view?usp=sharing)

## How to run and tweak the application

Follow these steps to set up the project for future development:

1.  **Clone this repository**

    Example using the web URL:

    ```bash
    git clone https://github.com/katrinDev/inno-trainee-tasks.git

    ```

2.  **Navigate to the project directory**:

    ```bash
    cd ./inno-trainee-tasks/task4-calculator
    ```

3.  **Install the dependencies**:

    ```bash
    yarn install
    ```

4.  **Start the project in development mode**:

    ```bash
    yarn dev
    ```

    This command runs the project in development mode and uses `webpack-dev-server`.  
    Open http://localhost:3000 to view the app in a browser, the page will reload if you make edits.  
    Now you're ready to start developing!

5.  **Test the calculation functions**:

    ```bash
    yarn test
    ```

    This command runs all the project tests using Jest.

6.  **Build the project** (for production):

    ```bash
    yarn build
    ```

    This command runs the project in production mode and generates documentation using JSDoc.  
    It correctly bundles the project modules and optimizes the build for the best performance.
    Open the `index.html` in `dist` directory to interact with the application.

## Documentation

The project's documentation is generated by JSDoc and can be found in the `docs` directory.  
Open the `index.html` file in your web browser to view the documentation.

## Project structure

Apart from main files, the project has several directories, where files are divided by their purpose:

- commands

  Design Pattern 'Command' is used in project to process all the operations.
  This module stores all the needed command classes.
  Their instances are created and used in app.ts file.

- executors

  This module stores classes that directly perform calculations.
  Commands pass them tasks, executors perform business logic.

- errors

  Stores custom errors hierarchy.

- state

  Classes and their instances, which current state is required for many modules inside the app, are stored here.

- static

  Contains constants that can be useful for other modules.

- utils

  Stores additional functions for converting results or changing the format.