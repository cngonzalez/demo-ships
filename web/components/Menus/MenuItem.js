import SanityImage from '../SanityImage'

export default function MenuItem({menuItem}) {
	return (
		<div className="flex-1 rounded-lg relative py-5">
			{
				menuItem.mainImage && 
				<SanityImage
					className="w-full h-auto object-cover rounded-lg"
					image={menuItem.mainImage}
					height={800}
				/>
			}
			<div className="py-5">
				<h3 className="text-center font-bold text-1xl tracking-tight sm:text-2xl lg:text-3xl">
					{ menuItem.name ?? "" }
				</h3>
				<div>
					{ menuItem.description ?? "" }
				</div>
			</div>
		</div>
	)
}