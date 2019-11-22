import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => (
    <Navbar style={{ backgroundColor: '#220052' }} variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
                <Nav.Link href="/purchase">Pedidos</Nav.Link>
                <Nav.Link href="/item">Produtos</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;