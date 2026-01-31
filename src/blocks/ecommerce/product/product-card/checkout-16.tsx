import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Box, MapPin, RefreshCcw, Shield, Truck } from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
	image: string;
	name: string;
	sku: string;
	price: number;
	shipping: {
		free: boolean;
		days: string;
		location: string;
	};
	warranty: string;
	returns: string;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted @sm:size-28">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductHeader = ({ name, sku }: { name: string; sku: string }) => (
	<div className="space-y-1">
		<h3 className="font-semibold text-foreground">{name}</h3>
		<p className="text-xs text-muted-foreground">SKU: {sku}</p>
	</div>
);

const ProductPrice = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-primary">${amount.toFixed(2)}</span>
);

const ShippingInfo = ({
	free,
	days,
	location,
}: {
	free: boolean;
	days: string;
	location: string;
}) => (
	<div className="space-y-2">
		<div className="flex items-center gap-2">
			<Truck className="size-4 text-primary" />
			<span className="text-sm">
				{free ? (
					<Badge variant="secondary" className="mr-2">
						Free Shipping
					</Badge>
				) : null}
				{days}
			</span>
		</div>
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<MapPin className="size-4" />
			<span>Ships to {location}</span>
		</div>
	</div>
);

const PolicyItem = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const CheckoutButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2">
		<Box className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const product: ProductProps = {
		image:
			'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
		name: 'Ergonomic Office Chair Pro',
		sku: 'CHAIR-ERG-001',
		price: 599.99,
		shipping: {
			free: true,
			days: 'Arrives in 3-5 business days',
			location: 'Worldwide',
		},
		warranty: '5-year manufacturer warranty',
		returns: '30-day hassle-free returns',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-8">
				<Card className="space-y-4 p-5">
					<div className="flex gap-4">
						<ProductImage src={product.image} alt={product.name} />
						<div className="flex flex-1 flex-col justify-between">
							<ProductHeader name={product.name} sku={product.sku} />
							<ProductPrice amount={product.price} />
						</div>
					</div>
					<Separator />
					<ShippingInfo {...product.shipping} />
					<Separator />
					<div className="space-y-2">
						<PolicyItem icon={Shield} text={product.warranty} />
						<PolicyItem icon={RefreshCcw} text={product.returns} />
					</div>
					<CheckoutButton label="Proceed to Checkout" />
				</Card>
			</div>
		</section>
	);
}
