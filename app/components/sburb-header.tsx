"use client"

import Link from 'next/link'
import Image from 'next/image'
import styles from './sburb-header.module.css'
import { useContext, useTransition } from 'react'
import { PowerContext } from '../lib/context'
import { useRouter } from 'next/navigation'
import { unsetUser } from '../lib/auth'

export default function SBURBHeader()
{
	const router = useRouter()
	const [isLogoutPending, startLogoutTransition] = useTransition()

	const name = "bepisdood"
	const symbol = "aspect_light.png"
	const boondollars = 0
	const classs = "knight" // pick a better name lol // also casing
	const aspect = "light"
	const echeladder = 0
	const power = useContext(PowerContext)

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
				{ text: "Character Overview", link: "/overview" },
				{ text: "Character Log", link: "/logread", disabled: true },
				{ text: "Sprite", link: "/sprite", disabled: true },
			]
		},
		{
			text: "Strife",
			icon: "rancorous.png",
			color: "#FFA812",
			links: [
				{ text: "Strife!", link: "/strife", disabled: true },
				{ text: "Portfolio", link: "/portfolio", disabled: true },
				{ text: "Abilities", link: "/abilities", disabled: true },
				{ text: "Aspect Patterns", link: "/aspect-patterns", disabled: true },
				{ text: "Fraymotifs", link: "/fraymotifs", disabled: true },
			]
		},
		{
			text: "Exploration",
			icon: "compass.png",
			color: "#00DD00",
			links: [
				{ text: "Dungeons", link: "/dungeons", disabled: true },
				{ text: "Consorts", link: "/consorts", disabled: true },
				{ text: "Consort Mercenaries", link: "/mercenaries", disabled: true },
			]
		},
		{
			text: "Grist",
			icon: "gristy.png",
			color: "#009500",
			links: [
				{ text: "Grist", link: "/gristwire", disabled: true },
			]
		},
		{
			text: "Inventory",
			icon: "inventory.png",
			color: "#CCAD00",
			links: [
				{ text: "Inventory", link: "/inventory", disabled: true },
				{ text: "Alchemy", link: "/alchemy", disabled: true },
				{ text: "Quick Item Creator", link: "/quick-item-creator", disabled: true },
				{ text: "Item Submissions", link: "/submissions", disabled: true },
				{ text: "Art Submitter", link: "/submit-art", disabled: true },
			]
		},
		{
			text: "Atheneum",
			icon: "atheneum.png",
			color: "#00C0FF",
			links: [
				{ text: "Atheneum", link: "/atheneum", disabled: true },
				{ text: "Item Catalogue", link: "/catalogue", disabled: true },
				{ text: "Item List", link: "/item-list", disabled: true },
			]
		},
		{
			text: "SBURB",
			icon: "spirograph.png",
			color: "#E066FF",
			links: [
				{ text: "SBURB Server", link: "/sburb-server", disabled: true },
				{ text: "SBURB Devices", link: "/sburb-devices", disabled: true },
				{ text: "SBURB Administrative Console", link: "/session-admin", disabled: true },
			]
		},
		{
			text: "Social",
			icon: "pester.png",
			color: "#3B4990",
			links: [
				{ text: "Session Viewer", link: "/session-info", disabled: true },
				{ text: "Session Stats", link: "/session-stats", disabled: true },
				{ text: "Sessionmates", link: "/sessionmates", disabled: true },
				{ text: "Chain Viewer", link: "/chain-viewer", disabled: true },
			]
		},
		{
			text: "Sleep",
			icon: "sleep.png",
			color: "#8B4C39",
			links: [
				{ text: "Sleep", link: "/sleep", disabled: true },
			]
		},
		{
			text: "Meta Stuff",
			icon: "whatpumpkin.png",
			color: "#B22222",
			links: [
				{ text: "Changelog", link: "/changelog", disabled: true },
				{ text: "New Ability Scanner", link: "/ability-scan", disabled: true },
				{ text: "Gift Items", link: "/devtools/rewards", disabled: true },
				{ text: "Log Viewer", link: "/devtools/log-viewer", disabled: true },
				{ text: "Debug Log", link: "/devtools/debug-log", disabled: true },
				{ text: "Cheat Log", link: "/devtools/cheat-log", disabled: true },
				{ text: "Fabricate Objects", link: "/devtools/item-edit", disabled: true },
				{ text: "Art Approver", link: "/devtools/art", disabled: true },
				{ text: "Announcer", link: "/announcer", disabled: true },
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
				<button className={styles.characterSwitch} onClick={() => startLogoutTransition(() => unsetUser().then(() => router.refresh()))} disabled={isLogoutPending}></button>
				<div className={[styles.statBox, styles.echeladder].join(" ")}><Link href="/abilities"><img src="/images/header/echeladder.png"/><p>{echeladder}</p></Link></div>
				<div className={[styles.statBox, styles.powerlevel].join(" ")}><Link href="/portfolio"><img src="/images/header/powerlevel.png"/><p>{power}</p></Link></div>

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
								<Link href={navLink.links[0].link}>
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
											<li key={subLink.text} className={subLink.disabled ? styles.disabledLink : undefined} style={{ color: navLink.color ?? "black", borderColor: navLink.color ?? "black" }}><Link href={subLink.link}>{subLink.text.toUpperCase()}</Link></li>
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