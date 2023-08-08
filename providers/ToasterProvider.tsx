"use client";

/**
 * The ToasterProvider component serves as a provider for the Toaster notification.
 * It uses the Toaster component from react-hot-toast library and applies custom style to the toast notifications.
 */
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster 
            toastOptions={{
                style: {
                    background: 'white',
                    color: 'black'
                }
            }}
        />
    )
}

export default ToasterProvider;