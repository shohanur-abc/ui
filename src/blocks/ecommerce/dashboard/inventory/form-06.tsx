'use client';

import * as React from 'react';
import { Package, Search, MapPin, ArrowRight, Check } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type TransferItem = {
	id: string;
	name: string;
	sku: string;
	available: number;
	quantity: number;
};

type ItemRowProps = {
	item: TransferItem;
	onQuantityChange: (id: string, quantity: number) => void;
};

const ItemRow = ({ item, onQuantityChange }: ItemRowProps) => (
	<div className="flex items-center gap-4 rounded-lg border p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
			<Package className="size-5 text-muted-foreground" />
		</div>
		<div className="min-w-0 flex-1">
			<p className="truncate font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.sku}</p>
		</div>
		<div className="text-center">
			<p className="text-xs text-muted-foreground">Available</p>
			<p className="font-semibold">{item.available}</p>
		</div>
		<div className="w-24">
			<Label className="text-xs text-muted-foreground">Transfer Qty</Label>
			<Input
				type="number"
				value={item.quantity}
				onChange={(e) =>
					onQuantityChange(item.id, parseInt(e.target.value) || 0)
				}
				min={0}
				max={item.available}
			/>
		</div>
	</div>
);

type LocationSelectProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	locations: { id: string; name: string; code: string }[];
};

const LocationSelect = ({
	label,
	value,
	onChange,
	locations,
}: LocationSelectProps) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger>
				<MapPin className="mr-2 size-4" />
				<SelectValue placeholder="Select location" />
			</SelectTrigger>
			<SelectContent>
				{locations.map((loc) => (
					<SelectItem key={loc.id} value={loc.id}>
						{loc.name} ({loc.code})
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

export default function Main() {
	const [fromLocation, setFromLocation] = React.useState('wh-001');
	const [toLocation, setToLocation] = React.useState('');
	const [items, setItems] = React.useState<TransferItem[]>([
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			available: 245,
			quantity: 50,
		},
		{
			id: '2',
			name: 'USB-C Fast Charger',
			sku: 'UFC-001',
			available: 189,
			quantity: 30,
		},
		{
			id: '3',
			name: 'Phone Case Premium',
			sku: 'PCP-001',
			available: 567,
			quantity: 100,
		},
	]);
	const [priority, setPriority] = React.useState('normal');

	const locations = [
		{ id: 'wh-001', name: 'Main Warehouse', code: 'WH-001' },
		{ id: 'wh-002', name: 'East Distribution', code: 'WH-002' },
		{ id: 'fc-001', name: 'Fulfillment Center', code: 'FC-001' },
		{ id: 'st-nyc', name: 'NYC Store', code: 'ST-NYC' },
	];

	const handleQuantityChange = (id: string, quantity: number) => {
		setItems((prev) =>
			prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
		);
	};

	const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Create Transfer
						</CardTitle>
						<CardDescription>Move inventory between locations</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @lg:grid-cols-5">
							<div className="@lg:col-span-2">
								<LocationSelect
									label="From Location"
									value={fromLocation}
									onChange={setFromLocation}
									locations={locations}
								/>
							</div>
							<div className="flex items-end justify-center">
								<ArrowRight className="size-6 text-muted-foreground" />
							</div>
							<div className="@lg:col-span-2">
								<LocationSelect
									label="To Location"
									value={toLocation}
									onChange={setToLocation}
									locations={locations.filter((l) => l.id !== fromLocation)}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label className="text-base">Items to Transfer</Label>
								<Button variant="outline" size="sm">
									<Search className="mr-2 size-4" />
									Add Items
								</Button>
							</div>
							{items.map((item) => (
								<ItemRow
									key={item.id}
									item={item}
									onQuantityChange={handleQuantityChange}
								/>
							))}
						</div>

						<div className="grid gap-4 @lg:grid-cols-2">
							<div className="space-y-2">
								<Label>Priority</Label>
								<RadioGroup
									value={priority}
									onValueChange={setPriority}
									className="flex gap-4"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="low" id="low" />
										<Label htmlFor="low" className="font-normal">
											Low
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="normal" id="normal" />
										<Label htmlFor="normal" className="font-normal">
											Normal
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="high" id="high" />
										<Label htmlFor="high" className="font-normal">
											High
										</Label>
									</div>
								</RadioGroup>
							</div>
							<div className="space-y-2">
								<Label htmlFor="notes">Notes</Label>
								<Textarea
									id="notes"
									placeholder="Add transfer notes..."
									rows={2}
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex items-center justify-between border-t pt-6">
						<div className="text-sm text-muted-foreground">
							Total:{' '}
							<span className="font-semibold text-foreground">
								{totalItems} items
							</span>
						</div>
						<div className="flex gap-3">
							<Button variant="outline">Save Draft</Button>
							<Button disabled={!toLocation || totalItems === 0}>
								<Check className="mr-2 size-4" />
								Create Transfer
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
