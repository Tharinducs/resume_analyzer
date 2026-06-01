"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useGlobalSearchQuery } from "@/features/dashboard/apiSlice"
import { SearchResumeResult, SearchAnalysisResult, SearchJobResult, SearchPendingResult } from "@/types/dashboard"
import { Search, FileText, BarChart2, Briefcase, Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export function GlobalSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const user = useSelector((state: RootState) => state.auth.user) as { _id?: string } | null
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data, isFetching } = useGlobalSearchQuery(debouncedQuery, {
    skip: !user?._id || debouncedQuery.length < 2,
  })

  const hasResults =
    (data?.resumes?.length ?? 0) +
    (data?.analyses?.length ?? 0) +
    (data?.jobs?.length ?? 0) +
    (data?.pending?.length ?? 0) > 0

  const showDropdown = open && debouncedQuery.length >= 2

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const navigate = (href: string) => {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  const sections: {
    key: string
    label: string
    icon: React.ReactNode
    items: { label: string; sub?: string; href: string }[]
  }[] = []

  if (data?.resumes?.length && pathname !== "/dashboard/resumes") {
    sections.push({
      key: "resumes",
      label: "Resumes",
      icon: <FileText className="h-3.5 w-3.5" />,
      items: (data.resumes as SearchResumeResult[]).map((r) => ({
        label: r.title,
        sub: r.status,
        href: `/dashboard/resumes?search=${encodeURIComponent(r.title)}`,
      })),
    })
  }

  if (data?.analyses?.length) {
    sections.push({
      key: "analyses",
      label: "Analyses",
      icon: <BarChart2 className="h-3.5 w-3.5" />,
      items: (data.analyses as SearchAnalysisResult[]).map((a) => ({
        label: a.title,
        sub: "Analysis report",
        href: `/dashboard/resumes/analysis?resumeId=${a.resumeId}&analysisId=${a._id}`,
      })),
    })
  }

  if (data?.jobs?.length) {
    sections.push({
      key: "jobs",
      label: "Job Analyses",
      icon: <Briefcase className="h-3.5 w-3.5" />,
      items: (data.jobs as SearchJobResult[]).map((j) => ({
        label: j.title,
        sub: "Job analysis",
        href: `/dashboard/history`,
      })),
    })
  }

  if (data?.pending?.length) {
    sections.push({
      key: "pending",
      label: "Pending Comparisons",
      icon: <Clock className="h-3.5 w-3.5 text-yellow-500" />,
      items: (data.pending as SearchPendingResult[]).map((p) => ({
        label: p.resumeTitle,
        sub: `for ${p.jobTitle}`,
        href: `/dashboard/job-analyzer`,
      })),
    })
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search resumes, jobs, or analysis..."
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="w-full h-9 pl-9 pr-4 rounded-md bg-muted/50 border-0 text-sm outline-none ring-0 focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />
        {isFetching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-1.5 left-0 w-full min-w-[340px] z-50 rounded-lg border bg-popover shadow-lg overflow-hidden">
          {isFetching && !data && (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching…
            </div>
          )}

          {!isFetching && !hasResults && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;<span className="font-medium text-foreground">{debouncedQuery}</span>&rdquo;
            </div>
          )}

          {hasResults && sections.map((section) => (
            <div key={section.key}>
              <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground border-b bg-muted/30">
                {section.icon}
                {section.label}
              </div>
              {section.items.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-accent transition-colors",
                    "focus:outline-none focus:bg-accent"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{item.label}</p>
                    {item.sub && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{item.sub}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
