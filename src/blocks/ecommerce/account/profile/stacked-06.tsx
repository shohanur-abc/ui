import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	AlertTriangle,
	Bell,
	Calendar,
	CheckCircle2,
	Clock,
	Cloud,
	Download,
	File,
	FileText,
	Folder,
	HardDrive,
	Image,
	MoreHorizontal,
	Music,
	Plus,
	Search,
	Share2,
	Star,
	Trash2,
	Upload,
	Video,
} from 'lucide-react';

const StorageHeader = ({
	used,
	total,
	percentage,
	plan,
}: {
	used: string;
	total: string;
	percentage: number;
	plan: string;
}) => (
	<Card className="bg-gradient-to-r from-sky-500/10 to-blue-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
				<div className="flex items-center gap-4">
					<div className="p-4 rounded-full bg-sky-500/20">
						<Cloud className="size-8 text-sky-500" />
					</div>
					<div>
						<Badge variant="secondary" className="mb-1">
							{plan}
						</Badge>
						<h1 className="text-2xl font-bold">
							{used}{' '}
							<span className="text-lg font-normal text-muted-foreground">
								of {total}
							</span>
						</h1>
						<Progress value={percentage} className="h-2 w-48 mt-2" />
					</div>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" className="gap-2">
						<Upload className="size-4" />
						Upload
					</Button>
					<Button className="gap-2">
						<Plus className="size-4" />
						Upgrade
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const StorageBreakdown = ({
	categories,
}: {
	categories: {
		icon: React.ElementType;
		name: string;
		size: string;
		count: number;
		color: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Storage Breakdown</h2>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{categories.map((cat, i) => (
					<div
						key={i}
						className="flex flex-col items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
					>
						<div className={`p-3 rounded-full ${cat.color} mb-3`}>
							<cat.icon className="size-5 text-white" />
						</div>
						<p className="font-medium">{cat.name}</p>
						<p className="text-lg font-bold">{cat.size}</p>
						<p className="text-xs text-muted-foreground">{cat.count} files</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const QuickAccess = ({
	files,
}: {
	files: {
		name: string;
		type: string;
		modified: string;
		icon: React.ElementType;
		starred: boolean;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Quick Access</h2>
				<Button variant="ghost" size="sm">
					View All
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{files.map((file, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
				>
					<div className="flex items-center gap-3">
						<file.icon className="size-5 text-muted-foreground" />
						<div>
							<p className="font-medium">{file.name}</p>
							<p className="text-xs text-muted-foreground">
								{file.type} • {file.modified}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
						<Button variant="ghost" size="icon" className="size-8">
							<Star
								className={`size-4 ${file.starred ? 'fill-amber-500 text-amber-500' : ''}`}
							/>
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

const RecentActivity = ({
	activities,
}: {
	activities: {
		action: string;
		file: string;
		time: string;
		icon: React.ElementType;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Clock className="size-5" />
				<h2 className="font-semibold">Recent Activity</h2>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{activities.map((activity, i) => (
				<div key={i} className="flex items-center gap-3 text-sm">
					<div className="p-1.5 rounded bg-muted">
						<activity.icon className="size-4 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<span className="text-muted-foreground">{activity.action}</span>{' '}
						<span className="font-medium">{activity.file}</span>
					</div>
					<span className="text-xs text-muted-foreground">{activity.time}</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const SharedWithMe = ({
	shares,
}: {
	shares: {
		name: string;
		owner: { name: string; avatar: string };
		date: string;
		type: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">Shared with Me</h2>
				<Badge variant="secondary">{shares.length} items</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{shares.map((share, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
				>
					<div className="flex items-center gap-3">
						<Folder className="size-5 text-blue-500" />
						<div>
							<p className="font-medium">{share.name}</p>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<Avatar className="size-4">
									<AvatarImage src={share.owner.avatar} />
									<AvatarFallback>{share.owner.name[0]}</AvatarFallback>
								</Avatar>
								{share.owner.name} • {share.date}
							</div>
						</div>
					</div>
					<Badge variant="outline">{share.type}</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const StorageAlerts = ({
	alerts,
}: {
	alerts: { type: 'warning' | 'info'; message: string; action?: string }[];
}) => (
	<div className="space-y-3">
		{alerts.map((alert, i) => (
			<Card
				key={i}
				className={alert.type === 'warning' ? 'border-amber-500/30' : ''}
			>
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						{alert.type === 'warning' ? (
							<AlertTriangle className="size-5 text-amber-500" />
						) : (
							<Bell className="size-5 text-blue-500" />
						)}
						<p className="flex-1 text-sm">{alert.message}</p>
						{alert.action && (
							<Button variant="outline" size="sm">
								{alert.action}
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const TrashInfo = ({
	itemCount,
	size,
}: {
	itemCount: number;
	size: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-red-500/10">
						<Trash2 className="size-5 text-red-500" />
					</div>
					<div>
						<p className="font-medium">Trash</p>
						<p className="text-sm text-muted-foreground">
							{itemCount} items • {size}
						</p>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="text-red-500 hover:text-red-600"
				>
					Empty Trash
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		storage: {
			used: '68.4 GB',
			total: '100 GB',
			percentage: 68,
			plan: 'Pro Plan',
		},
		categories: [
			{
				icon: Image,
				name: 'Photos',
				size: '32.5 GB',
				count: 4521,
				color: 'bg-pink-500',
			},
			{
				icon: Video,
				name: 'Videos',
				size: '18.2 GB',
				count: 234,
				color: 'bg-purple-500',
			},
			{
				icon: FileText,
				name: 'Documents',
				size: '12.8 GB',
				count: 1892,
				color: 'bg-blue-500',
			},
			{
				icon: Music,
				name: 'Music',
				size: '4.9 GB',
				count: 847,
				color: 'bg-green-500',
			},
		],
		quickAccess: [
			{
				name: 'Project Proposal.pdf',
				type: 'PDF',
				modified: '2 hours ago',
				icon: FileText,
				starred: true,
			},
			{
				name: 'Presentation.pptx',
				type: 'PowerPoint',
				modified: 'Yesterday',
				icon: File,
				starred: false,
			},
			{
				name: 'Budget 2024.xlsx',
				type: 'Excel',
				modified: '3 days ago',
				icon: File,
				starred: true,
			},
			{
				name: 'Meeting Notes.docx',
				type: 'Word',
				modified: '1 week ago',
				icon: FileText,
				starred: false,
			},
		],
		activities: [
			{
				action: 'Uploaded',
				file: 'design-v2.fig',
				time: '5 min ago',
				icon: Upload,
			},
			{
				action: 'Shared',
				file: 'Q1 Report.pdf',
				time: '1 hour ago',
				icon: Share2,
			},
			{
				action: 'Downloaded',
				file: 'assets.zip',
				time: '3 hours ago',
				icon: Download,
			},
			{
				action: 'Moved to trash',
				file: 'old-notes.txt',
				time: 'Yesterday',
				icon: Trash2,
			},
		],
		sharedWithMe: [
			{
				name: 'Marketing Assets',
				owner: { name: 'Sarah', avatar: 'https://i.pravatar.cc/32?img=1' },
				date: 'Jan 28',
				type: 'View',
			},
			{
				name: 'Brand Guidelines',
				owner: { name: 'Mike', avatar: 'https://i.pravatar.cc/32?img=2' },
				date: 'Jan 25',
				type: 'Edit',
			},
		],
		alerts: [
			{
				type: 'warning' as const,
				message: 'Storage almost full. Upgrade for more space.',
				action: 'Upgrade',
			},
			{
				type: 'info' as const,
				message: 'Auto-backup completed for 1,245 photos.',
			},
		],
		trash: { itemCount: 23, size: '2.1 GB' },
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<StorageHeader {...profileData.storage} />
				<StorageAlerts alerts={profileData.alerts} />
				<StorageBreakdown categories={profileData.categories} />
				<QuickAccess files={profileData.quickAccess} />
				<RecentActivity activities={profileData.activities} />
				<SharedWithMe shares={profileData.sharedWithMe} />
				<TrashInfo {...profileData.trash} />
			</div>
		</section>
	);
}
