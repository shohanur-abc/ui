'use client';

import * as React from 'react';
import {
	Package,
	GripVertical,
	MoreHorizontal,
	Eye,
	EyeOff,
	Pencil,
	Copy,
	Trash2,
	ChevronUp,
	ChevronDown,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	stock: number;
	isVisible: boolean;
	position: number;
	salesRank: number;
}

interface DragHandleProps {
	onMoveUp: () => void;
	onMoveDown: () => void;
	canMoveUp: boolean;
	canMoveDown: boolean;
}

const DragHandle = ({ onMoveUp, onMoveDown, canMoveUp, canMoveDown }: DragHandleProps) => (
	<div className="flex flex-col items-center gap-0.5">
		<Button
			variant="ghost"
			size="icon-sm"
			className="size-5"
			onClick={onMoveUp}
			disabled={!canMoveUp}
		>
			<ChevronUp className="size-3" />
		</Button>
		<GripVertical className="size-4 cursor-grab text-muted-foreground" />
		<Button
			variant="ghost"
			size="icon-sm"
			className="size-5"
			onClick={onMoveDown}
			disabled={!canMoveDown}
		>
			<ChevronDown className="size-3" />
		</Button>
	</div>
);

interface PositionBadgeProps {
	position: number;
}

const PositionBadge = ({ position }: PositionBadgeProps) => (
	<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
		{position}
	</div>
);

interface SalesRankProps {
	rank: number;
	label: string;
}

const SalesRank = ({ rank, label }: SalesRankProps) => {
	const getBadgeVariant = () => {
		if (rank <= 3) return 'default';
		if (rank <= 10) return 'secondary';
		return 'outline';
	};

	return (
		<Badge variant={getBadgeVariant()} className="text-xs">
			#{rank} {label}
		</Badge>
	);
};

interface StockStatusProps {
	stock: number;
}

const StockStatus = ({ stock }: StockStatusProps) => {
	const getColor = () => {
		if (stock === 0) return 'text-red-500';
		if (stock < 10) return 'text-amber-500';
		return 'text-muted-foreground';
	};

	return <span className={`text-sm ${getColor()}`}>{stock} in stock</span>;
};

interface ProductRowProps {
	product: Product;
	index: number;
	total: number;
	onToggleVisibility: (id: string, visible: boolean) => void;
	onMoveUp: (id: string) => void;
	onMoveDown: (id: string) => void;
	actions: { label: string; icon: React.ElementType; onClick: (id: string) => void; variant?: 'destructive' }[];
	labels: { salesRank: string };
}

const ProductRow = ({
	product,
	index,
	total,
	onToggleVisibility,
	onMoveUp,
	onMoveDown,
	actions,
	labels,
}: ProductRowProps) => (
	<div
		className={`group flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-md ${
			product.isVisible ? 'bg-card' : 'bg-muted/50 opacity-60'
		}`}
	>
		<DragHandle
			onMoveUp={() => onMoveUp(product.id)}
			onMoveDown={() => onMoveDown(product.id)}
			canMoveUp={index > 0}
			canMoveDown={index < total - 1}
		/>
		<PositionBadge position={product.position} />
		<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			{product.image ? (
				<img src={product.image} alt={product.name} className="size-full object-cover" />
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-8 text-muted-foreground" />
				</div>
			)}
		</div>
		<div className="min-w-0 flex-1">
			<h3 className="truncate font-semibold">{product.name}</h3>
			<p className="text-sm text-muted-foreground">{product.sku}</p>
			<div className="mt-1 flex items-center gap-3">
				<SalesRank rank={product.salesRank} label={labels.salesRank} />
				<StockStatus stock={product.stock} />
			</div>
		</div>
		<div className="text-right">
			<div className="text-lg font-bold">${product.price.toFixed(2)}</div>
		</div>
		<div className="flex items-center gap-2 border-l pl-4">
			{product.isVisible ? (
				<Eye className="size-4 text-emerald-500" />
			) : (
				<EyeOff className="size-4 text-muted-foreground" />
			)}
			<Switch
				checked={product.isVisible}
				onCheckedChange={(checked) => onToggleVisibility(product.id, checked)}
			/>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{actions.map((action) => (
					<React.Fragment key={action.label}>
						{action.variant === 'destructive' && <DropdownMenuSeparator />}
						<DropdownMenuItem
							onClick={() => action.onClick(product.id)}
							className={action.variant === 'destructive' ? 'text-destructive' : ''}
						>
							<action.icon className="mr-2 size-4" />
							{action.label}
						</DropdownMenuItem>
					</React.Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const [products, setProducts] = React.useState<Product[]>([
		{
			id: '1',
			name: 'Premium Wireless Earbuds',
			sku: 'PWE-001',
			image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
			price: 179.99,
			stock: 89,
			isVisible: true,
			position: 1,
			salesRank: 1,
		},
		{
			id: '2',
			name: 'Smart Home Hub',
			sku: 'SHH-002',
			image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=100&h=100&fit=crop',
			price: 149.99,
			stock: 45,
			isVisible: true,
			position: 2,
			salesRank: 3,
		},
		{
			id: '3',
			name: 'Portable Charger 20000mAh',
			sku: 'PC-003',
			image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop',
			price: 49.99,
			stock: 156,
			isVisible: true,
			position: 3,
			salesRank: 2,
		},
		{
			id: '4',
			name: 'Mechanical Gaming Keyboard',
			sku: 'MGK-004',
			image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop',
			price: 159.99,
			stock: 8,
			isVisible: false,
			position: 4,
			salesRank: 5,
		},
		{
			id: '5',
			name: 'Ultra-Wide Monitor 34"',
			sku: 'UWM-005',
			image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop',
			price: 599.99,
			stock: 23,
			isVisible: true,
			position: 5,
			salesRank: 4,
		},
	]);

	const handleToggleVisibility = (id: string, visible: boolean) => {
		setProducts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, isVisible: visible } : p))
		);
	};

	const handleMoveUp = (id: string) => {
		setProducts((prev) => {
			const index = prev.findIndex((p) => p.id === id);
			if (index <= 0) return prev;

			const newProducts = [...prev];
			[newProducts[index - 1], newProducts[index]] = [newProducts[index], newProducts[index - 1]];
			return newProducts.map((p, i) => ({ ...p, position: i + 1 }));
		});
	};

	const handleMoveDown = (id: string) => {
		setProducts((prev) => {
			const index = prev.findIndex((p) => p.id === id);
			if (index < 0 || index >= prev.length - 1) return prev;

			const newProducts = [...prev];
			[newProducts[index], newProducts[index + 1]] = [newProducts[index + 1], newProducts[index]];
			return newProducts.map((p, i) => ({ ...p, position: i + 1 }));
		});
	};

	const actions = [
		{ label: 'Edit', icon: Pencil, onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Duplicate', icon: Copy, onClick: (id: string) => console.log('Duplicate', id) },
		{ label: 'Delete', icon: Trash2, onClick: (id: string) => console.log('Delete', id), variant: 'destructive' as const },
	];

	const labels = {
		salesRank: 'seller',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-2 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product, index) => (
					<ProductRow
						key={product.id}
						product={product}
						index={index}
						total={products.length}
						onToggleVisibility={handleToggleVisibility}
						onMoveUp={handleMoveUp}
						onMoveDown={handleMoveDown}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
