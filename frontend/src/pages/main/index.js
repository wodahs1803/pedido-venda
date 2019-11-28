import React, {Component} from 'react';
// import api from '../../services/api';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FaHome, FaUserPlus, FaCartPlus } from 'react-icons/fa';

export default class Main extends Component{

    render(){
    return(
            <Card>
                <Card.Header><h2 className="m-2"><FaHome className="mr-1 mb-2" />Bem Vindo!</h2></Card.Header>
                <Card.Body>
                    <h5 style={{textAlign:"center"}}>Versão 1.0 Completa!</h5>
                    <div className="row justify-content-around">
                        <Link className="btn btn-outline-primary" to="/purchase">
                            <FaUserPlus className="mr-1 mb-2" />Pedidos
                            </Link>
                        <Link className="btn btn-outline-success" to="/item">
                            <FaCartPlus className="mr-1 mb-2" />Produtos
                            </Link>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}