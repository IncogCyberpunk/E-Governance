import React from "react";
import { Toaster } from "react-hot-toast";

export const AppToaster = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                // Default options for all toasts
                style: {
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    fontWeight: 800,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                },
                success: {
                    style: {
                        background: "#22c55e",
                        color: "#f0fdf4",
                    },
                },
                error: {
                    style: {
                        background: "#ef4444",
                        color: "#fff7f7",
                    },
                },
            }}
        />
    );
};
