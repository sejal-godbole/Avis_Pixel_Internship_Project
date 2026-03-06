"use client"
import { auth } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Bell, Search, User } from "lucide-react"

export default function Topbar() {
  const router = useRouter()
  const { toast } = useToast()
  const user = auth.getUser()

  const signOut = async () => {
    const { error } = await auth.signOut()
    if (error) {
      toast({ title: "Sign out failed", description: error, variant: "destructive" })
      return
    }
    toast({ title: "Signed out", description: "See you soon!" })
    router.push("/login")
  }

  return (
    <header className="border-b border-gray-800 bg-black shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-blue-400">Welcome back, {user?.name || "Admin"}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-400">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-400">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 pl-3 border-l border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-300">{user?.email || "admin@school.com"}</span>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="text-blue-300 hover:text-blue-400 bg-transparent border-blue-400"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
