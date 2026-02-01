'use client';

import * as React from 'react';
import {
	Package,
	Barcode,
	QrCode,
	MoreHorizontal,
	Search,
	ScanLine,
	History,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	barcode: string;
	image: string;
	quantity: number;
	serialNumbers: string[];
	lastScanned: string;
	location: string;
};

type HeaderProps = {
	title: string;
	description: string;
	scanPlaceholder: string;
	scanLabel: string;
	historyLabel: string;
};

const Header = ({
	title,
	description,
	scanPlaceholder,
	scanLabel,
	historyLabel,
}: HeaderProps) => (
	<CardHeader className="space-y-4">
		<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
			<div>
				<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</div>
			<div className="flex gap-2">
				<Button variant="outline">
					<History className="size-4" />
					{historyLabel}
				</Button>
				<Button>
					<ScanLine className="size-4" />
					{scanLabel}
				</Button>
			</div>
		</div>
		<div className="relative max-w-md">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={scanPlaceholder} className="pl-10 font-mono" />
		</div>
	</CardHeader>
);

type BarcodeDisplayProps = {
	barcode: string;
};

const BarcodeDisplay = ({ barcode }: BarcodeDisplayProps) => (
	<div className="flex items-center gap-2">
		<Barcode className="size-4 text-muted-foreground" />
		<code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">
			{barcode}
		</code>
	</div>
);

type SerialListProps = {
	serials: string[];
	maxDisplay: number;
};

const SerialList = ({ serials, maxDisplay }: SerialListProps) => {
	const displaySerials = serials.slice(0, maxDisplay);
	const remaining = serials.length - maxDisplay;

	return (
		<div className="flex flex-wrap gap-1">
			{displaySerials.map((serial) => (
				<Badge key={serial} variant="outline" className="font-mono text-xs">
					{serial}
				</Badge>
			))}
			{remaining > 0 && (
				<Badge variant="secondary" className="text-xs">
					+{remaining} more
				</Badge>
			)}
		</div>
	);
};

type InventoryRowProps = {
	item: InventoryItem;
	actions: { label: string; onClick: (id: string) => void }[];
};

const InventoryRow = ({ item, actions }: InventoryRowProps) => (
	<TableRow>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-10 overflow-hidden rounded-lg border bg-muted">
					{item.image ? (
						<img
							src={item.image}
							alt={item.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div>
					<div className="font-medium">{item.name}</div>
					<div className="text-xs text-muted-foreground">{item.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<BarcodeDisplay barcode={item.barcode} />
		</TableCell>
		<TableCell className="font-medium tabular-nums">{item.quantity}</TableCell>
		<TableCell>
			<SerialList serials={item.serialNumbers} maxDisplay={2} />
		</TableCell>
		<TableCell>
			<Badge variant="outline">{item.location}</Badge>
		</TableCell>
		<TableCell className="text-sm text-muted-foreground">
			{new Date(item.lastScanned).toLocaleString()}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actions.map((action) => (
						<DropdownMenuItem
							key={action.label}
							onClick={() => action.onClick(item.id)}
						>
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

type ScanStatProps = {
	icon: React.ElementType;
	label: string;
	value: string;
};

const ScanStat = ({ icon: Icon, label, value }: ScanStatProps) => (
	<div className="flex items-center gap-3 rounded-lg border p-3">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div>
			<div className="text-lg font-semibold">{value}</div>
			<div className="text-xs text-muted-foreground">{label}</div>
		</div>
	</div>
);

export default function Main() {
	const inventory: InventoryItem[] = [
		{
			id: '1',
			name: 'Premium Laptop',
			sku: 'PL-001',
			barcode: '8901234567890',
			image: '',
			quantity: 25,
			serialNumbers: [
				'SN-2024-001',
				'SN-2024-002',
				'SN-2024-003',
				'SN-2024-004',
				'SN-2024-005',
			],
			lastScanned: '2024-01-18T14:30:00',
			location: 'A-01-01',
		},
		{
			id: '2',
			name: 'Wireless Router',
			sku: 'WR-002',
			barcode: '8901234567891',
			image: '',
			quantity: 50,
			serialNumbers: ['SN-2024-100', 'SN-2024-101'],
			lastScanned: '2024-01-18T12:15:00',
			location: 'B-02-03',
		},
		{
			id: '3',
			name: 'Smart TV 55"',
			sku: 'TV55-003',
			barcode: '8901234567892',
			image: '',
			quantity: 12,
			serialNumbers: ['SN-2024-200', 'SN-2024-201', 'SN-2024-202'],
			lastScanned: '2024-01-17T16:45:00',
			location: 'C-01-05',
		},
		{
			id: '4',
			name: 'Gaming Console',
			sku: 'GC-004',
			barcode: '8901234567893',
			image: '',
			quantity: 35,
			serialNumbers: ['SN-2024-300'],
			lastScanned: '2024-01-18T09:00:00',
			location: 'A-03-02',
		},
	];

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Print Label', onClick: (id: string) => console.log('Print', id) },
		{
			label: 'Scan History',
			onClick: (id: string) => console.log('History', id),
		},
		{ label: 'Edit Serials', onClick: (id: string) => console.log('Edit', id) },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Barcode & Serial Tracking"
						description="Scan and track items by barcode or serial number"
						scanPlaceholder="Scan or enter barcode/serial..."
						scanLabel="Scan Mode"
						historyLabel="Scan History"
					/>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							<ScanStat
								icon={Barcode}
								label="Items with Barcodes"
								value="1,234"
							/>
							<ScanStat icon={QrCode} label="Serial Numbers" value="5,678" />
							<ScanStat icon={ScanLine} label="Scans Today" value="156" />
						</div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Barcode</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Serial Numbers</TableHead>
									<TableHead>Location</TableHead>
									<TableHead>Last Scanned</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{inventory.map((item) => (
									<InventoryRow key={item.id} item={item} actions={actions} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
