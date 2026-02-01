'use client';

import * as React from 'react';
import {
	Package,
	DollarSign,
	TrendingUp,
	TrendingDown,
	Calendar,
	History,
	AlertCircle,
	MoreHorizontal,
	Pencil,
	BarChart2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface PriceChange {
	date: string;
	oldPrice: number;
	newPrice: number;
	reason: string;
}

interface CompetitorPrice {
	name: string;
	price: number;
	lastUpdated: string;
}

interface ProductPricing {
	id: string;
	name: string;
	sku: string;
	image: string;
	currentPrice: number;
	costPrice: number;
	margin: number;
	marginPercent: number;
	msrp: number;
	minPrice: number;
	priceHistory: PriceChange[];
	competitors: CompetitorPrice[];
	pricePosition: 'lowest' | 'competitive' | 'highest';
}

interface MarginDisplayProps {
	margin: number;
	marginPercent: number;
}

const MarginDisplay = ({ margin, marginPercent }: MarginDisplayProps) => {
	const getColor = () => {
		if (marginPercent >= 40) return 'text-emerald-500';
		if (marginPercent >= 20) return 'text-amber-500';
		return 'text-red-500';
	};

	return (
		<div className="text-center">
			<div className={`text-lg font-bold ${getColor()}`}>
				${margin.toFixed(2)}
			</div>
			<div className={`text-xs ${getColor()}`}>
				{marginPercent.toFixed(1)}% margin
			</div>
		</div>
	);
};

interface PricePositionBadgeProps {
	position: 'lowest' | 'competitive' | 'highest';
	labels: Record<'lowest' | 'competitive' | 'highest', string>;
}

const PricePositionBadge = ({ position, labels }: PricePositionBadgeProps) => {
	const config = {
		lowest: 'bg-emerald-500/10 text-emerald-500',
		competitive: 'bg-blue-500/10 text-blue-500',
		highest: 'bg-red-500/10 text-red-500',
	};

	return <Badge className={config[position]}>{labels[position]}</Badge>;
};

interface PriceHistoryProps {
	history: PriceChange[];
	maxShow?: number;
}

const PriceHistory = ({ history, maxShow = 3 }: PriceHistoryProps) => {
	if (history.length === 0) return null;

	return (
		<div className="space-y-1">
			{history.slice(0, maxShow).map((change, idx) => {
				const isIncrease = change.newPrice > change.oldPrice;
				const diff = change.newPrice - change.oldPrice;
				const diffPercent = (diff / change.oldPrice) * 100;

				return (
					<Tooltip key={idx}>
						<TooltipTrigger asChild>
							<div className="flex items-center gap-2 text-xs">
								<span className="text-muted-foreground">{change.date}</span>
								<span
									className={isIncrease ? 'text-emerald-500' : 'text-red-500'}
								>
									{isIncrease ? (
										<TrendingUp className="inline size-3" />
									) : (
										<TrendingDown className="inline size-3" />
									)}
									{isIncrease ? '+' : ''}
									{diffPercent.toFixed(1)}%
								</span>
								<span className="text-muted-foreground">
									${change.oldPrice.toFixed(2)} → ${change.newPrice.toFixed(2)}
								</span>
							</div>
						</TooltipTrigger>
						<TooltipContent>{change.reason}</TooltipContent>
					</Tooltip>
				);
			})}
			{history.length > maxShow && (
				<span className="text-xs text-muted-foreground">
					+{history.length - maxShow} more changes
				</span>
			)}
		</div>
	);
};

interface CompetitorPricesProps {
	competitors: CompetitorPrice[];
	currentPrice: number;
}

const CompetitorPrices = ({
	competitors,
	currentPrice,
}: CompetitorPricesProps) => (
	<div className="grid gap-1 @sm:grid-cols-2 @md:grid-cols-3">
		{competitors.map((comp) => {
			const diff = currentPrice - comp.price;
			const isLower = diff < 0;

			return (
				<div
					key={comp.name}
					className="flex items-center justify-between rounded-lg border bg-muted/30 px-2 py-1.5 text-xs"
				>
					<span className="truncate font-medium">{comp.name}</span>
					<div className="flex items-center gap-1">
						<span className="font-bold">${comp.price.toFixed(2)}</span>
						<span className={isLower ? 'text-red-500' : 'text-emerald-500'}>
							({isLower ? '' : '+'}
							{diff.toFixed(2)})
						</span>
					</div>
				</div>
			);
		})}
	</div>
);

interface ProductRowProps {
	product: ProductPricing;
	actions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
	}[];
	labels: {
		pricePosition: Record<'lowest' | 'competitive' | 'highest', string>;
		cost: string;
		msrp: string;
		minPrice: string;
	};
}

const ProductRow = ({ product, actions, labels }: ProductRowProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-start gap-4">
			<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-8 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="font-semibold">{product.name}</h3>
						<p className="text-sm text-muted-foreground">{product.sku}</p>
					</div>
					<div className="flex items-center gap-2">
						<PricePositionBadge
							position={product.pricePosition}
							labels={labels.pricePosition}
						/>
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
										<action.icon className="mr-2 size-4" />
										{action.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>

		<div className="mb-4 grid gap-4 @sm:grid-cols-5">
			<div className="rounded-lg border bg-primary/5 p-3 text-center">
				<div className="text-2xl font-bold text-primary">
					${product.currentPrice.toFixed(2)}
				</div>
				<div className="text-xs text-muted-foreground">Current Price</div>
			</div>
			<div className="rounded-lg border bg-muted/30 p-3 text-center">
				<div className="text-lg font-semibold">
					${product.costPrice.toFixed(2)}
				</div>
				<div className="text-xs text-muted-foreground">{labels.cost}</div>
			</div>
			<MarginDisplay
				margin={product.margin}
				marginPercent={product.marginPercent}
			/>
			<div className="rounded-lg border bg-muted/30 p-3 text-center">
				<div className="text-lg font-semibold">${product.msrp.toFixed(2)}</div>
				<div className="text-xs text-muted-foreground">{labels.msrp}</div>
			</div>
			<div className="rounded-lg border bg-muted/30 p-3 text-center">
				<div className="text-lg font-semibold">
					${product.minPrice.toFixed(2)}
				</div>
				<div className="text-xs text-muted-foreground">{labels.minPrice}</div>
				{product.currentPrice < product.minPrice && (
					<AlertCircle className="mx-auto mt-1 size-4 text-red-500" />
				)}
			</div>
		</div>

		<div className="grid gap-4 @lg:grid-cols-2">
			<div>
				<div className="mb-2 flex items-center gap-2 text-sm font-medium">
					<History className="size-4 text-muted-foreground" />
					Price History
				</div>
				<PriceHistory history={product.priceHistory} />
			</div>
			<div>
				<div className="mb-2 flex items-center gap-2 text-sm font-medium">
					<BarChart2 className="size-4 text-muted-foreground" />
					Competitor Prices
				</div>
				<CompetitorPrices
					competitors={product.competitors}
					currentPrice={product.currentPrice}
				/>
			</div>
		</div>
	</div>
);

export default function Main() {
	const products: ProductPricing[] = [
		{
			id: '1',
			name: 'Professional Camera Lens',
			sku: 'CAM-LNS-001',
			image:
				'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=100&h=100&fit=crop',
			currentPrice: 899.99,
			costPrice: 540.0,
			margin: 359.99,
			marginPercent: 40.0,
			msrp: 999.99,
			minPrice: 799.99,
			priceHistory: [
				{
					date: 'Mar 1',
					oldPrice: 949.99,
					newPrice: 899.99,
					reason: 'Spring sale promotion',
				},
				{
					date: 'Feb 15',
					oldPrice: 899.99,
					newPrice: 949.99,
					reason: 'Price optimization',
				},
				{
					date: 'Jan 20',
					oldPrice: 849.99,
					newPrice: 899.99,
					reason: 'Supplier cost increase',
				},
			],
			competitors: [
				{ name: 'Amazon', price: 879.99, lastUpdated: '2h ago' },
				{ name: 'B&H Photo', price: 899.99, lastUpdated: '1d ago' },
				{ name: 'Adorama', price: 919.99, lastUpdated: '3h ago' },
			],
			pricePosition: 'competitive',
		},
		{
			id: '2',
			name: 'Wireless Microphone Kit',
			sku: 'AUD-MIC-002',
			image:
				'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=100&h=100&fit=crop',
			currentPrice: 249.99,
			costPrice: 125.0,
			margin: 124.99,
			marginPercent: 50.0,
			msrp: 299.99,
			minPrice: 229.99,
			priceHistory: [
				{
					date: 'Mar 5',
					oldPrice: 279.99,
					newPrice: 249.99,
					reason: 'Competitive price match',
				},
			],
			competitors: [
				{ name: 'Amazon', price: 269.99, lastUpdated: '1h ago' },
				{ name: 'B&H Photo', price: 259.99, lastUpdated: '4h ago' },
				{ name: 'Sweetwater', price: 249.99, lastUpdated: '6h ago' },
			],
			pricePosition: 'lowest',
		},
		{
			id: '3',
			name: 'Studio Monitor Speakers',
			sku: 'AUD-SPK-003',
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
			currentPrice: 449.99,
			costPrice: 320.0,
			margin: 129.99,
			marginPercent: 28.9,
			msrp: 499.99,
			minPrice: 399.99,
			priceHistory: [
				{
					date: 'Mar 8',
					oldPrice: 429.99,
					newPrice: 449.99,
					reason: 'Price increase test',
				},
				{
					date: 'Feb 28',
					oldPrice: 399.99,
					newPrice: 429.99,
					reason: 'Stock limitation',
				},
			],
			competitors: [
				{ name: 'Amazon', price: 419.99, lastUpdated: '30m ago' },
				{ name: 'Guitar Center', price: 429.99, lastUpdated: '2h ago' },
				{ name: "Musician's Friend", price: 439.99, lastUpdated: '1d ago' },
			],
			pricePosition: 'highest',
		},
	];

	const actions = [
		{
			label: 'Edit Pricing',
			icon: Pencil,
			onClick: (id: string) => console.log('Edit', id),
		},
		{
			label: 'Price History',
			icon: History,
			onClick: (id: string) => console.log('History', id),
		},
		{
			label: 'Competitor Analysis',
			icon: BarChart2,
			onClick: (id: string) => console.log('Analysis', id),
		},
	];

	const labels = {
		pricePosition: {
			lowest: 'Lowest Price',
			competitive: 'Competitive',
			highest: 'Above Market',
		},
		cost: 'Cost',
		msrp: 'MSRP',
		minPrice: 'Min Price',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
