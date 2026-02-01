'use client';

import * as React from 'react';
import {
	Warehouse,
	MapPin,
	Package,
	AlertTriangle,
	Plus,
	Settings,
	ArrowRight,
	ArrowLeftRight,
	Check,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface LocationStock {
	locationId: string;
	locationName: string;
	address: string;
	stock: number;
	reserved: number;
	incoming: number;
	isLow: boolean;
}

interface LocationCardProps {
	location: LocationStock;
	onTransfer: () => void;
	onAdjust: () => void;
	labels: {
		available: string;
		reserved: string;
		incoming: string;
		transfer: string;
		adjust: string;
	};
}

const LocationCard = ({
	location,
	onTransfer,
	onAdjust,
	labels,
}: LocationCardProps) => {
	const available = location.stock - location.reserved;
	const utilization = (location.stock / (location.stock + 20)) * 100;

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="mb-3 flex items-start justify-between">
				<div className="flex items-start gap-3">
					<Warehouse className="mt-0.5 size-5 text-primary" />
					<div>
						<h3 className="font-semibold">{location.locationName}</h3>
						<p className="text-sm text-muted-foreground">{location.address}</p>
					</div>
				</div>
				{location.isLow && (
					<Badge variant="destructive" className="gap-1">
						<AlertTriangle className="size-3" />
						Low
					</Badge>
				)}
			</div>

			<div className="mb-3 grid grid-cols-3 gap-4 text-center">
				<div>
					<p className="text-2xl font-bold">{available}</p>
					<p className="text-xs text-muted-foreground">{labels.available}</p>
				</div>
				<div>
					<p className="text-2xl font-bold text-amber-500">
						{location.reserved}
					</p>
					<p className="text-xs text-muted-foreground">{labels.reserved}</p>
				</div>
				<div>
					<p className="text-2xl font-bold text-primary">{location.incoming}</p>
					<p className="text-xs text-muted-foreground">{labels.incoming}</p>
				</div>
			</div>

			<Progress value={utilization} className="mb-3 h-2" />

			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={onTransfer}
					className="flex-1 gap-2"
				>
					<ArrowLeftRight className="size-4" />
					{labels.transfer}
				</Button>
				<Button variant="ghost" size="sm" onClick={onAdjust} className="gap-2">
					{labels.adjust}
				</Button>
			</div>
		</div>
	);
};

interface TransferModalProps {
	isOpen: boolean;
	onClose: () => void;
	locations: { id: string; name: string }[];
	labels: {
		title: string;
		from: string;
		to: string;
		quantity: string;
		reason: string;
		cancel: string;
		confirm: string;
	};
}

const TransferModal = ({
	isOpen,
	onClose,
	locations,
	labels,
}: TransferModalProps) => (
	<Dialog open={isOpen} onOpenChange={onClose}>
		<DialogContent className="max-w-md">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<ArrowLeftRight className="size-5" />
					{labels.title}
				</DialogTitle>
			</DialogHeader>

			<div className="space-y-4 py-4">
				<div className="grid gap-4 @sm:grid-cols-2">
					<div className="space-y-2">
						<Label>{labels.from}</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select..." />
							</SelectTrigger>
							<SelectContent>
								{locations.map((loc) => (
									<SelectItem key={loc.id} value={loc.id}>
										{loc.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>{labels.to}</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select..." />
							</SelectTrigger>
							<SelectContent>
								{locations.map((loc) => (
									<SelectItem key={loc.id} value={loc.id}>
										{loc.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="space-y-2">
					<Label>{labels.quantity}</Label>
					<Input type="number" placeholder="0" />
				</div>

				<div className="space-y-2">
					<Label>{labels.reason}</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select reason..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="restock">Restock</SelectItem>
							<SelectItem value="rebalance">Rebalance Inventory</SelectItem>
							<SelectItem value="demand">High Demand Location</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<DialogFooter>
				<Button variant="outline" onClick={onClose}>
					{labels.cancel}
				</Button>
				<Button className="gap-2">
					<ArrowRight className="size-4" />
					{labels.confirm}
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

interface TransferHistoryProps {
	transfers: {
		id: string;
		from: string;
		to: string;
		qty: number;
		date: string;
		status: 'completed' | 'pending' | 'cancelled';
	}[];
	labels: {
		from: string;
		to: string;
		quantity: string;
		date: string;
		status: string;
	};
}

const TransferHistory = ({ transfers, labels }: TransferHistoryProps) => (
	<div className="rounded-lg border bg-card">
		<div className="border-b p-4">
			<h3 className="font-semibold">Transfer History</h3>
		</div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>{labels.from}</TableHead>
					<TableHead>{labels.to}</TableHead>
					<TableHead className="text-right">{labels.quantity}</TableHead>
					<TableHead>{labels.date}</TableHead>
					<TableHead>{labels.status}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{transfers.map((t) => (
					<TableRow key={t.id}>
						<TableCell>{t.from}</TableCell>
						<TableCell>{t.to}</TableCell>
						<TableCell className="text-right">{t.qty}</TableCell>
						<TableCell>{t.date}</TableCell>
						<TableCell>
							<Badge
								variant="secondary"
								className={
									t.status === 'completed'
										? 'bg-emerald-500/10 text-emerald-500'
										: t.status === 'pending'
											? 'bg-amber-500/10 text-amber-500'
											: 'bg-red-500/10 text-red-500'
								}
							>
								{t.status === 'completed' && <Check className="mr-1 size-3" />}
								{t.status === 'cancelled' && <X className="mr-1 size-3" />}
								{t.status}
							</Badge>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

export default function Main() {
	const [transferModalOpen, setTransferModalOpen] = React.useState(false);

	const locations: LocationStock[] = [
		{
			locationId: '1',
			locationName: 'Main Warehouse',
			address: 'New York, NY',
			stock: 150,
			reserved: 23,
			incoming: 50,
			isLow: false,
		},
		{
			locationId: '2',
			locationName: 'West Coast Hub',
			address: 'Los Angeles, CA',
			stock: 45,
			reserved: 12,
			incoming: 0,
			isLow: true,
		},
		{
			locationId: '3',
			locationName: 'Central Distribution',
			address: 'Chicago, IL',
			stock: 89,
			reserved: 8,
			incoming: 25,
			isLow: false,
		},
	];

	const transfers = [
		{
			id: '1',
			from: 'Main Warehouse',
			to: 'West Coast Hub',
			qty: 30,
			date: '2024-01-15',
			status: 'completed' as const,
		},
		{
			id: '2',
			from: 'Central Distribution',
			to: 'Main Warehouse',
			qty: 15,
			date: '2024-01-14',
			status: 'pending' as const,
		},
		{
			id: '3',
			from: 'West Coast Hub',
			to: 'Central Distribution',
			qty: 20,
			date: '2024-01-12',
			status: 'cancelled' as const,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<MapPin className="size-5" />
						<h2 className="text-xl font-semibold">Inventory Locations</h2>
					</div>
					<Button onClick={() => setTransferModalOpen(true)} className="gap-2">
						<ArrowLeftRight className="size-4" />
						Transfer Stock
					</Button>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
					{locations.map((location) => (
						<LocationCard
							key={location.locationId}
							location={location}
							onTransfer={() => setTransferModalOpen(true)}
							onAdjust={() => console.log('Adjust', location.locationId)}
							labels={{
								available: 'Available',
								reserved: 'Reserved',
								incoming: 'Incoming',
								transfer: 'Transfer',
								adjust: 'Adjust',
							}}
						/>
					))}
				</div>

				<TransferHistory
					transfers={transfers}
					labels={{
						from: 'From',
						to: 'To',
						quantity: 'Qty',
						date: 'Date',
						status: 'Status',
					}}
				/>

				<TransferModal
					isOpen={transferModalOpen}
					onClose={() => setTransferModalOpen(false)}
					locations={locations.map((l) => ({
						id: l.locationId,
						name: l.locationName,
					}))}
					labels={{
						title: 'Transfer Stock',
						from: 'From Location',
						to: 'To Location',
						quantity: 'Quantity',
						reason: 'Transfer Reason',
						cancel: 'Cancel',
						confirm: 'Transfer',
					}}
				/>
			</div>
		</section>
	);
}
