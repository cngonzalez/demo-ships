import MenuItem from "./MenuItem";

export default function Course({course}) {
	const filteredItems = course.items.filter(item => {
		if (!item.keyIngredients) {
			return true
		} else if (item.keyIngredients && item.keyIngredients.find(
			ingredient => ingredient.available === false)) {
				return false
		} else {
			return true
		}
	})

	return (
		<div style={{paddingTop: '3rem'}}>
			<h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
				{ course.name ?? "" }
			</h2>
			<div className="grid place-items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-center w-full px-20 text-center py-10">
		
				{ 
					filteredItems.map(item => 
						<MenuItem menuItem={item} key={item._id} /> 
					)
				}
			</div>
		</div>
	)
}