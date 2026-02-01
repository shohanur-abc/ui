'use client';

import * as React from 'react';
import {
	Package,
	Warehouse,
	AlertTriangle,
	Plus,
	Minus,
	RefreshCw,
	History,
	TrendingUp,
	TrendingDown,
	Bell,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface WarehouseStock {
	id: string;
	name: string;
	location: string;
	stock: number;
	reserved: number;
	reorderPoint: number;
}

interface StockMovement {
	id: string;
	type: 'in' | 'out' | 'adjust';
	quantity: number;
	reason: string;
	date: string;
	user: string;
}

interface InventoryMetricProps {
	label: string;
	value: number;
	unit?: string;
	icon: React.ElementType;
	status?: 'success' | 'warning' | 'error';
}

const InventoryMetric = ({
	label,
	value,
	unit = '',
	icon: Icon,
	status,
}: InventoryMetricProps) => {
	const statusColors = {
		success: 'text-green-500',
		warning: 'text-amber-500',
		error: 'text-red-500',
	};

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="flex items-center justify-between">
				<Icon
					className={`size-5 ${status ? statusColors[status] : 'text-muted-foreground'}`}
				/>
				{status && (
					<Badge
						variant={
							status === 'success'
								? 'default'
								: status === 'warning'
									? 'secondary'
									: 'destructive'
						}
					>
						{status === 'success'
							? 'Good'
							: status === 'warning'
								? 'Low'
								: 'Critical'}
					</Badge>
				)}
			</div>
			<div className="mt-3">
				<span className="text-2xl font-bold">{value.toLocaleString()}</span>
				{unit && <span className="ml-1 text-muted-foreground">{unit}</span>}
			</div>
			<p className="mt-1 text-sm text-muted-foreground">{label}</p>
		</div>
	);
};

interface WarehouseRowProps {
	warehouse: WarehouseStock;
	onAdjust: (id: string, delta: number) => void;
}

const WarehouseRow = ({ warehouse, onAdjust }: WarehouseRowProps) => {
	const available = warehouse.stock - warehouse.reserved;
	const percentage = (warehouse.stock / warehouse.reorderPoint) * 100;
	const isLow = warehouse.stock <= warehouse.reorderPoint;

	return (
		<TableRow>
			<TableCell>
				<div>
					<p className="font-medium">{warehouse.name}</p>
					<p className="text-sm text-muted-foreground">{warehouse.location}</p>
				</div>
			</TableCell>
			<TableCell>
				<div className="space-y-1">
					<div className="flex items-center justify-between text-sm">
						<span>{warehouse.stock}</span>
						{isLow && <AlertTriangle className="size-4 text-amber-500" />}
					</div>
					<Progress value={Math.min(percentage, 100)} className="h-2" />
				</div>
			</TableCell>
			<TableCell>
				<span className="text-muted-foreground">{warehouse.reserved}</span>
			</TableCell>
			<TableCell>
				<Badge variant={isLow ? 'destructive' : 'secondary'}>{available}</Badge>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onAdjust(warehouse.id, -1)}
					>
						<Minus className="size-3" />
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onAdjust(warehouse.id, 1)}
					>
						<Plus className="size-3" />
					</Button>
				</div>
			</TableCell>
		</TableRow>
	);
};

interface StockHistoryProps {
	movements: StockMovement[];
}

const StockHistory = ({ movements }: StockHistoryProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="flex items-center gap-2 text-base">
				<History className="size-4" />
				Recent Activity
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-3">
				{movements.map((movement) => (
					<div key={movement.id} className="flex items-start gap-3">
						<div
							className={`flex size-8 items-center justify-center rounded-full ${movement.type === 'in' ? 'bg-green-500/10' : movement.type === 'out' ? 'bg-red-500/10' : 'bg-amber-500/10'}`}
						>
							{movement.type === 'in' ? (
								<TrendingUp className="size-4 text-green-500" />
							) : movement.type === 'out' ? (
								<TrendingDown className="size-4 text-red-500" />
							) : (
								<RefreshCw className="size-4 text-amber-500" />
							)}
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<span className="font-medium">
									{movement.type === 'in'
										? '+'
										: movement.type === 'out'
											? '-'
											: '±'}
									{movement.quantity}
								</span>
								<span className="text-xs text-muted-foreground">
									{movement.date}
								</span>
							</div>
							<p className="text-sm text-muted-foreground">{movement.reason}</p>
							<p className="text-xs text-muted-foreground">
								by {movement.user}
							</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface AlertSettingsProps {
	settings: {
		lowStockAlert: boolean;
		lowStockThreshold: number;
		outOfStockAlert: boolean;
		reorderAlert: boolean;
	};
	onChange: (key: string, value: boolean | number) => void;
}

const AlertSettings = ({ settings, onChange }: AlertSettingsProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="flex items-center gap-2 text-base">
				<Bell className="size-4" />
				Stock Alerts
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<Label>Low Stock Alert</Label>
					<p className="text-sm text-muted-foreground">
						Notify when stock is low
					</p>
				</div>
				<Switch
					checked={settings.lowStockAlert}
					onCheckedChange={(v) => onChange('lowStockAlert', v)}
				/>
			</div>
			{settings.lowStockAlert && (
				<div className="space-y-2">
					<Label>Low Stock Threshold</Label>
					<Input
						type="number"
						value={settings.lowStockThreshold}
						onChange={(e) =>
							onChange('lowStockThreshold', parseInt(e.target.value) || 0)
						}
					/>
				</div>
			)}
			<Separator />
			<div className="flex items-center justify-between">
				<div>
					<Label>Out of Stock Alert</Label>
					<p className="text-sm text-muted-foreground">
						Notify when stock reaches 0
					</p>
				</div>
				<Switch
					checked={settings.outOfStockAlert}
					onCheckedChange={(v) => onChange('outOfStockAlert', v)}
				/>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<Label>Reorder Point Alert</Label>
					<p className="text-sm text-muted-foreground">
						Notify when below reorder point
					</p>
				</div>
				<Switch
					checked={settings.reorderAlert}
					onCheckedChange={(v) => onChange('reorderAlert', v)}
				/>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const [warehouses, setWarehouses] = React.useState<WarehouseStock[]>([
		{
			id: '1',
			name: 'Main Warehouse',
			location: 'New York, NY',
			stock: 250,
			reserved: 45,
			reorderPoint: 100,
		},
		{
			id: '2',
			name: 'West Coast Hub',
			location: 'Los Angeles, CA',
			stock: 180,
			reserved: 20,
			reorderPoint: 75,
		},
		{
			id: '3',
			name: 'East Coast Hub',
			location: 'Miami, FL',
			stock: 45,
			reserved: 10,
			reorderPoint: 50,
		},
	]);

	const [movements] = React.useState<StockMovement[]>([
		{
			id: '1',
			type: 'in',
			quantity: 100,
			reason: 'Restock from supplier',
			date: '2h ago',
			user: 'John Smith',
		},
		{
			id: '2',
			type: 'out',
			quantity: 25,
			reason: 'Order #12345',
			date: '4h ago',
			user: 'System',
		},
		{
			id: '3',
			type: 'adjust',
			quantity: 5,
			reason: 'Inventory count correction',
			date: '1d ago',
			user: 'Jane Doe',
		},
	]);

	const [alertSettings, setAlertSettings] = React.useState({
		lowStockAlert: true,
		lowStockThreshold: 50,
		outOfStockAlert: true,
		reorderAlert: true,
	});

	const totalStock = warehouses.reduce((acc, w) => acc + w.stock, 0);
	const totalReserved = warehouses.reduce((acc, w) => acc + w.reserved, 0);
	const totalAvailable = totalStock - totalReserved;
	const lowStockCount = warehouses.filter(
		(w) => w.stock <= w.reorderPoint,
	).length;

	const adjustStock = (id: string, delta: number) => {
		setWarehouses((prev) =>
			prev.map((w) =>
				w.id === id ? { ...w, stock: Math.max(0, w.stock + delta) } : w,
			),
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<Package className="size-5" />
					<h2 className="text-xl font-semibold">Inventory Management</h2>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					<InventoryMetric
						label="Total Stock"
						value={totalStock}
						unit="units"
						icon={Package}
						status={
							totalStock > 200
								? 'success'
								: totalStock > 100
									? 'warning'
									: 'error'
						}
					/>
					<InventoryMetric
						label="Reserved"
						value={totalReserved}
						unit="units"
						icon={Warehouse}
					/>
					<InventoryMetric
						label="Available"
						value={totalAvailable}
						unit="units"
						icon={Package}
						status="success"
					/>
					<InventoryMetric
						label="Low Stock Locations"
						value={lowStockCount}
						icon={AlertTriangle}
						status={lowStockCount === 0 ? 'success' : 'warning'}
					/>
				</div>

				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-base">
							<Warehouse className="size-4" />
							Warehouse Stock Levels
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Warehouse</TableHead>
									<TableHead>Stock Level</TableHead>
									<TableHead>Reserved</TableHead>
									<TableHead>Available</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{warehouses.map((warehouse) => (
									<WarehouseRow
										key={warehouse.id}
										warehouse={warehouse}
										onAdjust={adjustStock}
									/>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<div className="grid gap-6 @lg:grid-cols-2">
					<StockHistory movements={movements} />
					<AlertSettings
						settings={alertSettings}
						onChange={(key, value) =>
							setAlertSettings((prev) => ({ ...prev, [key]: value }))
						}
					/>
				</div>

				<div className="flex justify-end gap-2">
					<Button variant="outline" className="gap-2">
						<RefreshCw className="size-4" />
						Sync Inventory
					</Button>
					<Button>Save Changes</Button>
				</div>
			</div>
		</section>
	);
}
