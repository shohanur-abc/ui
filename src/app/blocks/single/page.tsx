"use client"

import { useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Copy, RotateCcw, Download } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type DeviceView = 'mobile' | 'tablet' | 'desktop'

interface DeviceViewConfig {
    width: number | string
    height: number | string
    label: string
}

const DEVICE_CONFIGS: Record<DeviceView, DeviceViewConfig> = {
    mobile: { width: 375, height: 667, label: 'Mobile (iPhone)' },
    tablet: { width: 768, height: 1024, label: 'Tablet (iPad)' },
    desktop: { width: '100%', height: 'auto', label: 'Desktop' }
}

export default function SinglePreview() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [deviceView, setDeviceView] = useState<DeviceView>('desktop')
    const [copied, setCopied] = useState(false)

    const website = searchParams.get('website')
    const variant = searchParams.get('variant')
    
    const previewUrl = website && variant 
        ? `/block/${website}/${variant}?embedded=true` 
        : null

    const config = DEVICE_CONFIGS[deviceView]

    const handleCopyUrl = () => {
        if (previewUrl) {
            navigator.clipboard.writeText(`${window.location.origin}${previewUrl}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleReload = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src
        }
    }

    const handleDownload = () => {
        if (iframeRef.current && previewUrl) {
            const link = document.createElement('a')
            link.href = `${window.location.origin}${previewUrl}`
            link.download = `${website}-${variant}-preview.html`
            link.click()
        }
    }

    if (!website || !variant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">No block selected</h1>
                    <p className="text-muted-foreground mb-6">
                        Use search parameters to load a preview
                    </p>
                    <Button onClick={() => router.push('/block')}>
                        Browse Blocks
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {website} / {variant}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Single Block Preview
                        </p>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push('/block')}
                    >
                        Back to Blocks
                    </Button>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card border rounded-lg p-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Device View</p>
                        <ToggleGroup 
                            type="single" 
                            value={deviceView}
                            onValueChange={(value) => value && setDeviceView(value as DeviceView)}
                            className="justify-start"
                        >
                            <ToggleGroupItem value="mobile" aria-label="Mobile view">
                                Mobile
                            </ToggleGroupItem>
                            <ToggleGroupItem value="tablet" aria-label="Tablet view">
                                Tablet
                            </ToggleGroupItem>
                            <ToggleGroupItem value="desktop" aria-label="Desktop view">
                                Desktop
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleReload}
                            title="Reload preview"
                        >
                            <RotateCcw className="size-4 mr-2" />
                            Reload
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleCopyUrl}
                            title="Copy preview URL"
                        >
                            <Copy className="size-4 mr-2" />
                            {copied ? 'Copied!' : 'Copy URL'}
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleDownload}
                            title="Download preview"
                        >
                            <Download className="size-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
            </div>

            {/* Preview Container */}
            <div className="flex justify-center bg-card border rounded-lg p-4 min-h-[60vh]">
                <div 
                    className="flex items-start justify-center"
                    style={{
                        width: typeof config.width === 'number' ? `${config.width}px` : config.width
                    }}
                >
                    {previewUrl ? (
                        <iframe
                            ref={iframeRef}
                            key={deviceView}
                            title={`${website} - ${variant} preview`}
                            src={previewUrl}
                            className="border rounded-lg bg-white shadow-xl"
                            style={{
                                width: typeof config.width === 'number' ? '100%' : config.width,
                                height: typeof config.height === 'number' ? `${config.height}px` : config.height,
                                minHeight: '400px'
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center text-muted-foreground">
                            No preview available
                        </div>
                    )}
                </div>
            </div>

            {/* Info Footer */}
            <div className="mt-6 text-xs text-muted-foreground text-center">
                <p>
                    {config.label} • {typeof config.width === 'number' ? `${config.width}px` : 'Full Width'} 
                    {typeof config.height === 'number' && ` × ${config.height}px`}
                </p>
            </div>
        </div>
    )
}