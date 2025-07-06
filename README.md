# Table of contents:
- [Overview](#overview)
- [Docker](#docker-up)
- [React with vite](#react-with-vite)
- [Issues](#issue-with-npm)
- [Future Plans](#future-plans)

## Overview
A frontend for showcasing various aspects of the dns app and informations broker app. Job entry and sports message generation are included.
Docker is used to containerize the react app. Node 22 Alpine is used as image.
## Docker up
Use `docker compose up` to activate the docker container. The environment for the docker container is set with the .env file, which contains the api for the dns app and the information broker app.


## React with vite.
* Install react with vite.
```npx create-vite your-project-name --template react```
* Run your project.
```npm run dev```
* install tailwind and its peer dependencies
```npm install -D tailwindcss postcss autoprefixer```
* Generate tailwind config files
```npx tailwindcss init -p```
* configure your template paths in tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
* Add tailwind directives to ./src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


## Issue with npm 
```shell
npx tailwindcss init -p
npm error could not determine executable to run
npm error A complete log of this run can be found in: /home/tawsif/.npm/_logs/2025-03-25T05_00_07_537Z-debug-0.log

```
- there are ways to solve this, check the log file and see if the dependency version is correct
- ``` npm install ``` will install the node_modules accourding to your lock files.
- ``` npm cache clean --force``` will clear the cache of node_modules. 

## Future plans
- [ ] Add approval for the message generation
- [ ] Add the user role in order to separate the view for the respective user
- [ ] Save the entry along with the user name for accountibility.
- [ ] Add colors primary, secondary variable.
- [ ] End the match and remove from the dashboard when a match has ended.