import SanityImage from "../SanityImage";
import Link from 'next/link'


export default function ShipVenue({shipVenue}) {
	const determineMenu = (mainMenu, menuOverride) => {
		if (!menuOverride) {
			return mainMenu
		} else if (menuOverride && (!menuOverride.validFrom || !menuOverride.validTo)) {
			return mainMenu
		} else if (menuOverride.menu) {
			const validFrom = new Date(menuOverride.validFrom)
			const validTo = new Date(menuOverride.validTo)
			const today = new Date()
			if ((validFrom <= today) && (today <= validTo)) {
				return menuOverride.menu
			} else {
				return mainMenu
			}
		} else {
			return mainMenu
		}
	}

	const menu = determineMenu(shipVenue.mainMenu, shipVenue.menuOverride)
	return (
		<div className="flex flex-col md:flex-row px-20 pb-20 gap-10">
			<div className="flex-initial md:w-1/3">
				{
					shipVenue.mainImage && 
					<SanityImage
						className="mx-auto w-[95vw] h-auto object-cover relative z-10"
						image={shipVenue.mainImage}
						height={400}
					/>
				}
			</div>
			<div className="flex-auto self-center">
				<h3 className="font-bold text-1xl tracking-tight sm:text-2xl lg:text-3xl">
					{ shipVenue.name }
				</h3>
				<div>
					{ shipVenue.description }
				</div>
					{ menu && menu.slug && menu.slug.current &&
					<div>
						Here's our current menu: <span className="text-dotted inline-block text-blue-700 font-bold">
						<Link 
						href={`/menus/${menu.slug.current}`}>
							{ menu.name }
						</Link>
						</span>
					</div>
					}
			</div>
		</div>
	)
}