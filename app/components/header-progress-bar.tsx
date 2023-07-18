import styles from './header-progress-bar.module.css'

export default function HeaderProgressBar({
	value,
	maxValue,

	icon,

	backgroundRepeat,
	backgroundEnd,
	foregroundRepeat,
	foregroundEnd,

	className,
}: {
	value: number,
	maxValue: number,

	icon: string,

	backgroundRepeat: string,
	backgroundEnd: string,
	foregroundRepeat: string,
	foregroundEnd: string,

	className: string,
})
{
	const valuePercent = maxValue !== 0 ? Math.round(value / maxValue) * 100 : 100

	return (
		<>
			<div
				className={[styles.statBar, className].join(" ")}
				style={{ background: `url(${backgroundEnd}) top right no-repeat, url(${backgroundRepeat}) top right repeat-x` }}
			>
				<div
					className={styles.statBarInner}
					style={{ width: `${valuePercent}%`, background: `url(${foregroundEnd}) top right no-repeat, url(${foregroundRepeat}) top right repeat-x` }}
				/>
			</div>
			<div className={styles.statBubble} title={`Health: ${Math.ceil(valuePercent)}% [${value}/${maxValue}]`}>
				<img src={icon}/>
			</div>
		</>
	)
}