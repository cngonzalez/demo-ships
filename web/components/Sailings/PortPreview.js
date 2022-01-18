import SanityImage from "../SanityImage";
import Link from 'next/link'


export default function PortPreview({port}) {
	return (
		<div className="flex flex-col md:flex-row px-20 pb-20 gap-10">
			<div className="flex-auto self-center">
				<h3 className="font-bold text-1xl tracking-tight sm:text-2xl lg:text-3xl">
					{ port.name }
				</h3>
				<div>
					{ port.shortDescription }
				</div>
					{ port.slug && port.slug.current &&
					<div>
						<span className="text-dotted inline-block text-blue-700 font-bold">
						<Link 
						href={`/ports/${port.slug.current}`}>
							Learn More Here
						</Link>
						</span>
					</div>
					}
			</div>
			<div className="flex-initial md:w-1/3">
				{
					port.mainImage && 
					<SanityImage
						className="mx-auto w-[95vw] h-auto object-cover relative z-10"
						image={port.mainImage}
						height={400}
					/>
				}
			</div>
		</div>
	)
}