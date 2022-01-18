

import React from 'react'
import PropTypes from 'prop-types'
import {groq} from 'next-sanity'

import {usePreviewSubscription} from '../../lib/sanity'
import {getClient} from '../../lib/sanity.server'
import Preview from '../../components/Preview'
import {shipQuery} from '../../lib/queries'
import Header from '../../components/Header'
import Seo from '../../components/Seo'
import Hero from '../../components/PageBuilder/Hero'
import ShipVenue from '../../components/Ships/ShipVenue'

import {filterDataToSingleItem} from '../../lib/filterDataToSingleItem'

export default function Ship({data, preview}) {
  const {data: previewData} = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.ship,
    enabled: preview,
  })

  const ship = filterDataToSingleItem(previewData, preview)
  const {seo} = ship ?? {}

  return (
    <>
      <Seo
        title={seo?.description || ship?.name}
        titleEnd="Unpacked"
        description={seo?.description ?? ``}
      />
      <main className="bg-white">
        {preview && <Preview />}
        <Header />
          <article className="grid grid-cols-1 gap-y-0 md:gap-y-4 xl:gap-y-8">
						<Hero 
							title={ship?.name ?? ""}	
							description={ship?.description ?? ""}
							image={ship?.mainImage}
						/>
						<h2 className="text-center text-4xl font-extrabold tracking-tight my-6">
							Venues
						</h2>
						{ ship?.shipVenues && ship.shipVenues.map(shipVenue => 
								<ShipVenue shipVenue={shipVenue} />		
							)
						}
          </article>
      </main>
    </>
  )
}

Ship.propTypes = {
  data: PropTypes.shape({
    ship: PropTypes.object,
    query: PropTypes.string,
    queryParams: PropTypes.object,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
}

export async function getStaticProps({params, preview = false}) {
  const query = shipQuery
  const queryParams = {slug: params.slug}
  const data = await getClient(preview).fetch(query, queryParams)

  if (!data) return {notFound: true}

  const ship = filterDataToSingleItem(data, preview)

  return {
    props: {
      preview,
      data: {ship, query, queryParams},
    },
  }
}

export async function getStaticPaths() {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'ship'][].slug.current`
  const ships = await getClient().fetch(allSlugsQuery)

  return {
    paths: ships.map(slug => ({params: {slug}})),
    fallback: true,
  }
}
