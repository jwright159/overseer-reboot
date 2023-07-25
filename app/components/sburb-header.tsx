"use client"

import Link from 'next/link'
import styles from './sburb-header.module.css'
import { useRouter } from 'next/navigation'
import { unsetCharacter } from '../lib/auth'
import { useTransition } from 'react'
import HeaderProgressBar from './header-progress-bar'

export default function SBURBHeader({
	isLoggedIn = false,

	name,
	symbol,
	boondollars,
	aspect,
	displayClasspect,
	echeladderRung,
	strifePower,

	health,
	maxHealth,
	energy,
	maxEnergy,
}: {
	isLoggedIn?: boolean,

	name?: string,
	symbol?: string,
	boondollars?: number,
	aspect?: string,
	displayClasspect?: string,
	echeladderRung?: number,
	strifePower?: number,

	health?: number,
	maxHealth?: number,
	energy?: number,
	maxEnergy?: number,
})
{
	const router = useRouter()
	const [isLogoutPending, startLogoutTransition] = useTransition()

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
				<img
					src="/sburb-header.svg"
					className={styles.sburbBar}
				/>

				{symbol !== undefined && <div className={styles.avatar}><img src={symbol} /></div>}
				{displayClasspect !== undefined && <div className={styles.classpect}><p>{displayClasspect}</p></div>}
				{name !== undefined && <div className={[styles.statBox, styles.characterName].join(" ")}><p>{name}</p></div>}
				{isLoggedIn && <button className={styles.characterSwitch} onClick={() => startLogoutTransition(() => unsetCharacter().then(() => router.refresh()))} disabled={isLogoutPending}></button>}
				{echeladderRung !== undefined && <div className={[styles.statBox, styles.echeladder].join(" ")}><Link href="/abilities"><img src="/images/header/echeladder.png"/><p>{echeladderRung}</p></Link></div>}
				{strifePower !== undefined && <div className={[styles.statBox, styles.powerlevel].join(" ")}><Link href="/portfolio"><img src="/images/header/powerlevel.png"/><p>{strifePower}</p></Link></div>}

				{!isLoggedIn && <div className={[styles.statBox, styles.loggedOutTitle].join(" ")}><p>The Overseer Project: Reboot</p></div>}

				{health !== undefined && maxHealth !== undefined && <HeaderProgressBar
					value={health}
					maxValue={maxHealth}

					icon="/images/header/healthchum.png"

					backgroundRepeat={`/images/header/aspect/${aspect}_statbarcrepeat.png`}
					backgroundEnd={`/images/header/aspect/${aspect}_statbarcend.png`}
					foregroundRepeat={`/images/header/aspect/${aspect}_statbarrepeat.png`}
					foregroundEnd={`/images/header/aspect/${aspect}_statbarend.png`}

					className={styles.healthBar}
				/>}
				{energy !== undefined && maxEnergy !== undefined && <HeaderProgressBar
					value={energy}
					maxValue={maxEnergy}

					icon={`/images/symbols/aspect_${aspect}.png`}

					backgroundRepeat={`/images/header/aspect/${aspect}_statbarcrepeat.png`}
					backgroundEnd={`/images/header/aspect/${aspect}_statbarcend.png`}
					foregroundRepeat={`/images/header/aspect/${aspect}_statbarrepeat.png`}
					foregroundEnd={`/images/header/aspect/${aspect}_statbarend.png`}

					className={styles.aspectBar}
				/>}
				
				{boondollars !== undefined && <Link href="/porkhollow"><img src="/images/header/boondollars.png" className={styles.boondollarBubble}/></Link>}
				{boondollars !== undefined && <div className={styles.boondollars}>{boondollars}</div>}

				<span className={styles.overseerLogo}></span>
				<nav className={styles.navBar}>
					<ul>
						{navLinks.map(navLink => (
							<li key={navLink.text} className={styles.navButton}>
								{ isLoggedIn ? <>
									<Link href={navLink.links[0].link}>
										<img
											src={`/images/header/${navLink.icon}`}
											alt={navLink.text}
											title={navLink.text}
										/>
									</Link>
									{ navLink.links &&
										<ul>
											{navLink.links.map(subLink => (
												<li key={subLink.text} className={subLink.disabled ? styles.disabledLink : undefined} style={{ color: navLink.color ?? "black", borderColor: navLink.color ?? "black" }}><Link href={subLink.link}>{subLink.text.toUpperCase()}</Link></li>
											))}
										</ul>
									}
								</> :
									<img
										src={`/images/header/${navLink.icon}`}
										alt={navLink.text}
										title={navLink.text}
										style={{ filter: "grayscale(1)" }}
									/>
								}
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}