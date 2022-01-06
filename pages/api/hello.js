// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler (req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
// import fm from 'front-matter'
// import fs from 'fs/promises'
// import path from 'path'

// const postPath = path.join(__dirname, '../posts')

export default async function handler (req, res) {
  // await fs.readdir(postPath)

  // const files = path.resolve('./public', 'posts', '*.md')

  // const filenames = fs.readdir(files)
  // console.log(filenames)

  // const images = filenames.map(name => path.join('/', 'md', name))

  res.status(200).json({ name: 'John Doe' })
  // res.statusCode = 200
  // res.json(images)
  // const data = await Promise.all(files.map(async filename => {
  //   const file = await fs.readFile(path.join(postPath, filename), 'utf8')
  //   const { attributes } = fm(file.toString())

  //   return {
  //     slug: filename.replace('.md', ''),
  //     title: attributes.title,
  //     date: attributes.date,
  //     tag: attributes.tags
  //   }
  // }))
}
