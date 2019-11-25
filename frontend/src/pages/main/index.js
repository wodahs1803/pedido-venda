import React, {Component} from 'react';
// import api from '../../services/api';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default class Main extends Component{

    render(){
    return(
            <Card>
                <Card.Header><h2 className="m-2">Bem Vindo!</h2></Card.Header>
                <Card.Body>
                    <h5 style={{textAlign:"center"}}>Não sei o que mais por aqui!</h5>
                    <div className="row justify-content-around">
                        <Link className="btn btn-outline-primary" to="/purchase">Pedidos</Link>
                        <Link className="btn btn-outline-success" to="/item">Produtos</Link>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}