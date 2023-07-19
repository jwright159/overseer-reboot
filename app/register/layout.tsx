import { ReactNode } from "react";
import { GameLayout } from "../(game)/layout";

export default async function RegisterLayout({
	children,
}: {
	children: ReactNode,
}) {
	return (
		<GameLayout>
			{children}
		</GameLayout>
	)
}