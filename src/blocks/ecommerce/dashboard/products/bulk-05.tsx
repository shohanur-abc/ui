'use client';

import * as React from 'react';
import {
	Upload,
	Download,
	FileSpreadsheet,
	AlertCircle,
	CheckCircle2,
	XCircle,
	Loader2,
	File,
	Trash2,
	Eye,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface ImportError {
	row: number;
	field: string;
	message: string;
}

interface ImportResult {
	total: number;
	success: number;
	failed: number;
	errors: ImportError[];
}

interface FileInfo {
	name: string;
	size: number;
	type: string;
}

interface DropZoneProps {
	onFileSelect: (file: File) => void;
	acceptedTypes: string[];
	labels: { drop: string; or: string; browse: string; formats: string };
}

const DropZone = ({ onFileSelect, acceptedTypes, labels }: DropZoneProps) => {
	const [isDragging, setIsDragging] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) onFileSelect(file);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) onFileSelect(file);
	};

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
		>
			<Upload className="mb-4 size-12 text-muted-foreground" />
			<p className="text-center font-medium">{labels.drop}</p>
			<p className="text-center text-sm text-muted-foreground">{labels.or}</p>
			<Button
				variant="outline"
				className="mt-4"
				onClick={() => inputRef.current?.click()}
			>
				{labels.browse}
			</Button>
			<input
				ref={inputRef}
				type="file"
				accept={acceptedTypes.join(',')}
				onChange={handleChange}
				className="hidden"
			/>
			<p className="mt-4 text-xs text-muted-foreground">{labels.formats}</p>
		</div>
	);
};

interface FilePreviewProps {
	file: FileInfo;
	onRemove: () => void;
}

const FilePreview = ({ file, onRemove }: FilePreviewProps) => {
	const formatSize = (bytes: number) => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	};

	return (
		<div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
				<FileSpreadsheet className="size-5 text-emerald-500" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{file.name}</p>
				<p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
			</div>
			<Button variant="ghost" size="icon-sm" onClick={onRemove}>
				<Trash2 className="size-4" />
			</Button>
		</div>
	);
};

interface ImportProgressProps {
	progress: number;
	status: 'idle' | 'processing' | 'complete' | 'error';
	labels: { processing: string; complete: string; error: string };
}

const ImportProgress = ({ progress, status, labels }: ImportProgressProps) => {
	const config = {
		idle: { icon: Upload, color: 'text-muted-foreground', label: '' },
		processing: {
			icon: Loader2,
			color: 'text-primary animate-spin',
			label: labels.processing,
		},
		complete: {
			icon: CheckCircle2,
			color: 'text-emerald-500',
			label: labels.complete,
		},
		error: { icon: XCircle, color: 'text-red-500', label: labels.error },
	};

	const { icon: Icon, color, label } = config[status];

	if (status === 'idle') return null;

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<Icon className={`size-5 ${color}`} />
				<span className="font-medium">{label}</span>
			</div>
			<Progress value={progress} />
		</div>
	);
};

interface ImportResultsProps {
	result: ImportResult;
	labels: { total: string; success: string; failed: string };
}

const ImportResults = ({ result, labels }: ImportResultsProps) => (
	<div className="space-y-4">
		<div className="grid gap-4 @sm:grid-cols-3">
			<div className="rounded-lg border bg-muted/30 p-4 text-center">
				<p className="text-2xl font-bold">{result.total}</p>
				<p className="text-sm text-muted-foreground">{labels.total}</p>
			</div>
			<div className="rounded-lg border bg-emerald-500/10 p-4 text-center">
				<p className="text-2xl font-bold text-emerald-500">{result.success}</p>
				<p className="text-sm text-muted-foreground">{labels.success}</p>
			</div>
			<div className="rounded-lg border bg-red-500/10 p-4 text-center">
				<p className="text-2xl font-bold text-red-500">{result.failed}</p>
				<p className="text-sm text-muted-foreground">{labels.failed}</p>
			</div>
		</div>

		{result.errors.length > 0 && (
			<div className="space-y-2">
				<h4 className="flex items-center gap-2 font-medium">
					<AlertCircle className="size-4 text-red-500" />
					Errors ({result.errors.length})
				</h4>
				<div className="max-h-48 overflow-auto rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-20">Row</TableHead>
								<TableHead>Field</TableHead>
								<TableHead>Error</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{result.errors.map((error, idx) => (
								<TableRow key={idx}>
									<TableCell className="font-medium">{error.row}</TableCell>
									<TableCell>{error.field}</TableCell>
									<TableCell className="text-red-500">
										{error.message}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		)}
	</div>
);

interface ExportOptionsProps {
	onExport: (format: 'csv' | 'xlsx' | 'json') => void;
	labels: {
		csv: string;
		xlsx: string;
		json: string;
		allProducts: string;
		selectedOnly: string;
	};
}

const ExportOptions = ({ onExport, labels }: ExportOptionsProps) => (
	<div className="space-y-4">
		<div className="grid gap-3 @sm:grid-cols-3">
			<Button
				variant="outline"
				className="gap-2"
				onClick={() => onExport('csv')}
			>
				<FileSpreadsheet className="size-4" />
				{labels.csv}
			</Button>
			<Button
				variant="outline"
				className="gap-2"
				onClick={() => onExport('xlsx')}
			>
				<File className="size-4" />
				{labels.xlsx}
			</Button>
			<Button
				variant="outline"
				className="gap-2"
				onClick={() => onExport('json')}
			>
				<File className="size-4" />
				{labels.json}
			</Button>
		</div>
		<div className="flex gap-3">
			<Button className="flex-1 gap-2">
				<Download className="size-4" />
				{labels.allProducts}
			</Button>
			<Button variant="secondary" className="flex-1 gap-2">
				<Download className="size-4" />
				{labels.selectedOnly}
			</Button>
		</div>
	</div>
);

export default function Main() {
	const [activeTab, setActiveTab] = React.useState('import');
	const [selectedFile, setSelectedFile] = React.useState<FileInfo | null>(null);
	const [importStatus, setImportStatus] = React.useState<
		'idle' | 'processing' | 'complete' | 'error'
	>('idle');
	const [progress, setProgress] = React.useState(0);
	const [result, setResult] = React.useState<ImportResult | null>(null);

	const handleFileSelect = (file: File) => {
		setSelectedFile({
			name: file.name,
			size: file.size,
			type: file.type,
		});
	};

	const handleImport = () => {
		setImportStatus('processing');
		setProgress(0);

		// Simulate import
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setImportStatus('complete');
					setResult({
						total: 150,
						success: 142,
						failed: 8,
						errors: [
							{ row: 23, field: 'price', message: 'Invalid price format' },
							{ row: 45, field: 'sku', message: 'Duplicate SKU' },
							{
								row: 67,
								field: 'stock',
								message: 'Negative stock not allowed',
							},
						],
					});
					return 100;
				}
				return prev + 5;
			});
		}, 100);
	};

	const handleExport = (format: 'csv' | 'xlsx' | 'json') => {
		console.log('Export as', format);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="import" className="gap-1.5">
							<Upload className="size-3.5" />
							Import Products
						</TabsTrigger>
						<TabsTrigger value="export" className="gap-1.5">
							<Download className="size-3.5" />
							Export Products
						</TabsTrigger>
					</TabsList>

					<TabsContent value="import" className="mt-6 space-y-6">
						{!selectedFile ? (
							<DropZone
								onFileSelect={handleFileSelect}
								acceptedTypes={['.csv', '.xlsx', '.json']}
								labels={{
									drop: 'Drag and drop your file here',
									or: 'or',
									browse: 'Browse Files',
									formats: 'Accepted formats: CSV, XLSX, JSON',
								}}
							/>
						) : (
							<>
								<FilePreview
									file={selectedFile}
									onRemove={() => {
										setSelectedFile(null);
										setImportStatus('idle');
										setResult(null);
									}}
								/>

								<ImportProgress
									progress={progress}
									status={importStatus}
									labels={{
										processing: 'Importing products...',
										complete: 'Import complete',
										error: 'Import failed',
									}}
								/>

								{result && (
									<ImportResults
										result={result}
										labels={{
											total: 'Total Rows',
											success: 'Imported',
											failed: 'Failed',
										}}
									/>
								)}

								{importStatus === 'idle' && (
									<div className="flex gap-3">
										<Button variant="outline" className="flex-1 gap-2">
											<Eye className="size-4" />
											Preview
										</Button>
										<Button className="flex-1 gap-2" onClick={handleImport}>
											<Upload className="size-4" />
											Start Import
										</Button>
									</div>
								)}
							</>
						)}
					</TabsContent>

					<TabsContent value="export" className="mt-6 space-y-6">
						<div className="rounded-lg border bg-muted/30 p-6 text-center">
							<Download className="mx-auto mb-4 size-12 text-muted-foreground" />
							<h3 className="font-semibold">Export Products</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Download your product catalog in various formats
							</p>
						</div>

						<Separator />

						<ExportOptions
							onExport={handleExport}
							labels={{
								csv: 'CSV File',
								xlsx: 'Excel File',
								json: 'JSON File',
								allProducts: 'Export All Products',
								selectedOnly: 'Export Selected Only',
							}}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
