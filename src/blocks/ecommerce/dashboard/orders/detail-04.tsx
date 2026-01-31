import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package, Star, Image, CheckCircle, XCircle, Clock, Camera, ArrowRight, RotateCcw } from 'lucide-react';

interface ProductOrderDetailProps {
	product: {
		id: string;
		name: string;
		sku: string;
		variant: string;
		image?: string;
		price: string;
		quantity: number;
		status: 'pending' | 'fulfilled' | 'returned' | 'cancelled';
		rating?: number;
		qualityCheck?: { passed: boolean; notes: string };
		returnEligible: boolean;
		returnDeadline?: string;
		warranty: { status: 'active' | 'expired'; expires: string };
	};
	labels: {
		variant: string;
		quantity: string;
		price: string;
		qualityCheck: string;
		warranty: string;
		return: string;
		review: string;
		viewPhotos: string;
	};
}

const StatusBadge = ({ status }: { status: ProductOrderDetailProps['product']['status'] }) => {
	const config = {
		pending: { icon: Clock, className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', label: 'Pending' },
		fulfilled: { icon: CheckCircle, className: 'bg-accent/10 text-accent border-accent/30', label: 'Fulfilled' },
		returned: { icon: RotateCcw, className: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'Returned' },
		cancelled: { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/30', label: 'Cancelled' },
	};
	const { icon: Icon, className, label } = config[status];
	return (
		<Badge variant="outline" className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-1">
		{[...Array(5)].map((_, i) => (
			<Star key={i} className={`size-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
		))}
	</div>
);

const ProductOrderDetail = ({ product, labels }: ProductOrderDetailProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-start gap-4">
				<div className="size-24 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center overflow-hidden">
					{product.image ? (
						<img src={product.image} alt={product.name} className="size-full object-cover" />
					) : (
						<Package className="size-10 text-muted-foreground" />
					)}
				</div>
				<div className="flex-1">
					<div className="flex items-start justify-between mb-2">
						<div>
							<CardTitle className="text-lg">{product.name}</CardTitle>
							<p className="text-sm text-muted-foreground font-mono">{product.sku}</p>
						</div>
						<StatusBadge status={product.status} />
					</div>
					{product.rating && (
						<div className="flex items-center gap-2">
							<StarRating rating={product.rating} />
							<span className="text-sm text-muted-foreground">Customer rating</span>
						</div>
					)}
				</div>
			</div>
		</CardHeader>

		<CardContent className="space-y-4">
			<div className="grid grid-cols-3 gap-4">
				<div className="p-3 rounded-lg bg-muted/30">
					<p className="text-xs text-muted-foreground mb-1">{labels.variant}</p>
					<p className="font-medium">{product.variant}</p>
				</div>
				<div className="p-3 rounded-lg bg-muted/30">
					<p className="text-xs text-muted-foreground mb-1">{labels.quantity}</p>
					<p className="font-medium">{product.quantity}</p>
				</div>
				<div className="p-3 rounded-lg bg-muted/30">
					<p className="text-xs text-muted-foreground mb-1">{labels.price}</p>
					<p className="font-bold text-lg">{product.price}</p>
				</div>
			</div>

			{product.qualityCheck && (
				<div className={`p-4 rounded-xl border ${product.qualityCheck.passed ? 'bg-accent/5 border-accent/20' : 'bg-destructive/5 border-destructive/20'}`}>
					<div className="flex items-center gap-2 mb-2">
						{product.qualityCheck.passed ? (
							<CheckCircle className="size-5 text-accent" />
						) : (
							<XCircle className="size-5 text-destructive" />
						)}
						<span className="font-semibold">{labels.qualityCheck}</span>
						<Badge variant={product.qualityCheck.passed ? 'default' : 'destructive'} className="ml-auto">
							{product.qualityCheck.passed ? 'Passed' : 'Failed'}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">{product.qualityCheck.notes}</p>
				</div>
			)}

			<Separator />

			<div className="grid grid-cols-2 gap-4">
				<div className={`p-4 rounded-xl border ${product.warranty.status === 'active' ? 'bg-accent/5 border-accent/20' : 'bg-muted border-border/50'}`}>
					<p className="text-sm text-muted-foreground mb-1">{labels.warranty}</p>
					<div className="flex items-center gap-2">
						<Badge variant={product.warranty.status === 'active' ? 'default' : 'secondary'} className="capitalize">
							{product.warranty.status}
						</Badge>
						<span className="text-sm">until {product.warranty.expires}</span>
					</div>
				</div>

				<div className={`p-4 rounded-xl border ${product.returnEligible ? 'bg-primary/5 border-primary/20' : 'bg-muted border-border/50'}`}>
					<p className="text-sm text-muted-foreground mb-1">{labels.return}</p>
					{product.returnEligible ? (
						<div className="flex items-center gap-2">
							<Badge variant="outline" className="text-primary border-primary/30">Eligible</Badge>
							<span className="text-sm">until {product.returnDeadline}</span>
						</div>
					) : (
						<Badge variant="secondary">Not Eligible</Badge>
					)}
				</div>
			</div>
		</CardContent>

		<CardFooter className="gap-3 border-t border-border/50">
			<Button variant="outline" className="flex-1 gap-1.5">
				<Camera className="size-4" />
				{labels.viewPhotos}
			</Button>
			{product.returnEligible && (
				<Button variant="outline" className="flex-1 gap-1.5">
					<RotateCcw className="size-4" />
					{labels.return}
				</Button>
			)}
			<Button className="flex-1 gap-1.5">
				<Star className="size-4" />
				{labels.review}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		variant: 'Variant',
		quantity: 'Quantity',
		price: 'Unit Price',
		qualityCheck: 'Quality Check',
		warranty: 'Warranty',
		return: 'Return',
		review: 'Review',
		viewPhotos: 'View Photos',
	};

	const product = {
		id: 'PROD-001',
		name: 'Wireless Bluetooth Headphones Pro',
		sku: 'SKU-WBH-PRO-001',
		variant: 'Midnight Black / Over-ear',
		price: '$199.00',
		quantity: 1,
		status: 'fulfilled' as const,
		rating: 5,
		qualityCheck: { passed: true, notes: 'Item inspected and meets all quality standards. No defects found.' },
		returnEligible: true,
		returnDeadline: 'Feb 25, 2024',
		warranty: { status: 'active' as const, expires: 'Jan 27, 2026' },
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<ProductOrderDetail product={product} labels={labels} />
			</div>
		</section>
	);
}
