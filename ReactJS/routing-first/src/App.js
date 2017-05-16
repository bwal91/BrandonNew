import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import App from './App';
// import './index.css';


window.onpopstate = function(event) {
  window.location.reload();
}

const JavaScript = () => <p>A high-level, dynamic, untyped, and interpreted programming language.</p>
const Haskell = () => <p>A standardized, general-purpose purely functional programming language, with non-strict semantics and strong static typing.</p>
const CoffeeScript = () => <p>asdfjaskdj fkasfjaksldfkldsjasdklhjfslhadfkjshadjfkhasd. <br /> Seconds Left: <Timer /></p>

class Timer extends Component {
  
  state = {
    elapsed: 10
  }

  tick = () => {
    if (this.state.elapsed === 0){
      window.location.href="/javascript"
    }
    else {
      this.setState({elapsed: this.state.elapsed - 1})
    }
  }

  componentDidMount(){
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render(){
    var timer = this.state.elapsed
    return (
      <p>{timer}</p>
      )
  }

};
Timer.propTypes = {
  tick: PropTypes.string.isRequired,
}

class App extends Component {

  rerender = () => {
    this.forceUpdate();
  }

  
  render(){
    return (
      <div>
        <Link to='/javascript' rerender={this.rerender}>JavaScript</Link>
        <Link to='/haskell' rerender={this.rerender}>Haskell</Link>
        <Link to='/coffeescript' rerender={this.rerender}>CoffeeScript</Link>
        <hr />
        <Route pattern='/javascript' component={JavaScript}  />
        <Route pattern='/haskell' component={Haskell} />
        <Route pattern='/coffeescript' component={CoffeeScript} />
      </div>
    )
  }
}

const Route = ({pattern, component}) => {
  return (pattern === location.pathname)
    ? React.createElement(component)
    : null;
}

const Link = ({to, children, rerender}) => {
  const handleClick = (event) => {
    event.preventDefault();
    history.pushState({}, null, to);
    rerender();
  }
  return (
    <a
    onClick={handleClick}
    style={{display: 'block'}}
    href={to}>{children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  rerender: PropTypes.func.isRequired,
  router: PropTypes.func.isRequired
}


export default App;
