import { useAppSelector } from "@/lib/hooks"
import { themeSelector } from "@/lib/selector"
import { useEffect } from "react"

export default function ThemeHandler() {
    const { theme } = useAppSelector(themeSelector)

    useEffect(() => {
        const root = document.documentElement

        if (theme == 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [theme])
    
    return null
}