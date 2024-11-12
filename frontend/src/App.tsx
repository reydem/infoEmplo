import { Input, InputGroup } from './components/ui'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import './App.css'

function App() {


  return (
    <>
      <h1 className="text-3xl font-bold underline text-cyan-500">
      Hello world!
    </h1>
    <InputGroup>
      <MagnifyingGlassIcon />
      <Input name="search" placeholder="Search&hellip;" aria-label="Search" />
    </InputGroup>
    </>
  )
}

export default App
