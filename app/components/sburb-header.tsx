import Link from 'next/link'
import Image from 'next/image'
import styles from './sburb-header.module.css'

export default function SBURBHeader()
{
	const name = "bepisdood"
	const symbol = "aspect_light.png"
	const boondollars = 0
	const classs = "knight" // pick a better name lol // also casing
	const aspect = "light"
	const echeladder = 0
	const strifePower = 0

	const health = 1
	const maxHealth = 1
	const healthPercent = maxHealth === 0 ? 100 : health / maxHealth * 100

	const energy = 1
	const maxEnergy = 1
	const energyPercent = maxEnergy === 0 ? 100 : energy / maxEnergy * 100

	const navLinks = [
		{
			text: "Player",
			icon: "chummy.png",
			color: "#EC008C",
			links: [
				{ text: "Character Profile", link: "/overview" },
				{ text: "Character Log", link: "/logread" },
				{ text: "Sprite", link: "/sprite" },
			]
		},
		{
			text: "Strife",
			icon: "rancorous.png",
			color: "#FFA812",
			links: [
				{ text: "Strife!", link: "/strife" },
				{ text: "Portfolio", link: "/portfolio" },
				{ text: "Abilities", link: "/abilities" },
				{ text: "Aspect Patterns", link: "/aspect-patterns" },
				{ text: "Fraymotifs", link: "/fraymotifs" },
			]
		},
		{
			text: "Exploration",
			icon: "compass.png",
			color: "#00DD00",
			links: [
				{ text: "Dungeons", link: "/dungeons" },
				{ text: "Consorts", link: "/consorts" },
				{ text: "Consort Mercenaries", link: "/mercenaries" },
			]
		},
		{
			text: "Grist",
			icon: "gristy.png",
			link: "/gristwire"
		},
		{
			text: "Inventory",
			icon: "inventory.png",
			color: "#CCAD00",
			links: [
				{ text: "Inventory", link: "/inventory" },
				{ text: "Alchemy", link: "/alchemy" },
				{ text: "Quick Item Creator", link: "/quick-item-creator" },
				{ text: "Item Submissions", link: "/submissions" },
				{ text: "Art Submitter", link: "/submit-art" },
			]
		},
		{
			text: "Atheneum",
			icon: "atheneum.png",
			color: "#00C0FF",
			links: [
				{ text: "Atheneum", link: "/atheneum" },
				{ text: "Item Catalogue", link: "/catalogue" },
				{ text: "Item List", link: "/item-list" },
			]
		},
		{
			text: "SBURB",
			icon: "spirograph.png",
			color: "#E066FF",
			links: [
				{ text: "SBURB Server", link: "/sburb-server" },
				{ text: "SBURB Devices", link: "/sburb-devices" },
				{ text: "SBURB Administrative Console", link: "/session-admin" },
			]
		},
		{
			text: "Social",
			icon: "pester.png",
			color: "#3B4990",
			links: [
				{ text: "Session Viewer", link: "/session-info" },
				{ text: "Session Stats", link: "/session-stats" },
				{ text: "Sessionmates", link: "/sessionmates" },
				{ text: "Chain Viewer", link: "/chain-viewer" },
			]
		},
		{
			text: "Sleep",
			icon: "sleep.png",
			link: "/sleep"
		},
		{
			text: "Meta Stuff",
			icon: "whatpumpkin.png",
			color: "#B22222",
			links: [
				{ text: "Changelog", link: "/changelog" },
				{ text: "New Ability Scanner", link: "/ability-scan" },
				{ text: "Gift Items", link: "/devtools/rewards" },
				{ text: "Log Viewer", link: "/devtools/log-viewer" },
				{ text: "Debug Log", link: "/devtools/debug-log" },
				{ text: "Cheat Log", link: "/devtools/cheat-log" },
				{ text: "Fabricate Objects", link: "/devtools/item-edit" },
				{ text: "Art Approver", link: "/devtools/art" },
				{ text: "Announcer", link: "/announcer" },
			]
		},
	]

	return (
		<header className={styles.headerSpacer}>
			<div className={styles.header}>
				<Image
					src="/sburb-header.svg"
					alt="SBURB UI"
					style={{ position: "absolute" }}
					width={400}
					height={250}
				/>

				<div className={styles.avatar} style={{ background: `url(/images/symbols/${symbol}) no-repeat center center, white` }}></div>
				<div className={styles.classpect}><p>{`${classs} of ${aspect}`}</p></div>
				<div className={[styles.statBox, styles.characterName].join(" ")}><p>{name}</p></div>
				<Link href="/"><div className={styles.characterSwitch}></div></Link>
				<div className={[styles.statBox, styles.echeladder].join(" ")}><Link href="/abilities"><img src="/images/header/echeladder.png"/><p>{echeladder}</p></Link></div>
				<div className={[styles.statBox, styles.powerlevel].join(" ")}><Link href="/portfolio"><img src="/images/header/powerlevel.png"/><p>{strifePower}</p></Link></div>

				<div
					className={[styles.statBar, styles.healthBar].join(" ")}
					style={{ background: `url(/images/header/aspect/${aspect}_statbarcend.png) top right no-repeat, url(/images/header/aspect/${aspect}_statbarcrepeat.png) top right repeat-x` }}
				>
					<div
						className={styles.statBarInner}
						style={{ width: `${healthPercent}%`, background: `url(/images/header/aspect/${aspect}_statbarend.png) top right no-repeat, url(/images/header/aspect/${aspect}_statbarrepeat.png) top right repeat-x` }}
					/>
				</div>
				<div
					className={[styles.statBar, styles.aspectBar].join(" ")}
					style={{ background: `url(/images/header/aspect/${aspect}_statbarcend.png) top right no-repeat, url(/images/header/aspect/${aspect}_statbarcrepeat.png) top right repeat-x` }}
				>
					<div
						className={styles.statBarInner}
						style={{ width: `${energyPercent}%`, background: `url(/images/header/aspect/${aspect}_statbarend.png) top right no-repeat, url(/images/header/aspect/${aspect}_statbarrepeat.png) top right repeat-x` }}
					/>
				</div>
				<div className={[styles.statBubble, styles.healthBubble].join(" ")} title={`Health: ${Math.ceil(healthPercent)}% [${health}/${maxHealth}]`}>
					<img src="/images/header/healthchum.png" style={{ marginTop: 3 }}/>
				</div>
				<div className={[styles.statBubble, styles.aspectBubble].join(" ")} title={`Health: ${Math.ceil(energyPercent)}% [${energy}/${maxEnergy}]`}>
					<img src={`/images/symbols/aspect_${aspect}.png`} style={{ width: "100%", height: "100%" }}/>
				</div>
				
				<Link href="/porkhollow"><img src="/images/header/boondollars.png" className={styles.boondollarBubble}/></Link>
				<div className={styles.boondollars}>{boondollars}</div>
				<span className={styles.overseerLogo}></span>
				<nav className={styles.navBar}>
					<ul>
						{navLinks.map(navLink => (
							<li key={navLink.text} className={styles.navButton}>
								<Link href={navLink.link ?? (navLink.links ? navLink.links[0].link : "#")}>
									<Image
										src={`/images/header/${navLink.icon}`}
										alt={navLink.text}
										title={navLink.text}
										width={49}
										height={49}
									/>
								</Link>
								{ navLink.links ?
									<ul>
										{navLink.links.map(subLink => (
											<li key={subLink.text} style={{ color: navLink.color ?? "black", borderColor: navLink.color ?? "black" }}><Link href={subLink.link}>{subLink.text.toUpperCase()}</Link></li>
										))}
									</ul>
								: undefined }
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}