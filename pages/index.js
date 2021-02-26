import '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Post from '../components/post'

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

function HomePage() {
  async function fetchEntries() {
    const entries = await client.getEntries()
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries()
      setPosts([...allPosts])
    }
    getPosts()
  }, [])

  return (
    <>
      <Head>
        <title>Radio | EXT Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" type="image/jpg" href="./assets/favicon-32x32.png" />
        <link rel="icon" href="./assets/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="./assets/favicon-32x32.png" />
        <meta name="description" content="EXT Project is a community Radio Station based in the heart of East London at the Containerville site. We create opportunities for young people, artists and the local community."/>
        <link rel="canonical" href="https://www.extproject.co.uk"/>
        <meta property="og:description" content="EXT Project is a community Radio Station based in the heart of East London at the Containerville site. We create opportunities for young people, artists and the local community. "/>
        <meta property="og:title" content="Radio | EXT Project"/>
        <meta property="og:image" content="./assets/images/ext-project-radio.png"/>
        <meta property="og:url" content="https://www.extproject.co.uk"/>
        <meta property="og:site_name" content="EXT Project"/>
        <meta property="og:type" content="website"/>
        <meta name="fb_admins_meta_tag" content="extproject49"/>
        <meta name="twitter:title" content="extproject49"></meta>
        <meta property="fb:admins" content="extproject49"/>
        <meta property="og:site_name" content="EXT Project" key="ogsitename" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@extproject" key="twhandle" />


      
      </Head>
     
      {posts.length > 0
        ? posts.map((p) => (
            <Post
              alt={p.fields.alt}
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
            />
          ))
        : null}
    </>
  )
}

export default HomePage
