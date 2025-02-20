import {useState,React} from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';


function CadastrarPerguntas() {
    const [opcoes, setOpcoes] = useState([""]); // Inicializa com uma opção vazia
    const [titulo, setTitulo] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);
    const [showToast4, setShowToast4] = useState(false);
  
    // Função para adicionar uma nova opção ao estado
    const adicionarOpcao = () => {
      setOpcoes([...opcoes, ""]); // Adiciona um novo campo vazio
    };
    const handleSubmit =  async(event) => {
        event.preventDefault();
        if(titulo === "" || dataInicio === "" || dataFinal === ""){
            setShowToast2(true)

        } 
        else if(dataInicio > dataFinal){
            setShowToast3(true)
        }
        else if(opcoes.length < 3){
            setShowToast4(true)
        }
        else if (opcoes.length > 2 && titulo !== "" && dataInicio !== "" && dataFinal !== ""){  
            const questao =await axios.post('http://localhost:8080/questoes', {
                titulo: titulo,
                data_hora_inicio: dataInicio,
                data_hora_fim: dataFinal
            })  
                
            if(questao.status === 201){  
                const buscarIdQuestao= await axios.get(`http://localhost:8080/questoes/${titulo}`)
                let id=buscarIdQuestao.data.data.idquestao
                for(const descricao of opcoes){
                    if(buscarIdQuestao.status === 200){
                        const opcao= await axios.post(`http://localhost:8080/opcao`, {
                            idquestao: id,
                            descricao: descricao,
                        })  
                        if(opcao.status === 201){
                            setShowToast(true) 
                              
                        }             
                    } 
                } 
            }
        }  
    }
    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                    <h2>Cadastrar pergunta</h2>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputTitulo">Título</Form.Label>
                            <Form.Control type="text" id="inputTitulo" placeholder="Digite o título" onChange={(event)=>{setTitulo(event.target.value)}} value={titulo} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputDataInicio">Data e Hora Início</Form.Label>
                            <Form.Control type="datetime-local" id="inputDataInicio"  onChange={(event)=>{setDataInicio(event.target.value)}} value={dataInicio}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputDataFinal">Data e Hora Final</Form.Label>
                            <Form.Control type="datetime-local" id="inputDataFinal" onChange={(event)=>{setDataFinal(event.target.value)}} value={dataFinal} />
                        </Form.Group>

                        {opcoes.map((opcao, index) => (
                            <Form.Group className="mb-3" key={index}>
                                <Form.Label>Opção {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={`Digite a opção ${index + 1}`}
                                    value={opcao} // Corrigido para usar a opçã o atual
                                    onChange={(event) => {
                                        const novasOpcoes = [...opcoes]; // Copiando o array de opções
                                        novasOpcoes[index] = event.target.value; // Alterando a opção específica
                                        setOpcoes(novasOpcoes); // Atualizando o estado com o novo array
                                    }}
                                />
                            </Form.Group>
                        ))}

                        <div className="row g-2">
                            <div className="col-6">
                                <Button variant="primary" type="submit" className="w-100" onClick={(event)=>{handleSubmit(event)}}>
                                    Enviar
                                </Button>
                            </div>
                            <div className="col-6">
                                <Button variant="primary" type="button" className="w-100" onClick={() => adicionarOpcao()}>
                                    Adicionar 
                                </Button>
                            </div>
                        </div>   
                    </Form>
                    </Col>
                </Row>
            </Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)} // Close the toast
                    show={showToast} // Control visibility
                    delay={5000} // Auto-hide after 3 seconds
                    autohide // Enable auto-hide
                    bg="success" // Set background color to success (green)
                >
                    <Toast.Body>
                        Questão Cadastrada com sucesso
                    </Toast.Body>
                </Toast>
            </ToastContainer>   
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast2(false)} // Close the toast
                    show={showToast2} 
                    delay={5000} 
                    autohide 
                    bg="warning" 
                >
                    <Toast.Body>
                    <strong className="me-auto">Não é possivel cadastrar questão com dados vazios!</strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer> 
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast3(false)} // Close the toast
                    show={showToast3} 
                    delay={5000} 
                    autohide 
                    bg="warning" 
                >
                    <Toast.Body>
                         Data de inicio não pode ser maior que data final!
                    </Toast.Body>
                </Toast> 
            </ToastContainer>    
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast4(false)} // Close the toast
                    show={showToast4} 
                    delay={5000} 
                    autohide 
                    bg="warning" 
                >
                    <Toast.Body>
                    <strong className="me-auto">É necessário ter no minimo 3 opções!</strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>    
        </div>
        
    );
}

export default CadastrarPerguntas;
