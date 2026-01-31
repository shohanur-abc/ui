'use client';

import * as React from 'react';
import {
	Package,
	Check,
	X,
	Pencil,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	minStock: number;
	maxStock: number;
	location: string;
};

type EditableCellProps = {
	value: number;
	isEditing: boolean;
	onChange: (value: number) => void;
	onSave: () => void;
	onCancel: () => void;
	onEdit: () => void;
};

const EditableCell = ({
	value,
	isEditing,
	onChange,
	onSave,
	onCancel,
	onEdit,
}: EditableCellProps) => {
	if (isEditing) {
		return (
			<div className="flex items-center gap-1">
				<Input
					type="number"
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					className="h-8 w-20"
				/>
				<Button variant="ghost" size="icon-sm" onClick={onSave}>
					<Check className="size-4 text-green-500" />
				</Button>
				<Button variant="ghost" size="icon-sm" onClick={onCancel}>
					<X className="size-4 text-destructive" />
				</Button>
			</div>
		);
	}

	return (
		<div className="group flex items-center gap-2">
			<span className="font-medium tabular-nums">{value}</span>
			<Button
				variant="ghost"
				size="icon-sm"
				onClick={onEdit}
				className="opacity-0 transition-opacity group-hover:opacity-100"
			>
				<Pencil className="size-3" />
			</Button>
		</div>
	);
};

type StockIndicatorProps = {
	quantity: number;
	minStock: number;
	maxStock: number;
};

const StockIndicator = ({ quantity, minStock, maxStock }: StockIndicatorProps) => {
	let status: 'critical' | 'low' | 'normal' | 'excess';
	
	if (quantity === 0) {
		status = 'critical';
	} else if (quantity <= minStock) {
		status = 'low';
	} else if (quantity >= maxStock) {
		status = 'excess';
	} else {
		status = 'normal';
	}

	const variants: Record<typeof status, 'destructive' | 'secondary' | 'default' | 'outline'> = {
		critical: 'destructive',
		low: 'secondary',
		normal: 'default',
		excess: 'outline',
	};

	const labels: Record<typeof status, string> = {
		critical: 'Critical',
		low: 'Low',
		normal: 'Normal',
		excess: 'Excess',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

type HeaderProps = {
	title: string;
	description: string;
};

const Header = ({ title, description }: HeaderProps) => (
	<CardHeader>
		<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
);

type EditingState = {
	itemId: string;
	field: 'quantity' | 'minStock' | 'maxStock';
	value: number;
} | null;

export default function Main() {
	const [inventory, setInventory] = React.useState<InventoryItem[]>([
		{ id: '1', name: 'Noise Canceling Headphones', sku: 'NCH-001', image: '', quantity: 45, minStock: 20, maxStock: 100, location: 'A-01' },
		{ id: '2', name: 'Portable SSD 1TB', sku: 'PSSD-002', image: '', quantity: 12, minStock: 15, maxStock: 50, location: 'B-03' },
		{ id: '3', name: 'Wireless Charging Pad', sku: 'WCP-003', image: '', quantity: 0, minStock: 10, maxStock: 80, location: 'A-02' },
		{ id: '4', name: 'USB Microphone', sku: 'UM-004', image: '', quantity: 78, minStock: 25, maxStock: 60, location: 'C-01' },
		{ id: '5', name: 'LED Desk Lamp', sku: 'LDL-005', image: '', quantity: 200, minStock: 30, maxStock: 150, location: 'D-02' },
	]);

	const [editing, setEditing] = React.useState<EditingState>(null);

	const handleEdit = (itemId: string, field: 'quantity' | 'minStock' | 'maxStock', value: number) => {
		setEditing({ itemId, field, value });
	};

	const handleChange = (value: number) => {
		if (editing) {
			setEditing({ ...editing, value });
		}
	};

	const handleSave = () => {
		if (editing) {
			setInventory((prev) =>
				prev.map((item) =>
					item.id === editing.itemId
						? { ...item, [editing.field]: editing.value }
						: item
				)
			);
			setEditing(null);
		}
	};

	const handleCancel = () => {
		setEditing(null);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Inline Stock Editing"
						description="Click on any quantity to edit directly in the table"
					/>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Location</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Min Stock</TableHead>
									<TableHead>Max Stock</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{inventory.map((item) => (
									<TableRow key={item.id}>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="relative size-10 overflow-hidden rounded-lg border bg-muted">
													{item.image ? (
														<img src={item.image} alt={item.name} className="size-full object-cover" />
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
											<Badge variant="outline">{item.location}</Badge>
										</TableCell>
										<TableCell>
											<EditableCell
												value={editing?.itemId === item.id && editing.field === 'quantity' ? editing.value : item.quantity}
												isEditing={editing?.itemId === item.id && editing.field === 'quantity'}
												onChange={handleChange}
												onSave={handleSave}
												onCancel={handleCancel}
												onEdit={() => handleEdit(item.id, 'quantity', item.quantity)}
											/>
										</TableCell>
										<TableCell>
											<EditableCell
												value={editing?.itemId === item.id && editing.field === 'minStock' ? editing.value : item.minStock}
												isEditing={editing?.itemId === item.id && editing.field === 'minStock'}
												onChange={handleChange}
												onSave={handleSave}
												onCancel={handleCancel}
												onEdit={() => handleEdit(item.id, 'minStock', item.minStock)}
											/>
										</TableCell>
										<TableCell>
											<EditableCell
												value={editing?.itemId === item.id && editing.field === 'maxStock' ? editing.value : item.maxStock}
												isEditing={editing?.itemId === item.id && editing.field === 'maxStock'}
												onChange={handleChange}
												onSave={handleSave}
												onCancel={handleCancel}
												onEdit={() => handleEdit(item.id, 'maxStock', item.maxStock)}
											/>
										</TableCell>
										<TableCell>
											<StockIndicator
												quantity={item.quantity}
												minStock={item.minStock}
												maxStock={item.maxStock}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
