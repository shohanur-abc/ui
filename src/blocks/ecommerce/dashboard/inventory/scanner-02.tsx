'use client';

import * as React from 'react';
import {
	Package,
	Barcode,
	QrCode,
	Camera,
	Check,
	X,
	AlertTriangle,
	RefreshCw,
	History,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type ScanResult = {
	id: string;
	barcode: string;
	product: string;
	sku: string;
	location: string;
	status: 'found' | 'not-found' | 'mismatch';
	expectedQty?: number;
	actualQty?: number;
	timestamp: string;
};

type ScanHistoryItemProps = {
	result: ScanResult;
};

const ScanHistoryItem = ({ result }: ScanHistoryItemProps) => {
	const statusConfig = {
		found: {
			icon: Check,
			color: 'text-emerald-500',
			bg: 'bg-emerald-500/10',
			label: 'Found',
		},
		'not-found': {
			icon: X,
			color: 'text-destructive',
			bg: 'bg-destructive/10',
			label: 'Not Found',
		},
		mismatch: {
			icon: AlertTriangle,
			color: 'text-amber-500',
			bg: 'bg-amber-500/10',
			label: 'Mismatch',
		},
	};

	const config = statusConfig[result.status];
	const StatusIcon = config.icon;

	return (
		<div className={`rounded-lg border p-4 ${config.bg}`}>
			<div className="flex items-start gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-background ${config.color}`}
				>
					<StatusIcon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<div>
							<p className="font-medium">{result.product}</p>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>{result.sku}</span>
								<span>•</span>
								<span className="font-mono">{result.barcode}</span>
							</div>
						</div>
						<Badge variant="outline" className={config.color}>
							{config.label}
						</Badge>
					</div>
					<div className="mt-2 flex items-center gap-4 text-sm">
						<span className="text-muted-foreground">{result.location}</span>
						{result.expectedQty !== undefined &&
							result.actualQty !== undefined && (
								<span
									className={
										result.expectedQty !== result.actualQty
											? 'text-amber-500'
											: ''
									}
								>
									Expected: {result.expectedQty} / Actual: {result.actualQty}
								</span>
							)}
					</div>
					<p className="mt-1 text-xs text-muted-foreground">
						{result.timestamp}
					</p>
				</div>
			</div>
		</div>
	);
};

type ScanInputProps = {
	onScan: (barcode: string) => void;
};

const ScanInput = ({ onScan }: ScanInputProps) => {
	const [barcode, setBarcode] = React.useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (barcode.trim()) {
			onScan(barcode.trim());
			setBarcode('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<div className="relative flex-1">
				<Barcode className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={barcode}
					onChange={(e) => setBarcode(e.target.value)}
					placeholder="Scan or enter barcode..."
					className="pl-10"
					autoFocus
				/>
			</div>
			<Button type="submit" disabled={!barcode.trim()}>
				<QrCode className="mr-2 size-4" />
				Scan
			</Button>
			<Button type="button" variant="outline">
				<Camera className="size-4" />
			</Button>
		</form>
	);
};

export default function Main() {
	const [scanHistory, setScanHistory] = React.useState<ScanResult[]>([
		{
			id: '1',
			barcode: '8901234567890',
			product: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			location: 'A1-B2-C3',
			status: 'found',
			expectedQty: 50,
			actualQty: 50,
			timestamp: '2 min ago',
		},
		{
			id: '2',
			barcode: '8901234567891',
			product: 'USB-C Fast Charger',
			sku: 'UFC-001',
			location: 'A2-B1-C1',
			status: 'mismatch',
			expectedQty: 100,
			actualQty: 87,
			timestamp: '5 min ago',
		},
		{
			id: '3',
			barcode: '8901234567892',
			product: 'Unknown Product',
			sku: 'N/A',
			location: 'N/A',
			status: 'not-found',
			timestamp: '8 min ago',
		},
	]);

	const stats = {
		total: scanHistory.length,
		found: scanHistory.filter((r) => r.status === 'found').length,
		notFound: scanHistory.filter((r) => r.status === 'not-found').length,
		mismatch: scanHistory.filter((r) => r.status === 'mismatch').length,
	};

	const handleScan = (barcode: string) => {
		const newResult: ScanResult = {
			id: Date.now().toString(),
			barcode,
			product: 'Sample Product',
			sku: 'SKU-' + barcode.slice(-4),
			location: 'A1-B1-C1',
			status: 'found',
			expectedQty: 25,
			actualQty: 25,
			timestamp: 'Just now',
		};
		setScanHistory((prev) => [newResult, ...prev]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-xl @lg:text-2xl">
											Barcode Scanner
										</CardTitle>
										<CardDescription>
											Scan products to verify inventory
										</CardDescription>
									</div>
									<Button variant="outline" size="sm">
										<RefreshCw className="mr-2 size-4" />
										Reset Session
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<ScanInput onScan={handleScan} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<History className="size-5 text-muted-foreground" />
										<CardTitle>Scan History</CardTitle>
									</div>
									<p className="text-sm text-muted-foreground">
										{stats.total} scans
									</p>
								</div>
							</CardHeader>
							<CardContent>
								<ScrollArea className="h-[400px]">
									<div className="space-y-3 pr-4">
										{scanHistory.map((result) => (
											<ScanHistoryItem key={result.id} result={result} />
										))}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Session Stats</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between rounded-lg border p-4">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
											<Package className="size-5 text-primary" />
										</div>
										<span>Total Scans</span>
									</div>
									<span className="text-2xl font-bold">{stats.total}</span>
								</div>
								<div className="flex items-center justify-between rounded-lg border p-4 bg-emerald-500/10">
									<div className="flex items-center gap-3">
										<Check className="size-5 text-emerald-500" />
										<span>Found</span>
									</div>
									<span className="text-xl font-bold text-emerald-500">
										{stats.found}
									</span>
								</div>
								<div className="flex items-center justify-between rounded-lg border p-4 bg-amber-500/10">
									<div className="flex items-center gap-3">
										<AlertTriangle className="size-5 text-amber-500" />
										<span>Mismatch</span>
									</div>
									<span className="text-xl font-bold text-amber-500">
										{stats.mismatch}
									</span>
								</div>
								<div className="flex items-center justify-between rounded-lg border p-4 bg-destructive/10">
									<div className="flex items-center gap-3">
										<X className="size-5 text-destructive" />
										<span>Not Found</span>
									</div>
									<span className="text-xl font-bold text-destructive">
										{stats.notFound}
									</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
