import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { useAuth } from '@/provider/auth-provider'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const context = useAuth()

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>Task Management System</p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created with React {context.user?.email}
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
        {}
      </header>
    </div>
  )
}
