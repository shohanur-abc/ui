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
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const CompactItem = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-3">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">
				{item.variant} × {item.qty}
			</p>
		</div>
		<span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
	</div>
);

const InfoRow = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="flex size-8 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
	</div>
);

const VerificationDot = ({ verified }: { verified: boolean }) => (
	<div
		className={`flex size-5 items-center justify-center rounded-full ${
			verified ? 'bg-green-500' : 'bg-muted'
		}`}
	>
		{verified && <Check className="size-3 text-white" />}
	</div>
);

const SummaryRow = ({
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
	<div className={`flex justify-between ${bold ? 'font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Leather Wallet',
			variant: 'Black / Bifold',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Card Holder',
			variant: 'Brown / Slim',
			price: 34.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-lg px-4 py-12 @sm:px-6">
				<div className="mb-6 text-center">
					<Badge className="mb-3 gap-1.5">
						<Sparkles className="size-3" />
						Review
					</Badge>
					<h1 className="text-xl font-bold">Confirm Order</h1>
				</div>

				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">Order</CardTitle>
							<Badge variant="secondary">2 items</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							{items.map((item) => (
								<CompactItem key={item.id} item={item} />
							))}
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-3">
							<InfoRow icon={MapPin} label="Ship to" value="Mike T., NYC" />
							<InfoRow icon={Truck} label="Delivery" value="Dec 22-23" />
							<InfoRow
								icon={CreditCard}
								label="Payment"
								value="Visa •••• 5555"
							/>
							<InfoRow icon={Package} label="Status" value="Ready" />
						</div>

						<Separator />

						<div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
							<div className="flex items-center gap-2">
								<span className="text-sm">All verified</span>
							</div>
							<div className="flex gap-1">
								{[1, 2, 3, 4].map((i) => (
									<VerificationDot key={i} verified />
								))}
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<SummaryRow label="Subtotal" value="$114.98" />
							<SummaryRow label="Shipping" value="$7.99" />
							<SummaryRow label="Tax" value="$9.77" />
							<SummaryRow label="Discount" value="-$11.50" green />
							<Separator className="my-2" />
							<SummaryRow label="Total" value="$121.24" bold />
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button className="w-full gap-2">
							<Lock className="size-4" />
							Pay $121.24
							<ArrowRight className="size-4" />
						</Button>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Secure</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
