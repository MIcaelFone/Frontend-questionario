import {React,useEffect} from "react";
import QuestionarioCard from "../components/QuestionarioCard";
import axios from "axios";
import { useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";

const PerguntasDisponiveisParaResponder = () => {
    const [questionarios, setQuestionarios] = useState([]);
    const navigate = useNavigate();
    const ResponderQuestionario = (id) => {
        navigate(`/responderpergunta/${id}`);
       
    }
    const getQuestionarios = async () => {
        try
        {
            const response = await axios.get('http://localhost:8080/questoes/disponivel');
            if (response.status === 200) {
                setQuestionarios(response.data.data);
            }
        } catch (error) {
            console.error("Erro ao buscar questionários:", error);
        }
    }
    useEffect(() => {
       async function fetchData() {
            await getQuestionarios();
        }
        fetchData();
    }, []);
    return (
        <div>
            <Container className="mt-5 d-flex align-items-center justify-content-center">
                <Row className=" justify-content-center ">
                    <h1>Perguntas disponíveis para responder</h1>
                </Row>
            </Container> 
            <Container className="mt-5 d-flex flex-wrap justify-content-between">
                <Col>
                    <Row className="g-4 justify-content-center g-2">
                        {questionarios.length > 0 ? 
                            questionarios.map((questionario,index) => (
                                <div  key={index} className="card" style={{ width: "18rem" }}>
                                    <div className="card-body">
                                        <QuestionarioCard texto={questionario.titulo} dataInicio={questionario.data_hora_inicio} dataFinal={questionario.data_hora_fim}/>
                                        <ButtonComponent variant="primary" text="Responder" onClick={() => ResponderQuestionario(questionario.idquestao)} />
                                    </div>          
                                </div>
                            )) : null
                        }
                    </Row>
                </Col>
            </Container>
        </div>
    );
};
export default PerguntasDisponiveisParaResponder;