import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    { 
      title: "Basics", 
      items: [
        { name: "Variables", image: "1.png" },
        { name: "Input / Output", image: "2.png" },
        { name: "IF / ELSE", image: "3.png" },
        { name: "Nested IF / ELSE", image: "4.png" },
        { name: "Switch", image: "5.png" }
      ]
    },
    { 
      title: "Loops", 
      items: [
        { name: "WHILE loop", image: "6.png" },
        { name: "DO - WHILE loop", image: "7.png" },
        { name: "FOR loop", image: "8.png" },
        { name: "Nested loops", image: "9.png" },
        { name: "String & Lists", image: "10.png" }
      ]
    },
    { 
      title: "Functions", 
      items: [
        { name: "Functions", image: "11.png" },
        { name: "Recursion", image: "12.png" }
      ]
    },
  ];

  return (
    <div className="home">
      <aside className="sidebar">
        <div className="logo">
          <img src="/src/assets/Logo.png" alt="Chartun Logo" />
        </div>
        <nav>
          <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/blank">Blank</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="new-document">New Document</button>
          <button className="buy">Buy</button>
      </div>
      </aside>
      <main className="content">
        {categories.map((category, index) => (
          <div key={index} className="category">
            <h2>{category.title}</h2>
            <div className="items">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="item">
                  <img src={`/src/assets/home/${item.image}`} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;