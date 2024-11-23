import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import meter1 from '../assests/img/meter1.svg'
import meter2 from '../assests/img/meter2.svg'
import meter3 from '../assests/img/meter3.svg'
import colorSharp from '../assests/img/color-sharp.png'

export const Skills = () => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      return (
        <section className='skill' id='skills'>
            <Container>
                <Row>
                    <Col>
                    <div className='skill-bx'>
                        <h2>
                            Skills
                        </h2>
                        <p>
                        With a solid foundation in full-stack development, cybersecurity, and Competitive Programming,<br />
                        I bring expertise in languages like Java, C++, Python, and frameworks like React and SpringBoot.<br />
                        I have hands-on experience building and deploying scalable applications, while ensuring optimal security practices.<br />
                        My knowledge spans across front-end and back-end technologies, including databases like MongoDB and MySQL,<br />
                        and tools such as Git and Linux systems.<br />
                        I am always eager to enhance my skill set by embracing new technologies and challenges.
                        </p>

                        <Carousel responsive={responsive} infinite={true} className='skill-slider'>
                            <div className='item'>
                                <img src={meter1} alt='image'/>
                                <h5>Web Development</h5>
                            </div>

                            <div className='item'>
                                <img src={meter2} alt='image'/>
                                <h5>Competitve Programming</h5>
                            </div>

                            <div className='item'>
                                <img src={meter3} alt='image'/>
                                <h5>UI / UX Designer</h5>
                            </div>

                            <div className='item'>
                                <img src={meter1} alt='image'/>
                                <h5>CyberSecurity</h5>
                            </div>
                        </Carousel>
                    </div>
                    </Col>
                </Row>
            </Container>
            <img className='background-image-left' src={colorSharp} />
        </section>
      )
}