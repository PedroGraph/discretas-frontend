import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ShopProvider } from "./contexts/ProductContext.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
    <ShopProvider>
        <App />
    </ShopProvider>
)
