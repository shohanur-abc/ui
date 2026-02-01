'use client';

import * as React from 'react';
import {
	AlertTriangle,
	RefreshCw,
	ArrowRight,
	CheckCircle,
	XCircle,
	Clock,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ValidationError {
	field: string;
	message: string;
	severity: 'error' | 'warning';
}

interface ValidationResultsProps {
	errors: ValidationError[];
	onFix: (field: string) => void;
}

const ValidationResults = ({ errors, onFix }: ValidationResultsProps) => {
	const errorCount = errors.filter((e) => e.severity === 'error').length;
	const warningCount = errors.filter((e) => e.severity === 'warning').length;

	return (
		<div className="rounded-lg border bg-card">
			<div className="flex items-center justify-between border-b p-4">
				<div className="flex items-center gap-2">
					<AlertTriangle className="size-5 text-amber-500" />
					<h3 className="font-semibold">Validation Issues</h3>
				</div>
				<div className="flex items-center gap-2">
					{errorCount > 0 && (
						<Badge variant="destructive">{errorCount} Errors</Badge>
					)}
					{warningCount > 0 && (
						<Badge variant="outline" className="border-amber-500 text-amber-500">
							{warningCount} Warnings
						</Badge>
					)}
				</div>
			</div>
			<div className="divide-y">
				{errors.map((error, idx) => (
					<div
						key={idx}
						className="flex items-center justify-between p-4"
					>
						<div className="flex items-center gap-3">
							{error.severity === 'error' ? (
								<XCircle className="size-5 text-destructive" />
							) : (
								<AlertTriangle className="size-5 text-amber-500" />
							)}
							<div>
								<p className="font-medium">{error.field}</p>
								<p className="text-sm text-muted-foreground">{error.message}</p>
							</div>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onFix(error.field)}
							className="gap-2"
						>
							Fix
							<ArrowRight className="size-4" />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

interface ImportResultsProps {
	total: number;
	successful: number;
	failed: number;
	pending: number;
}

const ImportResults = ({
	total,
	successful,
	failed,
	pending,
}: ImportResultsProps) => {
	const progress = ((successful + failed) / total) * 100;

	return (
		<div className="rounded-lg border bg-card p-6">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="font-semibold">Import Progress</h3>
				<Badge variant={pending > 0 ? 'secondary' : failed > 0 ? 'destructive' : 'default'}>
					{pending > 0 ? 'In Progress' : failed > 0 ? 'Completed with Errors' : 'Completed'}
				</Badge>
			</div>

			<Progress value={progress} className="mb-4 h-2" />

			<div className="grid gap-4 @sm:grid-cols-3">
				<div className="flex items-center gap-3 rounded-lg bg-green-500/10 p-3">
					<CheckCircle className="size-8 text-green-500" />
					<div>
						<p className="text-2xl font-bold">{successful}</p>
						<p className="text-sm text-muted-foreground">Successful</p>
					</div>
				</div>
				<div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-3">
					<XCircle className="size-8 text-destructive" />
					<div>
						<p className="text-2xl font-bold">{failed}</p>
						<p className="text-sm text-muted-foreground">Failed</p>
					</div>
				</div>
				<div className="flex items-center gap-3 rounded-lg bg-muted p-3">
					<Clock className="size-8 text-muted-foreground" />
					<div>
						<p className="text-2xl font-bold">{pending}</p>
						<p className="text-sm text-muted-foreground">Pending</p>
					</div>
				</div>
			</div>
		</div>
	);
};

interface FailedRowProps {
	row: number;
	product: string;
	error: string;
	onRetry: () => void;
	onSkip: () => void;
}

const FailedRow = ({
	row,
	product,
	error,
	onRetry,
	onSkip,
}: FailedRowProps) => (
	<div className="flex items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/5 p-3">
		<Badge variant="outline">Row {row}</Badge>
		<div className="flex-1">
			<p className="font-medium">{product}</p>
			<p className="text-sm text-destructive">{error}</p>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" size="sm" onClick={onRetry}>
				<RefreshCw className="mr-1 size-4" />
				Retry
			</Button>
			<Button variant="ghost" size="sm" onClick={onSkip}>
				Skip
			</Button>
		</div>
	</div>
);

export default function Main() {
	const validationErrors: ValidationError[] = [
		{ field: 'SKU', message: 'Duplicate SKU detected: WM-001', severity: 'error' },
		{ field: 'Price', message: 'Price cannot be negative', severity: 'error' },
		{ field: 'Description', message: 'Description is too short (min 50 characters)', severity: 'warning' },
		{ field: 'Category', message: 'Category "New Category" does not exist', severity: 'warning' },
	];

	const failedRows = [
		{ row: 5, product: 'Wireless Mouse XL', error: 'Invalid image URL format' },
		{ row: 12, product: 'USB Hub Pro', error: 'Missing required field: price' },
		{ row: 23, product: 'Monitor Stand', error: 'SKU already exists in database' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<AlertTriangle className="size-5 text-amber-500" />
					<h2 className="text-xl font-semibold">Partial Failures & Validation</h2>
				</div>

				<ImportResults
					total={50}
					successful={42}
					failed={3}
					pending={5}
				/>

				<ValidationResults
					errors={validationErrors}
					onFix={(field) => console.log('Fix:', field)}
				/>

				<div className="space-y-3">
					<h3 className="font-semibold">Failed Imports</h3>
					{failedRows.map((row) => (
						<FailedRow
							key={row.row}
							row={row.row}
							product={row.product}
							error={row.error}
							onRetry={() => console.log('Retry:', row.row)}
							onSkip={() => console.log('Skip:', row.row)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
