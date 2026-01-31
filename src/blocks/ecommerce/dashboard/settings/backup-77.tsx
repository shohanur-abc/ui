import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	Calendar,
	Check,
	ChevronRight,
	Clock,
	Database,
	Download,
	FileArchive,
	FileSpreadsheet,
	HardDrive,
	History,
	Loader2,
	Plus,
	RefreshCw,
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

type BackupItem = {
	id: string;
	name: string;
	date: string;
	size: string;
	type: 'auto' | 'manual';
	status: 'completed' | 'in-progress' | 'failed';
};

type ImportExportOption = {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
};

const BackupRow = ({
	name,
	date,
	size,
	type,
	status,
}: BackupItem) => {
	const statusStyles = {
		completed: 'bg-emerald-500/10 text-emerald-500',
		'in-progress': 'bg-primary/10 text-primary',
		failed: 'bg-destructive/10 text-destructive',
	};

	return (
		<div className="flex items-center justify-between py-3">
			<div className="flex items-center gap-3">
				<FileArchive className="size-5 text-muted-foreground" />
				<div>
					<p className="font-medium">{name}</p>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>{date}</span>
						<span>•</span>
						<span>{size}</span>
						<Badge variant="outline" className="text-xs">
							{type}
						</Badge>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2">
				{status === 'in-progress' && (
					<Loader2 className="size-4 animate-spin text-primary" />
				)}
				<Badge className={`${statusStyles[status]} border-0 text-xs`}>
					{status === 'in-progress'
						? 'In Progress'
						: status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
				{status === 'completed' && (
					<Button variant="ghost" size="icon-sm">
						<Download className="size-4" />
					</Button>
				)}
			</div>
		</div>
	);
};

const ImportExportCard = ({
	name,
	description,
	icon: Icon,
	action,
}: ImportExportOption & { action: 'import' | 'export' }) => (
	<div className="flex items-center justify-between rounded-lg border p-4">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Icon className="size-5 text-muted-foreground" />
			</div>
			<div>
				<h4 className="font-medium">{name}</h4>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
		<Button variant="outline" size="sm" className="gap-2">
			{action === 'import' ? (
				<>
					<Upload className="size-4" />
					Import
				</>
			) : (
				<>
					<Download className="size-4" />
					Export
				</>
			)}
		</Button>
	</div>
);

export default function Main() {
	const backups: BackupItem[] = [
		{ id: '1', name: 'Full Backup', date: 'Jan 20, 2026 - 3:00 AM', size: '2.4 GB', type: 'auto', status: 'completed' },
		{ id: '2', name: 'Full Backup', date: 'Jan 19, 2026 - 3:00 AM', size: '2.3 GB', type: 'auto', status: 'completed' },
		{ id: '3', name: 'Pre-update Backup', date: 'Jan 18, 2026 - 11:45 AM', size: '2.3 GB', type: 'manual', status: 'completed' },
		{ id: '4', name: 'Full Backup', date: 'Jan 18, 2026 - 3:00 AM', size: '2.2 GB', type: 'auto', status: 'failed' },
	];

	const importOptions: ImportExportOption[] = [
		{ id: 'products', name: 'Products', description: 'Import from CSV or Excel', icon: FileSpreadsheet },
		{ id: 'customers', name: 'Customers', description: 'Import customer data', icon: Database },
		{ id: 'orders', name: 'Orders', description: 'Import historical orders', icon: FileSpreadsheet },
	];

	const exportOptions: ImportExportOption[] = [
		{ id: 'products', name: 'Products', description: 'Export all products', icon: FileSpreadsheet },
		{ id: 'customers', name: 'Customers', description: 'Export customer list', icon: Database },
		{ id: 'orders', name: 'Orders', description: 'Export order history', icon: FileSpreadsheet },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Database className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Backups</CardTitle>
											<CardDescription>
												Manage your store data backups
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Create Backup
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y pt-4">
								{backups.map((backup) => (
									<BackupRow key={backup.id} {...backup} />
								))}
							</CardContent>
						</Card>

						<div className="grid gap-6 @md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle className="text-base">Import Data</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									{importOptions.map((option) => (
										<ImportExportCard
											key={option.id}
											{...option}
											action="import"
										/>
									))}
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-base">Export Data</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									{exportOptions.map((option) => (
										<ImportExportCard
											key={option.id}
											{...option}
											action="export"
										/>
									))}
								</CardContent>
							</Card>
						</div>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Backup Schedule</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Frequency</label>
									<Select defaultValue="daily">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="hourly">Hourly</SelectItem>
											<SelectItem value="daily">Daily</SelectItem>
											<SelectItem value="weekly">Weekly</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Retention</label>
									<Select defaultValue="30">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="7">7 days</SelectItem>
											<SelectItem value="30">30 days</SelectItem>
											<SelectItem value="90">90 days</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Auto-backup</p>
										<p className="text-xs text-muted-foreground">
											Backup automatically
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Storage Usage</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex justify-between text-sm">
										<span>Used</span>
										<span className="font-medium">18.2 GB / 50 GB</span>
									</div>
									<Progress value={36.4} className="h-2" />
									<p className="text-xs text-muted-foreground">
										31.8 GB available
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6 text-center">
								<HardDrive className="mx-auto size-8 text-primary" />
								<h4 className="mt-2 font-semibold">
									{backups.filter((b) => b.status === 'completed').length} Backups
								</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Last backup: {backups[0].date}
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
