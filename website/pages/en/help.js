const React = require("react");
const { translate } = require('../../server/translate.js')
const { Container, GridBlock } = require("../../core/CompLibrary.js");
const siteConfig = require(process.cwd() + "/siteConfig.js");

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content:
          "Learn more using the [documentation on this site.](/test-site/docs/en/doc1.html)",
        title: "Browse Docs"
      },
      {
        content: "Ask questions about the documentation and project",
        title: "Join the community"
      },
      {
        content: "Find out what's new with this project",
        title: "Stay up to date"
      }
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2><translate>Need help?</translate></h2>
            </header>
            <p><translate>This project is maintained by a dedicated group of people.</translate></p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
