'use client';

import * as React from 'react';
import {
	Package,
	Scan,
	Plus,
	Minus,
	Check,
	Search,
	X,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ScanResult = {
	id: string;
	name: string;
	sku: string;
	barcode: string;
	expectedStock: number;
	countedStock: number;
	variance: number;
	status: 'pending' | 'verified' | 'discrepancy';
};

type ScanInputProps = {
	onScan: (barcode: string) => void;
	placeholder: string;
};

const ScanInput = ({ onScan, placeholder }: ScanInputProps) => {
	const [value, setValue] = React.useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (value.trim()) {
			onScan(value.trim());
			setValue('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<div className="relative flex-1">
				<Scan className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={placeholder}
					className="pl-10"
					autoFocus
				/>
			</div>
			<Button type="submit">Scan</Button>
		</form>
	);
};

type CounterProps = {
	count: number;
	onChange: (count: number) => void;
};

const Counter = ({ count, onChange }: CounterProps) => (
	<div className="flex items-center gap-1">
		<Button
			variant="outline"
			size="icon-sm"
			onClick={() => onChange(Math.max(0, count - 1))}
		>
			<Minus className="size-4" />
		</Button>
		<Input
			type="number"
			value={count}
			onChange={(e) => onChange(parseInt(e.target.value) || 0)}
			className="w-16 text-center"
		/>
		<Button
			variant="outline"
			size="icon-sm"
			onClick={() => onChange(count + 1)}
		>
			<Plus className="size-4" />
		</Button>
	</div>
);

type ScannedItemProps = {
	item: ScanResult;
	onUpdateCount: (id: string, count: number) => void;
	onVerify: (id: string) => void;
	onRemove: (id: string) => void;
};

const ScannedItem = ({ item, onUpdateCount, onVerify, onRemove }: ScannedItemProps) => {
	const statusConfig = {
		pending: { label: 'Pending', variant: 'secondary' as const },
		verified: { label: 'Verified', variant: 'default' as const },
		discrepancy: { label: 'Discrepancy', variant: 'destructive' as const },
	};

	const { label, variant } = statusConfig[item.status];

	return (
		<div className="flex items-center gap-4 rounded-lg border p-4">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Package className="size-5 text-muted-foreground" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{item.name}</p>
				<p className="text-xs text-muted-foreground">{item.barcode}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Expected</p>
				<p className="font-semibold">{item.expectedStock}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Counted</p>
				<Counter count={item.countedStock} onChange={(count) => onUpdateCount(item.id, count)} />
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Variance</p>
				<p className={`font-semibold ${item.variance > 0 ? 'text-emerald-500' : item.variance < 0 ? 'text-red-500' : ''}`}>
					{item.variance > 0 ? '+' : ''}{item.variance}
				</p>
			</div>
			<Badge variant={variant}>{label}</Badge>
			<div className="flex gap-1">
				{item.status !== 'verified' && (
					<Button variant="ghost" size="icon-sm" onClick={() => onVerify(item.id)}>
						<Check className="size-4 text-emerald-500" />
					</Button>
				)}
				<Button variant="ghost" size="icon-sm" onClick={() => onRemove(item.id)}>
					<X className="size-4 text-destructive" />
				</Button>
			</div>
		</div>
	);
};

type SummaryProps = {
	scannedCount: number;
	verifiedCount: number;
	discrepancyCount: number;
	labels: { scanned: string; verified: string; discrepancies: string };
};

const Summary = ({ scannedCount, verifiedCount, discrepancyCount, labels }: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="rounded-lg border p-4 text-center">
			<p className="text-2xl font-bold">{scannedCount}</p>
			<p className="text-sm text-muted-foreground">{labels.scanned}</p>
		</div>
		<div className="rounded-lg border p-4 text-center">
			<p className="text-2xl font-bold text-emerald-500">{verifiedCount}</p>
			<p className="text-sm text-muted-foreground">{labels.verified}</p>
		</div>
		<div className="rounded-lg border p-4 text-center">
			<p className="text-2xl font-bold text-red-500">{discrepancyCount}</p>
			<p className="text-sm text-muted-foreground">{labels.discrepancies}</p>
		</div>
	</div>
);

export default function Main() {
	const [scannedItems, setScannedItems] = React.useState<ScanResult[]>([
		{ id: '1', name: 'Wireless Headphones', sku: 'WH-001', barcode: '1234567890123', expectedStock: 50, countedStock: 48, variance: -2, status: 'discrepancy' },
		{ id: '2', name: 'USB-C Cable', sku: 'USB-001', barcode: '2345678901234', expectedStock: 200, countedStock: 200, variance: 0, status: 'verified' },
		{ id: '3', name: 'Power Bank', sku: 'PB-001', barcode: '3456789012345', expectedStock: 75, countedStock: 75, variance: 0, status: 'pending' },
	]);

	const handleUpdateCount = (id: string, count: number) => {
		setScannedItems((items) =>
			items.map((item) => {
				if (item.id === id) {
					const variance = count - item.expectedStock;
					const status = variance === 0 ? 'pending' : 'discrepancy';
					return { ...item, countedStock: count, variance, status };
				}
				return item;
			})
		);
	};

	const handleVerify = (id: string) => {
		setScannedItems((items) =>
			items.map((item) => (item.id === id ? { ...item, status: 'verified' } : item))
		);
	};

	const handleRemove = (id: string) => {
		setScannedItems((items) => items.filter((item) => item.id !== id));
	};

	const verifiedCount = scannedItems.filter((i) => i.status === 'verified').length;
	const discrepancyCount = scannedItems.filter((i) => i.status === 'discrepancy').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Stock Count</CardTitle>
						<CardDescription>Scan products to count inventory</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<ScanInput onScan={(barcode) => console.log(barcode)} placeholder="Scan or enter barcode..." />
						<Summary
							scannedCount={scannedItems.length}
							verifiedCount={verifiedCount}
							discrepancyCount={discrepancyCount}
							labels={{ scanned: 'Items Scanned', verified: 'Verified', discrepancies: 'Discrepancies' }}
						/>
						<div className="space-y-2">
							{scannedItems.map((item) => (
								<ScannedItem
									key={item.id}
									item={item}
									onUpdateCount={handleUpdateCount}
									onVerify={handleVerify}
									onRemove={handleRemove}
								/>
							))}
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">Save Draft</Button>
						<Button>Complete Count</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
