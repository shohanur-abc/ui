import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Box,
	Calendar,
	ChevronRight,
	Clock,
	DollarSign,
	Download,
	Edit,
	Eye,
	Folder,
	Globe,
	HardDrive,
	ImageIcon,
	LogOut,
	MoreHorizontal,
	Plus,
	Settings,
	Share2,
	Star,
	Trash2,
	Upload,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const StorageSidebar = ({
	src,
	fallback,
	name,
	email,
	plan,
	usedStorage,
	totalStorage,
}: {
	src: string;
	fallback: string;
	name: string;
	email: string;
	plan: string;
	usedStorage: number;
	totalStorage: number;
}) => (
	<div className="space-y-4">
		<div className="flex items-center gap-3">
			<Avatar className="size-12">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<h2 className="font-semibold truncate">{name}</h2>
				<p className="text-sm text-muted-foreground truncate">{email}</p>
			</div>
		</div>
		<Badge variant="secondary" className="w-full justify-center">
			{plan}
		</Badge>
		<div className="space-y-2">
			<div className="flex justify-between text-sm">
				<span>Storage</span>
				<span className="text-muted-foreground">
					{usedStorage} / {totalStorage} GB
				</span>
			</div>
			<Progress value={(usedStorage / totalStorage) * 100} className="h-2" />
		</div>
		<Button className="w-full gap-2">
			<Upload className="size-4" />
			Upload Files
		</Button>
	</div>
);

const StorageNav = ({
	items,
	activeHref,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		href: string;
		count?: number;
	}[];
	activeHref: string;
}) => (
	<nav className="space-y-1">
		{items.map((item, i) => (
			<Link
				key={i}
				href={item.href}
				className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
					item.href === activeHref
						? 'bg-primary text-primary-foreground'
						: 'hover:bg-muted'
				}`}
			>
				<item.icon className="size-5" />
				<span className="flex-1 text-sm font-medium">{item.label}</span>
				{item.count !== undefined && (
					<span className="text-xs text-muted-foreground">{item.count}</span>
				)}
			</Link>
		))}
	</nav>
);

const StorageCategories = ({
	categories,
}: {
	categories: {
		icon: React.ElementType;
		label: string;
		size: string;
		color: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h3 className="font-semibold flex items-center gap-2">
				<HardDrive className="size-5" />
				Storage Breakdown
			</h3>
		</CardHeader>
		<CardContent>
			<div className="grid @sm:grid-cols-2 gap-4">
				{categories.map((cat, i) => (
					<div
						key={i}
						className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
					>
						<div className={`p-2 rounded-lg ${cat.color}`}>
							<cat.icon className="size-5 text-white" />
						</div>
						<div className="flex-1">
							<p className="font-medium text-sm">{cat.label}</p>
							<p className="text-sm text-muted-foreground">{cat.size}</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const RecentFiles = ({
	files,
}: {
	files: {
		icon: React.ElementType;
		name: string;
		size: string;
		modified: string;
		iconColor: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Recent Files</h3>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/files">View All</Link>
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{files.map((file, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 group"
				>
					<div className="flex items-center gap-3">
						<file.icon className={`size-5 ${file.iconColor}`} />
						<div>
							<p className="font-medium text-sm">{file.name}</p>
							<p className="text-xs text-muted-foreground">
								{file.size} • {file.modified}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
						<Button variant="ghost" size="icon" className="size-8">
							<Download className="size-4" />
						</Button>
						<Button variant="ghost" size="icon" className="size-8">
							<Share2 className="size-4" />
						</Button>
						<Button variant="ghost" size="icon" className="size-8">
							<MoreHorizontal className="size-4" />
						</Button>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const SharedWith = ({
	people,
}: {
	people: {
		src: string;
		fallback: string;
		name: string;
		email: string;
		permission: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Users className="size-5" />
					Shared With
				</h3>
				<Button variant="ghost" size="sm">
					<Plus className="size-4 mr-1" />
					Invite
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{people.map((person, i) => (
				<div key={i} className="flex items-center gap-3">
					<Avatar className="size-10">
						<AvatarImage src={person.src} alt={person.name} />
						<AvatarFallback>{person.fallback}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-sm truncate">{person.name}</p>
						<p className="text-xs text-muted-foreground truncate">
							{person.email}
						</p>
					</div>
					<Badge variant="outline">{person.permission}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
			fallback: 'EC',
			name: 'Emma Chen',
			email: 'emma.c@example.com',
			plan: 'Pro Plan',
			usedStorage: 78,
			totalStorage: 100,
		},
		nav: [
			{ icon: Folder, label: 'All Files', href: '/files', count: 2847 },
			{ icon: Clock, label: 'Recent', href: '/recent', count: 24 },
			{ icon: Star, label: 'Starred', href: '/starred', count: 12 },
			{ icon: Share2, label: 'Shared', href: '/shared', count: 48 },
			{ icon: Trash2, label: 'Trash', href: '/trash', count: 8 },
		],
		categories: [
			{
				icon: ImageIcon,
				label: 'Images',
				size: '32.4 GB',
				color: 'bg-blue-500',
			},
			{ icon: Box, label: 'Documents', size: '18.2 GB', color: 'bg-green-500' },
			{ icon: Globe, label: 'Videos', size: '24.8 GB', color: 'bg-purple-500' },
			{ icon: Folder, label: 'Other', size: '2.6 GB', color: 'bg-orange-500' },
		],
		files: [
			{
				icon: ImageIcon,
				name: 'product-photos.zip',
				size: '128 MB',
				modified: '2 hours ago',
				iconColor: 'text-blue-500',
			},
			{
				icon: Box,
				name: 'Q4-report.pdf',
				size: '2.4 MB',
				modified: '5 hours ago',
				iconColor: 'text-red-500',
			},
			{
				icon: Globe,
				name: 'presentation.pptx',
				size: '15.8 MB',
				modified: 'Yesterday',
				iconColor: 'text-orange-500',
			},
			{
				icon: Folder,
				name: 'design-assets',
				size: '256 MB',
				modified: '2 days ago',
				iconColor: 'text-amber-500',
			},
		],
		sharedWith: [
			{
				src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
				fallback: 'JW',
				name: 'James Wilson',
				email: 'james@example.com',
				permission: 'Edit',
			},
			{
				src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
				fallback: 'MR',
				name: 'Michael Rodriguez',
				email: 'michael@example.com',
				permission: 'View',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="flex flex-col @lg:flex-row gap-8">
					<aside className="w-full @lg:w-64 shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6 space-y-6">
								<StorageSidebar {...profileData.sidebar} />
								<Separator />
								<StorageNav items={profileData.nav} activeHref="/files" />
								<Separator />
								<Button
									variant="ghost"
									className="w-full justify-start gap-3 text-destructive"
								>
									<LogOut className="size-5" />
									Sign Out
								</Button>
							</CardContent>
						</Card>
					</aside>
					<div className="flex-1 space-y-6">
						<h1 className="text-2xl font-bold">Cloud Storage</h1>
						<StorageCategories categories={profileData.categories} />
						<div className="grid @xl:grid-cols-2 gap-6">
							<RecentFiles files={profileData.files} />
							<SharedWith people={profileData.sharedWith} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
