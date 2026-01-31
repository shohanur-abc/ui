import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
	ShieldCheck,
	Truck,
	RotateCcw,
	Headphones,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type GuaranteeProps = {
	icon: LucideIcon;
	title: string;
	description: string;
};

type TermsCheckboxProps = {
	id: string;
	label: string;
	required?: boolean;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="rounded-lg bg-muted/50 p-4">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
	</div>
);

const Guarantee = ({ icon: Icon, title, description }: GuaranteeProps) => (
	<div className="flex items-start gap-3">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-sm font-medium">{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const TermsCheckbox = ({ id, label, required }: TermsCheckboxProps) => (
	<label htmlFor={id} className="flex cursor-pointer items-start gap-3">
		<Checkbox id={id} required={required} className="mt-0.5" />
		<span className="text-sm text-muted-foreground">{label}</span>
	</label>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$1,299.00' },
		{ label: 'Premium Shipping', value: '$0.00' },
		{ label: 'Tax', value: '$103.92' },
	];

	const guarantees: GuaranteeProps[] = [
		{
			icon: ShieldCheck,
			title: '2-Year Warranty',
			description: 'Full coverage on all products',
		},
		{
			icon: Truck,
			title: 'Free Premium Shipping',
			description: 'Express delivery within 2 days',
		},
		{
			icon: RotateCcw,
			title: '30-Day Returns',
			description: 'No questions asked return policy',
		},
		{
			icon: Headphones,
			title: '24/7 Support',
			description: 'Always here to help you',
		},
	];

	const termsItems: TermsCheckboxProps[] = [
		{
			id: 'terms',
			label: 'I agree to the Terms of Service and Privacy Policy',
			required: true,
		},
		{
			id: 'newsletter',
			label: 'Subscribe to our newsletter for exclusive offers',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Our Guarantees</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid gap-4 @sm:grid-cols-2">
								{guarantees.map((guarantee, i) => (
									<Guarantee key={i} {...guarantee} />
								))}
							</div>
							<Separator />
							<div className="space-y-3">
								{termsItems.map((item) => (
									<TermsCheckbox key={item.id} {...item} />
								))}
							</div>
						</CardContent>
					</Card>
					<Card className="h-fit">
						<CardHeader className="border-b">
							<CardTitle className="flex items-center justify-between">
								Order Summary
								<Badge>Premium</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow label="Total" value="$1,402.92" />
							<Button className="w-full" size="lg" asChild>
								<Link href="/checkout">Complete Purchase</Link>
							</Button>
							<p className="text-center text-xs text-muted-foreground">
								By completing this purchase, you acknowledge our Terms of
								Service
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
