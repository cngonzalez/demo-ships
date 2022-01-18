/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import dynamic from 'next/dynamic'
import {LocationMarkerIcon} from '@heroicons/react/outline'

const SanityImage = dynamic(() => import('../components/SanityImage'))
const SanityFile = dynamic(() => import('../components/SanityFile'))
const VideoPlayer = dynamic(() => import('../components/VideoPlayer'))
const Button = dynamic(() => import('../components/Button'))
const Hero = dynamic(() => import('../components/PageBuilder/Hero'))
const Content = dynamic(() => import('../components/PageBuilder/Content'))
const Columns = dynamic(() => import('../components/PageBuilder/Columns'))
const Image = dynamic(() => import('../components/PageBuilder/Image'))
const Location = dynamic(() => import('../components/PageBuilder/Location'))

export const serializers = {
  container: ({children}) => children,
  marks: {
    geopoint: ({children}) => (
      <a className="text-dotted inline-block" href="#">
        <LocationMarkerIcon className="inline-flex w-5 mr-1 h-auto" />
        {children}
      </a>
    ),
    undefined: () => null,
  },
  types: {
    undefined: () => null,
    video: ({node}) => <VideoPlayer url={node?.url} />,
    mainImage: ({node}) => {
      if (!node?.image) return null

      return (
        <div className="relative my-6 md:my-0">
          <SanityImage
            width={1800}
            height={800}
            image={node?.image}
            alt={node?.alt}
            className="mx-auto w-[95vw] h-auto object-cover relative z-10"
          />
          <div
            className="w-screen h-full absolute inset-0 transform -skew-y-3 md:-skew-y-6 md:scale-y-90 opacity-50"
            style={{
              background: `linear-gradient(90deg,
                ${node.image.asset.metadata.palette.darkVibrant.background}, 
                ${node.image.asset.metadata.palette.vibrant.background},
                ${node.image.asset.metadata.palette.lightVibrant.background}
              )`,
            }}
          />
        </div>
      )
    },

    download: ({node}) => {
      return <SanityFile file={node?.file}>Download</SanityFile>
    },
    button: ({node}) => {
      if (!node?.link) return null

      const {reference, link, text} = node?.link

      return (
        <Button className="mx-auto" href={reference ?? link}>
          {text ?? 'Click'}
        </Button>
      )
    },
    pageBuilderHero: ({node}) => <Hero {...node} />,
    pageBuilderContent: ({node}) => <Content {...node} />,
    pageBuilderColumns: ({node}) => <Columns {...node} />,
    pageBuilderLocation: ({node}) => <Location {...node} />,
    // eslint-disable-next-line jsx-a11y/alt-text
    pageBuilderImage: ({node}) => <Image {...node} />,
  },
}
