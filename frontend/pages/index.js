import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Jumbotron,
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Alert,
  Spinner
} from 'reactstrap';

function Home() {
  const [orcamento, setOrcamento] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    msg: ''
  });

  const [response, setResponse] = useState({
    formSave: false,
    type: '',
    message: ''
  });

  const onChangeInput = e => setOrcamento({ ...orcamento, [e.target.name]: e.target.value});
  const sendOrcamento = async e => {
    e.preventDefault();
    setResponse({formSave: true});
     try {
       const res = await fetch('http://localhost:3333/orcamento', {
        method: 'POST',
        body: JSON.stringify(orcamento),
        headers: {'Content-Type': 'application/json'}
       });

       const responseEnv = await res.json();
       //console.log(responseEnv);
       if (responseEnv.error) {
        setResponse({
          formSave: false,
          type: 'error',
          message: responseEnv.message
        });
       } else {
        setResponse({
          formSave: false,
          type: 'success',
          message: responseEnv.message
        });
       }
     } catch(error) {
      setResponse({
        formSave: false,
        type: 'error',
        message: 'Erro! Solicitação não pode ser enviada, tente mais tarde!'
      });
     }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return ( 
    <div>
      <Navbar color="info" dark expand="md" className="navbar">
        <style>
          {`.navbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 999;
          }`}
        </style>
        <Container>
          <NavbarBrand href="/">Raphael</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Orçamento</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Jumbotron className="pg-orcamento">
        <style>
          {`.pg-orcamento {
            background-color: #f5fbfa;
            color: #17a2b8;
            padding-top: 100px;
            padding-bottom: 100px;
            margin-bottom: 0rem !important;
          }`}
        </style>
        <Container>
          <h1 className="display-4 text-center">Envie sua solicitação abaixo</h1>
          <p className="lead text-center mb-4">Deixe seu contato para retornamos!</p>
        </Container>

        {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
        {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
        <Form onSubmit={sendOrcamento}>
          <FormGroup>
            <Label for="name">Nome</Label>
            <Input type="text" name="name" id="name" placeholder="Preencha com seu nome completo" 
              onChange={onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input type="email" name="email" id="email" placeholder="Preencha com seu e-mail" 
              onChange={onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="phone">Telefone</Label>
            <Input type="text" name="phone" id="phone" placeholder="(XX)XXXXX-XXXX" 
              onChange={onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="whatsapp">Whatsapp</Label>
            <Input type="text" name="whatsapp" id="whatsapp" placeholder="(XX)XXXXX-XXXX" 
              onChange={onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="msg">Mensagem</Label>
            <Input type="textarea" name="msg" id="msg" placeholder="Fale qual o projeto de seu interesse" 
              onChange={onChangeInput}
            />
          </FormGroup>

          {response.formSave 
            ? <Spinner color="info" />
            : <Button type="submit" outline color="info">Enviar</Button>}
        </Form>
      </Jumbotron>

      <Jumbotron fluid className="rodape bg-info">
        <style>
          {`.rodape {
            color: #fff;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-bottom: 0rem !important;
          }`}
        </style>
        <Container>
          <h1 className="lead text-center">Designed for Raphael Cunha</h1>
        </Container>
      </Jumbotron>
    </div> 
  );
}

export default Home;