import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Clock,
	Crown,
	Heart,
	Lock,
	ShoppingCart,
	Star,
	Sparkles,
	Users,
} from 'lucide-react';
import Image from 'next/image';

interface LimitedProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	edition: string;
	totalUnits: number;
	remainingUnits: number;
	releaseNumber: number;
	certificate: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const LimitedBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-black">
		<Crown className="size-3" />
		Limited Edition
	</Badge>
);

const EditionNumber = ({ number }: { number: number }) => (
	<Badge
		variant="outline"
		className="absolute bottom-3 left-3 gap-1 border-white/30 bg-black/50 text-white backdrop-blur-sm"
	>
		<Sparkles className="size-3" />#{number.toString().padStart(4, '0')}
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-bold uppercase tracking-widest text-primary">
		{text}
	</span>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="text-lg font-semibold text-foreground">{text}</h3>
);

const EditionInfo = ({ edition }: { edition: string }) => (
	<p className="text-sm text-muted-foreground">{edition}</p>
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

const AvailabilityProgress = ({
	remaining,
	total,
}: {
	remaining: number;
	total: number;
}) => {
	const percent = (remaining / total) * 100;
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="flex items-center gap-1.5 text-muted-foreground">
					<Users className="size-4" />
					Availability
				</span>
				<span
					className={`font-medium ${percent < 20 ? 'text-destructive' : 'text-foreground'}`}
				>
					{remaining} of {total} left
				</span>
			</div>
			<Progress value={percent} className="h-2" />
		</div>
	);
};

const CertificateIncluded = () => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Lock className="size-4 text-green-500" />
		Certificate of authenticity included
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toLocaleString()}
	</span>
);

const ReserveButton = ({ label }: { label: string }) => (
	<Button className="gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-600 hover:to-yellow-500">
		<Crown className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const limited: LimitedProps = {
		image:
			'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop',
		name: "Collector's Watch",
		brand: 'Prestige',
		price: 4999,
		rating: 5.0,
		reviews: 47,
		edition: 'Anniversary Edition 2025',
		totalUnits: 500,
		remainingUnits: 73,
		releaseNumber: 428,
		certificate: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden border-amber-500/30 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
					<div className="relative">
						<ProductImage src={limited.image} alt={limited.name} />
						<LimitedBadge />
						<EditionNumber number={limited.releaseNumber} />
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<BrandLabel text={limited.brand} />
							<ProductRating
								rating={limited.rating}
								reviews={limited.reviews}
							/>
						</div>
						<div className="space-y-0.5">
							<ProductName text={limited.name} />
							<EditionInfo edition={limited.edition} />
						</div>
						<AvailabilityProgress
							remaining={limited.remainingUnits}
							total={limited.totalUnits}
						/>
						{limited.certificate && <CertificateIncluded />}
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={limited.price} />
							<ReserveButton label="Reserve" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
