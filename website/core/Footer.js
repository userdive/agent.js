import * as React from 'react'

import { version } from '../package.json'

const Footer = function({
  language,
  config: { baseUrl, footerIcon, title, repoUrl },
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
          <h5>Docs</h5>
          <a href={`${baseUrl}docs/${language}/getting-started.html`}>Usage</a>
          <a href={`${baseUrl}docs/${language}/plugins.html`}>Plugins</a>
          <a href={`${baseUrl}docs/${language}/integrations.html`}>
            Integrations
          </a>
        </div>
        <div>
          <h5>Community</h5>
          <a href="https://github.com/userdive">Organization</a>
        </div>
        <div>
          <h5>More</h5>
          <a href={`https://www.uncovertruth.co.jp/${language}/`}>Company</a>
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
        <p>version {version}</p>
      </section>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TLLGLZF');
          `,
        }}
      />
    </footer>
  )
}

module.exports = Footer
