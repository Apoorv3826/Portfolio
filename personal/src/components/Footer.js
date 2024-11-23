import { Col, Container, Row } from "react-bootstrap"
import navIcon1 from "../assests/img/nav-icon1.svg"
import navIcon2 from "../assests/img/nav-icon2.svg"
import navIcon3 from "../assests/img/nav-icon3.svg"

export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    <Col sm = {6}>
                        <h2>Portfolio</h2>
                    </Col>
                    <Col sm = {6} className="text-center text-sm-end">
                        <div className="social-icon">
                            <a href=""><img src={navIcon1}/></a>
                            <a href=""><img src={navIcon2}/></a>
                            <a href=""><img src={navIcon3}/></a>
                        </div>
                        <p>By Apoorv Singh</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}