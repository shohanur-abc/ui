import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const CompactItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-2 py-2">
		<div className="relative size-10 shrink-0 overflow-hidden rounded-md">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{item.name}</p>
			<span className="text-xs text-muted-foreground">{item.variant}</span>
		</div>
		<Badge variant="secondary" className="text-xs">
			×{item.qty}
		</Badge>
		<span className="text-sm font-bold">${item.price.toFixed(2)}</span>
	</div>
);

const InfoChip = ({
	icon: Icon,
	text,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
	verified?: boolean;
}) => (
	<div className="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm">
		<Icon className="size-3.5 text-primary" />
		<span>{text}</span>
		{verified && <Check className="size-3.5 text-green-500" />}
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
	green,
}: {
	label: string;
	value: string;
	bold?: boolean;
	green?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Yoga Mat',
			variant: 'Premium / Purple',
			price: 49.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Resistance Bands',
			variant: 'Set of 5',
			price: 24.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Foam Roller',
			variant: 'High Density',
			price: 29.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-xl px-4 py-10 @sm:px-6 @md:py-14">
				<div className="mb-6 text-center">
					<h1 className="text-xl font-bold tracking-tight @md:text-2xl">
						Quick Review
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Fitness essentials checkout
					</p>
				</div>

				<div className="rounded-xl border bg-card">
					<div className="divide-y px-4">
						{items.map((item) => (
							<CompactItem key={item.id} item={item} />
						))}
					</div>

					<Separator />

					<div className="flex flex-wrap gap-2 p-4">
						<InfoChip icon={MapPin} text="Chicago, IL" verified />
						<InfoChip icon={Truck} text="Standard" verified />
						<InfoChip icon={CreditCard} text="•••• 1234" verified />
					</div>

					<Separator />

					<div className="space-y-2 p-4">
						<SummaryLine label="Subtotal" value="$104.97" />
						<SummaryLine label="Shipping" value="$5.99" />
						<SummaryLine label="Tax" value="$8.92" />
						<SummaryLine label="Fitness20" value="-$21.00" green />
						<Separator className="my-3" />
						<SummaryLine label="Total" value="$98.88" bold />
					</div>

					<div className="p-4 pt-0">
						<Button size="lg" className="w-full gap-2">
							<Lock className="size-4" />
							Complete
							<ArrowRight className="size-4" />
						</Button>
						<div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Secure checkout</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
