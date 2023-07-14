#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const spawn = require('cross-spawn')
const fs = require('fs')
const path = require('path')

// Usage: npx create-my-template my-app
// The first argument will be the project name.
const projectName = process.argv[2]

// Create a project directory with the project name.
const currentDir = process.cwd()
const projectDir = path.resolve(currentDir, projectName)
fs.mkdirSync(projectDir, { recursive: true })

const templateDir = path.resolve(__dirname, '..', 'template')
fs.copySync(templateDir, projectDir)

const projectPackageJsonPath = path.resolve(projectDir, 'package.json')
const projectPackageJson = require(projectPackageJsonPath)
projectPackageJson.name = projectName
fs.writeFileSync(
  projectPackageJsonPath,
  JSON.stringify(projectPackageJson, null, 2)
)

spawn.sync('npm', ['install'], { stdio: 'inherit' })

console.log('Success! Your new project is ready.')
console.log(`Created ${projectName} at ${projectDir}`)
