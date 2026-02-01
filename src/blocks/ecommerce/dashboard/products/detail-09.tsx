'use client';

import * as React from 'react';
import {
	Truck,
	Package,
	MapPin,
	Clock,
	DollarSign,
	Plus,
	X,
	GripVertical,
	Settings,
	Globe,
	Calculator,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ShippingMethodProps {
	method: {
		id: string;
		name: string;
		carrier: string;
		price: number;
		estimatedDays: string;
		isActive: boolean;
	};
	onToggle: () => void;
	onEdit: () => void;
}

const ShippingMethod = ({ method, onToggle, onEdit }: ShippingMethodProps) => (
	<div
		className={`flex items-center gap-4 rounded-lg border p-4 ${!method.isActive ? 'opacity-60' : ''}`}
	>
		<GripVertical className="size-5 cursor-grab text-muted-foreground" />
		<Truck className="size-5 text-primary" />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<p className="font-medium">{method.name}</p>
				<Badge variant="outline">{method.carrier}</Badge>
			</div>
			<div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
				<span className="flex items-center gap-1">
					<Clock className="size-3.5" />
					{method.estimatedDays}
				</span>
				<span className="flex items-center gap-1">
					<DollarSign className="size-3.5" />${method.price.toFixed(2)}
				</span>
			</div>
		</div>
		<Switch checked={method.isActive} onCheckedChange={onToggle} />
		<Button variant="ghost" size="icon-sm" onClick={onEdit}>
			<Settings className="size-4" />
		</Button>
	</div>
);

interface DimensionsFormProps {
	labels: { weight: string; length: string; width: string; height: string };
}

const DimensionsForm = ({ labels }: DimensionsFormProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-center gap-2">
			<Package className="size-5" />
			<h3 className="font-semibold">Package Dimensions</h3>
		</div>
		<div className="grid gap-4 @sm:grid-cols-4">
			<div className="space-y-2">
				<Label>{labels.weight}</Label>
				<div className="flex gap-2">
					<Input type="number" placeholder="0" />
					<Select defaultValue="kg">
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="kg">kg</SelectItem>
							<SelectItem value="lb">lb</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="space-y-2">
				<Label>{labels.length}</Label>
				<Input type="number" placeholder="0 cm" />
			</div>
			<div className="space-y-2">
				<Label>{labels.width}</Label>
				<Input type="number" placeholder="0 cm" />
			</div>
			<div className="space-y-2">
				<Label>{labels.height}</Label>
				<Input type="number" placeholder="0 cm" />
			</div>
		</div>
	</div>
);

interface ShippingZoneProps {
	zone: {
		id: string;
		name: string;
		countries: string[];
		methods: { name: string; price: number }[];
	};
	isOpen: boolean;
	onToggle: () => void;
}

const ShippingZone = ({ zone, isOpen, onToggle }: ShippingZoneProps) => (
	<Collapsible open={isOpen} onOpenChange={onToggle}>
		<CollapsibleTrigger asChild>
			<button className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-accent">
				<div className="flex items-center gap-3">
					<Globe className="size-5 text-primary" />
					<div>
						<p className="font-medium">{zone.name}</p>
						<p className="text-sm text-muted-foreground">
							{zone.countries.length} countries
						</p>
					</div>
				</div>
				<Badge variant="secondary">{zone.methods.length} methods</Badge>
			</button>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-2 space-y-2 rounded-lg border bg-muted/30 p-4">
				<div className="mb-3">
					<p className="text-sm font-medium">Countries</p>
					<div className="mt-1 flex flex-wrap gap-1">
						{zone.countries.map((country) => (
							<Badge key={country} variant="outline">
								{country}
							</Badge>
						))}
					</div>
				</div>
				<p className="text-sm font-medium">Shipping Methods</p>
				<div className="space-y-2">
					{zone.methods.map((method) => (
						<div
							key={method.name}
							className="flex items-center justify-between rounded-md bg-card p-2"
						>
							<span className="text-sm">{method.name}</span>
							<span className="text-sm font-medium">
								${method.price.toFixed(2)}
							</span>
						</div>
					))}
				</div>
				<Button variant="outline" size="sm" className="mt-2 w-full gap-2">
					<Plus className="size-4" />
					Add Method
				</Button>
			</div>
		</CollapsibleContent>
	</Collapsible>
);

interface FreeShippingRuleProps {
	rule: { id: string; minAmount: number; zones: string[] };
}

const FreeShippingRule = ({ rule }: FreeShippingRuleProps) => (
	<div className="flex items-center gap-4 rounded-lg border p-4">
		<Calculator className="size-5 text-emerald-500" />
		<div className="flex-1">
			<p className="font-medium">Free Shipping</p>
			<p className="text-sm text-muted-foreground">
				Orders over ${rule.minAmount} to {rule.zones.join(', ')}
			</p>
		</div>
		<Button variant="ghost" size="icon-sm">
			<Settings className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const [openZone, setOpenZone] = React.useState<string | null>(null);

	const methods = [
		{
			id: '1',
			name: 'Standard Shipping',
			carrier: 'USPS',
			price: 4.99,
			estimatedDays: '5-7 days',
			isActive: true,
		},
		{
			id: '2',
			name: 'Express Shipping',
			carrier: 'FedEx',
			price: 14.99,
			estimatedDays: '2-3 days',
			isActive: true,
		},
		{
			id: '3',
			name: 'Overnight',
			carrier: 'UPS',
			price: 29.99,
			estimatedDays: '1 day',
			isActive: false,
		},
	];

	const zones = [
		{
			id: '1',
			name: 'Domestic (US)',
			countries: ['United States'],
			methods: [
				{ name: 'Standard', price: 4.99 },
				{ name: 'Express', price: 14.99 },
			],
		},
		{
			id: '2',
			name: 'Canada & Mexico',
			countries: ['Canada', 'Mexico'],
			methods: [{ name: 'International Standard', price: 12.99 }],
		},
		{
			id: '3',
			name: 'Europe',
			countries: ['UK', 'Germany', 'France', 'Italy', 'Spain'],
			methods: [
				{ name: 'International', price: 19.99 },
				{ name: 'Express', price: 39.99 },
			],
		},
	];

	const freeShippingRules = [
		{ id: '1', minAmount: 50, zones: ['Domestic (US)'] },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Truck className="size-5" />
						<h2 className="text-xl font-semibold">Shipping Settings</h2>
					</div>
					<Button className="gap-2">
						<Plus className="size-4" />
						Add Method
					</Button>
				</div>

				<DimensionsForm
					labels={{
						weight: 'Weight',
						length: 'Length',
						width: 'Width',
						height: 'Height',
					}}
				/>

				<div className="space-y-4">
					<h3 className="font-semibold">Shipping Methods</h3>
					{methods.map((method) => (
						<ShippingMethod
							key={method.id}
							method={method}
							onToggle={() => console.log('Toggle', method.id)}
							onEdit={() => console.log('Edit', method.id)}
						/>
					))}
				</div>

				<Separator />

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold">Shipping Zones</h3>
						<Button variant="outline" size="sm" className="gap-2">
							<Plus className="size-4" />
							Add Zone
						</Button>
					</div>
					{zones.map((zone) => (
						<ShippingZone
							key={zone.id}
							zone={zone}
							isOpen={openZone === zone.id}
							onToggle={() =>
								setOpenZone(openZone === zone.id ? null : zone.id)
							}
						/>
					))}
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold">Free Shipping Rules</h3>
					{freeShippingRules.map((rule) => (
						<FreeShippingRule key={rule.id} rule={rule} />
					))}
					<Button variant="outline" className="w-full gap-2">
						<Plus className="size-4" />
						Add Free Shipping Rule
					</Button>
				</div>
			</div>
		</section>
	);
}
