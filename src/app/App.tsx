import React from 'react'
import { GlobalStateProvider } from '../context/GlobalStateContext'
import IngredientsTable from '../components/IngredientsTable'
import './App.scss'

function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <IngredientsTable />
      </GlobalStateProvider>
    </div>
  )
}

export default App
