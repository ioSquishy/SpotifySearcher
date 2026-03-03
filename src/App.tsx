import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [songQuery, setSongQuery] = useState("");
  const songSearchRef = useRef<HTMLInputElement>(null);

  function querySong(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (songSearchRef.current && songSearchRef.current.value !== "") {
      setSongQuery(songSearchRef.current.value);
    }
  }

  useEffect(() => {
    // runs whenever songQuery is updated
    fetch("/api/search")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }, [songQuery])

  return (
    <div>
      <h1>Spotify Searcher</h1>
      <form onSubmit={querySong}>
        <label htmlFor="track">Song name:</label>
        <input ref={songSearchRef} required id="track" name="track" type="search"></input>

        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default App
