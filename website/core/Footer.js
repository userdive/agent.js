const React = require('react')

module.exports = function Footer ({
  language,
  config: { baseUrl, footerIcon, title, repoUrl }
}) {
  return (
    <footer className="nav-footer" id="footer">
      <section className="sitemap">
        <a href={baseUrl} className="nav-home">
          <img
            src={`${baseUrl}${footerIcon}`}
            alt={title}
            width="66"
            height="58"
          />
        </a>
        <div>
          <h5>More</h5>
          <a href={`${baseUrl}blog`}>Blog</a>
          <a href={repoUrl}>GitHub</a>
          <a
            className="github-button"
            href={repoUrl}
            data-icon="octicon-star"
            data-count-href="/userdive/agent.js/"
            data-show-count
            data-count-aria-label="# stargazers on GitHub"
            aria-label="Star this project on GitHub"
          >
            Star
          </a>
        </div>
      </section>

      <section className="copyright">
        Copyright &copy; {new Date().getFullYear()} UNCOVER TRUTH
      </section>
    </footer>
  )
}
