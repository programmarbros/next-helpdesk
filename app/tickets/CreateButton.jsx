"use client";

import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";

export default function CreateTicketButton() {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false); // callback to close modal

    // disable scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // cleanup in case component unmounts while modal is open
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <div className="button" onClick={() => setOpen(true)}>➕ Create</div>

            {open && (
                <div className="modal" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CreateForm onSuccess={handleClose} />
                    </div>
                </div>
            )}
        </>
    );
}