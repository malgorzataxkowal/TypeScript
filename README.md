## Get Started

1. **Install [Node 8](https://nodejs.org)** or newer.
2. **Navigate to this project's root directory on the command line.**
3. **Install Node Packages.** - `npm install`
4. Create empty file and create index.html file, src directory and script.ts file
5. Initialize node project=> npm init --y
6. Instal typescript => `npm i --save-dev typescript`
7. Add start script to packeage.json=> `"start" :"tsc -watch"` 
8. Configure tsconfig.json file (ex. add "outDir":"./dist")
9. Connect dest file with html=> `<script src="dest/script.js" defer></script>`

If you want to use a boundler follow the next steps:
**a)** Install your boundler: npm install --save-dev parcel
**b)** Add script and source to packeage.json=> `"source":"index.html", "main": "index.js", "scripts": { "start":parcel"`
  },
**c)** Update/change point 6 with  `<script type="module" src="src/script.ts" defer></script>`
**d)** Update tsconfig.json=> `"module":"es6"`

After that run your webapp in terminal=> `nmp start`

#

### Production Dependencies

| **Dependency**   | **Use**                           |
| ---------------- | -------------------------------   |
| uuid             | Utilities to create unique id     |
 
### Development Dependencies

| **Dependency**                     | **Use**                                                          |
| ---------------------------------- | ---------------------------------------------------------------- |
| @types/uuid                        |Utilities to create unique id            |
| parcel                             | Bundler                   |
| typescript                         | Syntactic supset of Java Script     |