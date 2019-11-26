import React, {Component} from 'react';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {Card, Button, Table, Form} from 'react-bootstrap/';
import { FaArrowRight, FaArrowLeft, FaPlusCircle, FaSave } from 'react-icons/fa';

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
        <Card.Header><h3>Pedidos</h3></Card.Header>
        <Card.Body>
            <div className="row justify-content-end">
            <Link className="btn btn-outline-primary mr-3 mb-3" to="/purchase/create"><FaPlusCircle className="mr-1 mb-1" />Criar</Link>
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
                        <Link className="btn btn-outline-warning mr-5 mb-1" to={`/purchase/${purchase._id}`}>Editar</Link>
                        <Link className="btn btn-outline-danger mr-5 mb-1" onClick={() => this.deletePurchase(purchase._id)}>Excluir</Link>
                        <Link className="btn btn-outline-success mr-5 mb-1" to={`/purchase/list/${purchase._id}`}>Compra</Link>
                        <Link className="btn btn-outline-primary mr-5 mb-1" to={`/purchase/add/${purchase._id}`}>Cadastrar Itens</Link>
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
                <Button variant="outline-primary" type="submit">
                    <FaPlusCircle className="mr-1 mb-1" />Criar
                </Button>
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

    async handleSubmit(e) {
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
                <Button variant="outline-primary" type="submit">
                    <FaSave className="mr-1 mb-1" />Atualizar
                </Button>
            </Form>
        </Card>
    )
    }
}

export class PurchaseList extends Component{

    constructor(props){
        super(props);
        this.state = {purchases: [], redirect:false};
    } 
    
        componentDidMount() {
            this.loadpurchases();
        }
    
        loadpurchases = async (page = 1) => {
            const { id } = this.props.match.params;
            const response = await api.get(`/purchase/list/${id}?page=${page}`);
            if(response.data[0] === undefined) return;
            this.setState({ purchases: response.data[0].item_id  });
            // console.log(response.data[0]);
            // console.log(this.state.purchases);
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
            const { purchases } = this.state;
    
        return (
            <Card body>
                <div>
                    <Link className="btn btn-outline-primary mb-2" to="/purchase">
                        <FaArrowLeft className="mr-1 mb-1" />Voltar
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
                        </tr>
                    </thead>
                    {purchases.map(purchase => (
                    <tbody key={purchase._id}>
                        <tr>
                            <td>{purchase.id.name}</td>
                            <td>${purchase.id.price}</td>
                            <td>{purchase.quantity}</td>
                            <td>${purchase.id.price * purchase.quantity}</td>
                        </tr>
                    </tbody>
                    ))}
                </Table>
                </div>
            </Card>
        )
        }
}

export class PurchaseAdd extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params,
            items: [],
            redirect:false
        };
    } 
    
        componentDidMount() {
            this.loaditems();
        }
    
        loaditems = async (page = 1) => {
            const { id } = this.props.match.params;
            const response = await api.get(`/item/all`);
            if(response.data === undefined) return;
            this.setState({ items: response.data  });

            console.log(response.data);
            // console.log(response.data[0]);
            // console.log(this.state.purchases);
        };
    
        render(){
            const { items } = this.state;
    
        return (
            <Card body>
                <div>
                    <Link className="btn btn-outline-primary mb-2" to="/purchase">
                        <FaArrowLeft className="mr-1 mb-1" />Voltar
                        </Link>
                    </div>
                <Card body>
                    <Form>
                        {items.map((item,index) => (
                          <div key={item._id} className="mb-3">
                            <div className="row">
                            <Form.Check
                              custom
                              name={`item[${index}]`}
                              type={'checkbox'}
                              id={item._id}
                              label={item.name}
                            />
                            <Form.Control name={`quantity[${index}]`} type="number" placeholder="Quantidade"/>
                            </div>
                          </div>
                        ))}
                    </Form>
                    </Card>
            </Card>
            )
        }
}