import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import CreateTicketButton from "./CreateButton";

export default function Tickets() {
    return (
        <main>
            <nav>
                <div className="full-width">
                    <h2>Tickets</h2>
                    <div className="flex-disperse">
                        <small>Currently available tickets.</small>
                        <CreateTicketButton />
                    </div>
                </div>
            </nav>

            <Suspense fallback={<Loading />}>
                <TicketList />
            </Suspense>
        </main>
    );
}