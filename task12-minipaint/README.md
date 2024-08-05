# Minipaint

### Gallery of images with built-in graphics editor.

## Task

[Minipaint task](https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view?usp=sharing)

## How to run and tweak the app

Follow these steps to set up the project for future development:

1.  **Clone this repository**

    Example using the web URL:

    ```bash
    git clone https://github.com/katrinDev/inno-trainee-tasks.git

    ```

2.  **Navigate to the project directory**:

    ```bash
    cd ./inno-trainee-tasks/task12-minipaint
    ```

3.  **Install the dependencies**:

    ```bash
    yarn install
    ```

4.  **Start the project in development mode**:

    ```bash
    yarn dev
    ```

    This command runs the project in development mode and uses `vite`.  
    Open http://localhost:3000 to view the app in a browser.  
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

    This command runs the project in production mode.  
    It correctly bundles the project modules and optimizes the build for the best performance.

## Application stack

Vite  
React, Material UI  
Typescript  
Supabase Database + Auth + Storage

## Project structure

Apart from main files, the project has several directories, where files are divided by their purpose:

- components

  Stores reusable custom functional components.

- pages

  Stores components that are responsible for the whole pages.

- router

  Contains files that are needed for routing management.

- services

  Stores classes that are responsible for database and storage interaction logic.

- state

  All redux-toolkit slices for state management.

- supabase

  Stores files with supabase setup logic and database types.

- tools

  Stores classes for all available canvas tools for drawing different shapes.
