import React, {Component} from 'react';
import api from '../../services/api';
// import {Link} from 'react-router-dom';
import {Card, Button, Table} from 'react-bootstrap/';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default class ItemForm extends Component{
state = {
    items: [],
    itemInfo: {},
    page: 1,
}

    componentDidMount() {
        this.loaditems();
    }
    
    loaditems = async (page = 1) => {
        const response = await api.get(`/item/${page}`);

        const { docs, ...itemInfo } = response.data;

        this.setState({ items: docs, itemInfo, page  });

        console.log(response.data.docs);
    };

    render(){

    return (
        <Card body>hue</Card>
    )
    }
}