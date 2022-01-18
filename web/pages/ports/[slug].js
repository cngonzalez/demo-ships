import React from 'react'
import PropTypes from 'prop-types'
import {groq} from 'next-sanity'

import {usePreviewSubscription} from '../../lib/sanity'
import {getClient} from '../../lib/sanity.server'
import ProseableText from '../../components/ProseableText'
import Preview from '../../components/Preview'
import {portQuery} from '../../lib/queries'
import Header from '../../components/Header'
import Seo from '../../components/Seo'

import {filterDataToSingleItem} from '../../lib/filterDataToSingleItem'

export default function Port({data, preview}) {
  const {data: previewData} = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.port,
    enabled: preview,
  })

  const port = filterDataToSingleItem(previewData, preview)
  const {seo} = port ?? {}
	let content = []
	content.push({
		_type: 'pageBuilderHero',
		_key: 0,
		description: port?.shortDescription,		
		image: port?.mainImage,
		title: port?.name
	})
	if (port && port.description) {
		content = [...content, ...(port.description ?? [])]
	}

  return (
    <>
      <Seo
        title={seo?.escription || port?.title}
        titleEnd="Unpacked"
        description={seo?.description ?? ``}
        image={seo?.image ?? ``}
      />
      <main className="bg-white">
        {preview && <Preview />}
        <Header />
        {content?.length > 0 && (
          <article className="grid grid-cols-1 gap-y-0 md:gap-y-4 xl:gap-y-8">
            <ProseableText blocks={content} />
          </article>
        )}
      </main>
    </>
  )
}

Port.propTypes = {
  data: PropTypes.shape({
    port: PropTypes.object,
    query: PropTypes.string,
    queryParams: PropTypes.object,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
}

export async function getStaticProps({params, preview = false}) {
  const query = portQuery
  const queryParams = {slug: params.slug}
  const data = await getClient(preview).fetch(query, queryParams)

  if (!data) return {notFound: true}

  const port = filterDataToSingleItem(data, preview)

  return {
    props: {
      preview,
      data: {port, query, queryParams},
    },
  }
}

export async function getStaticPaths() {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'port'][].slug.current`
  const ports = await getClient().fetch(allSlugsQuery)

  return {
    paths: ports.map(slug => ({params: {slug}})),
    fallback: true,
  }
}
