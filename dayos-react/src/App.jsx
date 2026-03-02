import { useState } from 'react'
import SplashScreen from './screens/SplashScreen'
import SignUp from './screens/SignUp'
import NameInput from './screens/NameInput'
import WhyConnect from './screens/WhyConnect'
import RecapTime from './screens/RecapTime'
import ReadyScreen from './screens/ReadyScreen'
import './index.css'

function App() {
  const [screen, setScreen] = useState('splash')
  const [userName, setUserName] = useState('')
  const [recapTime, setRecapTime] = useState('21:00')

  if (screen === 'splash') {
    return (
      <SplashScreen
        onContinue={() => setScreen('signup')}
        onLogin={() => console.log('Navigate to login')}
      />
    )
  }

  if (screen === 'signup') {
    return (
      <SignUp
        onContinue={() => setScreen('name')}
        onBack={() => setScreen('splash')}
        onLogin={() => console.log('Navigate to login')}
      />
    )
  }

  if (screen === 'name') {
    return (
      <NameInput
        step="1 de 3"
        progress="33%"
        onContinue={(name) => {
          setUserName(name)
          setScreen('why-connect')
        }}
      />
    )
  }

  if (screen === 'why-connect') {
    return (
      <WhyConnect
        onContinue={() => setScreen('recap')}
      />
    )
  }

  if (screen === 'recap') {
    return (
      <RecapTime
        step="3 de 3"
        progress="100%"
        onContinue={({ time }) => {
          setRecapTime(time)
          setScreen('ready')
        }}
      />
    )
  }

  if (screen === 'ready') {
    return (
      <ReadyScreen
        userName={userName || 'Usuário'}
        recapTime={recapTime}
        onContinue={() => alert('🎉 Onboarding completo! Indo para o Morning Briefing...')}
      />
    )
  }

  return null
}

export default App
