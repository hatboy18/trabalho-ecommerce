import React, { useState } from 'react';
import Header from './header_component';
import ProdutosList from './produtos_list_component';
import ProdutoDetalhes from './produto_detalhes_component';
import Carrinho from './carrinho_component';
import Admin from './admin_component';
import { produtosIniciais } from './produtos_data';
import './app.css';

const App = () => {
  // Estados principais
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [carrinho, setCarrinho] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState('produtos');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Função para adicionar produto no carrinho
  const adicionarCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    alert('Produto adicionado ao carrinho!');
  };

  // Função para remover do carrinho
  const removerCarrinho = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
  };

  // Função para calcular total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco, 0);
  };

  // Função para adicionar novo produto (admin)
  const adicionarProduto = (novoProduto) => {
    const produto = {
      id: Date.now(), // Usar timestamp para IDs únicos
      ...novoProduto,
      preco: Number(novoProduto.preco)
    };
    setProdutos([...produtos, produto]);
  };

  // Função para editar produto
  const editarProduto = (produtoEditado) => {
    const produtosAtualizados = produtos.map(produto => 
      produto.id === produtoEditado.id 
        ? { ...produtoEditado, preco: Number(produtoEditado.preco) }
        : produto
    );
    setProdutos(produtosAtualizados);
  };

  // Função para deletar produto
  const deletarProduto = (id) => {
    const novosProdutos = produtos.filter(produto => produto.id !== id);
    setProdutos(novosProdutos);
    alert('Produto removido!');
  };

  // Função para ver detalhes do produto
  const verDetalhes = (produto) => {
    setProdutoSelecionado(produto);
    setPaginaAtual('detalhes');
  };

  return (
    <div className="app">
      <Header 
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
        totalCarrinho={carrinho.length}
      />

      {paginaAtual === 'produtos' && (
        <ProdutosList 
          produtos={produtos}
          adicionarCarrinho={adicionarCarrinho}
          verDetalhes={verDetalhes}
        />
      )}

      {paginaAtual === 'detalhes' && produtoSelecionado && (
        <ProdutoDetalhes 
          produto={produtoSelecionado}
          adicionarCarrinho={adicionarCarrinho}
          voltarParaProdutos={() => setPaginaAtual('produtos')}
        />
      )}

      {paginaAtual === 'carrinho' && (
        <Carrinho 
          carrinho={carrinho}
          removerCarrinho={removerCarrinho}
          calcularTotal={calcularTotal}
        />
      )}

      {paginaAtual === 'admin' && (
        <Admin 
          produtos={produtos}
          adicionarProduto={adicionarProduto}
          editarProduto={editarProduto}
          deletarProduto={deletarProduto}
        />
      )}
    </div>
  );
};

export default App;