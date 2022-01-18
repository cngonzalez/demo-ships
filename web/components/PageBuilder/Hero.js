import {LocationMarkerIcon} from '@heroicons/react/outline'

import SanityImage from '../SanityImage'

export default function Hero({title, description, image, authors}) {
  return (
    <div className="bg-white">
      <div>
        <div className="relative md:mb-12">
          <div
            className="absolute inset-x-0 top-0 h-1/2 bg-amber-100"
            style={{clipPath: `polygon(0 0, 100% 0, 100% 25%, 0% 100%)`}}
          />

          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                {image && (
                  <SanityImage image={image} className="opacity-100 h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-blue-400 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                {title && (
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">{title}</span>
                  </h1>
                )}
                {description && (
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-amber-200 sm:max-w-3xl">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          {authors?.length > 0 && (
            <div className="md:absolute bottom-0 w-full mx-auto flex justify-center z-10 transform -translate-y-8 md:translate-y-1/2">
              <div className="flex flex-col md:flex-row items-center gap-x-4 justify-center border border-transparent text-base font-medium rounded-md shadow-sm text-sky-700 bg-white md:divide-x px-2 divide-gray-200">
                {authors.map((author) => (
                  <div key={author._id} className="flex gap-2 p-2 items-center">
                    <SanityImage
                      image={author.image}
                      className="w-10 h-10 rounded-full shadow-inner object-cover"
                      height={100}
                      width={100}
                      alt={author.name}
                    />
                    <span className="h-auto">{author.name}</span>
                  </div>
                ))}
                {/* <div className="flex gap-2 p-2 items-center">
                  <LocationMarkerIcon className="w-6 h-auto text-gray-500" />
                  <pre className="text-xs">-12.0463731,-77.042754</pre>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
