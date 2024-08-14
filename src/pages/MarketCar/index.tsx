'use client';

import React, { useState } from 'react';

interface ICurso {
  id: number;
  titulo: string;
  preco: number;
}

interface IshoppingItem {
  produto: ICurso;
  quantidade: number;
}

const cursos: ICurso[] = [
  { id: 1, titulo: 'Maquiagem - Basica', preco: 200.00 },
  { id: 2, titulo: 'Maquiagem Dia - Dia', preco: 250.00 },
  { id: 3, titulo: 'Maquiagem Profissional', preco: 500.00 },
  { id: 4, titulo: 'Maquiagem Casamento', preco: 650.00 },
];

const MarketCarPages = () => {
  const [shoppingCurso, setShoppingCurso] = useState<IshoppingItem[]>([]);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [hoveredPrintButton, setHoveredPrintButton] = useState<boolean>(false);

  const handleAddCurso = (id: number) => {
    const curso = cursos.find((curso) => curso.id === id);

    if (!curso) return;

    const itemExistente = shoppingCurso.find((item) => item.produto.id === id);

    if (itemExistente) {
      const newShoppingCurso = shoppingCurso.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
      setShoppingCurso(newShoppingCurso);
    } else {
      const newShoppingCurso = [
        ...shoppingCurso,
        { produto: curso, quantidade: 1 },
      ];
      setShoppingCurso(newShoppingCurso);
    }
  };

  const handleRemoveCurso = (id: number) => {
    const newShoppingCurso = shoppingCurso.filter(
      (item) => item.produto.id !== id
    );
    setShoppingCurso(newShoppingCurso);
  };

  const totalPreco = shoppingCurso.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.cartItem}>Cursos de Maquiagem</h1>
      <ul style={styles.cursoList}>
        {cursos.map((curso) => (
          <li
            key={curso.id}
            style={styles.cartItem}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <p style={styles.cursoTitle}>{curso.titulo}</p>
            <p style={styles.cursoPrice}>R$ {curso.preco.toFixed(2)}</p>
            <button
              onClick={() => handleAddCurso(curso.id)}
              onMouseEnter={() => setHoveredButton(curso.id)}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                ...styles.removeButton,
                backgroundColor: hoveredPrintButton ? '#87CEEB' : '#ADD8E6',
              }}
            >
              Adicionar
            </button>
          </li>
        ))}
      </ul>

      <div style={styles.cartWrapper}>
        <div style={styles.cart}>
          <h2 style={styles.cartItem}>Carrinho de Compras</h2>
          <ul style={styles.cartList}>
            {shoppingCurso.map((item) => (
              <li key={item.produto.id} style={styles.cartItem}>
                <p style={styles.cartTitle}>{item.produto.titulo}</p>
                <p style={styles.cartPrice}>R$ {item.produto.preco.toFixed(2)}</p>
                <p style={styles.cartQuantity}>Quantidade: {item.quantidade}</p>
                <p style={styles.cartTotal}>Total: R$ {(item.produto.preco * item.quantidade).toFixed(2)}</p>
                <button
                  onClick={() => handleRemoveCurso(item.produto.id)}
                  style={styles.removeButton}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <h2 style={styles.cartItem}>Total do Carrinho: R$ {totalPreco.toFixed(2)}</h2>
          <button
            onClick={handlePrint}
            onMouseEnter={() => setHoveredPrintButton(true)}
            onMouseLeave={() => setHoveredPrintButton(false)}
            style={{
              ...styles.printButton,
              backgroundColor: hoveredPrintButton ? '#87CEEB' : '#ADD8E6',
            }}
          >
            Imprimir Nota Fiscal
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Georgia, serif',
    color: '#333',
    margin: '20px auto',
    backgroundColor: '#E6E6FA',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '1100px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  header: {
    textAlign: 'center',
    color: '#000',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '25px',
  },
  cursoList: {
    listStyleType: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  cursoItem: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    textAlign: 'center',
  },
  cursoTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#212121',
  },
  cursoPrice: {
    fontSize: '20px',
    color: '#757575',
    marginBottom: '15px',
  },
  addButton: {
    color: '#ffffff',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '6px',
    marginTop: '12px',
    width: '100%',
    textAlign: 'center',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    fontSize: '16px',
    cursor: 'pointer',
  },
  cartWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  cart: {
    width: '400px',
    background: '#ffffff',
    border: '1px solid #ddd',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  cartHeader: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cartList: {
    listStyleType: 'none',
    padding: 0,
  },
  cartItem: {
    marginBottom: '15px',
    color: '#333',
  },
  cartTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  cartPrice: {
    fontSize: '18px',
    color: '#757575',
  },
  cartQuantity: {
    fontSize: '18px',
    color: '#757575',
  },
  cartTotal: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
  removeButton: {
    background: '#F44336',
    color: '#ffffff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  total: {
    color: '#4CAF50',
    fontSize: '20px',
    marginTop: '25px',
    textAlign: 'center',
  },
  printButton: {
    color: '#ffffff',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '25px',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
};

export default MarketCarPages;
