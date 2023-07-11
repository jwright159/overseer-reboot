import Image from 'next/image'
import Link from 'next/link'

export default function SBURBHeader()
{
	return (
		<header style={{ marginBottom: 200 }}>
			<div
				style={{ position: "fixed", zIndex: 999 }}
			>
				<Image
					src="/sburb-header.svg"
					alt="SBURB UI"
					className=""
					style={{ position: "absolute" }}
					width={400}
					height={250}
					priority
				/>

				<Link
					href="/"
					style={{ position: "absolute", left: 100, top: 10 }}
				>
					Index
				</Link>

				<Link
					href="/page2"
					style={{ position: "absolute", left: 100, top: 30 }}
				>
					Page2
				</Link>
			</div>
		</header>
	)
}