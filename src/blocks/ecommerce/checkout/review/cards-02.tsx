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
	Edit2,
	Gift,
	Heart,
	Lock,
	MapPin,
	Shield,
	Star,
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
	rating: number;
	favorite?: boolean;
}

const ReviewCard = ({
	title,
	onEdit,
	children,
}: {
	title: string;
	onEdit?: () => void;
	children: React.ReactNode;
}) => (
	<Card className="group overflow-hidden">
		<CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
			<CardTitle className="text-base">{title}</CardTitle>
			{onEdit && (
				<Button
					variant="ghost"
					size="sm"
					className="opacity-0 transition-opacity group-hover:opacity-100"
					onClick={onEdit}
				>
					<Edit2 className="size-4" />
				</Button>
			)}
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

const ProductReviewCard = ({ item }: { item: OrderItem }) => (
	<div className="relative rounded-xl border bg-card p-4 transition-shadow hover:shadow-md">
		{item.favorite && (
			<div className="absolute right-3 top-3">
				<Heart className="size-4 fill-rose-500 text-rose-500" />
			</div>
		)}
		<div className="flex gap-4">
			<div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex-1">
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
				<div className="mt-1 flex items-center gap-0.5">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`size-3 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
						/>
					))}
					<span className="ml-1 text-xs text-muted-foreground">
						({item.rating}.0)
					</span>
				</div>
				<div className="mt-2 flex items-center justify-between">
					<Badge variant="secondary">×{item.qty}</Badge>
					<span className="font-bold">${item.price.toFixed(2)}</span>
				</div>
			</div>
		</div>
	</div>
);

const InfoLine = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-4 text-primary" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
	</div>
);

const CheckItem = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2 text-sm">
		<div className="flex size-5 items-center justify-center rounded-full bg-green-500">
			<Check className="size-3 text-white" />
		</div>
		<span>{label}</span>
	</div>
);

const TotalLine = ({
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
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Smartwatch Pro',
			variant: 'Titanium / 45mm',
			price: 399.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop',
			rating: 5,
			favorite: true,
		},
		{
			id: '2',
			name: 'Sport Band',
			variant: 'Black / M/L',
			price: 49.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop',
			rating: 4,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">
						Review your order before completing purchase
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<ReviewCard title="Your Items" onEdit={() => {}}>
							<div className="space-y-4">
								{items.map((item) => (
									<ProductReviewCard key={item.id} item={item} />
								))}
							</div>
						</ReviewCard>

						<div className="grid gap-4 @sm:grid-cols-2">
							<ReviewCard title="Shipping" onEdit={() => {}}>
								<div className="space-y-3">
									<InfoLine
										icon={MapPin}
										label="Address"
										value="Daniel K., San Diego, CA"
									/>
									<InfoLine
										icon={Truck}
										label="Method"
										value="Express · Dec 19-20"
									/>
								</div>
							</ReviewCard>

							<ReviewCard title="Payment" onEdit={() => {}}>
								<div className="space-y-3">
									<InfoLine
										icon={CreditCard}
										label="Card"
										value="Visa •••• 7890"
									/>
									<InfoLine icon={Gift} label="Gift" value="Wrap included" />
								</div>
							</ReviewCard>
						</div>

						<Card className="border-green-500/30 bg-green-500/5">
							<CardContent className="py-4">
								<div className="flex flex-wrap gap-4">
									<CheckItem label="Items verified" />
									<CheckItem label="Address confirmed" />
									<CheckItem label="Payment ready" />
									<CheckItem label="Gift wrap added" />
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card className="bg-gradient-to-br from-card to-muted/30">
							<CardHeader>
								<CardTitle>Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<TotalLine label="Subtotal (3 items)" value="$499.97" />
								<TotalLine label="Shipping" value="$14.99" />
								<TotalLine label="Gift Wrap" value="$5.99" />
								<TotalLine label="Tax" value="$42.50" />
								<TotalLine label="Discount" value="-$50.00" green />
								<Separator className="my-4" />
								<TotalLine label="Total" value="$513.45" bold />
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Pay $513.45
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
			</div>
		</section>
	);
}
