import Head from 'next/head'

export function PostHeaders ({ title, slug }) {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#199afc"></meta>
      <meta name="author" content="Roberto Samuel Bocio Melo" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta
        property="og:title"
        content={`${title} | Roberto Samuel Bocio Melo - Árticulo de Desarrollo web`}
      />
      <meta property="og:image" content="https://i.postimg.cc/gJGHVbqz/rsbmk.jpg" />
      <meta
        property="og:description"
        content={`
        Este es uno de mis ultimos árticulos en el cual hablo acerca de 
        ${title}`}
      />
      <meta property="og:url" content={`https://rsbmk.ml/post/${slug}`}/>
      <title>{title} | Roberto Samuel Bocio Melo - Árticulo de Desarrollo web</title>
      <meta
        name="description"
        content={`
        Este es uno de mis ultimos árticulos en el cual hablo acerca de 
        ${title}`}
      />
      <meta
        name="keywords"
        content="Roberto Samuel Bocio Melo, blog, aticulos, HTML, CSS,
      JavaScript, TypeScript, NodeJs"
      />
    </Head>
  )
}
