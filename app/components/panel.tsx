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
			<div className={styles.contentContainer}>
				<div className={styles.contentHeaderContainer}>
					<Image
						id="pageimg"
						src={icon}
						alt="Header image"
						width={49}
						height={49}
					/>
					<div className={styles.contentHeaderText}>{title}</div>
				</div>

				<div className={styles.contentArea}>
					{children}
				</div>

				<div>Generated in ??? seconds</div>
			</div>
		</div>
	)
}