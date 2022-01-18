import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

import {urlFor} from '../lib/sanity'

function createCanonical(path) {
  const url = new URL(`https://demo-cruises.sanity.build`)
  url.pathname = path

  return url.toString()
}

export default function Seo({title, titleEnd, image, description}) {
  const {asPath} = useRouter()
  const canonical = createCanonical(asPath)

  const imageUrl = useMemo(
    () => (image?.asset?._ref ? urlFor(image).auto('format').width(1200).height(630).url() : ``),
    [image]
  )

  const tags = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:type`,
      content: 'website',
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:url`,
      content: canonical,
    },
    {
      property: 'og:image',
      content: imageUrl,
    },
    {
      property: 'og:image:width',
      content: 1200,
    },
    {
      property: 'og:image:height',
      content: 630,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    // {
    //   name: `twitter:creator`,
    //   content: site.siteMetadata.author,
    // },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
    {
      name: `type`,
      content: `website`,
    },
  ]

  return (
    <Head>
      <title>
        {title || titleEnd} {titleEnd && title ? `| ${titleEnd}` : ``}
      </title>

      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="msapplication-TileColor" content="#003580" />
      <meta name="theme-color" content="#003580" />

      {tags
        .filter((meta) => meta.content)
        .map((meta) => (
          <meta key={`${meta.name}-${meta.content}`} {...meta} />
        ))}
    </Head>
  )
}

Seo.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  titleEnd: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
}

Seo.defaultProps = {
  title: ``,
  titleEnd: ``,
  description: ``,
  image: {},
}
