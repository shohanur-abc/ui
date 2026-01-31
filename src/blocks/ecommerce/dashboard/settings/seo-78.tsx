import {
	AlertCircle,
	Check,
	ChevronRight,
	ExternalLink,
	Globe,
	Hash,
	Image,
	Link2,
	Search,
	Settings2,
	Share2,
	Tag,
	Type,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type SeoCheck = {
	name: string;
	status: 'pass' | 'warning' | 'fail';
	message: string;
};

type SocialPreview = {
	platform: 'facebook' | 'twitter';
	title: string;
	description: string;
	image: string;
};

const SeoCheckRow = ({ name, status, message }: SeoCheck) => {
	const statusStyles = {
		pass: 'text-emerald-500',
		warning: 'text-amber-500',
		fail: 'text-destructive',
	};

	const statusIcons = {
		pass: Check,
		warning: AlertCircle,
		fail: AlertCircle,
	};

	const Icon = statusIcons[status];

	return (
		<div className="flex items-start gap-3 py-2">
			<Icon className={`size-4 mt-0.5 ${statusStyles[status]}`} />
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{message}</p>
			</div>
		</div>
	);
};

export default function Main() {
	const seoChecks: SeoCheck[] = [
		{ name: 'Title Tag', status: 'pass', message: 'Title is 58 characters (recommended: 50-60)' },
		{ name: 'Meta Description', status: 'pass', message: 'Description is 148 characters (recommended: 150-160)' },
		{ name: 'Open Graph Tags', status: 'pass', message: 'All OG tags are present' },
		{ name: 'Canonical URL', status: 'warning', message: 'Consider adding canonical URLs to avoid duplicate content' },
		{ name: 'Image Alt Text', status: 'fail', message: '12 images are missing alt text' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Search className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>SEO Settings</CardTitle>
									<CardDescription>
										Optimize your store for search engines
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<Tabs defaultValue="general" className="space-y-6">
								<TabsList>
									<TabsTrigger value="general">General</TabsTrigger>
									<TabsTrigger value="social">Social</TabsTrigger>
									<TabsTrigger value="advanced">Advanced</TabsTrigger>
								</TabsList>

								<TabsContent value="general" className="space-y-6">
									<div className="space-y-4">
										<div className="space-y-2">
											<Label>Homepage Title</Label>
											<Input
												defaultValue="Your Store - Premium Products & Fast Shipping"
												maxLength={60}
											/>
											<p className="text-xs text-muted-foreground">
												58/60 characters
											</p>
										</div>
										<div className="space-y-2">
											<Label>Homepage Description</Label>
											<Textarea
												defaultValue="Shop premium products with fast shipping and excellent customer service. Discover our curated collection of high-quality items."
												maxLength={160}
												className="min-h-20"
											/>
											<p className="text-xs text-muted-foreground">
												148/160 characters
											</p>
										</div>
										<div className="space-y-2">
											<Label>Focus Keywords</Label>
											<Input placeholder="e.g., online store, premium products, fast shipping" />
										</div>
									</div>
								</TabsContent>

								<TabsContent value="social" className="space-y-6">
									<div className="grid gap-6 @md:grid-cols-2">
										<div className="space-y-4">
											<h4 className="font-medium">Facebook / Open Graph</h4>
											<div className="space-y-2">
												<Label>OG Title</Label>
												<Input defaultValue="Your Store - Premium Products" />
											</div>
											<div className="space-y-2">
												<Label>OG Description</Label>
												<Textarea
													defaultValue="Shop premium products with fast shipping."
													className="min-h-16"
												/>
											</div>
											<div className="space-y-2">
												<Label>OG Image</Label>
												<div className="flex gap-2">
													<Input placeholder="https://..." />
													<Button variant="outline" size="icon">
														<Image className="size-4" />
													</Button>
												</div>
											</div>
										</div>
										<div className="space-y-4">
											<h4 className="font-medium">Twitter Card</h4>
											<div className="space-y-2">
												<Label>Card Type</Label>
												<Select defaultValue="summary_large">
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="summary">Summary</SelectItem>
														<SelectItem value="summary_large">Summary Large Image</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2">
												<Label>Twitter Title</Label>
												<Input defaultValue="Your Store - Premium Products" />
											</div>
											<div className="space-y-2">
												<Label>Twitter Description</Label>
												<Textarea
													defaultValue="Shop premium products with fast shipping."
													className="min-h-16"
												/>
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="advanced" className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<Label>Generate Sitemap</Label>
											<p className="text-sm text-muted-foreground">
												Auto-generate XML sitemap
											</p>
										</div>
										<Switch defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div>
											<Label>Robots.txt</Label>
											<p className="text-sm text-muted-foreground">
												Allow search engine crawling
											</p>
										</div>
										<Switch defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div>
											<Label>Canonical URLs</Label>
											<p className="text-sm text-muted-foreground">
												Add canonical tags to prevent duplicate content
											</p>
										</div>
										<Switch defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div>
											<Label>Schema Markup</Label>
											<p className="text-sm text-muted-foreground">
												Add structured data for rich snippets
											</p>
										</div>
										<Switch defaultChecked />
									</div>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">SEO Health Check</CardTitle>
								<div className="flex items-center gap-2">
									<span className="text-sm text-muted-foreground">Score:</span>
									<Badge className="bg-emerald-500/10 text-emerald-500 border-0">
										78/100
									</Badge>
								</div>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-4">
							{seoChecks.map((check) => (
								<SeoCheckRow key={check.name} {...check} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
