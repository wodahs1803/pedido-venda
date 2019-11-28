import React, {Component} from 'react';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {Card, Button, Table, Form} from 'react-bootstrap/';
import {
        FaArrowRight, FaArrowLeft, FaPlusCircle, 
        FaSave, FaPortrait, FaPencilAlt, 
        FaTrashAlt, FaShoppingCart, FaCartPlus
        } from 'react-icons/fa';

export class Purchase extends Component{
state = {
    purchases: [],
    purchaseInfo: {},
    page: 1,
}

    componentDidMount() {
        this.loadpurchases();
    }

    componentDidUpdate() {
        if(this.state.purchaseInfo.pages > 1) return;
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

    async deletePurchase(id){
        if(window.confirm('Deseja Excluir esta Compra?')){
            await api.delete(`purchase/${id}`);
            this.loadpurchases(this.state.page);
        }
    }

    render(){
        const { purchases, page, purchaseInfo } = this.state;

    return (
        <Card>
        <Card.Header><h3><FaPortrait className="mr-1 mb-1" />Pedidos</h3></Card.Header>
        <Card.Body>
            <div className="row justify-content-between mr-1 ml-1 mb-3">
            <Link className="btn btn-outline-secondary" to="/">
                    <FaArrowLeft className="mr-1 mb-1" />Voltar
                    </Link>
            <Link className="btn btn-outline-primary" to="/purchase/create"><FaPlusCircle className="mr-1 mb-1" />Criar</Link>
            </div>
            <div style={{overflowX: "auto"}}>
            <Table striped bordered hover className="w-100" style={{textAlign: "center"}}>
                <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Endereço</th>
                      <th colSpan="3">Detalhes</th>
                    </tr>
                </thead>
                {purchases.map(purchase => (
                <tbody key={purchase._id}>
                    <tr>
                        <td>{purchase.client}</td>
                        <td>{purchase.address}</td>
                        <td>
                        <Link className="btn btn-outline-warning mr-5 mb-1" to={`/purchase/${purchase._id}`}>
                            <FaPencilAlt className="mr-1 mb-1" />Editar
                            </Link>
                        <Link className="btn btn-outline-danger mr-5 mb-1" onClick={() => this.deletePurchase(purchase._id)}>
                            <FaTrashAlt className="mr-1 mb-1" />Excluir
                            </Link>
                        <Link className="btn btn-outline-success mr-5 mb-1" to={`/purchase/list/${purchase._id}`}>
                            <FaShoppingCart className="mr-1 mb-1" />Compra
                            </Link>
                        <Link className="btn btn-outline-primary mr-5 mb-1" to={`/purchase/add/${purchase._id}`}>
                            <FaCartPlus className="mr-1 mb-1" />Cadastrar Itens
                            </Link>
                        </td>
                    </tr>
                </tbody>
                ))}
            </Table>
            </div>
            <div className="row justify-content-between">
                <Button className="ml-3 mr-3 mb-1" variant="outline-info" disabled={page === 1} onClick={this.prevPage}><FaArrowLeft className="mr-1" />Anterior</Button>
                <Button className="ml-3 mr-3 mb-1" variant="outline-info" disabled={page === purchaseInfo.pages} onClick={this.nextPage}>Próximo<FaArrowRight className="ml-1" /></Button>
            </div>
        </Card.Body>
        </Card>
    )
    }
}

export class PurchaseCreate extends Component{

    constructor(props){
        super(props);
        this.state = {client: '', address: '', redirect:false};
        this.onChangeClient = this.onChangeClient.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    onChangeClient(e){
        this.setState({
            client: e.target.value
        });
    }

    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }

    async handleSubmit() {
        api.post('/purchase', {client: this.state.client, address: this.state.address}).then(alert('Compra Cadastrada com Sucesso'));
        this.setState({redirect: true});
    }

    render(){
        if (this.state.redirect === true) {
            return <Redirect to='/purchase' />
        }
    return (
        <Card body>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="client">
                    <Form.Label>Nome do Cliente</Form.Label>
                    <Form.Control type="text" placeholder="Insira o nome" onChange={this.onChangeClient}/>
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" placeholder="Insira o Endereço" onChange={this.onChangeAddress}/>
                </Form.Group>
                <div className="row ml-1 mr-1 mt-2">
                <Link className="btn btn-outline-secondary mb-1" to="/purchase">
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

export class PurchaseForm extends Component{
    constructor(props){
        super(props);
        this.state = {id: '', client: '', address: '', redirect:false};
        this.onChangeClient = this.onChangeClient.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }       

    async componentDidMount(){
        const { id } = this.props.match.params;

        const response = await api.get(`/purchase/${id}`);
        this.setState({id: id, client: response.data.client, address: response.data.address});
    }

    onChangeClient(e){
        this.setState({
            client: e.target.value
        });
    }

    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    } 

    async handleSubmit() {
        api.put(`/purchase/${this.state.id}`, {client: this.state.client, address: this.state.address}).then(alert('Pedido Atualizado com Sucesso'));
        this.setState({redirect: true});
    }

    render(){
    const data = this.state;

    if (this.state.redirect === true) {
        return <Redirect to='/purchase' />
    }
    return (
        <Card body>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="client">
                    <Form.Label>Nome do Cliente</Form.Label>
                    <Form.Control value={data.client} type="text" placeholder="Insira o Nome" onChange={this.onChangeClient}/>
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control value={data.address} type="text" placeholder="Insira o Endereço" onChange={this.onChangeAddress}/>
                </Form.Group>
                <div className="row ml-1 mr-1 mt-2">
                <Link className="btn btn-outline-secondary mb-1" to="/purchase">
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

export class PurchaseList extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: [],
            purchases: [],
            redirect:false
        };
    } 
    
        componentDidMount() {
            this.loadpurchases();
        }
    
        loadpurchases = async (page = 1) => {
            const { id } = this.props.match.params;
            const response = await api.get(`/purchase/list/${id}?page=${page}`);
            if(response.data === undefined) return;

            console.log(response.data);
            this.setState({ id: id, purchases: response.data  });
        };
    
        prevPage = () => {
            const { page } = this.state;
    
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
    
        async deleteItem(id){
            if(window.confirm('Deseja Excluir este Item?')){
                await api.delete(`purchase/list/${id}`);
                this.loadpurchases();
            }
        }

        render(){
            const { purchases } = this.state;
    
        return (
            <Card>
            <Card.Header><h3><FaShoppingCart className="mr-2 mb-1" />Detalhes da Compra</h3></Card.Header>
            <Card.Body>
                <div className="row justify-content-between mr-1 ml-1 mb-2">
                    <Link className="btn btn-outline-secondary mb-1" to="/purchase">
                        <FaArrowLeft className="mr-1 mb-1" />Voltar
                        </Link>
                    <Link className="btn btn-outline-primary mb-1" to={`/purchase/add/${this.state.id}`}>
                        <FaCartPlus className="mr-1 mb-1" />Cadastrar Itens
                        </Link>
                    </div>
                <div style={{overflowX: "auto"}}>
                <Table striped bordered hover className="w-100" style={{textAlign: "center"}}>
                    <thead>
                        <tr>
                          <th>Item</th>
                          <th>Preço</th>
                          <th>Quantidade</th>
                          <th>Preço Total</th>
                          <th>Remover</th>
                        </tr>
                    </thead>
                    {purchases.map(purchase => (
                    <tbody key={purchase._id}>
                        <tr>
                            <td>{purchase.item_id[0].name}</td>
                            <td>${Number(purchase.item_id[0].price).toFixed(2)}</td>
                            <td>{purchase.quantity}</td>
                            <td>${Number(purchase.item_id[0].price * purchase.quantity).toFixed(2)}</td>
                            <td>
                                <Link className="btn btn-outline-danger" onClick={() => this.deleteItem(purchase._id)}>
                                    <FaTrashAlt className="mr-1 mb-1" />Remover
                                    </Link>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                </Table>
                </div>
            </Card.Body>
            </Card>
        )
        }
}

export class PurchaseAdd extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: [],
            items: [],
            item: [],
            quantity: [],
        };
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 
    
        componentDidMount() {
            this.loaditems();
        }
    
        loaditems = async () => {
            const { id } = this.props.match.params;
            const response = await api.get(`/item/all`);
            if(response.data === undefined) return;
            this.setState({ id: id, items: response.data  });

            console.log(response.data);
        }; 
    
        onChangeItem(e){
            this.setState({
                item: e.target.value
            });
        }

        onChangeQuantity(e){
            this.setState({
                quantity: e.target.value
            });
        }
    
        async handleSubmit(e) {
            console.log(this.state.item);
            console.log(this.state.quantity);
            console.log(this.state.id);
            api.post(`/purchase/list`, {item_id: this.state.item, purchase_id: this.state.id, quantity: this.state.quantity}).then(alert('Produto Adicionado!'));
        }
    
        render(){
            const { items } = this.state;
    
        return (
            <Card>
            <Card.Header><h3><b><FaCartPlus className="mr-2 mb-1" />Selecione um Produto</b></h3></Card.Header>
            <Card.Body>
                <div className="row justify-content-between ml-1 mr-1 mb-2">
                    <Link className="btn btn-outline-secondary mb-1" to={`/purchase/list/${this.state.id}`}>
                        <FaArrowLeft className="mr-1 mb-1" />Voltar
                        </Link>
                    </div>
                <Card body style={{backgroundColor: "#f7f7f7"}}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="row">
                        <div className="col">
                            <Form.Label for="item">Selecione um Item</Form.Label>
                                <Form.Control required id="item" as="select" onChange={this.onChangeItem}>
                                        <option value="" label="Selecione um Item"/>
                                        {items.map(item => (
                                            <option value={item._id} label={item.name}/>
                                        ))}
                                    </Form.Control>
                            </div>
                        <div className="col">
                            <Form.Label for="quantity">Quantidade</Form.Label>
                                <Form.Control required id="quantity" type="number" step="1" placeholder="Quantidade" onChange={this.onChangeQuantity}/>
                            </div>
                        </Form.Group>
                        <Button variant="outline-primary mb-1" type="submit">
                            <FaCartPlus className="mr-1 mb-1" />Cadastrar
                        </Button>
                    </Form>
                    </Card>
            </Card.Body>
            </Card>
            )
        }
}