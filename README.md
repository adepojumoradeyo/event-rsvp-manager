# Event & RSVP Manager

A web application for creating and managing events and keeping track of guest RSVPs.

Author: Adepoju E. Moradeyo

## Overview

The Event & RSVP Manager allows users to create events, manage their events, and keep track of guests for each event.

This project was built to practice working with **React**, **Firebase**, **React Query**, **Context API**, and **Tailwind CSS**.

## Features

* 🔐 User authentication with Firebase
* 📅 Create events
* ✏️ Update events
* 🗑️ Delete events
* 👥 Add guests to events
* ✏️ Update guest RSVP status
* 🗑️ Delete guests
* 📋 View guest lists for individual events
* 📱 Responsive interface
* ⚡ Data fetching and mutations with React Query
* 🎨 Styling with Tailwind CSS

## Tech Stack

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **Firebase Authentication**
* **Firebase Firestore**
* **React Query**
* **React Router**
* **Context API**

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adepojumoradeyo/event-rsvp-manager.git
```

### 2. Navigate to the project

```bash
cd event-rsvp-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

## Firebase Setup

This project uses Firebase for authentication and Firestore.

To run the project with your own Firebase project:

1. Create a Firebase project.
2. Enable **Email/Password Authentication**.
3. Create a **Firestore Database**.
4. Add a web app to your Firebase project.
5. Add your Firebase configuration to the project's Firebase configuration file.
6. Configure your Firestore security rules.

## Project Structure

```text
src/
├── components/
│   └── CreateEvent.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│   ├── useAddGuest.js
│   ├── useCreateEvent.js
│   ├── useDeleteEvent.js
│   ├── useDeleteGuest.js
│   ├── useEvent.js
│   ├── useEvents.js
│   ├── useGuests.js
│   └── useUpdateEvents.js
│
├── lib/
│   └── firebase.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── EventDetails.jsx
│   ├── Login.jsx
│   └── Signup.jsx
│
├── App.jsx
└── main.jsx
```

## What I Learned

Through this project, I practiced:

* Managing authentication with Firebase
* Working with Firestore collections and documents
* Creating custom React hooks
* Using React Query for server-state management
* Managing global authentication state with Context API
* Implementing CRUD operations
* Working with React Router
* Building responsive layouts with Tailwind CSS
* Handling form validation and user input

## Future Improvements

Some features that could be added in the future:

* 📧 Email invitations
* 🔗 Shareable event links
* 📊 RSVP statistics and charts
* 🔔 Event reminders
* 🔎 Search and filter events
* 📅 Calendar integration
* 🖼️ Event cover images

## Author

**Adepoju Moradeyo**

GitHub:
https://github.com/adepojumoradeyo

---

Built with React, Firebase, and Tailwind CSS.
