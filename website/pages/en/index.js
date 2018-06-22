const React = require('react')
const { translate } = require('../../server/translate.js')
const {
  Container,
  GridBlock,
  MarkdownBlock
} = require('../../core/CompLibrary.js')
const { baseUrl, users, title, tagline } = require(process.cwd() +
  '/siteConfig.js')

const imgUrl = img => `${baseUrl}img/${img}`
const docUrl = (doc, language) =>
  `${baseUrl}docs/${language ? language + '/' : ''}${doc}`
const pageUrl = (page, language) =>
  `${baseUrl}${language ? language + '/' : ''}${page}`
const Button = ({ href, target, children }) => (
  <div className='pluginWrapper buttonWrapper'>
    <a className='button' href={href} target={target || '_self'}>
      {children}
    </a>
  </div>
)

const SplashContainer = ({ children }) => (
  <div className='homeContainer'>
    <div className='homeSplashFade'>
      <div className='wrapper homeWrapper'>{children}</div>
    </div>
  </div>
)

const Logo = ({ img_src: src }) => (
  <div className='projectLogo'>
    <img src={src} />
  </div>
)

const PromoSection = ({ children }) => (
  <div className='section promoSection'>
    <div className='promoRow'>
      <div className='pluginRowBlock'>{children}</div>
    </div>
  </div>
)

const HomeSplash = ({ language }) => (
  <SplashContainer>
    <Logo img_src={imgUrl('logo.svg')} />
    <h2 className='projectTitle'>
      <small>{tagline}</small>
    </h2>
    <div className='inner'>
      <PromoSection>
        <Button href={docUrl('getting-started.html', language || '')}>
          <translate>Getting Started</translate>
        </Button>
        <Button href={docUrl('writing-plugins.html', language || '')}>
          <translate>Plugins</translate>
        </Button>
        <Button href={docUrl('integrations.html', language || '')}>
          <translate>Integrations</translate>
        </Button>
      </PromoSection>
    </div>
  </SplashContainer>
)

const Block = ({ id, background, children, layout }) => (
  <Container className='productShowcaseSection' background={background}>
    <GridBlock align='center' contents={children} layout={layout} />
  </Container>
)

const Service = props => (
  <div className='toolSection'>
    <Block layout='fourColumn' background='dark'>
      {[
        {
          content: 'Set up and customize tracking for websites',
          image: imgUrl('pic01.png'),
          imageAlign: 'top',
          title: 'Web'
        },
        {
          content: 'Support some plugins and 3rd party integrations',
          image: imgUrl('pic02.png'),
          imageAlign: 'top',
          title: 'Easy Customize'
        }
      ]}
    </Block>
  </div>
)

const Integrations = props => (
  <div className='productShowcaseSection functionSection'>
    <h2>
      <translate>Integrations</translate>
    </h2>
    <MarkdownBlock>TBA</MarkdownBlock>
  </div>
)

const Migrate = props => (
  <Block background='dark'>
    {[
      {
        content: 'To next generation USERDIVE',
        image: imgUrl('classic.png'),
        imageAlign: 'right',
        title: 'Migrate'
      }
    ]}
  </Block>
)

const Showcase = ({ language }) => {
  if ((users || []).length === 0) {
    return null
  }
  const showcase = users.filter(({ pinned }) => pinned).map((user, i) => (
    <a href={user.infoLink} key={i}>
      <img src={user.image} title={user.caption} />
    </a>
  ))

  return (
    <div className='productShowcaseSection paddingBottom'>
      <h2>{"Who's Using This?"}</h2>
      <p>
        <translate>This project is used by all these people</translate>
      </p>
      <div className='logos'>{showcase}</div>
      <div className='more-users'>
        <a className='button' href={pageUrl('users.html', language)}>
          More {title} Users
        </a>
      </div>
    </div>
  )
}

module.exports = function Index ({ language }) {
  return (
    <div>
      <HomeSplash language={language || ''} />
      <div className='indexMainContainer'>
        <Service />
        <Integrations />
        <div className='collaborationSection'>
          <Migrate />
        </div>
        <Showcase language={language || ''} />
      </div>
    </div>
  )
}
