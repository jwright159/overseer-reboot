import Panel from './panel'

export default function MainPanel({
	children,
	title,
	icon,
}: {
	children: React.ReactNode,
	title: string,
	icon?: string,
})
{
	return (
		<main>
			<Panel title={title} icon={icon}>
				{children}
			</Panel>
		</main>
	)
}