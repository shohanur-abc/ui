import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	FileText,
	Download,
	Upload,
	Trash2,
	Edit,
	Eye,
	FolderOpen,
	Image,
	FileSpreadsheet,
	FilePieChart,
	type LucideIcon,
} from 'lucide-react';

interface FileActivity {
	id: string;
	action: 'upload' | 'download' | 'edit' | 'delete' | 'view';
	fileName: string;
	fileType: 'document' | 'image' | 'spreadsheet' | 'report';
	fileSize: string;
	user: {
		name: string;
		avatar?: string;
		initials: string;
	};
	folder?: string;
	timestamp: string;
}

interface FileFeedProps {
	title: string;
	activities: FileActivity[];
	storageUsed: string;
	storageTotal: string;
}

const ActionIcon = ({ action }: { action: FileActivity['action'] }) => {
	const config: Record<
		FileActivity['action'],
		{ icon: LucideIcon; className: string }
	> = {
		upload: { icon: Upload, className: 'bg-emerald-500/20 text-emerald-400' },
		download: { icon: Download, className: 'bg-blue-500/20 text-blue-400' },
		edit: { icon: Edit, className: 'bg-amber-500/20 text-amber-400' },
		delete: { icon: Trash2, className: 'bg-rose-500/20 text-rose-400' },
		view: { icon: Eye, className: 'bg-purple-500/20 text-purple-400' },
	};

	const { icon: Icon, className } = config[action];

	return (
		<div
			className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-4" />
		</div>
	);
};

const FileTypeIcon = ({ type }: { type: FileActivity['fileType'] }) => {
	const config: Record<
		FileActivity['fileType'],
		{ icon: LucideIcon; className: string }
	> = {
		document: { icon: FileText, className: 'text-blue-400' },
		image: { icon: Image, className: 'text-pink-400' },
		spreadsheet: { icon: FileSpreadsheet, className: 'text-emerald-400' },
		report: { icon: FilePieChart, className: 'text-purple-400' },
	};

	const { icon: Icon, className } = config[type];

	return <Icon className={`size-4 ${className}`} />;
};

const ActionLabel = ({ action }: { action: FileActivity['action'] }) => {
	const labels = {
		upload: 'uploaded',
		download: 'downloaded',
		edit: 'edited',
		delete: 'deleted',
		view: 'viewed',
	};

	return <span className="text-muted-foreground">{labels[action]}</span>;
};

const ActivityCard = ({ activity }: { activity: FileActivity }) => (
	<div className="group flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50">
		<ActionIcon action={activity.action} />
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 flex-wrap mb-1">
				<Avatar className="size-5">
					<AvatarImage src={activity.user.avatar} alt={activity.user.name} />
					<AvatarFallback className="text-[10px] bg-secondary">
						{activity.user.initials}
					</AvatarFallback>
				</Avatar>
				<span className="font-medium text-foreground text-sm">
					{activity.user.name}
				</span>
				<ActionLabel action={activity.action} />
			</div>
			<div className="flex items-center gap-2">
				<FileTypeIcon type={activity.fileType} />
				<span className="text-sm text-foreground truncate">
					{activity.fileName}
				</span>
				<Badge variant="outline" className="text-xs shrink-0">
					{activity.fileSize}
				</Badge>
			</div>
			<div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
				{activity.folder && (
					<>
						<FolderOpen className="size-3" />
						<span>{activity.folder}</span>
						<span>•</span>
					</>
				)}
				<span>{activity.timestamp}</span>
			</div>
		</div>
	</div>
);

const StorageIndicator = ({ used, total }: { used: string; total: string }) => {
	const usedNum = parseFloat(used.replace(/[^0-9.]/g, ''));
	const totalNum = parseFloat(total.replace(/[^0-9.]/g, ''));
	const percentage = Math.min((usedNum / totalNum) * 100, 100);

	return (
		<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium text-foreground">
					Storage Used
				</span>
				<span className="text-sm text-muted-foreground">
					{used} of {total}
				</span>
			</div>
			<div className="h-2 w-full rounded-full bg-muted overflow-hidden">
				<div
					className={`h-full transition-all ${
						percentage > 90
							? 'bg-rose-500'
							: percentage > 70
								? 'bg-amber-500'
								: 'bg-primary'
					}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<p className="text-xs text-muted-foreground mt-2">
				{percentage > 80
					? 'Consider upgrading your storage plan'
					: `${(100 - percentage).toFixed(0)}% storage remaining`}
			</p>
		</div>
	);
};

const FileFeed = ({
	title,
	activities,
	storageUsed,
	storageTotal,
}: FileFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm">
				File Manager
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<StorageIndicator used={storageUsed} total={storageTotal} />
			<ScrollArea className="h-[400px]">
				<div className="space-y-1">
					{activities.map((activity) => (
						<ActivityCard key={activity.id} activity={activity} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const fileActivities: FileActivity[] = [
		{
			id: '1',
			action: 'upload',
			fileName: 'Q1-2024-Sales-Report.xlsx',
			fileType: 'spreadsheet',
			fileSize: '2.4 MB',
			user: { name: 'Sarah Chen', initials: 'SC' },
			folder: 'Reports/Sales',
			timestamp: '5 min ago',
		},
		{
			id: '2',
			action: 'download',
			fileName: 'Product-Catalog-Spring.pdf',
			fileType: 'document',
			fileSize: '15.8 MB',
			user: { name: 'Mike Johnson', initials: 'MJ' },
			folder: 'Marketing',
			timestamp: '12 min ago',
		},
		{
			id: '3',
			action: 'edit',
			fileName: 'Inventory-Master-List.xlsx',
			fileType: 'spreadsheet',
			fileSize: '1.2 MB',
			user: { name: 'Emily Davis', initials: 'ED' },
			folder: 'Inventory',
			timestamp: '45 min ago',
		},
		{
			id: '4',
			action: 'view',
			fileName: 'Customer-Analytics-Dashboard.png',
			fileType: 'image',
			fileSize: '856 KB',
			user: { name: 'Alex Kim', initials: 'AK' },
			folder: 'Analytics',
			timestamp: '1 hour ago',
		},
		{
			id: '5',
			action: 'upload',
			fileName: 'Vendor-Contract-2024.pdf',
			fileType: 'document',
			fileSize: '3.1 MB',
			user: { name: 'Jordan Lee', initials: 'JL' },
			folder: 'Legal/Contracts',
			timestamp: '2 hours ago',
		},
		{
			id: '6',
			action: 'delete',
			fileName: 'Old-Product-Images.zip',
			fileType: 'image',
			fileSize: '124 MB',
			user: { name: 'Lisa Anderson', initials: 'LA' },
			folder: 'Archive',
			timestamp: '3 hours ago',
		},
		{
			id: '7',
			action: 'download',
			fileName: 'Monthly-Performance-Report.pdf',
			fileType: 'report',
			fileSize: '4.7 MB',
			user: { name: 'David Kim', initials: 'DK' },
			folder: 'Reports/Monthly',
			timestamp: '4 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<FileFeed
					title="File Activity"
					activities={fileActivities}
					storageUsed="67.4 GB"
					storageTotal="100 GB"
				/>
			</div>
		</section>
	);
}
