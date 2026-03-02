import WhyConnect from './screens/WhyConnect'
import './index.css'

function App() {
  const handleContinue = () => {
    console.log('Navigate to next screen')
    // In the real app, this would navigate to the next onboarding step
    alert('Navegando para a próxima tela...')
  }

  return <WhyConnect onContinue={handleContinue} />
}

export default App
