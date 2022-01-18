import React from 'react'
import PropTypes from 'prop-types'
import {groq} from 'next-sanity'

import {usePreviewSubscription} from '../../lib/sanity'
import {getClient} from '../../lib/sanity.server'
import Preview from '../../components/Preview'
import {sailingQuery} from '../../lib/queries'
import Header from '../../components/Header'
import Seo from '../../components/Seo'
import ShipVenue from '../../components/Ships/ShipVenue'
import PortPreview from '../../components/Sailings/PortPreview'
import Hero from '../../components/PageBuilder/Hero'

import {filterDataToSingleItem} from '../../lib/filterDataToSingleItem'

export default function Sailing({data, preview}) {
  const {data: previewData} = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.sailing,
    enabled: preview,
  })

  const sailing = filterDataToSingleItem(previewData, preview)
  const {seo} = sailing ?? {}

  return (
    <>
      <Seo
        title={seo?.description || sailing?.name}
        titleEnd="Unpacked"
        description={seo?.description ?? ``}
      />
      <main className="bg-white">
        {preview && <Preview />}
        <Header />
          <article className="grid grid-cols-1 gap-y-0 md:gap-y-4 xl:gap-y-8">
						<Hero 
							title={sailing?.name ?? ""}	
							description={sailing?.description ?? ""}
							image={sailing?.mainImage}
						/>
							<div>
								<h1 className="text-center text-6xl font-extrabold tracking-tight my-8">About Your Ship</h1>
								{ sailing?.ship && sailing.ship.shipVenues && sailing.ship.shipVenues.map(shipVenue => 
										<ShipVenue shipVenue={shipVenue} />		
									)
								}
							</div>
						{
							sailing?.itinerary && 
							<div>
								<h1 className="text-center text-6xl font-extrabold tracking-tight my-6">About Your Trip</h1>
								{
									sailing?.itinerary.map((port, i) => 
									<PortPreview port={port} key={i} />
										
										)
								}
							</div>
						}
          </article>
      </main>
    </>
  )
}

Sailing.propTypes = {
  data: PropTypes.shape({
    sailing: PropTypes.object,
    query: PropTypes.string,
    queryParams: PropTypes.object,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
}

export async function getStaticProps({params, preview = false}) {
  const query = sailingQuery
  const queryParams = {slug: params.slug}
  const data = await getClient(preview).fetch(query, queryParams)

  if (!data) return {notFound: true}

  const sailing = filterDataToSingleItem(data, preview) ?? {}

  return {
    props: {
      preview,
      data: {sailing, query, queryParams},
    },
  }
}

export async function getStaticPaths() {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'sailing'][].slug.current`
  const sailings = await getClient().fetch(allSlugsQuery)

  return {
    paths: sailings.map(slug => ({params: {slug}})),
    fallback: true,
  }
}
