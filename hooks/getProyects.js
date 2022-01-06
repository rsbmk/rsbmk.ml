import fm from 'front-matter'
import fs from 'fs'
import { join } from 'path'

const projectDirectory = join(process.cwd(), 'data/projects')

function getPostSlugs () {
  return fs.readdirSync(projectDirectory)
}

export function getProjectBySlug (slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(projectDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { attributes, body } = fm(fileContents)

  return { attributes, body, slug: realSlug }
}

export function getAllProjects () {
  const slugs = getPostSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    // sort projects by date in descending order
    // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return projects
}
