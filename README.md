[![Build and test](https://github.com/CodeLog-Development/gatekeeper/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/CodeLog-Development/gatekeeper/actions/workflows/build-and-test.yml)

# Gatekeeper

## Building

1. The first step is to run `yarn install` in the project root to download and build
   all dependencies.
2. Next, you can run `yarn nx run app:build:production` and `yarn nx run api:build:production`
   to build the projects.

## Development

- To run the backend and frontend in a dev environment, start up the emulators for the backend using
  `yarn nx run api:emulators`.
- You can then start the frontend with `yarn nx serve app`
