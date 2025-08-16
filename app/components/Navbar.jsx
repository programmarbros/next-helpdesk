import Image from "next/image"
import Link from "next/link"
import Logo from "../../public/logo.png"

export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt='Next HelpDesk Logo'
        width={50}
        quality={100}
        placeholder='blur'
      />
      <h1>Next HelpDesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="tickets">Tickets</Link>
    </nav>
  )
}