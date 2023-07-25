import { Container } from '@chakra-ui/react'
import './App.css'
import Header from './components/Sidebar'

function App() {
  return (
    <Container maxW="100%" backgroundColor='gray.50' padding={0}>
      <Header />
    </Container>
  )
}

export default App
