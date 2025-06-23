import React, { useState } from 'react';

const Admin = ({ produtos, adicionarProduto, editarProduto, deletarProduto }) => {
  // Estado do formulário para novo produto
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    preco: '',
    descricao: '',
    imagem: '',
    categoria: ''
  });

  // Estado para controlar edição
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Estado para preview da imagem
  const [imagemPreview, setImagemPreview] = useState('');

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (modoEdicao) {
      setProdutoEditando(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Preview da imagem para edição
      if (name === 'imagem') {
        setImagemPreview(value);
      }
    } else {
      setNovoProduto(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Preview da imagem para novo produto
      if (name === 'imagem') {
        setImagemPreview(value);
      }
    }
  };

  // Função para lidar com upload de arquivo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagemPreview(imageUrl);
        
        if (modoEdicao) {
          setProdutoEditando(prev => ({
            ...prev,
            imagem: imageUrl
          }));
        } else {
          setNovoProduto(prev => ({
            ...prev,
            imagem: imageUrl
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const produto = modoEdicao ? produtoEditando : novoProduto;
    
    // Validação dos campos
    if (!produto.nome || !produto.preco || !produto.descricao) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (produto.preco <= 0) {
      alert('O preço deve ser maior que zero!');
      return;
    }

    if (modoEdicao) {
      // Editar produto existente
      editarProduto(produtoEditando);
      alert('Produto editado com sucesso!');
      cancelarEdicao();
    } else {
      // Adicionar novo produto
      adicionarProduto(novoProduto);
      alert('Produto adicionado com sucesso!');
      limparFormulario();
    }
  };

  // Função para iniciar edição
  const iniciarEdicao = (produto) => {
    setProdutoEditando({...produto});
    setImagemPreview(produto.imagem || '');
    setModoEdicao(true);
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setProdutoEditando(null);
    setModoEdicao(false);
    setImagemPreview('');
  };

  // Função para limpar formulário
  const limparFormulario = () => {
    setNovoProduto({
      nome: '',
      preco: '',
      descricao: '',
      imagem: '',
      categoria: ''
    });
    setImagemPreview('');
  };

  const produtoAtual = modoEdicao ? produtoEditando : novoProduto;

  return (
    <div className="admin-container">
      <h2>Administração</h2>
      
      {/* Formulário para adicionar/editar produto */}
      <div className="admin-form">
        <h3>{modoEdicao ? 'Editar Produto' : 'Adicionar Novo Produto'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome do Produto: *</label>
              <input 
                type="text"
                id="nome"
                name="nome"
                value={produtoAtual?.nome || ''}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoria:</label>
              <select
                id="categoria"
                name="categoria"
                value={produtoAtual?.categoria || ''}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Informática">Informática</option>
                <option value="Áudio">Áudio</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Acessórios">Acessórios</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço: *</label>
            <input 
              type="number"
              id="preco"
              name="preco"
              value={produtoAtual?.preco || ''}
              onChange={handleInputChange}
              className="form-input"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição: *</label>
            <textarea 
              id="descricao"
              name="descricao"
              value={produtoAtual?.descricao || ''}
              onChange={handleInputChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label>Imagem do Produto:</label>
            <div className="imagem-upload-container">
              <div className="upload-options">
                <div className="upload-option">
                  <label htmlFor="imagem-url">URL da Imagem:</label>
                  <input 
                    type="url"
                    id="imagem-url"
                    name="imagem"
                    value={produtoAtual?.imagem || ''}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                
                <div className="upload-option">
                  <label htmlFor="imagem-file">Ou faça upload:</label>
                  <input 
                    type="file"
                    id="imagem-file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="form-input-file"
                  />
                </div>
              </div>
              
              {imagemPreview && (
                <div className="imagem-preview">
                  <h4>Preview:</h4>
                  <img 
                    src={imagemPreview} 
                    alt="Preview" 
                    className="preview-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x150/cccccc/666666?text=Erro+ao+Carregar';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit"
              className="btn-adicionar"
            >
              {modoEdicao ? '✏️ Salvar Edição' : '➕ Adicionar Produto'}
            </button>
            
            {modoEdicao && (
              <button 
                type="button"
                onClick={cancelarEdicao}
                className="btn-cancelar"
              >
                ❌ Cancelar Edição
              </button>
            )}
            
            {!modoEdicao && (
              <button 
                type="button"
                onClick={limparFormulario}
                className="btn-limpar"
              >
                🧹 Limpar Formulário
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de produtos para gerenciar */}
      <div className="produtos-lista">
        <h3>Produtos Cadastrados ({produtos.length})</h3>
        
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <div className="produtos-admin-grid">
            {produtos.map(produto => (
              <div key={produto.id} className="produto-admin-card">
                <div className="produto-admin-imagem">
                  {produto.imagem ? (
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x80/cccccc/666666?text=Sem+Imagem';
                      }}
                    />
                  ) : (
                    <div className="sem-imagem-admin">📷</div>
                  )}
                </div>
                
                <div className="produto-admin-info">
                  <strong>{produto.nome}</strong>
                  <p>R$ {produto.preco.toFixed(2)}</p>
                  <small>{produto.categoria}</small>
                  <p className="descricao-resumo">
                    {produto.descricao.length > 60 ? 
                      produto.descricao.substring(0, 60) + '...' : 
                      produto.descricao}
                  </p>
                </div>
                
                <div className="produto-admin-acoes">
                  <button 
                    onClick={() => iniciarEdicao(produto)}
                    className="btn-editar"
                    disabled={modoEdicao}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm(`Deseja realmente deletar o produto "${produto.nome}"?`)) {
                        deletarProduto(produto.id);
                      }
                    }}
                    className="btn-deletar"
                    disabled={modoEdicao}
                  >
                    🗑️ Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;