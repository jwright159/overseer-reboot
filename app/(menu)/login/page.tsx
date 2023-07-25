import LoginForm from "./login-form"
import MainPanel from "@/app/components/main-panel"
import Link from "next/link"

export default async function Login()
{
	return (
		<MainPanel title="Login">
			<LoginForm/>
			<p><Link href="/register">Register</Link></p>
		</MainPanel>
	)
}