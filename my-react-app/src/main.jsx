//5a
/*import React from "react";
import ReactDOM from "react-dom/client";
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Hello,this is plain HTML rendered bye React</h1>
    <h2>Welcome to UCEN!</h2>
  </div>
);*/
//5b
/*import React from "react";
import ReactDOM from "react-dom/client";
const name = "CSE";
const year = new Date().getFullYear();
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <h1>Welcome to JSX example</h1>
    <p>Hello, {name}! The current year is {year}.</p>
  </div>
);*/
 //5c 
/*import React from "react";
import ReactDOM from "react-dom/client";
function WelcomeMessage(){
  return <h2>Welcome to react components!</h2>
}
class Footer extends React.Component{
  render(){
    return <p>{
      new Date().getFullYear()} Mywebsite</p>;
  }
}
function App(){
  return(
    <div>
      <h1>Hello, this is a React App!</h1>
      <WelcomeMessage/>
      <p>This is the main content area</p>
    <Footer/>
    </div>
);
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);*/
//6a
/*import react,{ useState } from "react";
import ReactDOM from "react-dom/client";
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
function App() {
  const [count,setCount] = useState(0);
  return (
    <div>
      <Greeting name="UCEN" />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//6b
/*import React from "react";
import ReactDOM from "react-dom/client";
function App() {
  const MyStyle = {
    color: "blue",
    backgroundColor: "lightyellow",
    padding: "10px",
    borderRadius: "8px"
  };
  const fruits = ["Apple", "Banana", "Cherry", "Date"];
  return (
    <div style={MyStyle}>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//6c
/*import React, { useState } from "react";
import ReactDOM from "react-dom/client";
function App() {
  const [message, setMessage] = useState("Click a button");
  function handleGreet() {
    setMessage("Hello, welcome to UCEN!");
  }
  function handlereset() {
    setMessage("Click a button");
  }
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleGreet}>Greet</button>
      <button onClick={handlereset}>Reset</button>
    <input type="text" placeholder="Type something..." onChange={(e) => setMessage(e.target.value)} />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//7a
/*import React, { useState } from "react";
import ReactDOM from "react-dom/client";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <h1>Conditional Rendering</h1>
      {isLoggedIn ? (
        <h2>Welcome back, user!</h2>
      ) : (
        <h2>Please log in to continue.</h2>
      )}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log Out" : "Login"}
      </button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//7b
/*import React from "react";
import ReactDOM from "react-dom/client";
function App() {
  const students = ["Raju", "Priya", "Kiran", "Sneha"];
  return (
    <div>
      <h1>Rendering Lists Example</h1>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//7c
/*import React, { useState } from "react";
import ReactDOM from "react-dom/client";
function App() {
  const [formData, setFormData] = useState({ name: " ", email: " ",gender:" ",agree:false });
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    alert(`From submitted!\n${JSON.stringify(formData, null, 2)}`);;
  }
  return (
    <div>
      <h1>React Forms Example</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{""}
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:{""}
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Gender:{""}
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
        </label>
        <br />
        <label>
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
          I agree to the terms and conditions
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//8a
/*import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function Home() {
  return <h2>Welcome to the Home Page</h2>;
}
function About() {
  return <h2>This is the About Page</h2>;
}
function Contact() {
  return <h2>Contact us at contact@example.com</h2>;
}
function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>React Router Example</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> |{" "}
          <Link to="/contact">Contact</Link>|{" "}
          <a href="https://jntukucen.sc.in"
          target="_blank"
          rel="noopener noreferrer">My Blog</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//8b
/*import React, { useState } from "react";
import ReactDOM from "react-dom/client";
function App() {
  const [message, setMessage] = useState("Click a button");
  function updateMessage()  {
    setMessage("Screen Updated!");
  }
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={updateMessage}>Click to Update the Screen</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
//9a
import React,{useState} from "react";
import ReactDOM from "react-dom/client";
function Child(props){
  return(
    <div>
      <h2> Child Components</h2>
      <p> Received Message:{props.message}</p>
    </div>
  );
}
function Parent(){
  const[message,setMessage]=useState("Hello from Parent !");
  return(
    <div>
      <h1> Sharing Data between Components</h1>
    <Child message={message} />
    <button 
    onClick={()=> 
      setMessage("Mesage Updated from Parent!")
    }
    >
      Update Message
    </button>
    </div>
  );
}
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Parent/>);