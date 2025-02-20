import React from "react";

function QuestionarioDescricao(props) {
  return (
    <>
      <h5 className="card-title">Questionário</h5>
      <p className="card-text">{props.texto}</p>
      <p className="card-text">Data de início: {props.dataInicio.slice(0,10)}</p>
      <p className="card-text">Data de fim: {props.dataFinal.slice(0,10)}</p> 
    </>
  );
  }
  
  export default QuestionarioDescricao;