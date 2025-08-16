import Link from "next/link"
import MemoryMatch from "./components/memory-match"

export default function NotFound() {
    return (
        <main className="center">
            <h2 className="large">Something went wrong...</h2>
            <big>The page of which you are seeking is not available, it might have been moved or deleted.</big>
            <p className="narrow center"><small>You can try to pass the time with this game while the error get fixed, or go back to <Link href="/">Dashboard</Link>?</small></p>
            <MemoryMatch />
        </main>
    )
}