import {
	AlertTriangle,
	Check,
	Database,
	Download,
	Eye,
	FileArchive,
	FileJson,
	FileText,
	HardDrive,
	Loader2,
	Mail,
	RefreshCw,
	Trash2,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

type DataType = {
	id: string;
	name: string;
	description: string;
	size: string;
	selected: boolean;
};

type ExportHistory = {
	id: string;
	date: string;
	format: string;
	size: string;
	status: 'completed' | 'processing' | 'failed';
};

const DataTypeCheckbox = ({
	id,
	name,
	description,
	size,
	selected,
}: DataType) => (
	<div
		className={`flex items-start gap-3 rounded-lg border p-4 transition-all ${
			selected ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<Checkbox id={id} defaultChecked={selected} className="mt-1" />
		<div className="flex-1">
			<Label htmlFor={id} className="font-medium cursor-pointer">
				{name}
			</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<span className="text-sm text-muted-foreground">{size}</span>
	</div>
);

const ExportHistoryRow = ({
	date,
	format,
	size,
	status,
}: ExportHistory) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div
				className={`flex size-10 items-center justify-center rounded-lg ${
					status === 'completed'
						? 'bg-emerald-500/10 text-emerald-500'
						: status === 'processing'
							? 'bg-primary/10 text-primary'
							: 'bg-destructive/10 text-destructive'
				}`}
			>
				{status === 'processing' ? (
					<Loader2 className="size-5 animate-spin" />
				) : (
					<FileArchive className="size-5" />
				)}
			</div>
			<div>
				<p className="font-medium">{date}</p>
				<p className="text-xs text-muted-foreground">
					{format} • {size}
				</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Badge
				className={
					status === 'completed'
						? 'bg-emerald-500/10 text-emerald-500 border-0'
						: status === 'processing'
							? 'bg-primary/10 text-primary border-0'
							: 'bg-destructive/10 text-destructive border-0'
				}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Badge>
			{status === 'completed' && (
				<Button variant="ghost" size="icon-sm">
					<Download className="size-4" />
				</Button>
			)}
		</div>
	</div>
);

export default function Main() {
	const dataTypes: DataType[] = [
		{
			id: 'profile',
			name: 'Profile Information',
			description: 'Name, email, phone, address, and preferences',
			size: '2.1 MB',
			selected: true,
		},
		{
			id: 'orders',
			name: 'Order History',
			description: 'All your orders, receipts, and invoices',
			size: '15.4 MB',
			selected: true,
		},
		{
			id: 'activity',
			name: 'Account Activity',
			description: 'Login history, actions, and audit logs',
			size: '8.7 MB',
			selected: false,
		},
		{
			id: 'messages',
			name: 'Messages & Support',
			description: 'Support tickets and chat history',
			size: '3.2 MB',
			selected: false,
		},
		{
			id: 'reviews',
			name: 'Reviews & Ratings',
			description: 'Your product reviews and feedback',
			size: '512 KB',
			selected: true,
		},
	];

	const exportHistory: ExportHistory[] = [
		{ id: '1', date: 'Jan 20, 2026', format: 'JSON', size: '18.2 MB', status: 'completed' },
		{ id: '2', date: 'Jan 21, 2026', format: 'CSV', size: '—', status: 'processing' },
		{ id: '3', date: 'Dec 15, 2025', format: 'JSON', size: '12.1 MB', status: 'completed' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Database className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Export Your Data</CardTitle>
										<CardDescription>
											Download a copy of your personal data
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="flex items-center justify-between">
									<Label className="font-semibold">Select Data to Export</Label>
									<Button variant="link" size="sm" className="h-auto p-0">
										Select All
									</Button>
								</div>
								{dataTypes.map((dataType) => (
									<DataTypeCheckbox key={dataType.id} {...dataType} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Export Format</CardTitle>
								<CardDescription>Choose your preferred format</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<RadioGroup defaultValue="json" className="grid gap-3 @sm:grid-cols-3">
									{[
										{ value: 'json', label: 'JSON', description: 'Machine-readable', icon: FileJson },
										{ value: 'csv', label: 'CSV', description: 'Spreadsheet compatible', icon: FileText },
										{ value: 'pdf', label: 'PDF', description: 'Human-readable', icon: FileText },
									].map((format) => (
										<Label
											key={format.value}
											htmlFor={format.value}
											className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
										>
											<RadioGroupItem
												value={format.value}
												id={format.value}
												className="sr-only"
											/>
											<format.icon className="size-8 text-muted-foreground" />
											<span className="font-medium">{format.label}</span>
											<span className="text-xs text-muted-foreground">
												{format.description}
											</span>
										</Label>
									))}
								</RadioGroup>
								<div className="mt-6 flex justify-end">
									<Button className="gap-2">
										<Download className="size-4" />
										Request Export
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Export History</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{exportHistory.map((exp) => (
									<ExportHistoryRow key={exp.id} {...exp} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<HardDrive className="size-5 text-muted-foreground shrink-0" />
									<div>
										<h4 className="font-medium">Total Data Size</h4>
										<p className="mt-1 text-2xl font-bold">29.9 MB</p>
										<Progress value={30} className="mt-2 h-2" />
										<p className="mt-1 text-xs text-muted-foreground">
											30% of 100 MB storage limit
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-amber-500/20 bg-amber-500/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<Mail className="size-5 text-amber-500 shrink-0" />
									<div>
										<h4 className="font-medium">Email Notification</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											You'll receive an email when your export is ready to download.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
