import Image from 'next/image'
import styles from './panel.module.css'

export default function Panel({
	children,
	title,
	icon = "/spirograph.png",
}: {
	children: React.ReactNode,
	title: string,
	icon?: string,
})
{
	return (
		<div className={styles.layoutContainer}>
			<div className={styles.contentHeaderContainer}>
				<div className={styles.contentHeader}>
					<Image
						id="pageimg"
						src={icon}
						alt="Header image"
						width={49}
						height={49}
					/>
					<h1>{title}</h1>
				</div>
			</div>

			<div className={styles.contentAreaContainer}>
				<div className={styles.contentArea}>
					{children}
				</div>
			</div>
		</div>
	)
}