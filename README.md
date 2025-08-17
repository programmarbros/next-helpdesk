# Next HelpDesk

A modern, responsive help desk application built with Next.js 13, showcasing both client-side and server-side rendering techniques. This project serves as a practical demonstration of Next.js features, including routing, React Server Components, and custom styling.

## 🚀 Features

- **Dashboard**: A dynamic dashboard displaying a list of tickets with their statuses and priorities.
- **Ticket Management**: Users can create, view, and manage support tickets.
- **Progressive Web App (PWA)**: Enjoy offline support and fast loading times! The dashboard is fully accessible offline, and all pages work seamlessly online. When built for production, the app leverages service workers to provide a smooth offline experience for ticket pages as well.
- **Error Handling**: Custom error pages with playful elements, including a mini game on the "not found" page, to enhance user experience during downtime.
- **Loading Indicators**: Visual feedback during data fetching and processing.
- **Custom Styling**: Replaced Tailwind CSS with a custom vanilla CSS solution for greater flexibility and more control over the design.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React
- **Styling**: Pure CSS
- **Data Handling**: JSON-based mock API
- **PWA Support**: Service Worker and manifest.json

## ⚙️ Setup & Installation

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/next-helpdesk.git
   cd next-helpdesk
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

> **Note:** Offline support for ticket pages works fully when running the production build (`npm run build && npm start`). In development mode, only the dashboard is reliably accessible offline, but all pages function perfectly online.

## 📸 Screenshots

Here are some screenshots showcasing the application:

- **Dashboard**: ![Dashboard](/public/screenshots/dashboard.png)
- **Ticket Page**: ![Ticket Page](/screenshots/tickets.png)
- **Error Page**: ![Error Page](/public/screenshots/not-found.png)

## 🗄️ Mock API / JSON Server

This project uses a JSON-based mock API to simulate backend data. To start it:

1. Make sure `json-server` is installed globally (or install it with `npm install -g json-server`).
2. Run the server:

   ```bash
   json-server --port 4000 ./_data/db.json
````

3. The API will be available at `http://localhost:4000/tickets`.
