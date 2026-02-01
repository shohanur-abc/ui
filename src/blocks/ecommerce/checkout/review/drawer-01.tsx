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
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const DrawerItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary">×{item.qty}</Badge>
		</div>
	</div>
);

const DrawerSection = ({
	title,
	icon: Icon,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Icon className="size-4 text-primary" />
			<h3 className="font-semibold">{title}</h3>
			<Check className="ml-auto size-4 text-green-500" />
		</div>
		{children}
	</div>
);

const AddressBlock = ({ name, lines }: { name: string; lines: string[] }) => (
	<div className="rounded-lg bg-muted/50 p-3">
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
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
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}
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
			name: 'Electric Kettle',
			variant: 'Gooseneck / 1L',
			price: 89.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1594213114663-d94db9b66f3e?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Tea Set',
			variant: 'Ceramic / 6 Cups',
			price: 69.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Tea Collection',
			variant: 'Premium / 12 Varieties',
			price: 49.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Tea Lover's Kit
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">
						Complete your tea collection order
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_1fr_360px]">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Package className="size-5" />
								Items
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="divide-y">
								{items.map((item) => (
									<DrawerItem key={item.id} item={item} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<DrawerSection title="Shipping" icon={MapPin}>
								<AddressBlock
									name="Nina C."
									lines={['789 Tea Street', 'Portland, OR 97205']}
								/>
							</DrawerSection>

							<DrawerSection title="Billing" icon={MapPin}>
								<AddressBlock
									name="Nina C."
									lines={['789 Tea Street', 'Portland, OR 97205']}
								/>
							</DrawerSection>

							<DrawerSection title="Delivery" icon={Truck}>
								<div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
									<div>
										<p className="font-medium">Standard</p>
										<p className="text-sm text-muted-foreground">
											Dec 22-24, 2025
										</p>
									</div>
									<span className="font-semibold">$6.99</span>
								</div>
							</DrawerSection>

							<DrawerSection title="Payment" icon={CreditCard}>
								<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
									<CreditCard className="size-5 text-muted-foreground" />
									<span className="font-medium">Mastercard •••• 7890</span>
								</div>
							</DrawerSection>
						</CardContent>
					</Card>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$209.97" />
							<SummaryLine label="Shipping" value="$6.99" />
							<SummaryLine label="Tax" value="$17.85" />
							<SummaryLine label="Tea Bundle" value="-$21.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$213.81" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Place Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
