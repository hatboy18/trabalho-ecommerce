import React from 'react';

const Header = ({ paginaAtual, setPaginaAtual, totalCarrinho }) => {
  return (
    <div className="header">
      <h1>HatStore</h1>
      
      <div className="nav-buttons">
        <button 
          onClick={() => setPaginaAtual('produtos')}
          className={`nav-button ${paginaAtual === 'produtos' ? 'active' : ''}`}
        >
          Produtos
        </button>
        
        <button 
          onClick={() => setPaginaAtual('carrinho')}
          className={`nav-button ${paginaAtual === 'carrinho' ? 'active' : ''}`}
        >
          Carrinho ({totalCarrinho})
        </button>
        
        <button 
          onClick={() => setPaginaAtual('admin')}
          className={`nav-button ${paginaAtual === 'admin' ? 'active' : ''}`}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Header;