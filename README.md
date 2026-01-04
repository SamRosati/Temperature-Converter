# Temperature Converter

**Temperature Converter** is a simple, lightweight web application built with raw Node.js. It allows users to convert temperatures between Celsius and Fahrenheit, persists the conversion history to a JSON file, and renders the results in a clean HTML interface.

## Features

* **Bidirectional Conversion:** Convert Celsius to Fahrenheit and Fahrenheit to Celsius.
* **History Tracking:** Automatically saves all conversion inputs and outputs to a local JSON database.
* **Dynamic UI:** Displays a history table of past conversions.
* **Data Management:** Includes functionality to clear the stored conversion history.
* **Responsive Design:** Uses `mvp.css` for a clean, minimalist look without writing custom CSS.
* **Live Reloading:** configured to run with Node's native watch mode.

## Prerequisites

* **Node.js**: Version **18.11.0** or higher is required.
    * *Reason:* The `start` script uses the `--watch` flag (`node --watch server.js`), which is a feature available in newer Node versions.

## Installation & Setup

1.  **Download the files:** Ensure you have the following files in your project root:
    * `server.js`
    * `helpers.js`
    * `package.json`
    * `conversions.json`
    * `index.html`

2.  **Organize the Directory Structure:**
    The server code expects the HTML file to be inside a `views` folder. You must move `index.html` into a new folder named `views`.

    Your structure should look like this:
    ```text
    /project-root
    ├── conversions.json
    ├── helpers.js
    ├── package.json
    ├── server.js
    └── views/
        └── index.html  <-- Move file here
    ```

3.  **Install Dependencies:**
    This project uses native Node.js modules, so there are no external dependencies to install via `npm install`.

## Running the Application

To start the server with file watching enabled:

```bash
npm start
