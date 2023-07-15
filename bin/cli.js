#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Failed to execute ${command}`, error)
    return false
  }
  return true
}
const repositoryName = process.argv[2]

const gitCheckoutCommand = `git clone --depth 1 https://github.com/sharifmrahat/create-express-mongoose-ts.git ${repositoryName}`

const installDependencies = `cd ${repositoryName} && npm install`

console.log(`Cloning the files in directory: ${repositoryName}`)

const checkout = runCommand(gitCheckoutCommand)

if (!checkout) process.exit(-1)

console.log(`Installing dependencies for ${repositoryName}`)

const installDeps = runCommand(installDependencies)

if (!installDeps) process.exit(-1)

console.log('Successfully installed Express-Mongoose-TS template!')

console.log(`Step-1: cd ${repositoryName}`)
console.log(`Step-2: Setup your ENV configs`)
console.log(`Step-1: npm run dev`)
