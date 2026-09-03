// import { useState } from "react";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     alert("User Added");
//     const userData = {
//       email: email,
//       password: password,
//     };

//     try {
//       const add = await fetch("http://localhost:5000/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
//       console.log(add);
//     } catch (err) {
//       console.error();
//     }
//   };

//   return (
//     <div>
//       <h1>Learning Client and Server Connection</h1>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <input
//             placeholder="Enter Email"
//             type="email"
//             onChange={handleEmail}
//           />
//           <br />
//           <input
//             placeholder=" Enter Password"
//             type="password"
//             onChange={handlePassword}
//           />
//           <br />
//           <button type="submit" className="btn">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";

// Read API URL from Vite environment variables (fallback to localhost for local testing)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://my-app-backend-jggx.onrender.com";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      // Connect to the dynamic backend URL
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "User Added Successfully");
        console.log("Server response:", data);
        // Clear input fields on success
        setEmail("");
        setPassword("");
      } else {
        alert("Failed to submit data");
        console.error("Server error:", data);
      }
    } catch (err) {
      alert("Network error: Could not connect to server");
      console.error("Fetch error:", err);
    }
  };

  return (
    <div>
      <h1>Learning Client and Server Connection</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={handleEmail}
            required
          />
          <br />
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
          <br />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
