import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Check, X } from 'lucide-react';
import Image from 'next/image';

interface CompareProductProps {
	image: string;
	name: string;
	price: number;
	features: { label: string; available: boolean }[];
	highlighted?: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative mx-auto size-32 @sm:size-40">
		<Image src={src} alt={alt} fill className="object-contain drop-shadow-lg" />
	</div>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="text-center font-semibold text-foreground">{text}</h3>
);

const ProductPrice = ({ amount }: { amount: number }) => (
	<p className="text-center text-2xl font-bold text-primary">
		${amount.toFixed(0)}
	</p>
);

const FeatureList = ({
	items,
}: {
	items: { label: string; available: boolean }[];
}) => (
	<ul className="space-y-2">
		{items.map((feature, i) => (
			<li key={i} className="flex items-center gap-2 text-sm">
				{feature.available ? (
					<Check className="size-4 text-green-500" />
				) : (
					<X className="size-4 text-muted-foreground/50" />
				)}
				<span
					className={
						feature.available ? 'text-foreground' : 'text-muted-foreground/50'
					}
				>
					{feature.label}
				</span>
			</li>
		))}
	</ul>
);

const SelectButton = ({
	label,
	highlighted,
}: {
	label: string;
	highlighted?: boolean;
}) => (
	<Button
		variant={highlighted ? 'default' : 'outline'}
		className="w-full gap-2"
	>
		{label}
		<ArrowRight className="size-4" />
	</Button>
);

const HighlightBadge = ({ text }: { text: string }) => (
	<Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
		{text}
	</Badge>
);

export default function Main() {
	const product: CompareProductProps = {
		image:
			'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
		name: 'Smart Watch Ultra',
		price: 499,
		features: [
			{ label: 'Always-on display', available: true },
			{ label: 'Heart rate monitor', available: true },
			{ label: 'GPS tracking', available: true },
			{ label: 'Water resistant', available: true },
			{ label: 'Cellular connectivity', available: false },
		],
		highlighted: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card
					className={`relative space-y-5 p-5 ${
						product.highlighted ? 'border-primary ring-2 ring-primary/20' : ''
					}`}
				>
					{product.highlighted && <HighlightBadge text="Best Value" />}
					<ProductImage src={product.image} alt={product.name} />
					<ProductName text={product.name} />
					<ProductPrice amount={product.price} />
					<FeatureList items={product.features} />
					<SelectButton label="Select" highlighted={product.highlighted} />
				</Card>
			</div>
		</section>
	);
}
