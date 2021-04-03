import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Icons from 'react-icons/fa';

export const FooterComponent = () => {
    return (
        <div>
            <footer className="text-white font-small pt-4 mt-4" style={{background:'rgba(55, 55, 55, 0.9)'}}>
                <Container>
                    <Row className="pt-5 mb-3 text-center d-flex justify-content-center">
                        <Col md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!" style={{textDecoration:'none', color:'white'}}>ABOUT US</a>
                            </h6>
                        </Col>
                        <Col md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!" style={{textDecoration:'none', color:'white'}}>DESTINATIONS</a>
                            </h6>
                        </Col>
                        <Col md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!" style={{textDecoration:'none', color:'white'}}>GALLERY</a>
                            </h6>
                        </Col>
                        <Col md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!" style={{textDecoration:'none', color:'white'}}>HELP</a>
                            </h6>
                        </Col>
                        <Col md="2" className="b-3">
                            <h6 className="title font-weight-bold">
                                <a href="#!" style={{textDecoration:'none', color:'white'}}>CONTACT</a>
                            </h6>
                        </Col>
                    </Row>
                    <hr className="" style={{ background:'rgba(255,255,255, 0.3)', margin: "0 15%" }} />
                    <Row className="d-flex text-center justify-content-center mb-md-0 mb-4">
                        <Col md="8" sm="12" className="mt-5">
                            <p style={{ lineHeight: "1.7rem" }}>
                                We are Bedkot Tours and Travels. We are a registered company. We are awesome.
                                We are very good. Our customer reviews are also awesome. We are Bedkot Tours and Travels. 
                                We are a registered company. We are awesome. We are very good. Our customer reviews are also 
                                awesome. We are Bedkot Tours and Travels. We are a registered company. We are awesome. We are 
                                very good. Our customer reviews are also awesome. We are Bedkot Tours and Travels. We are a 
                                registered company. We are awesome. We are very good. Our customer reviews are also awesome.</p>
                        </Col>
                    </Row>
                    <Row className="pb-3">
                        <Col md="12">
                            <div className="mb-5 d-flex justify-content-center">
                                <a className="fb-ic" href="www.facebook.com">
                                    <Icons.FaFacebook className="mr-md-4" />
                                </a>
                                <a className="ins-ic" href="www.instagram.com">
                                    <Icons.FaInstagram className="mr-md-4" />
                                </a>
                                <a className="fb-ic" href="www.twitter.com">
                                    <Icons.FaTwitter className="mr-md-4" />
                                </a>
                                <a className="fb-ic" href="www.linkedin.com">
                                    <Icons.FaLinkedinIn className="mr-md-4" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="text-center bg-dark py-3">
                    <Container fluid>
                        &copy; {new Date().getFullYear()} Copyright: Prakash Bohara
                    </Container>
                </div>

            </footer>
        </div>
    )
}
export default FooterComponent;