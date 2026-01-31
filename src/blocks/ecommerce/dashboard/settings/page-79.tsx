import {
	AlertCircle,
	Check,
	Code,
	ExternalLink,
	FileCode,
	Globe,
	Layers,
	Monitor,
	Palette,
	Plus,
	Smartphone,
	Tablet,
	Type,
	Upload,
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

type CustomPage = {
	id: string;
	name: string;
	slug: string;
	status: 'published' | 'draft';
	lastModified: string;
};

const PageRow = ({
	name,
	slug,
	status,
	lastModified,
}: CustomPage) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">/{slug}</p>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-xs text-muted-foreground">{lastModified}</span>
			<Badge
				className={`text-xs border-0 ${
					status === 'published'
						? 'bg-emerald-500/10 text-emerald-500'
						: 'bg-amber-500/10 text-amber-500'
				}`}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
			<Button variant="ghost" size="sm">
				Edit
			</Button>
		</div>
	</div>
);

export default function Main() {
	const customPages: CustomPage[] = [
		{ id: '1', name: 'About Us', slug: 'about', status: 'published', lastModified: '2 days ago' },
		{ id: '2', name: 'Contact', slug: 'contact', status: 'published', lastModified: '5 days ago' },
		{ id: '3', name: 'FAQ', slug: 'faq', status: 'published', lastModified: '1 week ago' },
		{ id: '4', name: 'Terms of Service', slug: 'terms', status: 'draft', lastModified: '3 days ago' },
		{ id: '5', name: 'Privacy Policy', slug: 'privacy', status: 'published', lastModified: '1 month ago' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<FileCode className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Custom Pages</CardTitle>
										<CardDescription>
											Create and manage custom pages for your store
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Create Page
								</Button>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-4">
							{customPages.map((page) => (
								<PageRow key={page.id} {...page} />
							))}
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Header & Footer</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="flex items-center justify-between">
									<div>
										<Label>Sticky Header</Label>
										<p className="text-sm text-muted-foreground">
											Keep header visible while scrolling
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Show Search Bar</Label>
										<p className="text-sm text-muted-foreground">
											Display search in header
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Show Cart Icon</Label>
										<p className="text-sm text-muted-foreground">
											Display cart with item count
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<Label>Newsletter in Footer</Label>
										<p className="text-sm text-muted-foreground">
											Show email signup form
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Custom Code</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="space-y-2">
									<Label>Custom CSS</Label>
									<Textarea
										placeholder="/* Add custom CSS here */"
										className="font-mono text-sm min-h-20"
									/>
								</div>
								<div className="space-y-2">
									<Label>Custom JavaScript</Label>
									<Textarea
										placeholder="// Add custom JavaScript here"
										className="font-mono text-sm min-h-20"
									/>
								</div>
								<Button size="sm">Save Code</Button>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Page Preview</CardTitle>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="flex items-center justify-center gap-4 mb-4">
								<Button variant="outline" size="icon">
									<Monitor className="size-4" />
								</Button>
								<Button variant="ghost" size="icon">
									<Tablet className="size-4" />
								</Button>
								<Button variant="ghost" size="icon">
									<Smartphone className="size-4" />
								</Button>
							</div>
							<div className="aspect-video rounded-lg border bg-muted flex items-center justify-center">
								<p className="text-muted-foreground">Preview will appear here</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
