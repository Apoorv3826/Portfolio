import { Col, Button } from "react-bootstrap"

export const ProjectCard = ({ title, description, imgUrl, sourceCodeUrl}) => {
    return (
        <Col sm= {12} md = {6}>
            <div className="proj-imgbx">
                <img src={imgUrl } style={{ width: "100%", height: "100%" }} />
                <div className="proj-txtx">
                    <h4>{title}</h4>
                    <span>{description}</span>
                    {sourceCodeUrl && (
                        <Button
                            href={sourceCodeUrl}
                            target="_blank"
                            variant="primary"
                            className="source-code-btn"
                        >
                            Source Code
                        </Button>
                    )}
                </div>
            </div>
        </Col>
    )
}