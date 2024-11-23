import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import contactImg from '../assests/img/contact-img.svg';

export const Contact = () => {

    const formIntitalDetails = {
        firstname : "",
        lastname : "",
        email : "",
        phone : "",
        message : ""
    }

    const [formDetails, setFormDetails] = useState(formIntitalDetails);
    const [buttonText, setButtonText] = useState('Send')
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category] : value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setButtonText('Sending....')
        try{
            let response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formDetails),
              });

              if (!response.ok) { // Add handling for non-OK status codes
                throw new Error(`Server error: ${response.status}`);
            }
            let result = await response.json();
            setFormDetails(formIntitalDetails);
            setStatus({ success: true, message: 'Message sent successfully' });
        }
        //   setButtonText("Send");
        //   let result = await response.json();
        //   setFormDetails(formIntitalDetails);
        //   if (result.code == 200) {
        //     setStatus({ succes: true, message: 'Message sent successfully'});
        //   } else {
        //     setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
        //   }
        catch (error) {
            console.error("Error in handleSubmit:", error);
            setStatus({ success: false, message: 'Something went wrong, please try again later.' });
        } finally {
            setButtonText("Send");
        }
    };

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md = {6}>
                        <img src={contactImg} />
                    </Col>
                    <Col md = {6}>
                        <h2>Get in touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.firstname} placeholder="First Name" onChange={(e) => onFormUpdate('firstname', e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.lastname} placeholder="Last Name" onChange={(e) => onFormUpdate('lastname', e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="email" value={formDetails.email} placeholder="Email" onChange={(e) => onFormUpdate('email', e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="tel" value={formDetails.phone} placeholder="Phone Number" onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                                </Col>
                                <Col>
                                    <textarea row = "6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} ></textarea>
                                    <button type="submit"> <span>{buttonText}</span> </button>
                                </Col>
                                {
                                    status.message && 
                                    <Col>
                                        <p className= {status.success === false ? "danger" : "success"}> {status.message} </p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}