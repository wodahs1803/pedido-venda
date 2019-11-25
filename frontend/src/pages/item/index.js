import React, {Component} from 'react';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {Card, Button, Table, Form} from 'react-bootstrap/';
import { FaArrowRight, FaArrowLeft, FaPlusCircle, FaSave } from 'react-icons/fa';

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
            this.loaditems();
        }
    }

    render(){
        const { items, page, itemInfo } = this.state;

    return (
        <Card body>
            <div className="row justify-content-end">
            <Link className="btn btn-primary mr-3 mb-3" to="/item/create"><FaPlusCircle className="mr-1 mb-1" />Criar</Link>
            </div>
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
                      <td>{item.price}</td>
                      <td>
                            <Link className="btn btn-warning mr-5" to={`/item/${item._id}`}>Editar</Link>
                            <Link className="btn btn-danger mr-5" onClick={() => this.deleteItem(item._id)}>Excluir</Link>
                            
                        </td>
                    </tr>
                </tbody>
                ))}
            </Table>
            <div className="row justify-content-between mt-3">
                <Button className="ml-3" variant="info" disabled={page === 1} onClick={this.prevPage}><FaArrowLeft className="mr-1 mb-1" />Anterior</Button>
                <Button className="mr-3" variant="info" disabled={page === itemInfo.pages} onClick={this.nextPage}>Próximo<FaArrowRight className="ml-1 mb-1" /></Button>
            </div>
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
                    <Button variant="primary" type="submit">
                        <FaPlusCircle className="mr-1 mb-1" />Criar
                    </Button>
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
        // await this.props.history.push('/item');
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
                <Button variant="primary" type="submit">
                    <FaSave className="mr-1 mb-1" />Atualizar
                </Button>
            </Form>
        </Card>
    )
    }
}