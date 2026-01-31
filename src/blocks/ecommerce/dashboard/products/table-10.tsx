'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Search,
	Package,
	Globe,
	Check,
	X,
	AlertCircle,
	Languages,
	DollarSign,
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
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface MarketData {
	marketId: string;
	marketName: string;
	flag: string;
	enabled: boolean;
	price: number;
	currency: string;
	translated: boolean;
}

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	markets: MarketData[];
	translationProgress: number;
	defaultPrice: number;
}

interface ToolbarProps {
	searchPlaceholder: string;
	marketLabel: string;
	markets: { value: string; label: string; flag: string }[];
	statusLabel: string;
	statuses: { value: string; label: string }[];
}

const Toolbar = ({
	searchPlaceholder,
	marketLabel,
	markets,
	statusLabel,
	statuses,
}: ToolbarProps) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @md:flex-row @md:items-center">
		<div className="flex items-center gap-2">
			<Globe className="size-5 text-primary" />
			<h2 className="text-lg font-semibold">International Products</h2>
		</div>
		<div className="flex flex-1 flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-end">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={searchPlaceholder} className="w-full pl-10 @sm:w-56" />
			</div>
			<Select>
				<SelectTrigger className="w-36">
					<SelectValue placeholder={marketLabel} />
				</SelectTrigger>
				<SelectContent>
					{markets.map((market) => (
						<SelectItem key={market.value} value={market.value}>
							<span className="flex items-center gap-2">
								<span>{market.flag}</span>
								{market.label}
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select>
				<SelectTrigger className="w-32">
					<SelectValue placeholder={statusLabel} />
				</SelectTrigger>
				<SelectContent>
					{statuses.map((status) => (
						<SelectItem key={status.value} value={status.value}>
							{status.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	</div>
);

interface MarketStatusProps {
	market: MarketData;
}

const MarketStatus = ({ market }: MarketStatusProps) => (
	<Tooltip>
		<TooltipTrigger asChild>
			<div
				className={`flex size-8 items-center justify-center rounded-md border text-lg ${
					market.enabled
						? 'border-primary/20 bg-primary/5'
						: 'border-muted bg-muted/50 opacity-50'
				}`}
			>
				{market.flag}
			</div>
		</TooltipTrigger>
		<TooltipContent>
			<div className="space-y-1">
				<div className="font-medium">{market.marketName}</div>
				<div className="text-xs">
					{market.enabled ? (
						<span className="text-emerald-500">Active</span>
					) : (
						<span className="text-muted-foreground">Inactive</span>
					)}
				</div>
				{market.enabled && (
					<div className="text-xs">
						{market.currency} {market.price.toFixed(2)}
					</div>
				)}
			</div>
		</TooltipContent>
	</Tooltip>
);

interface MarketsGridProps {
	markets: MarketData[];
}

const MarketsGrid = ({ markets }: MarketsGridProps) => (
	<div className="flex items-center gap-1">
		{markets.slice(0, 5).map((market) => (
			<MarketStatus key={market.marketId} market={market} />
		))}
		{markets.length > 5 && (
			<div className="flex size-8 items-center justify-center rounded-md border bg-muted text-xs font-medium">
				+{markets.length - 5}
			</div>
		)}
	</div>
);

interface TranslationProgressProps {
	progress: number;
	label: string;
}

const TranslationProgress = ({ progress, label }: TranslationProgressProps) => (
	<div className="flex items-center gap-3">
		<Progress value={progress} className="h-2 w-20" />
		<span className="text-sm text-muted-foreground">{progress}%</span>
	</div>
);

interface MarketPricingProps {
	markets: MarketData[];
}

const MarketPricing = ({ markets }: MarketPricingProps) => {
	const enabledMarkets = markets.filter((m) => m.enabled);
	if (enabledMarkets.length === 0) return <span className="text-muted-foreground">—</span>;

	const prices = enabledMarkets.map((m) => m.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);

	return (
		<div className="text-sm">
			{minPrice === maxPrice ? (
				<span className="font-medium">${minPrice.toFixed(2)}</span>
			) : (
				<span>
					<span className="font-medium">${minPrice.toFixed(2)}</span>
					<span className="text-muted-foreground"> - </span>
					<span className="font-medium">${maxPrice.toFixed(2)}</span>
				</span>
			)}
		</div>
	);
};

interface ProductRowProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	actions: { label: string; onClick: (id: string) => void }[];
}

const ProductRow = ({ product, selected, onSelect, actions }: ProductRowProps) => {
	const enabledCount = product.markets.filter((m) => m.enabled).length;
	const translatedCount = product.markets.filter((m) => m.translated).length;

	return (
		<TableRow data-state={selected ? 'selected' : undefined}>
			<TableCell>
				<Checkbox
					checked={selected}
					onCheckedChange={(checked) => onSelect(product.id, !!checked)}
				/>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-3">
					<div className="relative size-12 overflow-hidden rounded-lg border bg-muted">
						{product.image ? (
							<img
								src={product.image}
								alt={product.name}
								className="size-full object-cover"
							/>
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
			<TableCell>
				<MarketsGrid markets={product.markets} />
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Badge variant="secondary" className="gap-1">
						<Globe className="size-3" />
						{enabledCount}/{product.markets.length}
					</Badge>
				</div>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Badge variant="outline" className="gap-1">
						<Languages className="size-3" />
						{translatedCount}/{product.markets.length}
					</Badge>
					<TranslationProgress
						progress={product.translationProgress}
						label="Translated"
					/>
				</div>
			</TableCell>
			<TableCell>
				<MarketPricing markets={product.markets} />
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
};

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const markets: MarketData[] = [
		{ marketId: 'us', marketName: 'United States', flag: '🇺🇸', enabled: true, price: 99.99, currency: 'USD', translated: true },
		{ marketId: 'gb', marketName: 'United Kingdom', flag: '🇬🇧', enabled: true, price: 79.99, currency: 'GBP', translated: true },
		{ marketId: 'de', marketName: 'Germany', flag: '🇩🇪', enabled: true, price: 89.99, currency: 'EUR', translated: true },
		{ marketId: 'fr', marketName: 'France', flag: '🇫🇷', enabled: true, price: 89.99, currency: 'EUR', translated: false },
		{ marketId: 'jp', marketName: 'Japan', flag: '🇯🇵', enabled: false, price: 12999, currency: 'JPY', translated: false },
		{ marketId: 'au', marketName: 'Australia', flag: '🇦🇺', enabled: true, price: 149.99, currency: 'AUD', translated: true },
	];

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Noise-Canceling Headphones',
			sku: 'AUD-WNC-001',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			markets: markets,
			translationProgress: 83,
			defaultPrice: 99.99,
		},
		{
			id: '2',
			name: 'Smart Home Hub Pro',
			sku: 'HOM-HUB-002',
			image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=100&h=100&fit=crop',
			markets: markets.map((m) => ({ ...m, enabled: m.marketId !== 'jp' && m.marketId !== 'au' })),
			translationProgress: 60,
			defaultPrice: 149.99,
		},
		{
			id: '3',
			name: 'Ergonomic Office Chair',
			sku: 'FUR-CHR-003',
			image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&h=100&fit=crop',
			markets: markets.map((m) => ({ ...m, enabled: m.marketId === 'us' || m.marketId === 'gb' })),
			translationProgress: 33,
			defaultPrice: 399.99,
		},
		{
			id: '4',
			name: 'Premium Coffee Maker',
			sku: 'KIT-CFE-004',
			image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop',
			markets: markets.map((m) => ({ ...m, translated: true })),
			translationProgress: 100,
			defaultPrice: 249.99,
		},
	];

	const marketFilters = [
		{ value: 'all', label: 'All Markets', flag: '🌍' },
		{ value: 'us', label: 'United States', flag: '🇺🇸' },
		{ value: 'gb', label: 'United Kingdom', flag: '🇬🇧' },
		{ value: 'de', label: 'Germany', flag: '🇩🇪' },
		{ value: 'fr', label: 'France', flag: '🇫🇷' },
		{ value: 'jp', label: 'Japan', flag: '🇯🇵' },
	];

	const statusFilters = [
		{ value: 'all', label: 'All Status' },
		{ value: 'active', label: 'Active' },
		{ value: 'partial', label: 'Partial' },
		{ value: 'inactive', label: 'Inactive' },
	];

	const actions = [
		{ label: 'Edit Markets', onClick: (id: string) => console.log('Markets', id) },
		{ label: 'Manage Translations', onClick: (id: string) => console.log('Translations', id) },
		{ label: 'Set Pricing', onClick: (id: string) => console.log('Pricing', id) },
		{ label: 'View Analytics', onClick: (id: string) => console.log('Analytics', id) },
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	const columns = ['Product', 'Markets', 'Active', 'Translations', 'Price Range'];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="overflow-hidden rounded-xl border bg-card shadow-sm">
					<Toolbar
						searchPlaceholder="Search products..."
						marketLabel="Market"
						markets={marketFilters}
						statusLabel="Status"
						statuses={statusFilters}
					/>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								{columns.map((column) => (
									<TableHead key={column}>{column}</TableHead>
								))}
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<ProductRow
									key={product.id}
									product={product}
									selected={selectedIds.has(product.id)}
									onSelect={handleSelect}
									actions={actions}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
