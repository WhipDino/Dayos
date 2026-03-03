import { useState } from 'react'
import SplashScreen from './screens/SplashScreen'
import SignUp from './screens/SignUp'
import NameInput from './screens/NameInput'
import WhyConnect from './screens/WhyConnect'
import Integrations from './screens/Integrations'
import RoutineChat from './screens/RoutineChat'
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
        step="1 de 5"
        progress="20%"
        onBack={() => setScreen('signup')}
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
        onBack={() => setScreen('name')}
        onContinue={() => setScreen('integrations')}
      />
    )
  }

  if (screen === 'integrations') {
    return (
      <Integrations
        onBack={() => setScreen('why-connect')}
        onContinue={() => setScreen('routine')}
      />
    )
  }

  if (screen === 'routine') {
    return (
      <RoutineChat
        onBack={() => setScreen('integrations')}
        onContinue={() => {
          setScreen('recap')
        }}
      />
    )
  }

  if (screen === 'recap') {
    return (
      <RecapTime
        step="5 de 5"
        progress="100%"
        onBack={() => setScreen('routine')}
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
