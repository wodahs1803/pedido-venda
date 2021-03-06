import React, {Component} from 'react';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {Card, Button, Table, Form} from 'react-bootstrap/';
import { FaArrowRight, FaArrowLeft, FaPlusCircle, 
         FaSave, FaShoppingCart, FaPencilAlt, 
         FaTrashAlt 
} from 'react-icons/fa';

export class Item extends Component{
state = {
    items: [],
    itemInfo: {},
    page: 1,
}

    componentDidMount() {
        this.loaditems();
    }

    componentDidUpdate() {
        if(this.state.itemInfo.pages > 1) return;
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

    async deleteItem(id){
        if(window.confirm('Deseja Excluir este Produto?')){
            await api.delete(`item/${id}`);
            this.loaditems(this.state.page);
        }
    }

    render(){
        const { items, page, itemInfo } = this.state;

    return (
        <Card>
        <Card.Header><h3><FaShoppingCart className="mr-1 mb-1" />Produtos</h3></Card.Header>
        <Card.Body>
            <div className="row justify-content-between ml-1 mr-1 mb-3">
                <Link className="btn btn-outline-secondary mb-1" to="/">
                    <FaArrowLeft className="mr-1 mb-1" />Voltar
                    </Link>
                <Link className="btn btn-outline-primary mb-1" to="/item/create">
                    <FaPlusCircle className="mr-1 mb-1" />Criar
                    </Link>
            </div>
            <div style={{overflowX: "auto"}}>
            <Table striped bordered hover className="w-100" style={{textAlign: "center"}}>
                <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th colSpan="2">Detalhes</th>
                    </tr>
                </thead>
                {items.map(item => (
                <tbody key={item._id}>
                    <tr>
                      <td>{item.name}</td>
                      <td>${Number(item.price).toFixed(2)}</td>
                      <td>
                            <Link className="btn btn-outline-warning mr-5 mb-1" to={`/item/${item._id}`}>
                                <FaPencilAlt className="mr-1 mb-1" />Editar
                                </Link>
                            <Link className="btn btn-outline-danger mr-5 mb-1" onClick={() => this.deleteItem(item._id)}>
                                <FaTrashAlt className="mr-1 mb-1" />Excluir
                                </Link>
                        </td>
                    </tr>
                </tbody>
                ))}
            </Table>
            </div>
            <div className="row justify-content-between mt-3">
                <Button className="ml-3 mr-3 mb-1" variant="outline-info" disabled={page === 1} onClick={this.prevPage}><FaArrowLeft className="mr-1 mb-1" />Anterior</Button>
                <Button className="ml-3 mr-3 mb-1" variant="outline-info" disabled={page === itemInfo.pages} onClick={this.nextPage}>Próximo<FaArrowRight className="ml-1 mb-1" /></Button>
            </div>
        </Card.Body>
        </Card>
    )
    }
}

export class ItemCreate extends Component{

        constructor(props){
            super(props);
            this.state = {name: '', price: '', redirect:false};
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangePrice = this.onChangePrice.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }    

        onChangeName(e){
            this.setState({
                name: e.target.value
            });
        }

        onChangePrice(e){
            this.setState({
                price: e.target.value
            });
        }

        async handleSubmit() {
            api.post('/item', {name: this.state.name, price: this.state.price}).then(alert('Produto Cadastrado com Sucesso'));
            this.setState({redirect: true});
        }

        render(){
            if (this.state.redirect === true) {
                return <Redirect to='/item' />
            }
        return (
            <Card body>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Nome do Produto</Form.Label>
                        <Form.Control type="text" placeholder="Insira um nome" onChange={this.onChangeName}/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder="Insira o preço" onChange={this.onChangePrice}/>
                    </Form.Group>
                    <div className="row mr-1 ml-1 mt-2">
                    <Link className="btn btn-outline-secondary mb-1" to="/item">
                        <FaArrowLeft className="mr-1 mb-1" />Voltar
                    </Link>
                    <Button variant="outline-primary ml-1 mb-1" type="submit">
                        <FaPlusCircle className="mr-1 mb-1" />Criar
                    </Button>
                    </div>
                </Form>
            </Card>
        )
        }
}

export class ItemForm extends Component{
    constructor(props){
        super(props);
        this.state = {id: '', name: '', price: '', redirect:false};
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    async componentDidMount(){
        const { id } = this.props.match.params;

        const response = await api.get(`/item/${id}`);
        this.setState({id: id, name: response.data.name, price:response.data.price});
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        });
    }

    async handleSubmit(e) {
        api.put(`/item/${this.state.id}`, {name: this.state.name, price: this.state.price}).then(alert('Produto Atualizado com Sucesso'));
        this.setState({redirect: true});
    }

    render(){
    const data = this.state;

    if (this.state.redirect === true) {
        return <Redirect to='/item' />
    }

    return (
        <Card body>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Nome do Produto</Form.Label>
                    <Form.Control value={data.name} type="text" placeholder="Insira um nome" onChange={this.onChangeName}/>
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control value={data.price} type="number" step="0.01" placeholder="Insira o preço" onChange={this.onChangePrice}/>
                </Form.Group>
                <div className="row mr-1 ml-1 mt-2">
                    <Link className="btn btn-outline-secondary mb-1" to="/item">
                        <FaArrowLeft className="mr-1 mb-1" />Voltar
                    </Link>
                    <Button variant="outline-primary ml-1 mb-1" type="submit">
                        <FaSave className="mr-1 mb-1" />Atualizar
                    </Button>
                    </div>
            </Form>
        </Card>
    )
    }
}