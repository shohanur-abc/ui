'use client';

import * as React from 'react';
import {
	Upload,
	FileSpreadsheet,
	CheckCircle2,
	XCircle,
	AlertTriangle,
	Download,
	RefreshCw,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ImportStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

type ImportResult = {
	row: number;
	sku: string;
	name: string;
	status: 'success' | 'error' | 'warning';
	message: string;
};

type UploadZoneProps = {
	onUpload: () => void;
	title: string;
	description: string;
	accept: string;
};

const UploadZone = ({
	onUpload,
	title,
	description,
	accept,
}: UploadZoneProps) => (
	<div
		className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors hover:border-primary/50 hover:bg-muted/50"
		onClick={onUpload}
	>
		<div className="rounded-full bg-primary/10 p-4">
			<Upload className="size-8 text-primary" />
		</div>
		<h3 className="mt-4 text-lg font-semibold">{title}</h3>
		<p className="mt-1 text-sm text-muted-foreground">{description}</p>
		<p className="mt-2 text-xs text-muted-foreground">Accepted: {accept}</p>
	</div>
);

type ProgressDisplayProps = {
	progress: number;
	status: ImportStatus;
	statusLabels: Record<ImportStatus, string>;
};

const ProgressDisplay = ({
	progress,
	status,
	statusLabels,
}: ProgressDisplayProps) => (
	<div className="space-y-4 p-8">
		<div className="flex items-center gap-3">
			<div className="animate-pulse rounded-full bg-primary/10 p-3">
				<FileSpreadsheet className="size-6 text-primary" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{statusLabels[status]}</p>
				<p className="text-sm text-muted-foreground">{progress}% complete</p>
			</div>
		</div>
		<Progress value={progress} className="h-2" />
	</div>
);

type ResultsSummaryProps = {
	results: ImportResult[];
	labels: { success: string; errors: string; warnings: string };
};

const ResultsSummary = ({ results, labels }: ResultsSummaryProps) => {
	const successCount = results.filter((r) => r.status === 'success').length;
	const errorCount = results.filter((r) => r.status === 'error').length;
	const warningCount = results.filter((r) => r.status === 'warning').length;

	return (
		<div className="grid gap-4 @sm:grid-cols-3">
			<div className="flex items-center gap-3 rounded-lg border p-4">
				<CheckCircle2 className="size-8 text-emerald-500" />
				<div>
					<p className="text-2xl font-bold">{successCount}</p>
					<p className="text-sm text-muted-foreground">{labels.success}</p>
				</div>
			</div>
			<div className="flex items-center gap-3 rounded-lg border p-4">
				<XCircle className="size-8 text-destructive" />
				<div>
					<p className="text-2xl font-bold">{errorCount}</p>
					<p className="text-sm text-muted-foreground">{labels.errors}</p>
				</div>
			</div>
			<div className="flex items-center gap-3 rounded-lg border p-4">
				<AlertTriangle className="size-8 text-yellow-500" />
				<div>
					<p className="text-2xl font-bold">{warningCount}</p>
					<p className="text-sm text-muted-foreground">{labels.warnings}</p>
				</div>
			</div>
		</div>
	);
};

type ResultsTableProps = {
	results: ImportResult[];
	columns: {
		row: string;
		sku: string;
		name: string;
		status: string;
		message: string;
	};
};

const ResultsTable = ({ results, columns }: ResultsTableProps) => (
	<div className="rounded-lg border">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-16">{columns.row}</TableHead>
					<TableHead>{columns.sku}</TableHead>
					<TableHead>{columns.name}</TableHead>
					<TableHead className="w-24">{columns.status}</TableHead>
					<TableHead>{columns.message}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{results.map((result) => (
					<TableRow key={result.row}>
						<TableCell>{result.row}</TableCell>
						<TableCell className="font-mono text-sm">{result.sku}</TableCell>
						<TableCell>{result.name}</TableCell>
						<TableCell>
							<Badge
								variant={
									result.status === 'success'
										? 'default'
										: result.status === 'error'
											? 'destructive'
											: 'secondary'
								}
							>
								{result.status}
							</Badge>
						</TableCell>
						<TableCell className="text-muted-foreground">
							{result.message}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

export default function Main() {
	const [status, setStatus] = React.useState<ImportStatus>('idle');
	const [progress, setProgress] = React.useState(0);

	const importResults: ImportResult[] = [
		{
			row: 1,
			sku: 'SKU-001',
			name: 'Wireless Headphones',
			status: 'success',
			message: 'Imported successfully',
		},
		{
			row: 2,
			sku: 'SKU-002',
			name: 'Bluetooth Speaker',
			status: 'success',
			message: 'Imported successfully',
		},
		{
			row: 3,
			sku: 'SKU-003',
			name: 'USB-C Cable',
			status: 'warning',
			message: 'Duplicate SKU, merged with existing',
		},
		{
			row: 4,
			sku: 'SKU-004',
			name: 'Smart Watch',
			status: 'error',
			message: 'Invalid category specified',
		},
		{
			row: 5,
			sku: 'SKU-005',
			name: 'Phone Case',
			status: 'success',
			message: 'Imported successfully',
		},
	];

	const handleUpload = () => {
		setStatus('uploading');
		setProgress(0);
		const interval = setInterval(() => {
			setProgress((p) => {
				if (p >= 100) {
					clearInterval(interval);
					setStatus('completed');
					return 100;
				}
				return p + 10;
			});
		}, 300);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Bulk Import</CardTitle>
						<CardDescription>
							Import products from CSV or Excel file
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{status === 'idle' && (
							<>
								<UploadZone
									onUpload={handleUpload}
									title="Drop your file here"
									description="or click to browse files"
									accept="CSV, XLSX, XLS"
								/>
								<div className="flex items-center justify-center gap-4">
									<Button variant="outline">
										<Download className="mr-2 size-4" />
										Download Template
									</Button>
								</div>
							</>
						)}
						{(status === 'uploading' || status === 'processing') && (
							<ProgressDisplay
								progress={progress}
								status={status}
								statusLabels={{
									idle: 'Ready to upload',
									uploading: 'Uploading file...',
									processing: 'Processing products...',
									completed: 'Import completed',
									error: 'Import failed',
								}}
							/>
						)}
						{status === 'completed' && (
							<>
								<ResultsSummary
									results={importResults}
									labels={{
										success: 'Imported',
										errors: 'Errors',
										warnings: 'Warnings',
									}}
								/>
								<ResultsTable
									results={importResults}
									columns={{
										row: 'Row',
										sku: 'SKU',
										name: 'Product Name',
										status: 'Status',
										message: 'Message',
									}}
								/>
							</>
						)}
					</CardContent>
					{status === 'completed' && (
						<CardFooter className="flex justify-end gap-3 border-t pt-6">
							<Button variant="outline" onClick={() => setStatus('idle')}>
								<RefreshCw className="mr-2 size-4" />
								Import Another
							</Button>
							<Button>View Imported Products</Button>
						</CardFooter>
					)}
				</Card>
			</div>
		</section>
	);
}
