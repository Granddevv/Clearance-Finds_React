import React, {useEffect, useState} from 'react';
import './MyLayout.css';
import {
    Button,
    Col,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    ListGroup,
    ListGroupItem,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import fetch from "isomorphic-unfetch";

const Layout = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setQuery] = useState('');
    const [leftMenu, setLeftMenu] = useState(false);
    const [page, setPage] = useState(1);


    const toggle = () => setIsOpen(!isOpen);
    const changeSearch = (event) => {
        setQuery(event.target.value);
    };

    const search = (event) => {
        if (searchQuery.length > 0)
            searchWithoutEvent()
        event.preventDefault();
    };

    const searchWithoutEvent = () => {
        fetch('https://api.clearancefinds.club/goods?q=' + searchQuery).then(function (response) {
            response.json().then(data => {
                props.handleSearch(data);
                setPage(1);
            });

        });
    }

    const handleLeftMenu = (event) => {
        const q = event.currentTarget.textContent;
        setLeftMenu(true);
        setQuery(q);
    }

    useEffect(() => {// eslint-disable-next-line
        if (leftMenu) {
            setLeftMenu(false);// eslint-disable-next-line
            searchWithoutEvent();
        }// eslint-disable-next-line
    }, [searchQuery]);

    const nextPage = (event) => {
        let url = 'https://api.clearancefinds.club/goods?page=' + (page + 1);
        if (searchQuery.length > 0) url += "&q=" + searchQuery;
        fetch(url).then(function (response) {
            response.json().then(data => {
                props.handleNextPage(data);
                setPage(page + 1);
            });
        });
    };
    return (
        <div className='bg'>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Clearance Finds</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    </Nav>
                </Collapse>
            </Navbar>
            <Container>
                <Row>
                    <Col lg="3">
                        <h1 className="my-4">Categories</h1>
                        <ListGroup>
                            <ListGroupItem onClick={handleLeftMenu} data-query={'Halloween'}>Halloween</ListGroupItem>
                            <ListGroupItem onClick={handleLeftMenu} data-query={'Shoes'}>Shoes</ListGroupItem>
                            <ListGroupItem onClick={handleLeftMenu} data-query={'Women'}>Women</ListGroupItem>
                            <ListGroupItem onClick={handleLeftMenu} data-query={'Men'}>Men</ListGroupItem>
                            <ListGroupItem onClick={handleLeftMenu} data-query={'Kids'}>Kids</ListGroupItem>
                            <ListGroupItem onClick={handleLeftMenu} data-query={'Clothing'}>Clothing</ListGroupItem>
                            <ListGroupItem onClick={handleLeftMenu} data-query={'Beauty'}>Beauty</ListGroupItem>

                        </ListGroup>
                    </Col>
                    <Col lg="9">
                        <Container>
                            <Row className="py-2 my-2">
                                <Col lg={12} md={6} sm={4}>
                                    <Form onSubmit={search}>
                                        <InputGroup>
                                            <Input value={searchQuery} onChange={changeSearch}/>
                                            <InputGroupAddon
                                                addonType="prepend"><Button>Search</Button></InputGroupAddon>
                                        </InputGroup>
                                    </Form>

                                </Col>
                            </Row>
                        </Container>
                        {props.children}
                        <Row className="my-2">
                            <Col lg={12} style={{textAlign: 'center'}}>
                                <Button style={{width: 500}} color="light" onClick={nextPage}>Next Page</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>


            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; Clearancefinds 2019</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
