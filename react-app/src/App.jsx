import { useState } from 'react'
import './App.css'

function Nav(props) {
  const lis = [];

  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={e => {
        e.preventDefault();
        props.onChangeMode(e.target.id);
      }}>{t.title}</a>
    </li>);
  }
  return ( 
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Header(props) {
  console.log('porps', props, props.title);
  return (
    <header>
      <h1><a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>   
  );
}

function App() { 
  const topics = [
    {id: 1, title: "html", boyd: "html is ..."},
    {id: 2, title: "css", boyd: "css is ..."},
    {id: 3, title: "javascript", boyd: "javascript is ..."},
  ];
  
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        alert('Header');
      }}/>
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id);
      }}/>
      <Article title="Welcome" body="Hello, WEB" />
    </div>
  )
}

export default App
