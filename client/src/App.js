import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message })
    });

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    fetchContacts();
  };

  return (
    <div>
      <h2>Contact Manager</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br /><br />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea><br /><br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h3>Saved Contacts</h3>

      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.name} — {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
