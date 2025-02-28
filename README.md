# RickMortyWebapp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0. It is built with Angular 19, Node 20, and styled with Tailwind CSS. The app is integrated with Google Cloud Platform (GCP) and Firebase, providing a robust and scalable solution for exploring the Rick and Morty universe.

---

## Table of Contents

- [Overview](#overview)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Building the Project](#building-the-project)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Deployment](#deployment)
  - [Firebase Hosting](#firebase-hosting)
  - [GCP Integration](#gcp-integration)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [Additional Resources](#additional-resources)

---

## Overview

RickMortyWebapp is a modern Angular application designed to explore the Rick and Morty universe. It leverages Angular 19 for the frontend, Node 20 for backend operations if needed, and Tailwind CSS for a sleek, responsive UI. The application is deployed on Firebase Hosting with additional integration on GCP, ensuring high performance and scalability.

---

## Development Server

To start a local development server, run:


ng serve
Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Code Scaffolding
Angular CLI provides powerful code scaffolding tools. To generate a new component, run:


ng generate component component-name
For a complete list of available schematics (such as components, directives, or pipes), run:


ng generate --help
Building the Project
To build the project, run:


ng build
This will compile your project and store the build artifacts in the dist/ directory. By default, the production build optimizes your application for performance and speed.

# Running Unit Tests
To execute unit tests with the Karma test runner, run:


ng test
Running End-to-End Tests
For end-to-end (e2e) testing, run:


ng e2e
Note: Angular CLI does not include an end-to-end testing framework by default. You can choose one that suits your needs.

Deployment
Firebase Hosting
The RickMortyWebapp is deployed using Firebase Hosting for a fast, secure, and scalable web experience.

# Install Firebase CLI:

npm install -g firebase-tools
Log in to Firebase:

firebase login
Initialize Firebase in your project (if not already done):

firebase init
Select Hosting and optionally Functions if you plan to use Firebase Cloud Functions.
Configure the public directory as dist/your-project-name (replace your-project-name with the actual folder name from the Angular build).
Build the project:

ng build --prod
Deploy to Firebase:

firebase deploy
GCP Integration
For additional backend services or API endpoints, you can integrate with Google Cloud Platform. This project can be extended to utilize GCP services such as Cloud Functions, Cloud Run, or App Engine. For more details, refer to the Google Cloud Documentation.

# Tailwind CSS Configuration
This project uses Tailwind CSS for styling. The configuration is located in the tailwind.config.js file. To build and watch your CSS changes, run:


npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch
Ensure that your Angular project is configured to include the generated CSS file in your build.

