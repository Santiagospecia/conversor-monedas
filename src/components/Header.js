import React from 'react';

const Header = ({ text }) => {
  const headerStyle = {
    backgroundColor: '#122161', 
    color: 'white',
    padding: '10px 0',
    textAlign: 'left',
    fontSize: '20px',
  };

  return (
    <div style={headerStyle}>
      {text}
    </div>
  );
};

export default Header;
