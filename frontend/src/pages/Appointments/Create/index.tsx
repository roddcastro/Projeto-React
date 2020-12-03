import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import api from "../../../services/api";

import { HiArrowLeft, HiOutlineCheck } from "react-icons/hi";
import { CardContainer, CardBottom } from "./styles";

import Button from "../../../components/Button";
import Content from "../../../components/Content";
import Container from "../../../components/Container";
import Card from "../../../components/Card";
import Input from "../../../components/Input";

interface Fornecedor {
  id: number;
  name: string;
}

interface Motorista {
  id: number;
  name: string;
}

interface Comprador {
  id: number;
  name: string;
  phone: number;
}

const Create: React.FC = () => {
  const { id }: { id: string } = useParams();

  const [Fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [Motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [Compradores, setCompradores] = useState<Comprador[]>([]);

  const [selectedFornecedor, setSelectedFornecedor] = useState('0');
  const [selectedMotorista, setSelectedMotorista] = useState('0');
  const [selectedComprador, setSelectedComprador] = useState('0');
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleHour, setScheduleHour] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    api.get('Fornecedores').then(response => {
      setFornecedores(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('Motoristas').then(response => {
      setFornecedores(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('Compradores').then(response => {
      setCompradores(response.data);
    });
  }, []);

  useEffect(() => {
    const data = async () => {
      return await api
        .get("?")
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

    if (id) data();
  }, [id]);

  function handleSelectFornecedor(event: ChangeEvent<HTMLSelectElement>){
    const Fornecedor = event.target.value;
    setSelectedFornecedor(Fornecedor);
  }

  function handleSelectMotorista(event: ChangeEvent<HTMLSelectElement>){
    const Motorista = event.target.value;
    setSelectedMotorista(Motorista);
  }

  function handleSelectComprador(event: ChangeEvent<HTMLSelectElement>){
    const Comprador = event.target.value;    
    setSelectedComprador(Comprador);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    

    const scheduling_at = scheduleDate + ' ' + scheduleHour;


    const data = {
      scheduling_at: scheduling_at,
      Fornecedor_id: selectedFornecedor,
      Motorista_id: selectedMotorista,
      Comprador_id: selectedComprador,
    };

    try {
      await api.post('appointments', data)

      history.push('/');
    } catch (err) {
      alert('Erro ao cadastrar, tente novamente.');
    }
  }
  
  return (
    <Container>
      <Content>
        <CardContainer>
          <Link to="/">
            <HiArrowLeft size={12} style={{ marginRight: 8 }} />
            Voltar
          </Link>
          <form onSubmit={handleSubmit}>
            <h1>{id ? "Editando uma entrega" : "Agendando uma Entrega"}</h1>
            <Card style={{ padding: 32 }}>
              <label htmlFor="scheduleDate">Data da Entrega</label>
              <Input
                type="date"
                id="scheduleDate"
                name="scheduleDate"
                placeholder="__-__-____"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
              <br />
              <label htmlFor="Fornecedor">Fornecedor</label>
              <select 
                  name="Fornecedor"
                  id="Fornecedor" 
                  value={selectedFornecedor} 
                  onChange={handleSelectFornecedor}
                  >
                  <option value="0">Selecione um Fornecedor</option>
                  {Fornecedores.map(Fornecedor => (
                    <option key={Fornecedor.id} value={Fornecedor.id}>{Fornecedor.name}</option>
                  ))}
              </select>
              <br />
              <label htmlFor="Comprador">Comprador</label>
              <select 
                  name="Comprador"
                  id="Comprador" 
                  value={selectedComprador} 
                  onChange={handleSelectComprador}
                  >
                  <option value="0">Selecione um Comprador</option>
                  {Compradores.map(Comprador => (
                    <option key={Comprador.id} value={Comprador.id}>{Comprador.name}</option>
                  ))}
              </select>
              <br />
              <CardBottom>
                <Button type="submit">
                  <HiOutlineCheck size={56} />
                  {id ? "Editar" : "Criar"}
                </Button>
              </CardBottom>
            </Card>
          </form>
        </CardContainer>
      </Content>
    </Container>
  );
};

export default Create;
