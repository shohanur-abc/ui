import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Lock, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CartItemPreviewProps = {
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

const SoftGradientBg = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 via-gray-500/10 to-slate-500/20" />
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-3xl border border-white/20 bg-white/15 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
		{children}
	</div>
);

const CartPreview = ({ items }: { items: CartItemPreviewProps[] }) => (
	<div className="mb-4 flex justify-center -space-x-3">
		{items.map((item, i) => (
			<Avatar key={i} className="size-14 border-2 border-white/30 shadow-lg">
				<AvatarImage src={item.image} alt={item.name} className="object-cover" />
				<AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
			</Avatar>
		))}
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur">
		<p className="text-xs text-muted-foreground">{label}</p>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

const TrustBadges = ({ badges }: { badges: TrustBadgeProps[] }) => (
	<div className="mt-4 flex justify-center gap-4">
		{badges.map(({ icon: Icon, text }, i) => (
			<span key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
				<Icon className="size-3 text-green-400" />
				{text}
			</span>
		))}
	</div>
);

export default function Main() {
	const cartItems: CartItemPreviewProps[] = [
		{ image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100', name: 'Watch' },
		{ image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100', name: 'Smart' },
		{ image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100', name: 'Bag' },
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal (3 items)', value: '$679.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$54.32' },
	];

	const trustBadges: TrustBadgeProps[] = [
		{ icon: ShieldCheck, text: 'Verified' },
		{ icon: Lock, text: 'Secure' },
	];

	return (
		<section className="@container relative">
			<SoftGradientBg />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<CartPreview items={cartItems} />
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$733.32" />
					<Button
						className="mt-4 w-full bg-white/20 backdrop-blur hover:bg-white/30"
						size="lg"
						asChild
					>
						<Link href="/checkout">Complete Purchase</Link>
					</Button>
					<TrustBadges badges={trustBadges} />
				</GlassCard>
			</div>
		</section>
	);
}
