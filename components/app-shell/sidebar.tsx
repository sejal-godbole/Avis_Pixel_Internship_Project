"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  BarChart3,
  CreditCard,
  Settings,
  School,
} from "lucide-react"

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Students", icon: Users },
  { href: "/teachers", label: "Teachers", icon: GraduationCap },
  { href: "/classes", label: "Classes", icon: School },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/grades", label: "Exams", icon: BarChart3 },
  { href: "/timetable", label: "Timetable", icon: Calendar },
  { href: "/fees", label: "Fee Management", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="w-64 border-r border-gray-800 min-h-screen bg-black shadow-sm">
      <div className="p-6 border-b border-gray-800">
        <div className="text-xl font-bold text-blue-500 flex items-center gap-2">
          <School className="h-7 w-7 text-blue-500" />
          AVIS PIXEL
        </div>
        <p className="text-sm text-blue-300 mt-1">ERP System</p>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "justify-start w-full gap-3 h-11 px-4 font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-900 text-blue-400 border-r-2 border-blue-500 hover:bg-blue-800"
                    : "text-blue-300 hover:bg-blue-900 hover:text-blue-400",
                )}
              >
                <Icon className="h-5 w-5 text-blue-400" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
