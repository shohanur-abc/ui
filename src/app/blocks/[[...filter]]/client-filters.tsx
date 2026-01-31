"use client"

import { Suspense, ComponentType, useState } from "react"
import { useRouter } from "next/navigation"
import { Playground } from "@/components/Playground"
import { Combobox } from "../combobox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, CalendarIcon } from "lucide-react"
import type { IMetadataFlat } from "@/blocks/type"
import dynamic from "next/dynamic"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Dynamically import block component
const importBlock = (href: string): ComponentType => {
    // href format: "blocks/portfolio/hero/centered-01"
    const importPath = `@/${href}`

    return dynamic(() => import(`@/${href}.tsx`)
        .catch(() => Promise.reject(new Error(`Failed to load: ${importPath}`))))
}

interface ClientFiltersProps {
    website?: string
    block?: string
    variant?: string
    dateFrom?: string
    dateTo?: string
    sortOrder?: 'asc' | 'desc'
    websites: string[]
    blockTypes: string[]
    variants: string[]
    filteredBlocks: IMetadataFlat[]
}

export function ClientFilters({
    website = "",
    block = "",
    variant = "",
    dateFrom = "",
    dateTo = "",
    sortOrder = "desc",
    websites,
    blockTypes,
    variants,
    filteredBlocks
}: ClientFiltersProps) {
    website = website || "websites"
    block = block || "blocks"
    variant = variant || "variants"
    const router = useRouter()

    // Parse dates from strings
    const [fromDate, setFromDate] = useState<Date | undefined>(
        dateFrom ? new Date(dateFrom) : undefined
    )
    const [toDate, setToDate] = useState<Date | undefined>(
        dateTo ? new Date(dateTo) : undefined
    )

    // Parse time from dateFrom and dateTo strings (if they include time)
    const [fromTime, setFromTime] = useState({ hour: "12", minute: "00", period: "AM" as "AM" | "PM" })
    const [toTime, setToTime] = useState({ hour: "11", minute: "59", period: "PM" as "AM" | "PM" })

    const hasActiveFilters = website || block || variant || dateFrom || dateTo || sortOrder !== 'desc'
    const clearFilters = () => {
        router.push(`/blocks`)
        setFromDate(undefined)
        setToDate(undefined)
    }

    const updateFilters = (updates: {
        dateFrom?: string
        dateTo?: string
        sort?: string
    }) => {
        const params = new URLSearchParams()
        if (website && website !== "websites") params.set('website', website)
        if (block && block !== "blocks") params.set('block', block)
        if (variant && variant !== "variants") params.set('variant', variant)
        if (updates.dateFrom) params.set('dateFrom', updates.dateFrom)
        else if (dateFrom) params.set('dateFrom', dateFrom)
        if (updates.dateTo) params.set('dateTo', updates.dateTo)
        else if (dateTo) params.set('dateTo', dateTo)
        if (updates.sort && updates.sort !== 'desc') params.set('sort', updates.sort)
        else if (sortOrder && sortOrder !== 'desc') params.set('sort', sortOrder)

        router.push(`/blocks?${params.toString()}`)
    }

    return (
        <div className="w-full">
            {/* Filter Bar */}
            <div className=" z-50 bg-background/95 backdrop-blur-sm border-b mb-6  py-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold">All Blocks</h1>

                    <Combobox
                        items={websites.map(w => ({ value: w, label: w }))}
                        value={website || ""}
                        onSelect={(website) => router.push(`/blocks/${website}`)}
                        placeholder="Website"
                        searchPlaceholder="Search websites..."
                    />

                    <Combobox
                        items={blockTypes.map(b => ({ value: b, label: b }))}
                        value={block || ""}
                        onSelect={(block) => router.push(`/blocks/${website}/${block}`)}
                        placeholder="Block Type"
                        searchPlaceholder="Search blocks..."
                    />

                    <Combobox
                        items={variants.map(t => ({ value: t, label: t }))}
                        value={variant || ""}
                        onSelect={(tag) => router.push(`/blocks/${website}/${block}/${tag}`)}
                        placeholder="Tag"
                        searchPlaceholder="Search tags..."
                    />

                    {/* Date Range Filter - Single Popover */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !fromDate && !toDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {fromDate && toDate
                                    ? `${format(fromDate, "dd-MM-yy")} → ${format(toDate, "dd-MM-yy")}`
                                    : fromDate
                                        ? `${format(fromDate, "dd-MM-yy")} → To date`
                                        : toDate
                                            ? `From date → ${format(toDate, "dd-MM-yy")}`
                                            : "Date Range"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <div className="flex gap-4 p-4">
                                {/* From Date Section */}
                                <div className="space-y-2">
                                    <div className="text-sm font-semibold">From Date</div>
                                    <Calendar
                                        mode="single"
                                        selected={fromDate}
                                        onSelect={(date) => {
                                            setFromDate(date)
                                            if (date) {
                                                const formattedDate = format(date, "yyyy-MM-dd")
                                                updateFilters({ dateFrom: formattedDate })
                                            }
                                        }}
                                    />
                                    {/* From Time Picker */}
                                    <div className="flex items-center gap-2 justify-center pt-2">
                                        <Select
                                            value={fromTime.hour}
                                            onValueChange={(hour) => setFromTime({ ...fromTime, hour })}
                                        >
                                            <SelectTrigger className="w-[70px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                                    <SelectItem key={h} value={h.toString().padStart(2, '0')}>
                                                        {h.toString().padStart(2, '0')}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <span>:</span>
                                        <Select
                                            value={fromTime.minute}
                                            onValueChange={(minute) => setFromTime({ ...fromTime, minute })}
                                        >
                                            <SelectTrigger className="w-[70px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                                                    <SelectItem key={m} value={m.toString().padStart(2, '0')}>
                                                        {m.toString().padStart(2, '0')}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select
                                            value={fromTime.period}
                                            onValueChange={(period) => setFromTime({ ...fromTime, period: period as "AM" | "PM" })}
                                        >
                                            <SelectTrigger className="w-[70px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="AM">AM</SelectItem>
                                                <SelectItem value="PM">PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* To Date Section */}
                                <div className="space-y-2">
                                    <div className="text-sm font-semibold">To Date</div>
                                    <Calendar
                                        mode="single"
                                        selected={toDate}
                                        onSelect={(date) => {
                                            setToDate(date)
                                            if (date) {
                                                const formattedDate = format(date, "yyyy-MM-dd")
                                                updateFilters({ dateTo: formattedDate })
                                            }
                                        }}
                                    />
                                    {/* To Time Picker */}
                                    <div className="flex items-center gap-2 justify-center pt-2">
                                        <Select
                                            value={toTime.hour}
                                            onValueChange={(hour) => setToTime({ ...toTime, hour })}
                                        >
                                            <SelectTrigger className="w-[70px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                                    <SelectItem key={h} value={h.toString().padStart(2, '0')}>
                                                        {h.toString().padStart(2, '0')}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <span>:</span>
                                        <Select
                                            value={toTime.minute}
                                            onValueChange={(minute) => setToTime({ ...toTime, minute })}
                                        >
                                            <SelectTrigger className="w-[70px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                                                    <SelectItem key={m} value={m.toString().padStart(2, '0')}>
                                                        {m.toString().padStart(2, '0')}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select
                                            value={toTime.period}
                                            onValueChange={(period) => setToTime({ ...toTime, period: period as "AM" | "PM" })}
                                        >
                                            <SelectTrigger className="w-[70px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="AM">AM</SelectItem>
                                                <SelectItem value="PM">PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Sort Order with shadcn/ui Select */}
                    <Select
                        value={sortOrder}
                        onValueChange={(value) => updateFilters({ sort: value })}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Newest First</SelectItem>
                            <SelectItem value="asc">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="gap-2"
                        >
                            <X className="size-4" />
                            Clear Filters
                        </Button>
                    )}

                    <div className="ml-auto text-sm text-muted-foreground">
                        {filteredBlocks.length} {filteredBlocks.length === 1 ? 'block' : 'blocks'}
                    </div>
                </div>
            </div>

            {/* Blocks Grid */}
            <div className="grid grid-cols-1 gap-30">
                {filteredBlocks.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No blocks found matching the selected filters.
                    </div>
                ) : (
                    filteredBlocks.map((blockEntry) => {
                        const Component = importBlock(blockEntry.href)

                        return (
                            <div key={blockEntry.href} className="border rounded-lg">
                                <Playground
                                    website={blockEntry.website}
                                    block={blockEntry.block}
                                    variant={blockEntry.name}
                                    tags={blockEntry.tags}
                                    href={blockEntry.href}
                                    Preview={
                                        <Suspense fallback={
                                            <div className="flex items-center justify-center min-h-[33vh]">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                            </div>
                                        }>
                                            <Component />
                                        </Suspense>
                                    }
                                />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
