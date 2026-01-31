import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Bell,
	Clock,
	Heart,
	Package,
	ShoppingCart,
	Star,
	Truck,
	AlertTriangle,
} from 'lucide-react';
import Image from 'next/image';

interface BackorderProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	estimatedDate: string;
	waitlistPosition: number;
	totalWaitlist: number;
	restockProgress: number;
	notifyOption: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 flex items-center justify-center bg-black/20">
			<Badge className="gap-1 bg-amber-500">
				<Clock className="size-3" />
				Coming Soon
			</Badge>
		</div>
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 bg-white/80 text-foreground hover:bg-white"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const ProductRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({reviews})</span>
	</div>
);

const EstimatedArrival = ({ date }: { date: string }) => (
	<div className="rounded-lg bg-muted/50 p-3">
		<div className="flex items-center gap-2 text-sm">
			<Truck className="size-4 text-muted-foreground" />
			<span className="text-muted-foreground">Estimated arrival:</span>
			<span className="font-medium text-foreground">{date}</span>
		</div>
	</div>
);

const WaitlistPosition = ({
	position,
	total,
}: {
	position: number;
	total: number;
}) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">Your position</span>
			<span className="font-medium text-foreground">
				#{position} of {total.toLocaleString()}
			</span>
		</div>
		<Progress value={(1 - position / total) * 100} className="h-2" />
	</div>
);

const RestockProgress = ({ percent }: { percent: number }) => (
	<div className="flex items-start gap-2 rounded-lg bg-blue-100 p-2 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-400">
		<Package className="mt-0.5 size-4 shrink-0" />
		<span>Restock in progress: {percent}% of units ready for shipment</span>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const JoinWaitlistButton = ({ label }: { label: string }) => (
	<Button variant="outline" className="gap-2">
		<Bell className="size-4" />
		{label}
	</Button>
);

const NotifyButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Bell className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const backorder: BackorderProps = {
		image:
			'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
		name: 'Limited Edition Headphones',
		brand: 'AudioPro',
		price: 349.99,
		rating: 4.9,
		reviews: 2341,
		estimatedDate: 'Mar 15-22, 2025',
		waitlistPosition: 847,
		totalWaitlist: 5000,
		restockProgress: 65,
		notifyOption: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<ProductImage src={backorder.image} alt={backorder.name} />
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<BrandLabel text={backorder.brand} />
							<ProductRating
								rating={backorder.rating}
								reviews={backorder.reviews}
							/>
						</div>
						<ProductName text={backorder.name} />
						<EstimatedArrival date={backorder.estimatedDate} />
						<WaitlistPosition
							position={backorder.waitlistPosition}
							total={backorder.totalWaitlist}
						/>
						<RestockProgress percent={backorder.restockProgress} />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<PriceTag amount={backorder.price} />
						<NotifyButton label="Notify Me" />
					</div>
				</Card>
			</div>
		</section>
	);
}
