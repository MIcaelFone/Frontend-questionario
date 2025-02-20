import React from "react";
import { useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import axios from "axios";
import ButtonComponent from "../components/ButtonComponent";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
import ResponderQuestionario from "../components/ResponderPerguntaComponent";
 
function ResponderPerguntaPage() {
    const idquestao = window.location.pathname.split("/")[2];
    const [pergunta, setPerguntas] = useState({});
    const [opcoes, setOpcoes] = useState([]);
    
    useEffect(() => {
        const getPergunta = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/questoes/${idquestao}`);
                if (response.status === 200) {
                    setPerguntas(response.data.data);
                }
            } catch (error) {
                console.error("Erro ao buscar pergunta:", error);
            }
        };
        const getOpcoes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/opcao/${idquestao}`);
                if (response.status === 200) {
                    setOpcoes(response.data.data);
                }
            } catch (error) {
                console.error("Erro ao buscar opções:", error);
            }
        }
        getPergunta();
        getOpcoes();
    }
    , []);
    return (
        <div>
            <ResponderQuestionario titulo={pergunta.titulo} opcoes={opcoes} />
        </div>
    );
   
}
export default ResponderPerguntaPage;