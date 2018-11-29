import React from 'react'
import styled from 'react-emotion'

export default () => (
  <Container>
    <h1>Terms &amp; Conditions</h1>
    <p>
      This website (the “Website”) is operated by todoHQ. The Terms of Use set
      forth below are binding on all users of this Website. By directing your
      browser to this Website or otherwise accessing the pages of this Website,
      you accept these Terms of Use. todoHQ may change the Terms of Use, or may
      modify or discontinue the Website or services offered thereon, at any time
      at its sole discretion. todoHQ reserves the right, at its sole discretion,
      to deny further or continuing access to the Website to any visitor,
      including, without limitation, any user that todoHQ determines has
      violated any aspect of these Terms of Use. todoHQ reserves the right, at
      its sole discretion, to seek and obtain any other remedies available to it
      pursuant to any applicable laws and regulations or at equity as a result
      of your breach of these Terms of Use or any other act or omission by you
      that gives rise to a claim by todoHQ.
    </p>
    <h2>Personal safety</h2>
    <p>
      This is a todo list. There isn't anything that will harm you - it'll
      probably make you a better more efficient person.
    </p>
    <h1>Privacy</h1>
    <p>
      The only information todoHQ collects is a user's email address alongside
      their first and last name. Important and private information should be
      protected by you. We are not responsible for protecting, nor are we liable
      for failing to protect, the privacy of electronic mail or other
      information transferred through the Internet or any other network that you
      may utilize. The privacy policy is incorporated into and a part of these
      Terms of Use.
    </p>
    <h2>Security</h2>
    <p>
      todoHQ uses industry standard efforts, such as firewalls, to safeguard the
      confidentiality of your personally identifiable information. However,
      perfect security does not exist on the internet; todoHQ cannot and does
      not guarantee that any personally identifiable information provided to us
      will not become public under any circumstances.
    </p>
    <h2>Access and proprietary rights</h2>
    <p>
      The pages and content on this Website may not be copied, distributed,
      modified, published, or transmitted in any other manner, including use for
      creative work or to sell or promote other products. Violation of this
      restriction may result in infringement of intellectual property and
      contractual rights of todoHQ or third parties which is prohibited by law
      and could result in substantial civil and criminal penalties.
    </p>
    <p>
      You may not attempt to gain unauthorized access to any portion or feature
      of the Website, or any other systems or networks connected to the Website
      or to any todoHQ server, or to any of the services offered on or through
      the Website, by hacking, password “mining” or any other illegitimate
      means.
    </p>
    <p>
      You agree that you will not take any action that imposes an unreasonable
      or disproportionately large load on the infrastructure of the Website or
      todoHQ’s systems or networks, or any systems or networks connected to the
      Website or to todoHQ.
    </p>
    <p>
      You may not copy including any types of scrapping (web, screen, etc...) or
      reproduce the content in any way (including by email or other electronic
      means) without the prior written consent of todoHQ or from the orginal
      owner of the content. You may request consent by emailing a request to
      info@todoHQ.com. Your modification of the content, use of the content on
      any other Website or networked computer environment, or use of the content
      for any purpose, without the prior written consent of us violates the
      intellectual property rights and proprietary rights of the content owners
      and is prohibited.
    </p>
    <h2>Links</h2>
    <p>
      This Website may contain links to other websites that are not operated or
      controlled by todoHQ. Use of these links to access other Internet sites is
      at your own risk. todoHQ is not responsible for the accuracy, reliability
      or quality of any information or services provided or products sold at
      these sites. todoHQ establishes links to other websites for the
      convenience of its users; however, such links are not intended to be an
      endorsement of the other website.
    </p>
    <p>Thank you, now have a great day!</p>
  </Container>
)

const Container = styled.div`
  padding: 20px var(--basepadding);
  max-width: 500px;
  width: 100%;
  h1 {
    font-size: var(--fontlg);
    font-family: var(--secondaryfont);
    color: var(--white1);
  }
  h2 {
    font-size: var(--fontmd);
    color: var(--black4);
  }
  p {
    font-size: var(--fontsm);
    color: var(--white1);
  }
`
