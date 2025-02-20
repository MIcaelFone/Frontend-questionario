import {React} from 'react';
import { useState } from 'react';
import { Container, Row, Col,Form } from 'react-bootstrap';
import axios from 'axios';
import ButtonComponent from './ButtonComponent';
import {ToastContainer} from 'react-bootstrap';
import { Toast } from 'react-bootstrap';
 
function QuestionarioComponent(props){
    const [resposta, setResposta] = useState('');
    const [showToast, setShowToast] = useState(false);  
    const [showToast2, setShowToast2] = useState(false);
    const opcoes = props.opcoes;
    const handleChange = (e) => {
        setResposta(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const idquestao = window.location.pathname.split("/")[2];
    
        if(resposta === "" || resposta.length==0){
            setShowToast2(true)
        }
        else{
            const envioResposta = await axios.post(`http://localhost:8080/votos`, {
                idquestao: idquestao,
                idopcao: resposta,
            });
            if(envioResposta.status === 201){
                setShowToast(true)
            }
        }
    };
    return(
        <>
        <div>
        <Container className="my-5">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={12} lg={8} xxl={6}>
                        <div className="p-4 bg-white rounded-3 shadow-sm border border-1 w-50">
                            <h2 className="mb-4 d-1 text-primary fw-bold ">{props.titulo}</h2>
                            <Form className='mt-3 container'>
                                {opcoes.map((opcao,index) => (
                                    <div className="form-check" key={index}>
                                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value={opcao.idopcao} onChange={()=>{setResposta(opcao.idopcao)}} />
                                        <label className="form-check-label" htmlFor="gridRadios1" id={opcao.id}>
                                            {opcao.descricao}
                                        </label>
                                    </div>    
                                ))}
                                <div className="d-grid w-50 d-flex  mt-4">
                                    <ButtonComponent  text="Responder" onClick={(event) => handleSubmit(event)} />
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container> 
        </div>
        <div>
        <ToastContainer position="top-end" className="p-3" style={{ position: 'absolute', top: 10, right: 10 }}>
    {/* Toast de sucesso */}
    <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
        <Toast.Body>✅ Questionário respondido com sucesso!</Toast.Body>
    </Toast>

    {/* Toast de erro */}
    <Toast show={showToast2} onClose={() => setShowToast2(false)} delay={3000} autohide bg="danger">
        <Toast.Body>⚠️ Uma opção precisa ser selecionada</Toast.Body>
    </Toast>
</ToastContainer>

         </div>
    </>
    )
}
export default QuestionarioComponent;