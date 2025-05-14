# React Todo App

## Overview
This is a simple React-based Todo application that allows you to:
- **Create Todo** items
- **Drag and Drop** Todo items between columns (e.g., TODO, IN PROGRESS, DONE)

The app uses **Zustand** for state management and provides an intuitive drag-and-drop interface to manage tasks.

## Features
- **Create Todo**: Add new tasks with a title.
- **Drag and Drop**: Move tasks between different columns (TODO, IN PROGRESS, DONE).
- **State Management**: Zustand is used for managing the state of the todos across different components.

## Technologies Used
- **React**: Frontend library for building the user interface.
- **Zustand**: A simple and fast state management library for React.
- **Vite**: Development server and build tool for fast project setup and bundling.
- **CSS/TailwindCSS**: For styling the components and layout.
- **Docker**: For containerizing the app and ensuring consistent development and production environments.

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/react-todo-app.git
cd react-todo-app
```

### 2. Install Dependencies
Install the required dependencies using npm:

```bash
npm install
```

### 3. Run the Application Locally
To start the development server:

```bash
npm run dev
```
visit http://localhost:5173 in the browser to see the application.

### 4. Build the application 
To build the app:

```bash
npm run build
```


## Docker Setup

If you want to run the app inside a Docker container, you can follow these steps:

### 1. Build Docker Image
To build the docker image use the Dockerfile provided in the project folder(modify as per your need):
```bash
docker build -t <image-name>:<tag> .
```

### 2. Run the Docker Container
Once the docker image is built, you can run the app inside the container
```bash
docker run --name todo -p 8080:8080 -d <image-name>:<tag>
```

This "-p" flag maps port 8080 on your local/host machine to port 8080 inside the Docker container.

### 3. Access the Application
visit http://localhost:8080 in the browser to see the application.