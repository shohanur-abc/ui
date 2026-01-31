'use client';

import * as React from 'react';
import {
	GripVertical,
	MoreHorizontal,
	Eye,
	EyeOff,
	ArrowUp,
	ArrowDown,
	Package,
	AlertTriangle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	stock: number;
	visibility: boolean;
	position: number;
	lowStockThreshold: number;
}

interface HeaderProps {
	title: string;
	description: string;
}

const Header = ({ title, description }: HeaderProps) => (
	<CardHeader>
		<CardTitle>{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
);

interface DragHandleProps {
	disabled?: boolean;
}

const DragHandle = ({ disabled }: DragHandleProps) => (
	<button
		className={`cursor-grab p-1 ${disabled ? 'opacity-30' : 'hover:bg-muted rounded'}`}
		disabled={disabled}
	>
		<GripVertical className="size-4 text-muted-foreground" />
	</button>
);

interface VisibilityToggleProps {
	visible: boolean;
	onChange: (visible: boolean) => void;
	labels: { visible: string; hidden: string };
}

const VisibilityToggle = ({ visible, onChange, labels }: VisibilityToggleProps) => (
	<div className="flex items-center gap-2">
		<Switch checked={visible} onCheckedChange={onChange} />
		<span className="text-sm text-muted-foreground">
			{visible ? labels.visible : labels.hidden}
		</span>
	</div>
);

interface StockAlertProps {
	stock: number;
	threshold: number;
	labels: { low: string; out: string };
}

const StockAlert = ({ stock, threshold, labels }: StockAlertProps) => {
	if (stock === 0) {
		return (
			<Badge variant="destructive" className="gap-1">
				<AlertTriangle className="size-3" />
				{labels.out}
			</Badge>
		);
	}

	if (stock <= threshold) {
		return (
			<Badge variant="secondary" className="gap-1 text-amber-600 dark:text-amber-400">
				<AlertTriangle className="size-3" />
				{labels.low}
			</Badge>
		);
	}

	return <span className="text-sm">{stock}</span>;
};

interface PositionControlsProps {
	position: number;
	onMoveUp: () => void;
	onMoveDown: () => void;
	isFirst: boolean;
	isLast: boolean;
}

const PositionControls = ({
	position,
	onMoveUp,
	onMoveDown,
	isFirst,
	isLast,
}: PositionControlsProps) => (
	<div className="flex items-center gap-1">
		<span className="mr-2 text-sm font-medium text-muted-foreground">#{position}</span>
		<Button
			variant="ghost"
			size="icon-sm"
			onClick={onMoveUp}
			disabled={isFirst}
		>
			<ArrowUp className="size-3.5" />
		</Button>
		<Button
			variant="ghost"
			size="icon-sm"
			onClick={onMoveDown}
			disabled={isLast}
		>
			<ArrowDown className="size-3.5" />
		</Button>
	</div>
);

interface ProductRowProps {
	product: Product;
	isFirst: boolean;
	isLast: boolean;
	onVisibilityChange: (id: string, visible: boolean) => void;
	onMoveUp: (id: string) => void;
	onMoveDown: (id: string) => void;
	actions: { label: string; onClick: (id: string) => void }[];
}

const ProductRow = ({
	product,
	isFirst,
	isLast,
	onVisibilityChange,
	onMoveUp,
	onMoveDown,
	actions,
}: ProductRowProps) => (
	<TableRow className={!product.visibility ? 'opacity-50' : ''}>
		<TableCell>
			<DragHandle />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-12 overflow-hidden rounded-lg border bg-muted">
					{product.image ? (
						<>
							<img
								src={product.image}
								alt={product.name}
								className="size-full object-cover"
							/>
							{!product.visibility && (
								<div className="absolute inset-0 flex items-center justify-center bg-background/60">
									<EyeOff className="size-4 text-muted-foreground" />
								</div>
							)}
						</>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="space-y-0.5">
					<div className="font-medium">{product.name}</div>
					<div className="text-xs text-muted-foreground">{product.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell className="font-semibold">${product.price.toFixed(2)}</TableCell>
		<TableCell>
			<StockAlert
				stock={product.stock}
				threshold={product.lowStockThreshold}
				labels={{ low: 'Low Stock', out: 'Out of Stock' }}
			/>
		</TableCell>
		<TableCell>
			<VisibilityToggle
				visible={product.visibility}
				onChange={(visible) => onVisibilityChange(product.id, visible)}
				labels={{ visible: 'Visible', hidden: 'Hidden' }}
			/>
		</TableCell>
		<TableCell>
			<PositionControls
				position={product.position}
				onMoveUp={() => onMoveUp(product.id)}
				onMoveDown={() => onMoveDown(product.id)}
				isFirst={isFirst}
				isLast={isLast}
			/>
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
							onClick={() => action.onClick(product.id)}
						>
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const [products, setProducts] = React.useState<Product[]>([
		{
			id: '1',
			name: 'Featured Wireless Headphones',
			sku: 'FEA-WH-001',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			price: 299.99,
			stock: 45,
			visibility: true,
			position: 1,
			lowStockThreshold: 10,
		},
		{
			id: '2',
			name: 'Smart Watch Series X',
			sku: 'FEA-SW-002',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			price: 499.99,
			stock: 8,
			visibility: true,
			position: 2,
			lowStockThreshold: 10,
		},
		{
			id: '3',
			name: 'Premium Leather Bag',
			sku: 'FEA-LB-003',
			image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop',
			price: 189.99,
			stock: 0,
			visibility: false,
			position: 3,
			lowStockThreshold: 5,
		},
		{
			id: '4',
			name: 'Minimalist Desk Lamp',
			sku: 'FEA-DL-004',
			image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
			price: 129.99,
			stock: 67,
			visibility: true,
			position: 4,
			lowStockThreshold: 15,
		},
		{
			id: '5',
			name: 'Ceramic Coffee Mug Set',
			sku: 'FEA-CM-005',
			image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop',
			price: 49.99,
			stock: 234,
			visibility: true,
			position: 5,
			lowStockThreshold: 20,
		},
	]);

	const actions = [
		{ label: 'Edit', onClick: (id: string) => console.log('Edit', id) },
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Remove from Featured', onClick: (id: string) => console.log('Remove', id) },
	];

	const handleVisibilityChange = (id: string, visible: boolean) => {
		setProducts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, visibility: visible } : p))
		);
	};

	const handleMoveUp = (id: string) => {
		setProducts((prev) => {
			const idx = prev.findIndex((p) => p.id === id);
			if (idx <= 0) return prev;
			const newProducts = [...prev];
			[newProducts[idx - 1], newProducts[idx]] = [newProducts[idx], newProducts[idx - 1]];
			return newProducts.map((p, i) => ({ ...p, position: i + 1 }));
		});
	};

	const handleMoveDown = (id: string) => {
		setProducts((prev) => {
			const idx = prev.findIndex((p) => p.id === id);
			if (idx === -1 || idx >= prev.length - 1) return prev;
			const newProducts = [...prev];
			[newProducts[idx], newProducts[idx + 1]] = [newProducts[idx + 1], newProducts[idx]];
			return newProducts.map((p, i) => ({ ...p, position: i + 1 }));
		});
	};

	const columns = ['', 'Product', 'Price', 'Stock', 'Visibility', 'Position'];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<Card>
					<Header
						title="Featured Products"
						description="Manage the order and visibility of featured products on your storefront"
					/>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow>
									{columns.map((column, idx) => (
										<TableHead key={idx} className={idx === 0 ? 'w-10' : ''}>
											{column}
										</TableHead>
									))}
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product, idx) => (
									<ProductRow
										key={product.id}
										product={product}
										isFirst={idx === 0}
										isLast={idx === products.length - 1}
										onVisibilityChange={handleVisibilityChange}
										onMoveUp={handleMoveUp}
										onMoveDown={handleMoveDown}
										actions={actions}
									/>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
