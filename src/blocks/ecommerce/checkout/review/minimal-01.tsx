import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	name: string;
	price: number;
	qty: number;
	image: string;
}

const MiniItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-2">
		<div className="relative size-10 shrink-0 overflow-hidden rounded">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<span className="flex-1 truncate text-sm">{item.name}</span>
		<span className="text-sm font-medium">${item.price.toFixed(2)}</span>
	</div>
);

const QuickInfo = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const TotalLine = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'font-semibold' : 'text-sm text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Minimalist Watch',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Watch Band',
			price: 29.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-md px-4 py-10">
				<h1 className="mb-4 text-center text-lg font-bold">Confirm Order</h1>

				<Card className="overflow-hidden">
					<CardHeader className="bg-muted/30 pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm">Items</CardTitle>
							<Badge variant="outline" className="text-xs">
								{items.length}
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-2 pt-4">
						{items.map((item) => (
							<MiniItem key={item.id} item={item} />
						))}
					</CardContent>
					<Separator />
					<CardContent className="space-y-2 pt-4">
						<QuickInfo icon={MapPin} text="John D., Los Angeles, CA" />
						<QuickInfo icon={Truck} text="Standard · Dec 24-26" />
						<QuickInfo icon={CreditCard} text="Visa •••• 4242" />
					</CardContent>
					<Separator />
					<CardContent className="space-y-1.5 pt-4">
						<TotalLine label="Subtotal" value="$179.98" />
						<TotalLine label="Shipping" value="$4.99" />
						<TotalLine label="Tax" value="$15.30" />
						<div className="pt-2">
							<TotalLine label="Total" value="$200.27" bold />
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2 bg-muted/30 pt-4">
						<Button className="w-full gap-1">
							<Lock className="size-3.5" />
							Pay $200.27
							<ArrowRight className="size-3.5" />
						</Button>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Secure checkout</span>
						</div>
					</CardFooter>
				</Card>

				<div className="mt-4 flex justify-center gap-1">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="flex size-4 items-center justify-center rounded-full bg-green-500"
						>
							<Check className="size-2.5 text-white" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
