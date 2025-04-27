```js
import React from "react";
const Categories = () => {
  const categories = [
    "HTML",
    "CSS",
    "JS",
    "C",
    "C++",
    "JAVA",
    "PYTHON",
    "SQL",
    "REACT JS",
  ];
  return (
    <div className="bg-gray-800 text-purple-300 p-3 flex justify-center space-x-4 text-sm">
      {categories.map((cat) => (
        <a key={cat} href="#" className="hover:text-white">
          {cat}
        </a>
      ))}
    </div>
  );
};
export default Categories;
```

Note.jsx

```js
import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import HtmlImg from "../../assets/html.png";
import CssImg from "../../assets/css.png";
import JsImg from "../../assets/javascript.png";
import ReactImg from "../../assets/react.svg";

const Notes = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // ✅ Point to files in /public/files
    const data = [
      { name: "HTML", image: HtmlImg, file: "/files/html_notes.pdf" },
      { name: "CSS", image: CssImg, file: "/files/css_notes.pdf" },
      { name: "JavaScript", image: JsImg, file: "/files/javascript_notes.pdf" },
      { name: "React", image: ReactImg, file: "/files/react_notes.pdf" },
    ];
    setSubjects(data);
    setFilteredSubjects(data);
  }, []);

  // ✅ Search Filter
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  return (
    <div className="p-8 bg-gray-900 text-white h-screen">
      <h2 className="text-3xl font-bold text-center text-purple-400">Notes</h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full p-2 rounded bg-gray-700 text-white mt-4"
        value={search}
        onChange={handleSearch}
      />

      {/* ✅ Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <NoteCard key={subject.name} subject={subject} />
          ))
        ) : (
          <p className="text-center text-gray-400">
            Currently No matching notes are available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;
```

//

### NAVBAR

```js
import React from "react";
import { FaSearch, FaMoon } from "react-icons/fa";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-purple-400">
        <em>CampusNotes</em>
      </div>

      <div className="hidden md:flex space-x-6">
        <NavLink to="/" className="hover:text-purple-300">
          Home
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            isActive ? "text-purple-400" : "hover:text-purple-300"
          }
        >
          Notes
        </NavLink>

        <NavLink to="/UnivesityNotes" className="hover:text-purple-300">
          University Notes
        </NavLink>
        <NavLink to="/about" className="hover:text-purple-300">
          About
        </NavLink>
        <NavLink to="/contact" className="hover:text-purple-300">
          Contact
        </NavLink>
      </div>
      <div className="flex items-center space-x-4">
        <FaMoon className="cursor-pointer hover:text-purple-300" />
        <FaSearch className="cursor-pointer hover:text-purple-300" />
        <Button className="bg-purple-500 hover:bg-purple-700 ">Login</Button>
        <Button className="bg-purple-600 hover:bg-purple-800">Signup</Button>
      </div>
    </nav>
  );
};

export default Navbar;
//
```
