import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TestePage from './pages/teste_page'; // Certifique-se de que o caminho está correto
import CadastrarPerguntas from './pages/CadastrarPerguntas';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from './partials/HeaderPartial';
import PerguntasCadastradas from './pages/PerguntasCadastradasPage';
import EditarPerguntas from './components/EditarQuestionario';
import PerguntasDisponiveis from './pages/PerguntasDisponiveisParaResponder';
import ResponderPerguntas from '../src/pages/ResponderPerguntaPage';
import ContagemVotos from '../src/pages/VotosCadaPergunta';
function App() {
  return (
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<CadastrarPerguntas />}/>
            <Route path="/teste" element={<TestePage />} />
            <Route path="/perguntascadastradas" element={<PerguntasCadastradas/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path ='/questionario/:id' element={<EditarPerguntas/>} />
            <Route path="/perguntasdisponiveis" element={<PerguntasDisponiveis/>} />
            <Route path="/responderpergunta/:id" element={<ResponderPerguntas/>} />
            <Route path="/contagemvotos/:id" element={<ContagemVotos/>} />
          </Routes>
        </div>
  );
}

export default App;



