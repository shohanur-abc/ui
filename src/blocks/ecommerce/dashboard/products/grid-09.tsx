'use client';

import * as React from 'react';
import {
	Package,
	Calendar,
	Clock,
	Zap,
	Flame,
	Tag,
	Percent,
	MoreHorizontal,
	Play,
	Pause,
	Copy,
	Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

interface PromotionProduct {
	id: string;
	name: string;
	sku: string;
	image: string;
	originalPrice: number;
	salePrice: number;
	promotionType: 'flash' | 'clearance' | 'seasonal' | 'bundle';
	startDate: string;
	endDate: string;
	isActive: boolean;
	soldCount: number;
	targetCount: number;
	priority: 'high' | 'medium' | 'low';
}

interface PromotionBadgeProps {
	type: 'flash' | 'clearance' | 'seasonal' | 'bundle';
	labels: Record<'flash' | 'clearance' | 'seasonal' | 'bundle', string>;
}

const PromotionBadge = ({ type, labels }: PromotionBadgeProps) => {
	const config = {
		flash: { icon: Zap, className: 'bg-amber-500 hover:bg-amber-600' },
		clearance: { icon: Tag, className: 'bg-red-500 hover:bg-red-600' },
		seasonal: { icon: Calendar, className: 'bg-emerald-500 hover:bg-emerald-600' },
		bundle: { icon: Package, className: 'bg-blue-500 hover:bg-blue-600' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<Badge className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{labels[type]}
		</Badge>
	);
};

interface PriorityIndicatorProps {
	priority: 'high' | 'medium' | 'low';
}

const PriorityIndicator = ({ priority }: PriorityIndicatorProps) => {
	const config = {
		high: { icon: Flame, className: 'text-red-500', bgClassName: 'bg-red-500/10' },
		medium: { className: 'text-amber-500', bgClassName: 'bg-amber-500/10' },
		low: { className: 'text-muted-foreground', bgClassName: 'bg-muted' },
	};

	const { icon: Icon, className, bgClassName } = config[priority];

	return (
		<div className={`flex size-6 items-center justify-center rounded-full ${bgClassName}`}>
			{Icon ? <Icon className={`size-3.5 ${className}`} /> : <span className={`size-2 rounded-full ${className} bg-current`} />}
		</div>
	);
};

interface DiscountDisplayProps {
	originalPrice: number;
	salePrice: number;
}

const DiscountDisplay = ({ originalPrice, salePrice }: DiscountDisplayProps) => {
	const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

	return (
		<div className="flex items-baseline gap-2">
			<span className="text-lg font-bold text-primary">${salePrice.toFixed(2)}</span>
			<span className="text-sm text-muted-foreground line-through">
				${originalPrice.toFixed(2)}
			</span>
			<Badge variant="destructive" className="gap-1 text-xs">
				<Percent className="size-3" />
				{discountPercent}% OFF
			</Badge>
		</div>
	);
};

interface DateRangeProps {
	startDate: string;
	endDate: string;
}

const DateRange = ({ startDate, endDate }: DateRangeProps) => {
	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
	};

	const now = new Date();
	const end = new Date(endDate);
	const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
	const isEnding = daysLeft <= 3 && daysLeft > 0;

	return (
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<Calendar className="size-3.5" />
			<span>
				{formatDate(startDate)} - {formatDate(endDate)}
			</span>
			{isEnding && (
				<Badge variant="outline" className="gap-1 border-amber-500 text-amber-500">
					<Clock className="size-3" />
					{daysLeft}d left
				</Badge>
			)}
		</div>
	);
};

interface SalesProgressProps {
	sold: number;
	target: number;
	labels: { sold: string; target: string };
}

const SalesProgress = ({ sold, target, labels }: SalesProgressProps) => {
	const percentage = Math.min((sold / target) * 100, 100);
	const isComplete = sold >= target;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">{labels.sold}</span>
				<span className={isComplete ? 'font-medium text-emerald-500' : ''}>
					{sold} / {target}
				</span>
			</div>
			<Progress
				value={percentage}
				className={`h-2 ${isComplete ? '[&>div]:bg-emerald-500' : ''}`}
			/>
		</div>
	);
};

interface ProductCardProps {
	product: PromotionProduct;
	onToggleActive: (id: string, active: boolean) => void;
	actions: { label: string; icon?: React.ElementType; onClick: (id: string) => void; variant?: 'destructive' }[];
	labels: {
		promotionTypes: Record<'flash' | 'clearance' | 'seasonal' | 'bundle', string>;
		sold: string;
		target: string;
		active: string;
	};
}

const ProductCard = ({ product, onToggleActive, actions, labels }: ProductCardProps) => (
	<Card className="overflow-hidden transition-all hover:shadow-lg">
		<CardContent className="p-0">
			<div className="relative aspect-[4/3] overflow-hidden bg-muted">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-16 text-muted-foreground" />
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
				<div className="absolute left-3 top-3 flex items-center gap-2">
					<PromotionBadge type={product.promotionType} labels={labels.promotionTypes} />
					<PriorityIndicator priority={product.priority} />
				</div>
				<div className="absolute right-3 top-3">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon-sm" className="bg-background/80 backdrop-blur-sm">
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
										{action.icon && <action.icon className="mr-2 size-4" />}
										{action.label}
									</DropdownMenuItem>
								</React.Fragment>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="absolute inset-x-3 bottom-3">
					<h3 className="truncate font-semibold text-white">{product.name}</h3>
					<p className="text-xs text-white/70">{product.sku}</p>
				</div>
			</div>
			<div className="space-y-4 p-4">
				<DiscountDisplay
					originalPrice={product.originalPrice}
					salePrice={product.salePrice}
				/>
				<DateRange startDate={product.startDate} endDate={product.endDate} />
				<SalesProgress
					sold={product.soldCount}
					target={product.targetCount}
					labels={{ sold: labels.sold, target: labels.target }}
				/>
			</div>
		</CardContent>
		<CardFooter className="flex items-center justify-between border-t bg-muted/30 p-3">
			<div className="flex items-center gap-2">
				<Switch
					checked={product.isActive}
					onCheckedChange={(checked) => onToggleActive(product.id, checked)}
				/>
				<span className="text-sm">{labels.active}</span>
			</div>
			<Button variant="ghost" size="icon-sm">
				{product.isActive ? <Pause className="size-4" /> : <Play className="size-4" />}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const [products, setProducts] = React.useState<PromotionProduct[]>([
		{
			id: '1',
			name: 'Summer Collection Dress',
			sku: 'DRS-SMR-001',
			image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop',
			originalPrice: 129.99,
			salePrice: 79.99,
			promotionType: 'seasonal',
			startDate: '2024-06-01',
			endDate: '2024-06-30',
			isActive: true,
			soldCount: 234,
			targetCount: 500,
			priority: 'high',
		},
		{
			id: '2',
			name: 'Wireless Headphones X1',
			sku: 'AUD-WHP-002',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
			originalPrice: 299.99,
			salePrice: 149.99,
			promotionType: 'flash',
			startDate: '2024-03-15',
			endDate: '2024-03-17',
			isActive: true,
			soldCount: 89,
			targetCount: 100,
			priority: 'high',
		},
		{
			id: '3',
			name: 'Last Season Sneakers',
			sku: 'SNK-LST-003',
			image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
			originalPrice: 159.99,
			salePrice: 59.99,
			promotionType: 'clearance',
			startDate: '2024-02-01',
			endDate: '2024-04-30',
			isActive: true,
			soldCount: 156,
			targetCount: 200,
			priority: 'medium',
		},
		{
			id: '4',
			name: 'Tech Starter Bundle',
			sku: 'BND-TCH-004',
			image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop',
			originalPrice: 499.99,
			salePrice: 349.99,
			promotionType: 'bundle',
			startDate: '2024-03-01',
			endDate: '2024-03-31',
			isActive: false,
			soldCount: 45,
			targetCount: 100,
			priority: 'low',
		},
		{
			id: '5',
			name: 'Premium Watch Classic',
			sku: 'WCH-PRM-005',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
			originalPrice: 399.99,
			salePrice: 299.99,
			promotionType: 'flash',
			startDate: '2024-03-20',
			endDate: '2024-03-22',
			isActive: true,
			soldCount: 67,
			targetCount: 75,
			priority: 'high',
		},
		{
			id: '6',
			name: 'Winter Jacket Outlet',
			sku: 'JKT-WNT-006',
			image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop',
			originalPrice: 249.99,
			salePrice: 89.99,
			promotionType: 'clearance',
			startDate: '2024-01-15',
			endDate: '2024-05-15',
			isActive: true,
			soldCount: 312,
			targetCount: 400,
			priority: 'medium',
		},
	]);

	const handleToggleActive = (id: string, active: boolean) => {
		setProducts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, isActive: active } : p))
		);
	};

	const actions = [
		{ label: 'Edit Promotion', onClick: (id: string) => console.log('Edit', id) },
		{ label: 'View Analytics', onClick: (id: string) => console.log('Analytics', id) },
		{ label: 'Duplicate', icon: Copy, onClick: (id: string) => console.log('Duplicate', id) },
		{ label: 'Delete', icon: Trash2, onClick: (id: string) => console.log('Delete', id), variant: 'destructive' as const },
	];

	const labels = {
		promotionTypes: {
			flash: 'Flash Sale',
			clearance: 'Clearance',
			seasonal: 'Seasonal',
			bundle: 'Bundle',
		},
		sold: 'Sales Progress',
		target: 'Target',
		active: 'Active',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @sm:grid-cols-2 @lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onToggleActive={handleToggleActive}
							actions={actions}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
