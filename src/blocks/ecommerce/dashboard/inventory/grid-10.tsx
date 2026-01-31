'use client';

import * as React from 'react';
import {
	Package,
	Truck,
	Clock,
	Building2,
	Star,
	AlertCircle,
	Phone,
	Mail,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Supplier = {
	id: string;
	name: string;
	contactPerson: string;
	email: string;
	phone: string;
	rating: number;
	activeOrders: number;
	totalProducts: number;
	avgLeadTime: number;
	status: 'active' | 'pending' | 'inactive';
	onTimeRate: number;
};

type SupplierCardProps = {
	supplier: Supplier;
};

const SupplierCard = ({ supplier }: SupplierCardProps) => {
	const statusConfig = {
		active: { label: 'Active', variant: 'default' as const },
		pending: { label: 'Pending', variant: 'secondary' as const },
		inactive: { label: 'Inactive', variant: 'outline' as const },
	};

	const { label, variant } = statusConfig[supplier.status];

	const getInitials = (name: string) => {
		return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
	};

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<Avatar className="size-12">
						<AvatarFallback>{getInitials(supplier.name)}</AvatarFallback>
					</Avatar>
					<div className="min-w-0 flex-1">
						<div className="flex items-center justify-between">
							<h3 className="truncate font-semibold">{supplier.name}</h3>
							<Badge variant={variant}>{label}</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
					</div>
				</div>

				<div className="mt-4 flex items-center gap-1">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`size-4 ${i < Math.floor(supplier.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
						/>
					))}
					<span className="ml-2 text-sm font-medium">{supplier.rating}</span>
				</div>

				<div className="mt-4 grid grid-cols-2 gap-4">
					<div className="rounded-lg bg-muted/50 p-3">
						<div className="flex items-center gap-2">
							<Truck className="size-4 text-muted-foreground" />
							<span className="text-xs text-muted-foreground">Active Orders</span>
						</div>
						<p className="mt-1 text-lg font-bold">{supplier.activeOrders}</p>
					</div>
					<div className="rounded-lg bg-muted/50 p-3">
						<div className="flex items-center gap-2">
							<Package className="size-4 text-muted-foreground" />
							<span className="text-xs text-muted-foreground">Products</span>
						</div>
						<p className="mt-1 text-lg font-bold">{supplier.totalProducts}</p>
					</div>
					<div className="rounded-lg bg-muted/50 p-3">
						<div className="flex items-center gap-2">
							<Clock className="size-4 text-muted-foreground" />
							<span className="text-xs text-muted-foreground">Lead Time</span>
						</div>
						<p className="mt-1 text-lg font-bold">{supplier.avgLeadTime}d</p>
					</div>
					<div className="rounded-lg bg-muted/50 p-3">
						<div className="flex items-center gap-2">
							<AlertCircle className="size-4 text-muted-foreground" />
							<span className="text-xs text-muted-foreground">On-Time</span>
						</div>
						<p className={`mt-1 text-lg font-bold ${supplier.onTimeRate >= 95 ? 'text-emerald-500' : supplier.onTimeRate >= 80 ? 'text-amber-500' : 'text-destructive'}`}>
							{supplier.onTimeRate}%
						</p>
					</div>
				</div>

				<div className="mt-4 flex gap-2 border-t pt-4">
					<Button variant="outline" size="sm" className="flex-1">
						<Mail className="mr-1 size-3" />
						Email
					</Button>
					<Button variant="outline" size="sm" className="flex-1">
						<Phone className="mr-1 size-3" />
						Call
					</Button>
					<Button size="sm" className="flex-1">
						New Order
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const suppliers: Supplier[] = [
		{ id: '1', name: 'TechPro Electronics', contactPerson: 'John Smith', email: 'john@techpro.com', phone: '+1 555-0123', rating: 4.8, activeOrders: 5, totalProducts: 156, avgLeadTime: 7, status: 'active', onTimeRate: 98 },
		{ id: '2', name: 'Global Accessories Inc', contactPerson: 'Sarah Johnson', email: 'sarah@globalacc.com', phone: '+1 555-0124', rating: 4.5, activeOrders: 3, totalProducts: 89, avgLeadTime: 10, status: 'active', onTimeRate: 92 },
		{ id: '3', name: 'Premium Parts Ltd', contactPerson: 'Mike Chen', email: 'mike@premiumparts.com', phone: '+1 555-0125', rating: 4.2, activeOrders: 0, totalProducts: 45, avgLeadTime: 14, status: 'pending', onTimeRate: 85 },
		{ id: '4', name: 'FastShip Distributors', contactPerson: 'Lisa Wang', email: 'lisa@fastship.com', phone: '+1 555-0126', rating: 4.9, activeOrders: 8, totalProducts: 234, avgLeadTime: 5, status: 'active', onTimeRate: 99 },
		{ id: '5', name: 'Quality Goods Co', contactPerson: 'Tom Brown', email: 'tom@qualitygoods.com', phone: '+1 555-0127', rating: 3.8, activeOrders: 1, totalProducts: 67, avgLeadTime: 12, status: 'active', onTimeRate: 78 },
		{ id: '6', name: 'Budget Supplies', contactPerson: 'Anna Davis', email: 'anna@budgetsupplies.com', phone: '+1 555-0128', rating: 4.0, activeOrders: 0, totalProducts: 34, avgLeadTime: 21, status: 'inactive', onTimeRate: 82 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold @lg:text-2xl">Suppliers</h2>
							<p className="text-sm text-muted-foreground">Manage your supplier relationships</p>
						</div>
						<Button>
							<Building2 className="mr-2 size-4" />
							Add Supplier
						</Button>
					</div>

					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
						{suppliers.map((supplier) => (
							<SupplierCard key={supplier.id} supplier={supplier} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
