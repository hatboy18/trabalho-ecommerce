import React from 'react';

const ProdutoDetalhes = ({ produto, adicionarCarrinho, voltarParaProdutos }) => {
  if (!produto) {
    return (
      <div className="produto-detalhes-container">
        <p>Produto não encontrado.</p>
        <button onClick={voltarParaProdutos} className="btn-voltar">
          Voltar para Produtos
        </button>
      </div>
    );
  }

  const handleAdicionarCarrinho = () => {
    adicionarCarrinho(produto);
  };

  return (
    <div className="produto-detalhes-container">
      <button onClick={voltarParaProdutos} className="btn-voltar">
        ← Voltar para Produtos
      </button>
      
      <div className="produto-detalhes-content">
        <div className="produto-imagem-container">
          {produto.imagem ? (
            <img 
              src={produto.imagem} 
              alt={produto.nome}
              className="produto-imagem-detalhes"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Imagem+Não+Disponível';
              }}
            />
          ) : (
            <div className="produto-sem-imagem">
              <span>📷</span>
              <p>Sem imagem disponível</p>
            </div>
          )}
        </div>
        
        <div className="produto-info-detalhes">
          <h1 className="produto-titulo">{produto.nome}</h1>
          
          <div className="produto-preco-detalhes">
            <span className="preco-valor">R$ {produto.preco.toFixed(2)}</span>
          </div>
          
          <div className="produto-descricao-detalhes">
            <h3>Descrição</h3>
            <p>{produto.descricao}</p>
          </div>
          
          <div className="produto-especificacoes">
            <h3>Especificações</h3>
            <ul>
              <li><strong>ID do Produto:</strong> {produto.id}</li>
              <li><strong>Categoria:</strong> {produto.categoria || 'Geral'}</li>
              <li><strong>Disponibilidade:</strong> Em estoque</li>
              <li><strong>Condição:</strong> Novo</li>
            </ul>
          </div>
          
          <div className="produto-acoes">
            <button 
              onClick={handleAdicionarCarrinho}
              className="btn-adicionar-carrinho-detalhes"
            >
              🛒 Adicionar ao Carrinho
            </button>
            
            <button className="btn-favoritar">
              ❤️ Adicionar aos Favoritos
            </button>
          </div>
          
          <div className="produto-compartilhar">
            <h4>Compartilhar:</h4>
            <div className="botoes-compartilhar">
              <button className="btn-compartilhar">📱 WhatsApp</button>
              <button className="btn-compartilhar">📧 Email</button>
              <button className="btn-compartilhar">🔗 Copiar Link</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="produto-informacoes-extras">
        <div className="info-entrega">
          <h3>🚚 Informações de Entrega</h3>
          <p>• Entrega em até 7 dias úteis</p>
          <p>• Frete grátis para compras acima de R$ 200</p>
          <p>• Opção de retirada na loja</p>
        </div>
        
        <div className="info-garantia">
          <h3>🛡️ Garantia e Suporte</h3>
          <p>• Garantia de 12 meses</p>
          <p>• Suporte técnico especializado</p>
          <p>• Política de troca em até 30 dias</p>
        </div>
        
        <div className="info-pagamento">
          <h3>💳 Formas de Pagamento</h3>
          <p>• Cartão de crédito em até 12x</p>
          <p>• PIX com 5% de desconto</p>
          <p>• Boleto bancário</p>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhes;