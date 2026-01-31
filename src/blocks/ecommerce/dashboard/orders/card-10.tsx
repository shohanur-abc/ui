import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, ArrowLeftRight, Plus, Minus, Check, X, RefreshCw } from 'lucide-react';

interface ExchangeItem {
	name: string;
	variant: string;
	price: string;
}

interface ExchangeCardProps {
	exchange: {
		id: string;
		orderId: string;
		originalItem: ExchangeItem;
		newItem: ExchangeItem;
		priceDifference: string;
		isUpgrade: boolean;
		status: 'pending' | 'approved' | 'processing';
		requestDate: string;
	};
	labels: {
		original: string;
		exchange: string;
		difference: string;
		approve: string;
		reject: string;
	};
}

interface ItemCardProps {
	item: ExchangeItem;
	label: string;
	type: 'original' | 'new';
}

const ItemCard = ({ item, label, type }: ItemCardProps) => (
	<div className={`flex-1 p-3 rounded-lg border ${type === 'original' ? 'bg-muted/30 border-border/50' : 'bg-primary/5 border-primary/30'}`}>
		<p className="text-xs text-muted-foreground mb-2">{label}</p>
		<div className="flex items-center gap-3">
			<div className={`size-10 rounded-lg flex items-center justify-center ${type === 'original' ? 'bg-muted' : 'bg-primary/10'}`}>
				<Package className={`size-5 ${type === 'original' ? 'text-muted-foreground' : 'text-primary'}`} />
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-medium truncate">{item.name}</p>
				<p className="text-xs text-muted-foreground">{item.variant}</p>
			</div>
			<span className="font-semibold">{item.price}</span>
		</div>
	</div>
);

const PriceDifference = ({ difference, isUpgrade }: { difference: string; isUpgrade: boolean }) => (
	<div className={`flex items-center gap-2 p-3 rounded-lg border ${isUpgrade ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-destructive/10 border-destructive/30 text-destructive'}`}>
		{isUpgrade ? <Plus className="size-4" /> : <Minus className="size-4" />}
		<span className="font-semibold">{difference}</span>
		<span className="text-sm">{isUpgrade ? 'to pay' : 'refund'}</span>
	</div>
);

const StatusBadge = ({ status }: { status: ExchangeCardProps['exchange']['status'] }) => {
	const config: Record<typeof status, { variant: 'default' | 'secondary' | 'outline'; icon: typeof RefreshCw }> = {
		pending: { variant: 'outline', icon: RefreshCw },
		approved: { variant: 'secondary', icon: Check },
		processing: { variant: 'default', icon: RefreshCw },
	};
	return (
		<Badge variant={config[status].variant} className="gap-1 capitalize">
			<config[status].icon className="size-3" />
			{status}
		</Badge>
	);
};

const ExchangeCard = ({ exchange, labels }: ExchangeCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-start justify-between">
				<div>
					<CardDescription className="flex items-center gap-1.5">
						<ArrowLeftRight className="size-3" />
						Exchange Request
					</CardDescription>
					<CardTitle className="text-base font-mono">{exchange.id}</CardTitle>
					<p className="text-xs text-muted-foreground mt-1">from {exchange.orderId}</p>
				</div>
				<StatusBadge status={exchange.status} />
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex gap-3">
				<ItemCard item={exchange.originalItem} label={labels.original} type="original" />
			</div>
			
			<div className="flex items-center justify-center">
				<div className="size-8 rounded-full bg-primary flex items-center justify-center">
					<ArrowLeftRight className="size-4 text-primary-foreground" />
				</div>
			</div>

			<div className="flex gap-3">
				<ItemCard item={exchange.newItem} label={labels.exchange} type="new" />
			</div>

			<Separator />

			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">{labels.difference}</span>
				<PriceDifference difference={exchange.priceDifference} isUpgrade={exchange.isUpgrade} />
			</div>
		</CardContent>
		{exchange.status === 'pending' && (
			<CardFooter className="gap-3 border-t border-border/50">
				<Button variant="outline" className="flex-1 gap-1.5">
					<X className="size-4" />
					{labels.reject}
				</Button>
				<Button className="flex-1 gap-1.5">
					<Check className="size-4" />
					{labels.approve}
				</Button>
			</CardFooter>
		)}
	</Card>
);

export default function Main() {
	const labels = {
		original: 'Original Item',
		exchange: 'Exchange For',
		difference: 'Price Difference',
		approve: 'Approve',
		reject: 'Reject',
	};

	const exchange = {
		id: 'EXC-2024-001',
		orderId: 'ORD-7891',
		originalItem: { name: 'Smart Watch', variant: '41mm / Aluminum / Black', price: '$399.00' },
		newItem: { name: 'Smart Watch Ultra', variant: '45mm / Titanium / Silver', price: '$799.00' },
		priceDifference: '$400.00',
		isUpgrade: true,
		status: 'pending' as const,
		requestDate: 'Jan 28, 2026',
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<ExchangeCard exchange={exchange} labels={labels} />
			</div>
		</section>
	);
}
