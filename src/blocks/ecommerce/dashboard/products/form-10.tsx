'use client';

import * as React from 'react';
import {
	FileDown,
	FileUp,
	FileSpreadsheet,
	Check,
	X,
	AlertTriangle,
	Download,
	Upload,
	RefreshCw,
	Eye,
	Columns,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface ExportColumn {
	key: string;
	label: string;
	selected: boolean;
}

interface ValidationError {
	row: number;
	column: string;
	message: string;
}

interface ColumnSelectorProps {
	columns: ExportColumn[];
	onToggle: (key: string) => void;
	onSelectAll: () => void;
	onDeselectAll: () => void;
}

const ColumnSelector = ({
	columns,
	onToggle,
	onSelectAll,
	onDeselectAll,
}: ColumnSelectorProps) => {
	const selectedCount = columns.filter((c) => c.selected).length;

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 text-base">
						<Columns className="size-4" />
						Export Columns
					</CardTitle>
					<div className="flex gap-2">
						<Button variant="ghost" size="sm" onClick={onSelectAll}>
							All
						</Button>
						<Button variant="ghost" size="sm" onClick={onDeselectAll}>
							None
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2 @sm:grid-cols-2 @lg:grid-cols-3">
					{columns.map((column) => (
						<label
							key={column.key}
							className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-accent"
						>
							<Checkbox
								checked={column.selected}
								onCheckedChange={() => onToggle(column.key)}
							/>
							<span className="text-sm">{column.label}</span>
						</label>
					))}
				</div>
				<div className="mt-3 text-sm text-muted-foreground">
					{selectedCount} of {columns.length} columns selected
				</div>
			</CardContent>
		</Card>
	);
};

interface ExportOptionsProps {
	format: string;
	onFormatChange: (format: string) => void;
	dateRange: string;
	onDateRangeChange: (range: string) => void;
	onExport: () => void;
	isExporting: boolean;
}

const ExportOptions = ({
	format,
	onFormatChange,
	dateRange,
	onDateRangeChange,
	onExport,
	isExporting,
}: ExportOptionsProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base">Export Options</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="space-y-2">
					<Label>Format</Label>
					<Select value={format} onValueChange={onFormatChange}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="csv">CSV</SelectItem>
							<SelectItem value="xlsx">Excel (XLSX)</SelectItem>
							<SelectItem value="json">JSON</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label>Date Range</Label>
					<Select value={dateRange} onValueChange={onDateRangeChange}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Products</SelectItem>
							<SelectItem value="7d">Last 7 Days</SelectItem>
							<SelectItem value="30d">Last 30 Days</SelectItem>
							<SelectItem value="90d">Last 90 Days</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<Button
				onClick={onExport}
				disabled={isExporting}
				className="w-full gap-2"
			>
				{isExporting ? (
					<RefreshCw className="size-4 animate-spin" />
				) : (
					<Download className="size-4" />
				)}
				{isExporting ? 'Exporting...' : 'Export Products'}
			</Button>
		</CardContent>
	</Card>
);

interface ImportPreviewProps {
	rows: Record<string, string>[];
	errors: ValidationError[];
}

const ImportPreview = ({ rows, errors }: ImportPreviewProps) => {
	if (rows.length === 0) return null;

	const columns = Object.keys(rows[0]);

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 text-base">
						<Eye className="size-4" />
						Import Preview
					</CardTitle>
					<div className="flex gap-2">
						{errors.length > 0 ? (
							<Badge variant="destructive" className="gap-1">
								<AlertTriangle className="size-3" />
								{errors.length} errors
							</Badge>
						) : (
							<Badge variant="default" className="gap-1">
								<Check className="size-3" />
								Valid
							</Badge>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="max-h-64 overflow-auto rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-10">#</TableHead>
								{columns.slice(0, 4).map((col) => (
									<TableHead key={col}>{col}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.slice(0, 5).map((row, idx) => {
								const rowErrors = errors.filter((e) => e.row === idx + 1);
								return (
									<TableRow
										key={idx}
										className={rowErrors.length > 0 ? 'bg-destructive/5' : ''}
									>
										<TableCell className="font-mono text-xs">
											{idx + 1}
											{rowErrors.length > 0 && (
												<AlertTriangle className="ml-1 inline size-3 text-destructive" />
											)}
										</TableCell>
										{columns.slice(0, 4).map((col) => (
											<TableCell key={col} className="text-sm">
												{row[col]}
											</TableCell>
										))}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
				{rows.length > 5 && (
					<p className="mt-2 text-sm text-muted-foreground">
						+{rows.length - 5} more rows
					</p>
				)}
			</CardContent>
		</Card>
	);
};

interface UploadZoneProps {
	onUpload: (file: File) => void;
	isUploading: boolean;
	fileName: string | null;
}

const UploadZone = ({ onUpload, isUploading, fileName }: UploadZoneProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base">Upload File</CardTitle>
		</CardHeader>
		<CardContent>
			<label className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed p-8 hover:border-primary/50">
				{isUploading ? (
					<RefreshCw className="size-12 animate-spin text-primary" />
				) : (
					<Upload className="size-12 text-muted-foreground" />
				)}
				<div className="text-center">
					<p className="font-medium">{fileName || 'Drop your file here'}</p>
					<p className="text-sm text-muted-foreground">
						CSV, XLSX, or JSON up to 10MB
					</p>
				</div>
				<input
					type="file"
					accept=".csv,.xlsx,.json"
					className="hidden"
					onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
				/>
			</label>
		</CardContent>
	</Card>
);

export default function Main() {
	const [columns, setColumns] = React.useState<ExportColumn[]>([
		{ key: 'name', label: 'Product Name', selected: true },
		{ key: 'sku', label: 'SKU', selected: true },
		{ key: 'price', label: 'Price', selected: true },
		{ key: 'cost', label: 'Cost', selected: false },
		{ key: 'stock', label: 'Stock', selected: true },
		{ key: 'category', label: 'Category', selected: true },
		{ key: 'status', label: 'Status', selected: true },
		{ key: 'description', label: 'Description', selected: false },
		{ key: 'weight', label: 'Weight', selected: false },
		{ key: 'dimensions', label: 'Dimensions', selected: false },
		{ key: 'created', label: 'Created Date', selected: false },
		{ key: 'updated', label: 'Updated Date', selected: false },
	]);

	const [exportFormat, setExportFormat] = React.useState('csv');
	const [dateRange, setDateRange] = React.useState('all');
	const [isExporting, setIsExporting] = React.useState(false);

	const [uploadedFile, setUploadedFile] = React.useState<string | null>(null);
	const [isUploading, setIsUploading] = React.useState(false);
	const [previewRows, setPreviewRows] = React.useState<
		Record<string, string>[]
	>([]);
	const [validationErrors, setValidationErrors] = React.useState<
		ValidationError[]
	>([]);

	const toggleColumn = (key: string) => {
		setColumns((prev) =>
			prev.map((c) => (c.key === key ? { ...c, selected: !c.selected } : c)),
		);
	};

	const handleExport = () => {
		setIsExporting(true);
		setTimeout(() => setIsExporting(false), 2000);
	};

	const handleUpload = (file: File) => {
		setIsUploading(true);
		setUploadedFile(file.name);

		// Simulate file processing
		setTimeout(() => {
			setPreviewRows([
				{ name: 'Wireless Mouse', sku: 'WM-001', price: '29.99', stock: '100' },
				{ name: 'USB Keyboard', sku: 'KB-001', price: '49.99', stock: '50' },
				{ name: 'Monitor Stand', sku: 'MS-001', price: '39.99', stock: '75' },
				{ name: '', sku: 'ERR-001', price: 'invalid', stock: '25' },
			]);
			setValidationErrors([
				{ row: 4, column: 'name', message: 'Name is required' },
				{ row: 4, column: 'price', message: 'Invalid price format' },
			]);
			setIsUploading(false);
		}, 1500);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<FileSpreadsheet className="size-5" />
					<h2 className="text-xl font-semibold">Import / Export</h2>
				</div>

				<Tabs defaultValue="export" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="export" className="gap-2">
							<FileDown className="size-4" />
							Export
						</TabsTrigger>
						<TabsTrigger value="import" className="gap-2">
							<FileUp className="size-4" />
							Import
						</TabsTrigger>
					</TabsList>

					<TabsContent value="export" className="space-y-6">
						<ColumnSelector
							columns={columns}
							onToggle={toggleColumn}
							onSelectAll={() =>
								setColumns((prev) =>
									prev.map((c) => ({ ...c, selected: true })),
								)
							}
							onDeselectAll={() =>
								setColumns((prev) =>
									prev.map((c) => ({ ...c, selected: false })),
								)
							}
						/>
						<ExportOptions
							format={exportFormat}
							onFormatChange={setExportFormat}
							dateRange={dateRange}
							onDateRangeChange={setDateRange}
							onExport={handleExport}
							isExporting={isExporting}
						/>
					</TabsContent>

					<TabsContent value="import" className="space-y-6">
						<UploadZone
							onUpload={handleUpload}
							isUploading={isUploading}
							fileName={uploadedFile}
						/>
						<ImportPreview rows={previewRows} errors={validationErrors} />
						{previewRows.length > 0 && (
							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={() => {
										setPreviewRows([]);
										setUploadedFile(null);
									}}
								>
									Cancel
								</Button>
								<Button
									disabled={validationErrors.length > 0}
									className="gap-2"
								>
									<Upload className="size-4" />
									Import {previewRows.length} Products
								</Button>
							</div>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
