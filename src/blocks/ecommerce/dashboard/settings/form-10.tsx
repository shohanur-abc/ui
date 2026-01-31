import { HelpCircle, Keyboard, MessageCircle, Search, Video } from 'lucide-react';

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
import { Kbd } from '@/components/ui/kbd';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type QuickLink = {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	href: string;
};

type KeyboardShortcut = {
	action: string;
	keys: string[];
};

type AccessibilitySetting = {
	id: string;
	title: string;
	description: string;
	enabled: boolean;
};

const QuickLinkCard = ({ title, description, icon: Icon, href }: QuickLink) => (
	<a
		href={href}
		className="group flex items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/30"
	>
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<h4 className="font-medium transition-colors group-hover:text-primary">{title}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</a>
);

const ShortcutRow = ({ action, keys }: KeyboardShortcut) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-sm">{action}</span>
		<div className="flex items-center gap-1">
			{keys.map((key, i) => (
				<span key={key} className="flex items-center gap-1">
					<Kbd>{key}</Kbd>
					{i < keys.length - 1 && <span className="text-muted-foreground">+</span>}
				</span>
			))}
		</div>
	</div>
);

const AccessibilityToggle = ({ title, description, enabled }: AccessibilitySetting) => (
	<div className="flex items-center justify-between gap-4 py-3">
		<div className="space-y-0.5">
			<Label className="font-medium">{title}</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const quickLinks: QuickLink[] = [
		{
			title: 'Documentation',
			description: 'Learn how to use all features',
			icon: HelpCircle,
			href: '#docs',
		},
		{
			title: 'Video Tutorials',
			description: 'Watch step-by-step guides',
			icon: Video,
			href: '#tutorials',
		},
		{
			title: 'Live Chat Support',
			description: 'Get help from our team',
			icon: MessageCircle,
			href: '#support',
		},
	];

	const shortcuts: KeyboardShortcut[] = [
		{ action: 'Open command palette', keys: ['⌘', 'K'] },
		{ action: 'Quick search', keys: ['⌘', 'F'] },
		{ action: 'New order', keys: ['⌘', 'N'] },
		{ action: 'Toggle sidebar', keys: ['⌘', 'B'] },
		{ action: 'Go to dashboard', keys: ['G', 'D'] },
		{ action: 'Go to orders', keys: ['G', 'O'] },
		{ action: 'Go to products', keys: ['G', 'P'] },
		{ action: 'Go to settings', keys: ['G', 'S'] },
	];

	const accessibilitySettings: AccessibilitySetting[] = [
		{
			id: 'reduceMotion',
			title: 'Reduce Motion',
			description: 'Minimize animations throughout the interface',
			enabled: false,
		},
		{
			id: 'highContrast',
			title: 'High Contrast Mode',
			description: 'Increase contrast for better visibility',
			enabled: false,
		},
		{
			id: 'largeText',
			title: 'Large Text',
			description: 'Increase font size across the interface',
			enabled: false,
		},
		{
			id: 'screenReader',
			title: 'Screen Reader Optimization',
			description: 'Optimize the interface for screen readers',
			enabled: true,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<HelpCircle className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Help & Support</CardTitle>
									<CardDescription>Find answers and get assistance</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search help articles..."
									className="pl-10"
								/>
							</div>
							<div className="grid gap-3 @md:grid-cols-3">
								{quickLinks.map((link) => (
									<QuickLinkCard key={link.title} {...link} />
								))}
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Keyboard className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Keyboard Shortcuts</CardTitle>
										<CardDescription>Speed up your workflow</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{shortcuts.map((shortcut) => (
									<ShortcutRow key={shortcut.action} {...shortcut} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<HelpCircle className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Accessibility</CardTitle>
											<CardDescription>Customize your experience</CardDescription>
										</div>
									</div>
									<Badge variant="secondary">WCAG 2.1</Badge>
								</div>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{accessibilitySettings.map((setting) => (
									<AccessibilityToggle key={setting.id} {...setting} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
