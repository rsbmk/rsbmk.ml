import { Github } from 'components/icons/github'
import { Instagram } from 'components/icons/instagram'
import { LinkedIn } from 'components/icons/linkedIn'
import { Twitter } from 'components/icons/twitter'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

export function SocialLinks () {
  return (
    <aside className={styles.social}>
      <Link href="https://twitter.com/rsbmk" target="_blank">
        <a target="_blank">
          <Twitter />
        </a>
      </Link>
      <Link href="https://www.linkedin.com/in/rsbmk/">
        <a target="_blank">
          <LinkedIn />
        </a>
      </Link>
      <Link href="https://www.instagram.com/rsbmk/">
        <a target="_blank">
          <Instagram />
        </a>
      </Link>
      <Link href="http://github.com/rsbmk/">
        <a target="_blank">
          <Github/>
        </a>
      </Link>
    </aside>
  )
}
