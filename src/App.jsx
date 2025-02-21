import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CadastrarPerguntas from './pages/CadastrarPerguntas';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from './partials/HeaderPartial';
import PerguntasCadastradas from './pages/PerguntasCadastradasPage';
import EditarPerguntas from './components/EditarQuestionario';
import PerguntasDisponiveis from './pages/PerguntasDisponiveisParaResponder';
import ResponderPerguntas from '../src/pages/ResponderPerguntaPage';
function App() {
  return (
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<CadastrarPerguntas />}/>
            <Route path="/perguntascadastradas" element={<PerguntasCadastradas/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path ='/questionario/:id' element={<EditarPerguntas/>} />
            <Route path="/perguntasdisponiveis" element={<PerguntasDisponiveis/>} />
            <Route path="/responderpergunta/:id" element={<ResponderPerguntas/>} />
          </Routes>
        </div>
  );
}

export default App;



