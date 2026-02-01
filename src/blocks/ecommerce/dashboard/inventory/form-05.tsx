'use client';

import * as React from 'react';
import {
	Package,
	Upload,
	FileSpreadsheet,
	Check,
	X,
	AlertTriangle,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

type UploadStepProps = {
	step: number;
	title: string;
	description: string;
	status: 'pending' | 'active' | 'complete' | 'error';
};

const UploadStep = ({ step, title, description, status }: UploadStepProps) => {
	const getStatusIcon = () => {
		switch (status) {
			case 'complete':
				return <Check className="size-4 text-white" />;
			case 'error':
				return <X className="size-4 text-white" />;
			default:
				return step;
		}
	};

	const getStatusColor = () => {
		switch (status) {
			case 'complete':
				return 'bg-emerald-500';
			case 'error':
				return 'bg-destructive';
			case 'active':
				return 'bg-primary';
			default:
				return 'bg-muted';
		}
	};

	return (
		<div className="flex gap-4">
			<div
				className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${getStatusColor()} ${status === 'pending' ? 'text-muted-foreground' : 'text-white'}`}
			>
				{getStatusIcon()}
			</div>
			<div>
				<p
					className={`font-medium ${status === 'pending' ? 'text-muted-foreground' : ''}`}
				>
					{title}
				</p>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
};

type DropZoneProps = {
	onFileSelect: (file: File) => void;
};

const DropZone = ({ onFileSelect }: DropZoneProps) => {
	const [isDragging, setIsDragging] = React.useState(false);

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) onFileSelect(file);
	};

	return (
		<div
			className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-muted'}`}
			onDragOver={(e) => {
				e.preventDefault();
				setIsDragging(true);
			}}
			onDragLeave={() => setIsDragging(false)}
			onDrop={handleDrop}
		>
			<FileSpreadsheet className="mx-auto size-12 text-muted-foreground" />
			<p className="mt-4 font-medium">Drop your CSV or Excel file here</p>
			<p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
			<Input
				type="file"
				accept=".csv,.xlsx,.xls"
				className="absolute inset-0 cursor-pointer opacity-0"
				onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
			/>
			<Button variant="outline" className="mt-4">
				<Upload className="mr-2 size-4" />
				Select File
			</Button>
		</div>
	);
};

type ResultSummaryProps = {
	total: number;
	success: number;
	errors: number;
	warnings: number;
};

const ResultSummary = ({
	total,
	success,
	errors,
	warnings,
}: ResultSummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-4">
		<div className="rounded-lg border p-4 text-center">
			<Package className="mx-auto size-6 text-primary" />
			<p className="mt-2 text-2xl font-bold">{total}</p>
			<p className="text-sm text-muted-foreground">Total Rows</p>
		</div>
		<div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
			<Check className="mx-auto size-6 text-emerald-500" />
			<p className="mt-2 text-2xl font-bold text-emerald-500">{success}</p>
			<p className="text-sm text-muted-foreground">Imported</p>
		</div>
		<div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-center">
			<AlertTriangle className="mx-auto size-6 text-amber-500" />
			<p className="mt-2 text-2xl font-bold text-amber-500">{warnings}</p>
			<p className="text-sm text-muted-foreground">Warnings</p>
		</div>
		<div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center">
			<X className="mx-auto size-6 text-destructive" />
			<p className="mt-2 text-2xl font-bold text-destructive">{errors}</p>
			<p className="text-sm text-muted-foreground">Errors</p>
		</div>
	</div>
);

export default function Main() {
	const [status, setStatus] = React.useState<UploadStatus>('complete');
	const [progress, setProgress] = React.useState(100);

	const steps: UploadStepProps[] = [
		{
			step: 1,
			title: 'Upload File',
			description: 'Select CSV or Excel file',
			status: 'complete',
		},
		{
			step: 2,
			title: 'Validate Data',
			description: 'Check for errors and duplicates',
			status: 'complete',
		},
		{
			step: 3,
			title: 'Map Columns',
			description: 'Match columns to fields',
			status: 'complete',
		},
		{
			step: 4,
			title: 'Import',
			description: 'Add items to inventory',
			status: 'complete',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Bulk Import</CardTitle>
						<CardDescription>Import inventory from spreadsheet</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-6 @lg:grid-cols-3">
							<div className="space-y-4">
								{steps.map((step) => (
									<UploadStep key={step.step} {...step} />
								))}
							</div>
							<div className="@lg:col-span-2">
								{status === 'complete' ? (
									<ResultSummary
										total={1250}
										success={1235}
										warnings={12}
										errors={3}
									/>
								) : (
									<DropZone onFileSelect={(file) => console.log(file)} />
								)}
							</div>
						</div>
						{status === 'uploading' || status === 'processing' ? (
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>
										{status === 'uploading' ? 'Uploading...' : 'Processing...'}
									</span>
									<span>{progress}%</span>
								</div>
								<Progress value={progress} />
							</div>
						) : null}
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">Download Template</Button>
						<Button>Start New Import</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
