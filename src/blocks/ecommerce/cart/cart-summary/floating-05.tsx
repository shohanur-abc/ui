import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Shield, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CartPreviewItemProps = {
	image: string;
	name: string;
};

type SummaryRowProps = {
	label: string;
	value: string;
};

type TrustBadgeProps = {
	icon: LucideIcon;
	text: string;
};

const CartPreview = ({ items }: { items: CartPreviewItemProps[] }) => (
	<div className="flex -space-x-3">
		{items.map((item, i) => (
			<Avatar key={i} className="size-12 border-2 border-background">
				<AvatarImage
					src={item.image}
					alt={item.name}
					className="object-cover"
				/>
				<AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>
		))}
		{items.length > 3 && (
			<div className="flex size-12 items-center justify-center rounded-full border-2 border-background bg-muted text-sm font-medium">
				+{items.length - 3}
			</div>
		)}
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="rounded-lg bg-primary/5 p-3">
		<div className="flex items-center justify-between">
			<span className="font-medium">{label}</span>
			<span className="text-xl font-bold">{value}</span>
		</div>
	</div>
);

const TrustBadges = ({ badges }: { badges: TrustBadgeProps[] }) => (
	<div className="flex justify-center gap-4">
		{badges.map(({ icon: Icon, text }, i) => (
			<span
				key={i}
				className="flex items-center gap-1 text-xs text-muted-foreground"
			>
				<Icon className="size-3 text-green-500" />
				{text}
			</span>
		))}
	</div>
);

export default function Main() {
	const cartItems: CartPreviewItemProps[] = [
		{
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
			name: 'Watch',
		},
		{
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
			name: 'Smart',
		},
		{
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200',
			name: 'Bag',
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal (3 items)', value: '$679.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$54.32' },
	];

	const trustBadges: TrustBadgeProps[] = [
		{ icon: CheckCircle2, text: 'Verified' },
		{ icon: Shield, text: 'Secure' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="shadow-xl">
					<CardHeader className="items-center text-center">
						<CartPreview items={cartItems} />
						<CardTitle className="mt-3 text-lg">Your Cart</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<TotalRow label="Total" value="$733.32" />
					</CardContent>
					<CardFooter className="flex-col gap-3">
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Complete Purchase</Link>
						</Button>
						<TrustBadges badges={trustBadges} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
