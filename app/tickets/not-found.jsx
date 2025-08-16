import Link from "next/link"

export default function NotFound() {
    return (
        <main className="center">
            <h2 className="large">Oops, that hit a brick wall!</h2>
            <big>The ticket you are looking for was not found.</big>
            <p className="narrow center"><small>Would you like to go back to <Link href="/">Dashboard</Link>?</small></p>
        </main>
    )
}