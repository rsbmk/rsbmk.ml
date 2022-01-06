import fm from 'front-matter'
import fs from 'fs'
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'data/posts')

function getPostSlugs () {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug (slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { attributes, body } = fm(fileContents)

  return { attributes, body, slug: realSlug }
}

export function getAllPosts () {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
