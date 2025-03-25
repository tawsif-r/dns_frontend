# Dns App Frontend
* Admin Dashboard for the Dns App. Dns App is a middle man between a telecommunication agent and another service provider
like bdjobs
* Subscribers, Subscriptions, Jobs, Messages are displayed in an orderly manner.

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

