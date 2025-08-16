"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CreateForm({ onSuccess }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('low');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const ticket = { title, body, priority, user_email: 'bowser@netninja.dev' };

        try {
            const res = await fetch('http://localhost:4000/tickets', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ticket)
            });

            if (res.status === 201) {
                setSuccess(true); // show success message
                setIsLoading(false);

                // Auto-close after 10s
                setTimeout(() => {
                    if (onSuccess) onSuccess();
                }, 10000);

            } else {
                const data = await res.json();
                setError(data.message || "Failed to create ticket");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Network error. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div>
            {success ? (
                <div className="success center">
                    ✅ Ticket created successfully!
                    <p>Go back to <Link href="/">Dashboard.</Link></p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>}

                    <h2 className="center">Add a New Ticket</h2>

                    <label>
                        <span>Title:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </label>

                    <label>
                        <span>Body:</span>
                        <textarea
                            required
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                        />
                    </label>

                    <label>
                        <span>Priority:</span>    
                        <select
                            onChange={(e) => setPriority(e.target.value)}
                            value={priority}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </label>

                    <button type="submit" className="btn-secondary" disabled={isLoading}>
                        {isLoading ? <span>Adding...</span> : <span>Add Ticket</span>}
                    </button>
                </form>
            )}
        </div>
    );
}