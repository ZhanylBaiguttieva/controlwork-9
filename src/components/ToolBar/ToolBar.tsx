import React from 'react';
import NavBar from '../NavBar/NavBar';
import Categories from '../Categories/Categories';

const ToolBar: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className="container-fluid">
        <Categories/>
      </main>
    </>
  );
};

export default ToolBar;