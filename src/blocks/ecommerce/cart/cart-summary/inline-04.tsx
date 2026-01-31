import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CouponInputProps = {
	icon: LucideIcon;
	placeholder: string;
	buttonLabel: string;
};

const CouponInput = ({ icon: Icon, placeholder, buttonLabel }: CouponInputProps) => (
	<div className="flex items-center gap-2">
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={placeholder} className="w-40 pl-9" />
		</div>
		<Button variant="outline" size="sm">
			{buttonLabel}
		</Button>
	</div>
);

const TotalDisplay = ({
	label,
	value,
}: { label: string; value: string }) => (
	<div className="flex items-center gap-2">
		<span className="text-sm text-muted-foreground">{label}</span>
		<span className="text-lg font-bold">{value}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
					<CouponInput
						icon={Tag}
						placeholder="Promo code"
						buttonLabel="Apply"
					/>
					<div className="flex items-center gap-4">
						<TotalDisplay label="Total:" value="$199.00" />
						<Button asChild>
							<Link href="/checkout">Checkout</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
