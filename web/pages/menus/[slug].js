
import React from 'react'
import PropTypes from 'prop-types'
import {groq} from 'next-sanity'

import {usePreviewSubscription} from '../../lib/sanity'
import {getClient} from '../../lib/sanity.server'
import ProseableText from '../../components/ProseableText'
import Preview from '../../components/Preview'
import {menuQuery} from '../../lib/queries'
import Header from '../../components/Header'
import Seo from '../../components/Seo'
import Course from '../../components/Menus/Course'

import {filterDataToSingleItem} from '../../lib/filterDataToSingleItem'

export default function Menu({data, preview}) {
  const {data: previewData} = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.menu,
    enabled: preview,
  })

  const menu = filterDataToSingleItem(previewData, preview)
  const {seo} = menu ?? {}
	const filteredCourses = menu?.courses?.filter(course => !!course.items) ?? []

  return (
    <>
      <Seo
        title={seo?.description || menu?.name}
        titleEnd="Unpacked"
        description={seo?.description ?? ``}
      />
      <main className="bg-white">
        {preview && <Preview />}
        <Header />
          <article className="grid grid-cols-1 gap-y-0 md:gap-y-4 xl:gap-y-8">
						{
							filteredCourses.map((course, i) => 
								<Course course={course} key={i} />
							)
						}
          </article>
      </main>
    </>
  )
}

Menu.propTypes = {
  data: PropTypes.shape({
    menu: PropTypes.object,
    query: PropTypes.string,
    queryParams: PropTypes.object,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
}

export async function getStaticProps({params, preview = false}) {
  const query = menuQuery
  const queryParams = {slug: params.slug}
  const data = await getClient(preview).fetch(query, queryParams)

  if (!data) return {notFound: true}

  const menu = filterDataToSingleItem(data, preview)

  return {
    props: {
      preview,
      data: {menu, query, queryParams},
    },
  }
}

export async function getStaticPaths() {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'menu'][].slug.current`
  const menus = await getClient().fetch(allSlugsQuery)

  return {
    paths: menus.map(slug => ({params: {slug}})),
    fallback: true,
  }
}
