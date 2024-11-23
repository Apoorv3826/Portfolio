import {Navbar, Container, Nav} from "react-bootstrap"
import { useEffect, useState } from "react"
import navIcon1 from "../assests/img/nav-icon1.svg"
import navIcon2 from "../assests/img/image2vector.svg"
import navIcon4 from "../assests/img/hackerrank-svgrepo-com.svg"
import navIcon5 from "../assests/img/github-svgrepo-com.svg"


export const NavBar = () =>{

    const [activeLink, setActiveLink] = useState('home')
    const [scrolled, seeScrolled] = useState(false)

    useEffect( ()=> {

        const onScroll = () => {
            if(window.scrollY > 50){
                seeScrolled(true)
            } else{
                seeScrolled(false)
            }
        }

        window.addEventListener('scroll', onScroll);

        return ()=> window.removeEventListener("scroll", onScroll)

    }, [] )

    const onUpdateActiveLink = (value) =>{
        setActiveLink(value)
    }

    return(
        <Navbar expand="lg" className = {scrolled ? "scrolled" : ""} > 
        <Container>

            <h1>Portfolio</h1>

            <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className="navbar-toggle-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#home" className = {activeLink === 'home' ? 'active navbar-link': 'navbar-link'} onClick = { ()=> onUpdateActiveLink('home') } >Home</Nav.Link>
                <Nav.Link href="#skills" className = {activeLink === 'skills' ? 'active navbar-link': 'navbar-link'} onClick = { ()=> onUpdateActiveLink('skills') } >Skills</Nav.Link>
                <Nav.Link href="#projects" className = {activeLink === 'projects' ? 'active navbar-link': 'navbar-link'} onClick = { ()=> onUpdateActiveLink('projects') } >Projects</Nav.Link>
                </Nav>
                <span className="navbar-text" alt="Logo">
                    <div className="social-icon">
                        <a href="https://github.com/Apoorv3826"> <img src={navIcon5} /> </a>
                        <a href="https://www.linkedin.com/in/apoorv-singh-a7b79b224/"> <img src={navIcon1} /> </a>
                        <a href="https://www.codechef.com/users/apoorv386"> <img src={navIcon2} /> </a>
                        <a href="https://www.hackerrank.com/profile/singhapoorv350"> <img src={navIcon4} /> </a>
                    </div>
                    <button className="vvd" onClick={ ()=> console.log('connect')} >
                        <span> Let's Connect</span>
                    </button>
                </span>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}