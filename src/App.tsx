import XMLUploader from '../src/components/XMLUploader'
import PWAUpdatePrompt from './components/PWAUpdatePrompt'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <XMLUploader />
        <PWAUpdatePrompt />
      </div>
    </ThemeProvider>
  )
}

export default App