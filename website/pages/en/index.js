const React = require('react')
const { translate } = require('../../server/translate.js')
const {
  Container,
  GridBlock,
  MarkdownBlock
} = require('../../core/CompLibrary.js')
const siteConfig = require(process.cwd() + '/siteConfig.js')

function imgUrl (img) {
  return siteConfig.baseUrl + 'img/' + img
}

function docUrl (doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc
}

function pageUrl (page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page
}

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

const ProjectTitle = props => (
  <h2 className='projectTitle'>
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
)

const PromoSection = props => (
  <div className='section promoSection'>
    <div className='promoRow'>
      <div className='pluginRowBlock'>{props.children}</div>
    </div>
  </div>
)

const HomeSplash = ({ language }) => (
  <SplashContainer>
    <Logo img_src={imgUrl('docusaurus.svg')} />
    <div className='inner'>
      <ProjectTitle />
      <PromoSection>
        <Button href='#try'>
          <translate>Try It Out</translate>
        </Button>
        <Button href={docUrl('doc1.html', language || '')}>
          <translate>Example Link</translate>
        </Button>
        <Button href={docUrl('doc2.html', language || '')}>
          <translate>Example Link 2</translate>
        </Button>
      </PromoSection>
    </div>
  </SplashContainer>
)

const Block = ({ id, background, children, layout }) => (
  <Container padding={['bottom', 'top']} id={id} background={background}>
    <GridBlock align='center' contents={children} layout={layout} />
  </Container>
)

const Features = props => (
  <Block layout='fourColumn'>
    {[
      {
        content: 'This is the content of my feature',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'top',
        title: 'Feature One'
      },
      {
        content: 'The content of my second feature',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'top',
        title: 'Feature Two'
      }
    ]}
  </Block>
)

const FeatureCallout = props => (
  <div
    className='productShowcaseSection paddingBottom'
    style={{ textAlign: 'center' }}
  >
    <h2>Feature Callout</h2>
    <MarkdownBlock>These are features of this project</MarkdownBlock>
  </div>
)

const LearnHow = props => (
  <Block background='light'>
    {[
      {
        content: 'Talk about learning how to use this',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'right',
        title: 'Learn How'
      }
    ]}
  </Block>
)

const TryOut = props => (
  <Block id='try'>
    {[
      {
        content: 'Talk about trying this out',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'left',
        title: 'Try it Out'
      }
    ]}
  </Block>
)

const Description = props => (
  <Block background='dark'>
    {[
      {
        content: 'This is another description of how this project is useful',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'right',
        title: 'Description'
      }
    ]}
  </Block>
)

const Showcase = ({ language }) => {
  if ((siteConfig.users || []).length === 0) {
    return null
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      )
    })

  return (
    <div className='productShowcaseSection paddingBottom'>
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className='logos'>{showcase}</div>
      <div className='more-users'>
        <a className='button' href={pageUrl('users.html', language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  )
}

module.exports = function Index ({ language }) {
  return (
    <div>
      <HomeSplash language={language || ''} />
      <div className='mainContainer'>
        <Features />
        <FeatureCallout />
        <LearnHow />
        <TryOut />
        <Description />
        <Showcase language={language || ''} />
      </div>
    </div>
  )
}
