import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, ShieldCheck, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type PaymentIconProps = {
	name: string;
};

const PaymentIcons = ({ methods }: { methods: PaymentIconProps[] }) => (
	<div className="flex items-center gap-1">
		{methods.map((method, i) => (
			<div
				key={i}
				className="flex size-6 items-center justify-center rounded bg-muted text-xs font-medium"
			>
				{method.name.slice(0, 2)}
			</div>
		))}
	</div>
);

const SecureBadge = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
	<span className="flex items-center gap-1 text-xs text-muted-foreground">
		<Icon className="size-3 text-green-500" />
		{text}
	</span>
);

const TotalPrice = ({ value }: { value: string }) => (
	<span className="text-lg font-bold">{value}</span>
);

export default function Main() {
	const paymentMethods: PaymentIconProps[] = [
		{ name: 'Visa' },
		{ name: 'MC' },
		{ name: 'Amex' },
		{ name: 'PayP' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center gap-4 rounded-lg bg-muted/50 px-4 py-3">
					<TotalPrice value="$329.99" />
					<Separator orientation="vertical" className="h-6" />
					<PaymentIcons methods={paymentMethods} />
					<SecureBadge icon={ShieldCheck} text="Secure checkout" />
					<div className="ml-auto">
						<Button className="gap-2" asChild>
							<Link href="/checkout">
								<CreditCard className="size-4" />
								Pay Now
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
