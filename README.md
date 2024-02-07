# Nifty\_Visualization

## Overview

A simple react project that shows the prices of NIFTY 50 and NIFTY Bank for the range of dates provided using the golang backend service connected to mysql server.
## Table of Contents

- [Nifty\_Visualization](#true_beacon)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
- [Backend](#backend)
  - [Installation](#installation)
- [Frontend](#frontend)
  - [Installation](#installation-1)

# Backend


## Installation

1. Ensure you have Go installed on your machine. 

2. Clone the repository:

3. Change to the project directory:

   ```shell
   cd backend/
   ```

4. Install the dependencies:

   ```shell
   go mod download
   ```
5. Change the mysql setup

   In the file `/backend/utility/sql.go`

   **Replace the "password" in the db URI with the password of the root user to your mysql server.**

6. Build the project:

   ```shell
   go build
   ```

# Frontend


## Installation

1. Ensure you have Node.js installed on your machine. 

2. Clone the repository:

3. Change to the project directory:

   ```shell
   cd frontend
   ```

4. Install the dependencies:

   ```shell
   npm install
   ```

5. Start the development server:

   ```shell
   npm start
   ```

   This command will start the development server and open the project in your default browser.



