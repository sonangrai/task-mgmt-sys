import { Link, useRouter } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { List, Plus, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { useAuth } from '@/provider/auth-provider'
import { logoutAPI } from '@/api/auth'

export default function Header() {
  const router = useRouter()
  const auth = useAuth()
  const logout = async () => {
    await logoutAPI()
    router.navigate({
      to: '/auth',
    })
  }

  return (
    <header className="border-b-2">
      <div className="container flex justify-between items-center mx-auto py-4">
        <Link to="/" className="font-bold flex items-center">
          <List />
        </Link>

        <div className="flex gap-2">
          <Link
            to="."
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
            )}
          >
            <Plus />
            Create
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{auth.user?.email}</DropdownMenuLabel>
              <DropdownMenuItem onClick={logout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
