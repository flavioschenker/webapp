# SERN WebApp

<p align="center">
  <img src="img/SERN.png" height="200px" />
</p>

This tutorial introduces the SERN stack. SERN stands for SQL (SQLite), Express.js, React.js and Node.js. Why do you need a stack? You My goal is to set up a development environment and build a web application that can:

- Display dynamic data fetched from an API
- Provide an API to manage data in a database
- Allow users to add, edit, and delete data from the webpage
- Feature a minimalistic design
- Include a chat WebSocket endpoint that simply echoes messages

I'm not an expert in this field. I recently learned how to set up and use this stack from scratch. Previously, I built a web app using only Node.js with vanilla JavaScript and manual CSS.

To better understand the differences, I'll create this web app twice:

1. Once with the full SERN stack
2. Once using only SQLite and Node.js (SN)

Then, I'll compare the two approaches.

## Chapter One: Installation

Install Node Version Manager (NVM):

```bash
sudo apt update
sudo apt install curl -y # update curl
curl -o nvm.sh https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh # download installation script
cat nvm.sh  # review the script
bash install.sh  # run it
```

Install Node.js and Node Package Manager (npm)

```bash
nvm install 22 # install version 22.x
nvm use 22
node -v # check node version
npm -v # check npm version
```

create a new Project repository called webapp and inside create two directories called client and server.

```bash
mkdir webapp
cd webapp
mkdir client
mkdir server
```

## Chapter Two: Setup Backend with Express and SQLite

```bash
cd client
npm init -y
npm install express sqlite3 cors dotenv
npm install --save-dev nodemon
code server.js
```

Start the server

```bash
npm run server
```
