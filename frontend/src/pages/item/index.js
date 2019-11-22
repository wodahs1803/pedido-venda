import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import {Card, Button, Table} from 'react-bootstrap/';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default class Item extends Component{
state = {
    items: [],
    itemInfo: {},
    page: 1,
}

    componentDidMount() {
        this.loaditems();
    }
        
    
    loaditems = async (page = 1) => {
        const response = await api.get(`/item?page=${page}`);

        const { docs, ...itemInfo } = response.data;

        this.setState({ items: docs, itemInfo, page  });

        console.log(response.data.docs);
    };

    prevPage = () => {
        const {page, itemInfo} = this.state;

        if(page === 1) return;

        const pageNumber = page-1;

        this.loaditems(pageNumber);
    }

    nextPage = () => {
        const {page, itemInfo} = this.state;

        if(page === itemInfo.pages) return;

        const pageNumber = page+1;

        this.loaditems(pageNumber);
    }

    // async deleteItem(id){
    //     if(window.confirm('Deseja Excluir este Produto?')){
    //         await api.delete(`item/${id}`);
    //         this.loaditems();
    //     }
    // }

    render(){
        const { items, page, itemInfo } = this.state;

    return (
        <Card body>
            <Table striped bordered hover className="w-100" style={{textAlign: "center"}}>
                <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th colspan="2">Detalhes</th>
                    </tr>
                </thead>
                {items.map(item => (
                <tbody key={item._id}>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                            <Link className="btn btn-warning mr-5" to={`/item/${item._id}`}>Editar</Link>
                            <Button className="btn btn-danger mr-5">Excluir</Button>
                            {/* onClick={this.deleteItem(item._id)} */}
                        </td>
                    </tr>
                </tbody>
                ))}
            </Table>
            <div className="row justify-content-between mt-3">
                <Button className="ml-3" variant="info" disabled={page === 1} onClick={this.prevPage}><FaArrowLeft className="mr-1" />Anterior</Button>
                <Button className="mr-3" variant="info" disabled={page === itemInfo.pages} onClick={this.nextPage}>Próximo<FaArrowRight className="ml-1" /></Button>
            </div>
        </Card>
        
    )
    }
}