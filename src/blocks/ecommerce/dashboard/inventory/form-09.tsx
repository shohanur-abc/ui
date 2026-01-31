'use client';

import * as React from 'react';
import {
	Package,
	Truck,
	Calendar,
	DollarSign,
	Search,
	Plus,
	Trash2,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type OrderItem = {
	id: string;
	name: string;
	sku: string;
	unitCost: number;
	quantity: number;
};

type OrderItemRowProps = {
	item: OrderItem;
	onQuantityChange: (id: string, quantity: number) => void;
	onUnitCostChange: (id: string, cost: number) => void;
	onRemove: (id: string) => void;
};

const OrderItemRow = ({ item, onQuantityChange, onUnitCostChange, onRemove }: OrderItemRowProps) => {
	const total = item.quantity * item.unitCost;

	return (
		<TableRow>
			<TableCell>
				<div>
					<p className="font-medium">{item.name}</p>
					<p className="text-xs text-muted-foreground">{item.sku}</p>
				</div>
			</TableCell>
			<TableCell>
				<Input
					type="number"
					value={item.unitCost}
					onChange={(e) => onUnitCostChange(item.id, parseFloat(e.target.value) || 0)}
					className="w-24"
					step="0.01"
					min={0}
				/>
			</TableCell>
			<TableCell>
				<Input
					type="number"
					value={item.quantity}
					onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 0)}
					className="w-20"
					min={1}
				/>
			</TableCell>
			<TableCell className="text-right font-medium">${total.toFixed(2)}</TableCell>
			<TableCell>
				<Button variant="ghost" size="icon-sm" onClick={() => onRemove(item.id)}>
					<Trash2 className="size-4 text-destructive" />
				</Button>
			</TableCell>
		</TableRow>
	);
};

type TotalsSummaryProps = {
	subtotal: number;
	shipping: number;
	tax: number;
};

const TotalsSummary = ({ subtotal, shipping, tax }: TotalsSummaryProps) => {
	const total = subtotal + shipping + tax;

	return (
		<div className="rounded-lg border p-4 space-y-2">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Shipping</span>
				<span>${shipping.toFixed(2)}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Tax</span>
				<span>${tax.toFixed(2)}</span>
			</div>
			<div className="flex justify-between border-t pt-2 font-semibold">
				<span>Total</span>
				<span>${total.toFixed(2)}</span>
			</div>
		</div>
	);
};

export default function Main() {
	const [supplier, setSupplier] = React.useState('');
	const [items, setItems] = React.useState<OrderItem[]>([
		{ id: '1', name: 'Wireless Earbuds Pro', sku: 'WEP-001', unitCost: 45.00, quantity: 100 },
		{ id: '2', name: 'USB-C Fast Charger', sku: 'UFC-001', unitCost: 12.50, quantity: 200 },
		{ id: '3', name: 'Phone Case Premium', sku: 'PCP-001', unitCost: 8.00, quantity: 150 },
	]);

	const suppliers = [
		{ id: 'sup-001', name: 'TechPro Electronics' },
		{ id: 'sup-002', name: 'Global Accessories Inc' },
		{ id: 'sup-003', name: 'Premium Parts Ltd' },
	];

	const handleQuantityChange = (id: string, quantity: number) => {
		setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
	};

	const handleUnitCostChange = (id: string, unitCost: number) => {
		setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unitCost } : item)));
	};

	const handleRemove = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitCost, 0);
	const shipping = 250;
	const tax = subtotal * 0.08;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">New Purchase Order</CardTitle>
						<CardDescription>Create a purchase order for supplier</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @lg:grid-cols-3">
							<div className="space-y-2">
								<Label>Supplier</Label>
								<Select value={supplier} onValueChange={setSupplier}>
									<SelectTrigger>
										<Truck className="mr-2 size-4" />
										<SelectValue placeholder="Select supplier" />
									</SelectTrigger>
									<SelectContent>
										{suppliers.map((s) => (
											<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Expected Delivery</Label>
								<Input type="date" />
							</div>
							<div className="space-y-2">
								<Label>PO Number</Label>
								<Input value="PO-2024-004" readOnly className="bg-muted" />
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label className="text-base">Order Items</Label>
								<Button variant="outline" size="sm">
									<Plus className="mr-2 size-4" />
									Add Product
								</Button>
							</div>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead>Unit Cost</TableHead>
										<TableHead>Quantity</TableHead>
										<TableHead className="text-right">Total</TableHead>
										<TableHead className="w-10" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{items.map((item) => (
										<OrderItemRow
											key={item.id}
											item={item}
											onQuantityChange={handleQuantityChange}
											onUnitCostChange={handleUnitCostChange}
											onRemove={handleRemove}
										/>
									))}
								</TableBody>
							</Table>
						</div>

						<div className="grid gap-4 @lg:grid-cols-2">
							<div className="space-y-2">
								<Label>Notes to Supplier</Label>
								<Textarea placeholder="Add any special instructions..." rows={4} />
							</div>
							<TotalsSummary subtotal={subtotal} shipping={shipping} tax={tax} />
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">Save Draft</Button>
						<Button disabled={!supplier || items.length === 0}>
							Create Purchase Order
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
