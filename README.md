# Vts CLI

Vts stands for Vanilla TypeScript Starter. When said quickly, it also sounds like the french word `vitesse` which means speed. Vts CLI does one thing, and one thing only, but does it well and quickly; it sets up a new vanilla TypeScript project with all the needed dependencies and configurations.

## Install

If you're here, you probably already have [Node](https://nodejs.org/en/). If you don't, download and install it.

then...

```sh
npm i -g vts-cli
```

or

```sh
yarn global add vts-cli
```

## vts CLI command

Vts only has one command:

### New

```sh
vts new {project name}
```

Generate a new TypeScript project with Vts CLI. When you execute this command, Vts CLI will give you a series of options for your new project regarding *what asset bundler you would like to use (coming soon)* and whether or not to initialize a Git repo.

The `new` command will create a new subdirectory with your `project name` from whatever directory you execute the command.
