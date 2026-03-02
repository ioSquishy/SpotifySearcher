import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <h1>Spotify Searcher</h1>
      <form>
        <label htmlFor="track">Song name:</label>
        <input required id="track" name="track" type="search"></input>

        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default App
