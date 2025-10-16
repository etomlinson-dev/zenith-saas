import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "../../components/ui/button"

export function SimpleThemeToggle() {
  const [theme, setTheme] = useState<string>("light")

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
    setTheme(newTheme)
    localStorage.setItem("zenith-theme", newTheme)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}


