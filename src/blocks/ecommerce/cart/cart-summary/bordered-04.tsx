import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Lock, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type TrustBadgeProps = {
	icon: LucideIcon;
	text: string;
};

const GradientBorderBox = ({ children }: { children: React.ReactNode }) => (
	<div className="relative rounded-xl bg-gradient-to-br from-primary via-primary/50 to-primary p-[2px]">
		<div className="rounded-[10px] bg-background p-6">{children}</div>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

const TrustBadges = ({ badges }: { badges: TrustBadgeProps[] }) => (
	<div className="mt-4 flex justify-center gap-4 border-t pt-4">
		{badges.map(({ icon: Icon, text }, i) => (
			<span key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
				<Icon className="size-3 text-green-500" />
				{text}
			</span>
		))}
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$349.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$27.92' },
	];

	const trustBadges: TrustBadgeProps[] = [
		{ icon: ShieldCheck, text: 'Secure' },
		{ icon: Lock, text: 'Encrypted' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GradientBorderBox>
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4" />
					<TotalRow label="Total" value="$376.92" />
					<Button className="mt-6 w-full" size="lg" asChild>
						<Link href="/checkout">Secure Checkout</Link>
					</Button>
					<TrustBadges badges={trustBadges} />
				</GradientBorderBox>
			</div>
		</section>
	);
}
