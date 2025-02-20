import {useState,React,useEffect} from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';
 

function EditarPerguntas() {
    const [opcoes, setOpcoes] = useState([{idopcao:"", descricao:""}]); // Inicializa com uma opção vazia
    const [titulo, setTitulo] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);
    const [showToast4, setShowToast4] = useState(false);
    
  
    const id= window.location.pathname.split("/")[2]
    const retornarDados = async() =>{
        try {
            const pergunta=await axios.get(`http://localhost:8080/questoes/${id}`)
            setTitulo(pergunta.data.data.titulo)
            setDataInicio(pergunta.data.data.data_hora_inicio.slice(0,16))
            setDataFinal(pergunta.data.data.data_hora_fim.slice(0,16))
        } catch (error) {
            console.log(error)
        }
    }
    const retornarOpcoes = async() =>{
        try {
            const opcoesCadastradas=await axios.get(`http://localhost:8080/opcao/${id}`)
            console.log("Opcao",opcoesCadastradas.data.data)
            if(opcoesCadastradas.status===200){
                 const opcoesFormatada=opcoesCadastradas.data.data.map((opcao)=>{
                    return {idopcao: opcao.idopcao, descricao: opcao.descricao}
                })
                setOpcoes(opcoesFormatada)
                console.log("Opcoes",opcoes)
                
            } 
            console.log(opcoes)        
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        const retornandoDados = async()=> {
            try {
                await retornarDados()
                await retornarOpcoes()
            } catch (error) {
                console.log(error)         
            }
        } 
        retornandoDados()   
    },[])

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
            const questaoAtualizada =await axios.put(`http://localhost:8080/questoes/${id}`, {
                titulo: titulo,
                data_hora_inicio: dataInicio,
                data_hora_fim: dataFinal
            })  
                
            if(questaoAtualizada.status === 200){  
                for(const opcao of opcoes){
                    const opcaoAtualizar= await axios.put(`http://localhost:8080/opcao/${opcao.idopcao}`, {descricao: opcao.descricao})  
                    if(opcaoAtualizar.status === 200){
                         setShowToast(true) 
                            console.log("Questao atualizada com sucesso")
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
                    <h2> Editar pergunta</h2>
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
                                    value={opcao.descricao}
                                    onChange={(event) => { // Corrigido o fechamento aqui
                                        const newOptions = [...opcoes];
                                        newOptions[index].descricao = event.target.value;
                                        setOpcoes(newOptions);
                                    }} // Fechamento correto com }}
                                />
                            </Form.Group>
                        ))}

                        <div className="row">
                            <div className="col-12">
                                <Button variant="primary" type="submit" className="w-100" onClick={(event)=>{handleSubmit(event)}}>
                                    Atualizar
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
                    autohide bg="success"
                >
                <Toast.Body>✅ Questionário atualizado com sucesso!</Toast.Body>
                </Toast>
            </ToastContainer>   
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast2(false)} // Close the toast
                    show={showToast2} 
                    delay={5000} 
                    autohide 
                    bg="danger" 
                >
                    <Toast.Body>
                    ⚠️ Não é possivel atualizar questão com dados vazios
                    </Toast.Body>
                </Toast>
            </ToastContainer> 
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast3(false)} // Close the toast
                    show={showToast3} 
                    delay={5000} 
                    autohide 
                    bg="danger" 
                >
                    <Toast.Body>
                    ⚠️  Data de inicio não pode ser maior que data final!
                    </Toast.Body>
                </Toast> 
            </ToastContainer>    
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast4(false)} // Close the toast
                    show={showToast4} 
                    delay={5000} 
                    autohide 
                    bg="danger" 
                >
                    <Toast.Body>
                    ⚠️ É necessário ter no minimo 3 opções!
                    </Toast.Body>
                </Toast>
            </ToastContainer>    
        </div>
        
    );
}

export default EditarPerguntas;