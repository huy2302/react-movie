import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, BrowserRouter, createBrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: "/vite-react-router/",
//     element: <App />,
//     children: [
//       {
//         path: "/vite-react-router/",
//         element: <Home />,
//       },
//       {
//         path: "/vite-react-router/contact",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>
)
