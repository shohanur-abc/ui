import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Flame, Users } from 'lucide-react';
import Image from 'next/image';

interface FlashDealProps {
	image: string;
	name: string;
	originalPrice: number;
	salePrice: number;
	soldCount: number;
	totalStock: number;
	endsIn: { hours: number; minutes: number; seconds: number };
}

const BorderGlow = () => (
	<div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur-sm" />
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const FlashBadge = ({ text }: { text: string }) => (
	<Badge className="gap-1.5 bg-destructive text-destructive-foreground">
		<Flame className="size-3" />
		{text}
	</Badge>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const PriceComparison = ({
	original,
	sale,
}: {
	original: number;
	sale: number;
}) => {
	const discount = Math.round((1 - sale / original) * 100);
	return (
		<div className="flex items-center gap-2">
			<span className="text-2xl font-bold text-primary">
				${sale.toFixed(0)}
			</span>
			<span className="text-sm text-muted-foreground line-through">
				${original.toFixed(0)}
			</span>
			<Badge variant="secondary">{discount}% OFF</Badge>
		</div>
	);
};

const StockProgress = ({ sold, total }: { sold: number; total: number }) => {
	const percent = (sold / total) * 100;
	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between text-xs">
				<span className="flex items-center gap-1 text-muted-foreground">
					<Users className="size-3" />
					{sold} sold
				</span>
				<span className="text-muted-foreground">{total - sold} left</span>
			</div>
			<Progress value={percent} className="h-2" />
		</div>
	);
};

const CountdownTimer = ({
	hours,
	minutes,
	seconds,
}: {
	hours: number;
	minutes: number;
	seconds: number;
}) => (
	<div className="flex items-center justify-center gap-3">
		<Clock className="size-4 text-primary" />
		<div className="flex gap-1">
			{[hours, minutes, seconds].map((val, i) => (
				<div key={i} className="flex items-center gap-1">
					<span className="rounded bg-primary/10 px-2 py-1 text-sm font-mono font-bold text-primary">
						{val.toString().padStart(2, '0')}
					</span>
					{i < 2 && <span className="text-muted-foreground">:</span>}
				</div>
			))}
		</div>
	</div>
);

const GrabButton = ({ label }: { label: string }) => (
	<Button className="w-full" size="lg">
		{label}
	</Button>
);

export default function Main() {
	const deal: FlashDealProps = {
		image:
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
		name: 'Wireless Noise-Canceling Headphones',
		originalPrice: 349,
		salePrice: 199,
		soldCount: 847,
		totalStock: 1000,
		endsIn: { hours: 2, minutes: 45, seconds: 30 },
	};

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-sm px-4 py-8">
				<div className="group relative">
					<BorderGlow />
					<div className="relative space-y-4 rounded-2xl border border-border bg-card p-5">
						<div className="flex items-center justify-between">
							<FlashBadge text="Flash Sale" />
							<CountdownTimer {...deal.endsIn} />
						</div>
						<ProductImage src={deal.image} alt={deal.name} />
						<div className="space-y-3">
							<ProductName text={deal.name} />
							<PriceComparison
								original={deal.originalPrice}
								sale={deal.salePrice}
							/>
							<StockProgress sold={deal.soldCount} total={deal.totalStock} />
						</div>
						<GrabButton label="Grab This Deal" />
					</div>
				</div>
			</div>
		</section>
	);
}
