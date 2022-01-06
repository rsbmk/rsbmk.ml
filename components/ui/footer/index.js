
import styles from 'styles/Home.module.css'
export function Footer () {
  return (
    <footer className={styles.footer}>
      <a
        target="_blank"
        href="http://github.com/rsbmk/"
        rel="noopener nofollow noreferrer"
        aria-label="Github rsbmk"
      >
        Github
      </a>
      <a
        target="_blank"
        href="http://twitter.com/rsbmk/"
        rel="noopener nofollow noreferrer"
        aria-label="Twitter rsbmk"
      >
        Twitter
      </a>
      <a
        target="_blank"
        href="http://instagram.com/rsbmk/"
        rel="noopener nofollow noreferrer"
        aria-label="Instagram rsbmk"
      >
        Instagram
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/rsbmk/"
        rel="noopener nofollow noreferrer"
        aria-label="LinkedIn rsbmk"
      >
        LinkedIn
      </a>
      {/* <a target='_blank' href="" rel="noopener nofollow noreferrer" aria-label="LinkedIn rsbmk">
          SSR
        </a> */}
    </footer>
  )
}
