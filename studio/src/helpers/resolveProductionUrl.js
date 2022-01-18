import sanityClient from 'part:@sanity/base/client'

const previewSecret = `grxyd0yts03pk1e8hwv2ikyb7y9x6yh74tlwfe34mqc3jbn0`
const remoteUrl = `https://demo-cruises.sanity.build`
const localUrl = `http://localhost:3000`

const client = sanityClient.withConfig({apiVersion: `2021-05-19`})

export default function resolveProductionUrl(doc, slugOverride) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

  // Setup preview pathname and add secret
  const previewUrl = new URL(`${baseUrl}/api/preview`)
  previewUrl.searchParams.append(`secret`, previewSecret)

  previewUrl.searchParams.append(`dataset`, client.clientConfig.dataset)
  previewUrl.searchParams.append(`slug`, slugOverride ?? doc?.slug?.current ?? `/`)

  return previewUrl.toString()
}
