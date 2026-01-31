import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Battery,
	Cpu,
	HardDrive,
	Heart,
	Monitor,
	ShoppingCart,
	Zap,
} from 'lucide-react';
import Image from 'next/image';

interface TechProductProps {
	image: string;
	name: string;
	category: string;
	price: number;
	specs: { icon: string; label: string; value: string }[];
	performance: number;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-contain p-6 drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
		/>
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const CategoryBadge = ({ text }: { text: string }) => (
	<Badge variant="outline" className="text-xs">
		{text}
	</Badge>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-bold text-foreground">{text}</h3>
);

const SpecsList = ({
	specs,
}: {
	specs: { icon: string; label: string; value: string }[];
}) => {
	const iconMap: Record<string, React.ReactNode> = {
		cpu: <Cpu className="size-4" />,
		monitor: <Monitor className="size-4" />,
		harddrive: <HardDrive className="size-4" />,
		battery: <Battery className="size-4" />,
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			{specs.map((spec, i) => (
				<div
					key={i}
					className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-1.5 text-xs"
				>
					<span className="text-primary">{iconMap[spec.icon]}</span>
					<span className="text-muted-foreground">{spec.value}</span>
				</div>
			))}
		</div>
	);
};

const PerformanceScore = ({ score }: { score: number }) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between text-xs">
			<span className="flex items-center gap-1 text-muted-foreground">
				<Zap className="size-3 text-primary" />
				Performance Score
			</span>
			<span className="font-medium text-foreground">{score}/100</span>
		</div>
		<Progress value={score} className="h-1.5" />
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toLocaleString()}
	</span>
);

const BuyButton = ({ label }: { label: string }) => (
	<Button size="sm" className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: TechProductProps = {
		image:
			'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
		name: 'MacBook Pro 16"',
		category: 'Laptops',
		price: 2499,
		specs: [
			{ icon: 'cpu', label: 'Processor', value: 'M3 Max' },
			{ icon: 'monitor', label: 'Display', value: '16" Retina' },
			{ icon: 'harddrive', label: 'Storage', value: '1TB SSD' },
			{ icon: 'battery', label: 'Battery', value: '22hr' },
		],
		performance: 95,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group space-y-4 p-4">
					<ProductImage src={product.image} alt={product.name} />
					<div className="space-y-3">
						<CategoryBadge text={product.category} />
						<ProductName text={product.name} />
						<SpecsList specs={product.specs} />
						<PerformanceScore score={product.performance} />
					</div>
					<div className="flex items-center justify-between pt-2">
						<PriceTag amount={product.price} />
						<BuyButton label="Buy" />
					</div>
				</Card>
			</div>
		</section>
	);
}
