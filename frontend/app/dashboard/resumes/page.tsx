'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Search, MoreVertical, FileText, Calendar, TrendingUp, Download, Eye, Trash2, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { useDeleteResumeByIdMutation, useGetResumesListByUserQuery, useLazyDownloadResumeByIdQuery } from "@/features/resume/apiSlice"
import { get } from "lodash"
import moment from "moment"
import { ResumeTypeForList } from "@/types/Resume"
import { useEffect, useState } from "react"
import { hideLoader, showLoader } from "@/features/common/loaderSlice"

import { DropdownMenu, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useDebounce from "@/hooks/use-debounce"
import { PAGE_SIZE } from "@/constants/apiCodes"
import { ACTION_ITEMS, RESUME_STATUS, RESUME_STATUS_LABELS } from "@/constants/resume"
import { useRouter } from "next/navigation"

export default function ResumesPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const userId = get(user, "_id", "");
  const router = useRouter();

  const debouncedSearchItem = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, isFetching } = useGetResumesListByUserQuery({
    userId,
    page,
    limit: PAGE_SIZE,
    status: statusFilter,
    search: debouncedSearchItem
  }, { skip: !userId });

  const [downloadResume, { isLoading: isDownloadLoading, isError: isDownloadError, error: downloadError }] = useLazyDownloadResumeByIdQuery()
  const [deleteResume,{isLoading:isDeleteLoading}] = useDeleteResumeByIdMutation()

  const resumes = get(data, "resumes", []);
  const pagination = get(data, "pagination", null)
  const totalPages = get(pagination, "totalPages", 1)
  const isEmpty = !isLoading && resumes.length === 0;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.error("Failed to fetch resumes");
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading || isFetching || isDownloadLoading || isDeleteLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isFetching, isDownloadLoading]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case RESUME_STATUS.ANALYZED:
        return <Badge variant="default">{RESUME_STATUS_LABELS[RESUME_STATUS.ANALYZED]}</Badge>
      case RESUME_STATUS.PROCESSING:
        return <Badge variant="secondary">{RESUME_STATUS_LABELS[RESUME_STATUS.PROCESSING]}</Badge>
      case RESUME_STATUS.PROCESSED:
        return <Badge variant="secondary">{RESUME_STATUS_LABELS[RESUME_STATUS.PROCESSED]}</Badge>
      case RESUME_STATUS.FAILED:
        return <Badge variant="destructive">{RESUME_STATUS_LABELS[RESUME_STATUS.FAILED]}</Badge>
      default:
        return <Badge variant="outline">Draft</Badge>
    }
  }

  const handleDownload = async (resumeId: string, originalName: string) => {
    try {
      const blob = await downloadResume(resumeId).unwrap()

      const url = globalThis.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = originalName
      link.click()

      globalThis.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  const onActionItem = async (resumeId: string, action: string,title: string= "Testing") => {
    switch (action) {
      case ACTION_ITEMS.VIEW:
        if (resumeId) {
          router.push(`/dashboard/resumes/upload/?resumeId=${resumeId}`);
        }
        // Navigate to the resume details page or show a modal
        break;
      case ACTION_ITEMS.DOWNLOAD:
        // Trigger the download of the resume file
          handleDownload(resumeId, title);
        break;
      case ACTION_ITEMS.DELETE:
        deleteResume(resumeId)
        // Show a confirmation dialog and delete the resume if confirmed
        break;
      default:
        break;
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">Resume Library</h1>
          <p className="text-muted-foreground text-pretty">
            Manage and analyze your resumes with AI-powered insights.
          </p>
        </div>
        <Button asChild type="button">
          <Link href="/dashboard/resumes/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} disabled={isEmpty} placeholder="Search resumes..." className="pl-10" />
        </div>
        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value)} className="w-auto">
          <TabsList>
            <TabsTrigger value={RESUME_STATUS.ALL}>{RESUME_STATUS_LABELS[RESUME_STATUS.ALL]}</TabsTrigger>
            <TabsTrigger value={RESUME_STATUS.ANALYZED}>{RESUME_STATUS_LABELS[RESUME_STATUS.ANALYZED]}</TabsTrigger>
            <TabsTrigger value={RESUME_STATUS.PROCESSING}>{RESUME_STATUS_LABELS[RESUME_STATUS.PROCESSING]}</TabsTrigger>
            <TabsTrigger value={RESUME_STATUS.FAILED}>{RESUME_STATUS_LABELS[RESUME_STATUS.FAILED]}</TabsTrigger>
            <TabsTrigger value={RESUME_STATUS.PROCESSED}>{RESUME_STATUS_LABELS[RESUME_STATUS.PROCESSED]}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* Resume Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume: ResumeTypeForList) => (
          <Card key={resume._id} className="group hover:shadow-md transition-shadow overflow-visible relative">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start justify-between gap-2">
                {/* Left Section */}
                <div className="flex items-start space-x-2 flex-1 min-w-0 overflow-hidden">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <CardTitle className="text-base break-words line-clamp-2 leading-snug">
                      {get(resume, 'title')}
                    </CardTitle>

                    <CardDescription className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 shrink-0" />
                      <span className="truncate">
                        {moment(get(resume, 'updatedAt', new Date())).fromNow()}
                      </span>
                    </CardDescription>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onActionItem(resume._id, ACTION_ITEMS.VIEW)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onActionItem(resume._id, ACTION_ITEMS.DOWNLOAD,get(resume, 'title'))}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onActionItem(resume._id, ACTION_ITEMS.DELETE)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Score:</span>
                  {get(resume, 'status') === 'analyzed' ? (
                    <span className={`font-semibold ${getScoreColor(get(resume, 'score', 0))}`}>
                      {get(resume, 'score', 0)}%
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
                {getStatusBadge(get(resume, 'status'))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{get(resume, 'fileType')}</span>
                <span>{get(resume, 'size')}</span>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => onActionItem(resume._id, ACTION_ITEMS.VIEW)} variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="mr-2 h-3 w-3" />
                  View
                </Button>
                {resume.status === 'analyzed' && (
                  <Button size="sm" className="flex-1">
                    <TrendingUp className="mr-2 h-3 w-3" />
                    Analyze
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pagination && resumes.length > 0 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {totalPages} &mdash; {pagination.total} total
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPrev || isFetching}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>

            {/* Page number buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - page) <= 2)
              .map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  disabled={isFetching}
                  onClick={() => setPage(p)}
                  className="w-9"
                >
                  {p}
                </Button>
              ))}

            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNext || isFetching}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Empty State for when no resumes */}
      {isEmpty && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
            {!isError && <>
              <p className="text-muted-foreground mb-4">
                Upload your first resume to get started with AI analysis.
              </p>
              <Button asChild>
                <Link href="/dashboard/resumes/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </Link>
              </Button>
            </>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
