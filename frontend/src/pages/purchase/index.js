import React, {Component} from 'react';
import api from '../../services/api';
// import {Link} from 'react-router-dom';
import {Card, Button, Table} from 'react-bootstrap/';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default class Purchase extends Component{
state = {
    purchases: [],
    purchaseInfo: {},
    page: 1,
}

    componentDidMount() {
        this.loadpurchases();
    }

    loadpurchases = async (page = 1) => {
        const response = await api.get(`/purchase?page=${page}`);

        const { docs, ...purchaseInfo } = response.data;

        this.setState({ purchases: docs, purchaseInfo, page  });

        console.log(response.data.docs);
    };

    prevPage = () => {
        const {page, purchaseInfo} = this.state;

        if(page === 1) return;

        const pageNumber = page-1;

        this.loadpurchases(pageNumber);
    }

    nextPage = () => {
        const {page, purchaseInfo} = this.state;

        if(page === purchaseInfo.pages) return;

        const pageNumber = page+1;

        this.loadpurchases(pageNumber);
    }

    render(){
        const { purchases, page, purchaseInfo } = this.state;

    return (
        <Card body>
            <Table striped bordered hover className="w-100" style={{textAlign: "center"}}>
                <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Endereço</th>
                      <th colspan="2">Detalhes</th>
                    </tr>
                </thead>
                {purchases.map(purchase => (
                <tbody key={purchase._id}>
                    <tr>
                      <td>{purchase.client}</td>
                      <td>{purchase.address}</td>
                      <td>
                            <Button className="ml-2 mr-2" variant="warning" href={`/purchase/${purchase._id}`}>Editar</Button>
                            <Button className="ml-2 mr-2" variant="warning" href={`/purchase/${purchase._id}`}>Editar</Button>
                        </td>
                    </tr>
                </tbody>
                ))}
            </Table>
            <div className="row justify-content-between">
                <Button className="ml-3" variant="info" disabled={page === 1} onClick={this.prevPage}><FaArrowLeft className="mr-1" />Anterior</Button>
                <Button className="mr-3" variant="info" disabled={page === purchaseInfo.pages} onClick={this.nextPage}>Próximo<FaArrowRight className="ml-1" /></Button>
            </div>
        </Card>
    )
    }
}