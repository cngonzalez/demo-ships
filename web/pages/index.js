import Head from 'next/head'
import Link from 'next/link'
import {groq} from 'next-sanity'

import {getClient} from '../lib/sanity.server'
import SanityImage from '../components/SanityImage'

export default function Home({data}) {
  const {articles} = data
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Unpacked</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col md:flex-row gap-4 items-center justify-center w-full flex-1 px-20 text-center">
        {articles?.length > 0 &&
          articles.map((article) => (
            <article key={article._id} className="flex-1 bg-blue-100 rounded-lg relative shadow-lg">
              <Link href={`/${article.slug.current}`}>
                <a>
                  <SanityImage
                    className="w-full h-auto object-cover rounded-lg"
                    image={article?.seo?.image}
                    with={400}
                    height={800}
                    alt={article.title}
                  />
                  <div className="absolute bottom-0 right-0 m-4 p-4 w-auto max-w-sm bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100 bg-white rounded-lg">
                    {article.title}
                  </div>
                </a>
              </Link>
            </article>
          ))}
      </main>
    </div>
  )
}

export async function getStaticProps({params, preview = false}) {
  const query = groq`*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))]`
  const articles = await getClient(preview).fetch(query)

  if (!articles) return {notFound: true}

  return {
    props: {
      preview,
      data: {articles},
    },
  }
}
