import React from "react";
import QuestionarioDescricao from "../components/QuestionarioCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import { ToastContainer } from "react-bootstrap";
import { Toast } from "react-bootstrap";

 
function ListarPerguntas() {
     const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [perguntas, setPerguntas] = useState([]);

    const requisicaoRetorno = async() =>{
        try {
            const perguntasCadastradas=await axios.get("http://localhost:8080/questoes")
            if(perguntasCadastradas.status===200){
                const perguntasCriadas = perguntasCadastradas.data.data
                setPerguntas(perguntasCriadas)
            }      
            console.log(perguntas)
        } catch (error) {
            console.log(error)
        }
       
    }
    useEffect(()=> {
        const retornarDados = async()=> {
            try {
                await requisicaoRetorno()
            } catch (error) {
                console.log(error)
            }
        } 
        retornarDados()
    },[])

    const visualizarQuestionario = (id) => {
        navigate(`/questionario/${id}`);
    };
    const visualizarContagemVotos = (id) => {
        navigate(`/contagemvotos/${id}`);
    };

    
    const deletarQuestionario = async (id) => {
        
        try {
            const response = await axios.delete(`http://localhost:8080/questoes/${id}`);
            if (response.status === 204) {
                setShowToast(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.error("Erro ao deletar questionário:", error);
        }
    };
   

    return(
        <div>
            <Container className="mt-5 d-flex align-items-center justify-content-center">
                <Row className=" justify-content-center ">
                    <h1>Perguntas cadastradas</h1>
                </Row>
            </Container> 
            <Container className="mt-5 d-flex flex-wrap justify-content-between">
                <Col>
                    <Row className="g-4 justify-content-center g-2">
                        {perguntas.length>0 && perguntas.map((pergunta,index)=>{
                            return(
                                <div  key={index} className="card" style={{ width: "23rem" }}>
                                    <div className="card-body">
                                        <QuestionarioDescricao  texto={pergunta.titulo} dataInicio={pergunta.data_hora_inicio} dataFinal={pergunta.data_hora_fim}/>
                                        <div className="gap-1 d-flex justify-content-between">
                                            <ButtonComponent variant="primary" text="Editar"  onClick={()=>visualizarQuestionario(pergunta.idquestao)}/>
                                            <ButtonComponent variant="danger" text="Excluir" onClick={()=>deletarQuestionario(pergunta.idquestao)}/>
                                            <ButtonComponent variant="primary" text="Contagem votos" onClick={()=>visualizarContagemVotos(pergunta.idquestao)}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }                  
                    )}     
                    </Row>   
                </Col>    
            </Container>  
              
            <ToastContainer position="top-end" className="p-3">
                <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                bg="success"
                >
                <Toast.Body>
                    Questionário deletado com sucesso
                </Toast.Body>
                </Toast>
            </ToastContainer>              
        </div> 
       
    )
}
export default ListarPerguntas;