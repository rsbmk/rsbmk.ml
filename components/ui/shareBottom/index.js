import * as Icon from 'components/icons'
import styles from 'styles/posts.module.css'
import { SOCIAL } from 'utils/dictionaries'

export function ShereButtom ({ slug, social }) {
  const IconSocial = Icon[social]
  const linkSocial =
    social === SOCIAL.TWITTER
      ? `https://twitter.com/intent/tweet?url=rsbmk.ml/post/${slug}&via=rsbmk`
      : `https://www.linkedin.com/sharing/share-offsite/?url=http://rsbmk.ml/post/${slug}`

  return (
    <a
      className={styles.sheredLink}
      target="_blank"
      rel="noreferrer"
      href={linkSocial}
    >
      <button>
        {social}
        <IconSocial />
      </button>
    </a>
  )
}
