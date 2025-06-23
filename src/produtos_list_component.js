import React from 'react';

const ProdutosList = ({ produtos, adicionarCarrinho, verDetalhes }) => {
  return (
    <div className="produtos-container">
      <h2>Lista de Produtos</h2>
      <div className="produtos-grid">
        {produtos.map(produto => (
          <div key={produto.id} className="produto-card">
            <div className="produto-imagem-container-card">
              {produto.imagem ? (
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="produto-imagem-card"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x150/cccccc/666666?text=Sem+Imagem';
                  }}
                />
              ) : (
                <div className="produto-sem-imagem-card">
                  <span>📷</span>
                </div>
              )}
            </div>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao.length > 50 ? 
                produto.descricao.substring(0, 50) + '...' : 
                produto.descricao}
            </p>
            <p className="produto-preco">
              R$ {produto.preco.toFixed(2)}
            </p>
            <div className="produto-acoes-card">
              <button 
                onClick={() => verDetalhes(produto)}
                className="btn-ver-detalhes"
              >
                Ver Detalhes
              </button>
              <button 
                onClick={() => adicionarCarrinho(produto)}
                className="btn-comprar"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdutosList;