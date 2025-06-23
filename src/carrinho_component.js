import React from 'react';

const Carrinho = ({ carrinho, removerCarrinho, calcularTotal }) => {
  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    alert(`Compra finalizada! Total: R$ ${calcularTotal()}`);
  };

  return (
    <div className="carrinho-container">
      <h2>Meu Carrinho</h2>
      
      {carrinho.length === 0 ? (
        <div className="carrinho-vazio">
          <p>Seu carrinho está vazio!</p>
        </div>
      ) : (
        <div>
          {carrinho.map((item, index) => (
            <div key={index} className="carrinho-item">
              <div>
                <h4>{item.nome}</h4>
                <p>R$ {item.preco}</p>
              </div>
              <button 
                onClick={() => removerCarrinho(item.id)}
                className="btn-remover"
              >
                Remover
              </button>
            </div>
          ))}
          
          <div className="carrinho-total">
            <h3>Total: R$ {calcularTotal()}</h3>
            <button 
              onClick={finalizarCompra}
              className="btn-finalizar"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;