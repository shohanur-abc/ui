import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ThemeTestPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">Theme Testing</h1>
                    <p className="text-muted-foreground">কাস্টম থিম সিস্টেম টেস্ট পেজ</p>
                </div>

                {/* Default Theme */}
                <Card>
                    <CardHeader>
                        <CardTitle>Default Theme</CardTitle>
                        <CardDescription>ডিফল্ট থিম কালার</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="h-20 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                Primary
                            </div>
                            <div className="h-20 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-bold">
                                Secondary
                            </div>
                            <div className="h-20 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
                                Accent
                            </div>
                            <div className="h-20 bg-destructive rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                Destructive
                            </div>
                        </div>
                        <Button>Default Button</Button>
                    </CardContent>
                </Card>

                {/* Blue Theme */}
                <Card>
                    <CardHeader>
                        <CardTitle>Blue Theme</CardTitle>
                        <CardDescription>Blue theme কালার স্কিম</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div data-theme="blue" className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="h-20 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                    Primary
                                </div>
                                <div className="h-20 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-bold">
                                    Secondary
                                </div>
                                <div className="h-20 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
                                    Accent
                                </div>
                                <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-muted-foreground font-bold">
                                    Muted
                                </div>
                            </div>
                            <Button>Blue Theme Button</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Green Theme */}
                <Card>
                    <CardHeader>
                        <CardTitle>Green Theme</CardTitle>
                        <CardDescription>Green theme কালার স্কিম</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div data-theme="green" className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="h-20 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                    Primary
                                </div>
                                <div className="h-20 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-bold">
                                    Secondary
                                </div>
                                <div className="h-20 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
                                    Accent
                                </div>
                                <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-muted-foreground font-bold">
                                    Muted
                                </div>
                            </div>
                            <Button>Green Theme Button</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Implementation Guide */}
                <Card>
                    <CardHeader>
                        <CardTitle>Implementation Guide</CardTitle>
                        <CardDescription>কিভাবে থিম ব্যবহার করতে হবে</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                            {`<!-- Blue Theme প্রয়োগ করতে: -->
<div data-theme="blue">
  {/* কন্টেন্ট এখানে */}
</div>

<!-- Green Theme প্রয়োগ করতে: -->
<div data-theme="green">
  {/* কন্টেন্ট এখানে */}
</div>

<!-- HTML element এ: -->
<section data-theme="blue">
  <h1>Blue Theme Section</h1>
</section>`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
