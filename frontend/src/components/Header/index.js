import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaHome, FaPortrait, FaShoppingCart } from 'react-icons/fa';

const Header = () => (
    <Navbar sticky="top" style={{ backgroundColor: '#220052' }} variant="dark">
        <Navbar.Brand href="/"><FaHome className="mr-1 mb-1" />Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
                <Nav.Link href="/purchase"><FaPortrait className="mr-1 mb-1" />Pedidos</Nav.Link>
                <Nav.Link href="/item"><FaShoppingCart className="mr-1 mb-1" />Produtos</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;