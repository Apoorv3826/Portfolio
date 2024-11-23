import { Col, Container, Row , Nav, Tab } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard.js";
import colorSharp2 from "../assests/img/color-sharp2.png";
import projImg1 from "../assests/img/Screenshot-1.png";
import projImg2 from "../assests/img/Screenshot-2.png";
import projImg3 from "../assests/img/Screenshot-3.png";
import projImg4 from "../assests/img/Bug tracking system.jpg";
import 'animate.css';
import TrackVisibility from 'react-on-screen'

export const Projects = () => {

    const projects = [
        {
          title: "Movie Review Webapp",
          description: `Developed a dynamic movie review web app using ReactJS, Spring Boot, and MongoDB,
                        enabling users to watch trailers, write reviews, and engage with a community of movie enthusiasts.
                        Features include user authentication, real-time review updates, and a seamless user interface.`,
          imgUrl: projImg1,
          sourceCodeUrl: "https://github.com/Apoorv3826/Movie_Review_webapp.git"
        },
        {
          title: "Lama ChatBot",
          description: "Developed Lama, an AI-powered real-time chat application using ReactJS, ExpressJS, and MongoDB, enabling smooth and secure user interactions. Features include an intuitive user interface, efficient message handling, and seamless communication.",
          imgUrl: projImg2,
          sourceCodeUrl: "https://github.com/Apoorv3826/ChatBot"
        },
        {
          title: "CRUD application",
          description: "Created a robust CRUD application using ReactJS and Spring Boot, allowing users to perform create, read, update, and delete operations efficiently. The application features a user-friendly interface, seamless data handling, and real-time updates.",
          imgUrl: projImg3,
          sourceCodeUrl: "https://github.com/Apoorv3826/springrest"
        },
        {
          title: "Bug Tracker",
          description: "Developed a bug tracking software using Java, JavaFX, and MySQL that enhances collaboration between project managers and developers. This desktop application features role-based access, user authentication, and dedicated dashboards, enabling users to efficiently manage projects and assign bugs.",
          imgUrl: projImg4,
          sourceCodeUrl: "https://github.com/Apoorv3826/springrest"
        }
      ];

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col>
                    <TrackVisibility>
                        {({ isVisible }) => 
                            <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                            <h2>Projects</h2>
                            <p>
                                Explore my diverse portfolio of projects, ranging from AI-powered applications to full-stack web solutions.<br />
                                Each project reflects my passion for solving complex problems with creative, efficient, and user-centered solutions.
                            </p>

                            </div>
                        }
                    </TrackVisibility>               
                    <Row>
                            {projects.map((project, index) => (
                                <ProjectCard key={index} {...project} />
                            ))}
                    </Row>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}></img>
        </section>
    )
}