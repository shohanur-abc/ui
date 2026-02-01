import {
	AlertCircle,
	Building2,
	Check,
	ChevronRight,
	Clock,
	Edit,
	Globe,
	MapPin,
	MoreVertical,
	Package,
	Plus,
	Store,
	Trash2,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type Warehouse = {
	id: string;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	isDefault: boolean;
	fulfillmentTime: string;
	inventoryCount: number;
};

const WarehouseCard = ({
	name,
	address,
	city,
	state,
	zip,
	country,
	isDefault,
	fulfillmentTime,
	inventoryCount,
}: Warehouse) => (
	<div
		className={`rounded-lg border transition-all ${
			isDefault ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div className="flex items-start justify-between p-4">
			<div className="flex items-start gap-4">
				<div
					className={`flex size-12 items-center justify-center rounded-lg ${
						isDefault
							? 'bg-primary/10 text-primary'
							: 'bg-muted text-muted-foreground'
					}`}
				>
					<Building2 className="size-6" />
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-semibold">{name}</h4>
						{isDefault && (
							<Badge className="bg-primary/10 text-primary border-0 text-xs">
								Primary
							</Badge>
						)}
					</div>
					<div className="mt-1 text-sm text-muted-foreground">
						<p>{address}</p>
						<p>
							{city}, {state} {zip}
						</p>
						<p>{country}</p>
					</div>
				</div>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Edit className="mr-2 size-4" />
						Edit
					</DropdownMenuItem>
					{!isDefault && (
						<DropdownMenuItem>
							<Check className="mr-2 size-4" />
							Set as Primary
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
		<div className="border-t p-4 grid grid-cols-2 gap-4">
			<div>
				<div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
					<Clock className="size-3" />
					Fulfillment Time
				</div>
				<p className="font-medium">{fulfillmentTime}</p>
			</div>
			<div>
				<div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
					<Package className="size-3" />
					Inventory
				</div>
				<p className="font-medium">{inventoryCount.toLocaleString()} items</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const warehouses: Warehouse[] = [
		{
			id: '1',
			name: 'West Coast Hub',
			address: '1234 Warehouse Blvd',
			city: 'Los Angeles',
			state: 'CA',
			zip: '90001',
			country: 'United States',
			isDefault: true,
			fulfillmentTime: '1-2 days',
			inventoryCount: 45230,
		},
		{
			id: '2',
			name: 'East Coast Hub',
			address: '5678 Distribution Ave',
			city: 'Newark',
			state: 'NJ',
			zip: '07102',
			country: 'United States',
			isDefault: false,
			fulfillmentTime: '1-2 days',
			inventoryCount: 32150,
		},
		{
			id: '3',
			name: 'Central Hub',
			address: '910 Logistics Way',
			city: 'Dallas',
			state: 'TX',
			zip: '75201',
			country: 'United States',
			isDefault: false,
			fulfillmentTime: '2-3 days',
			inventoryCount: 28740,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Building2 className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Fulfillment Locations</CardTitle>
										<CardDescription>
											Manage warehouses and fulfillment centers
										</CardDescription>
									</div>
								</div>
								<Button className="gap-2">
									<Plus className="size-4" />
									Add Location
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-2">
								{warehouses.map((warehouse) => (
									<WarehouseCard key={warehouse.id} {...warehouse} />
								))}
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Routing Rules</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Auto-route orders</p>
										<p className="text-sm text-muted-foreground">
											Route to nearest warehouse
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Split shipments</p>
										<p className="text-sm text-muted-foreground">
											Ship from multiple locations
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<Separator />
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Inventory sync</p>
										<p className="text-sm text-muted-foreground">
											Real-time inventory updates
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="pt-6">
								<div className="grid grid-cols-3 gap-4 text-center">
									<div>
										<p className="text-2xl font-bold text-primary">
											{warehouses.length}
										</p>
										<p className="text-sm text-muted-foreground">Locations</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-primary">
											{(
												warehouses.reduce((a, b) => a + b.inventoryCount, 0) /
												1000
											).toFixed(0)}
											K
										</p>
										<p className="text-sm text-muted-foreground">Total Items</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-primary">1.5</p>
										<p className="text-sm text-muted-foreground">Avg Days</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
