import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Package,
	RotateCcw,
	Shield,
	Sparkles,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type AddOnProps = {
	id: string;
	icon: LucideIcon;
	title: string;
	description: string;
	price: string;
	enabled?: boolean;
};

type FeatureProps = {
	icon: LucideIcon;
	text: string;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-primary/10 to-transparent p-4">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold text-primary">{value}</span>
	</div>
);

const Header = ({
	title,
	badge,
}: {
	title: string;
	badge?: { label: string; icon: LucideIcon };
}) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center gap-2">
			{title}
			{badge && (
				<Badge variant="secondary" className="gap-1">
					<badge.icon className="size-3" />
					{badge.label}
				</Badge>
			)}
		</CardTitle>
	</CardHeader>
);

const AddOnItem = ({
	id,
	icon: Icon,
	title,
	description,
	price,
	enabled,
}: AddOnProps) => (
	<div className="flex items-center gap-3 rounded-lg border p-3">
		<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<div className="text-sm font-medium">{title}</div>
			<div className="text-xs text-muted-foreground">{description}</div>
		</div>
		<div className="flex items-center gap-2">
			<span className="text-sm font-medium">{price}</span>
			<Switch id={id} defaultChecked={enabled} />
		</div>
	</div>
);

const Feature = ({ icon: Icon, text }: FeatureProps) => (
	<div className="flex items-center gap-2 text-xs text-muted-foreground">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal (2 items)', value: '$789.00' },
		{ label: 'Express Shipping', value: '$19.99' },
		{ label: 'Tax', value: '$64.72' },
	];

	const addOns: AddOnProps[] = [
		{
			id: 'protection',
			icon: Shield,
			title: 'Extended Protection',
			description: '2-year coverage plan',
			price: '+$49',
			enabled: true,
		},
		{
			id: 'returns',
			icon: RotateCcw,
			title: 'Easy Returns',
			description: '90-day return window',
			price: '+$9.99',
		},
	];

	const features: FeatureProps[] = [
		{ icon: Package, text: 'Free gift wrapping' },
		{ icon: Sparkles, text: 'Premium packaging' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header
						title="Order Summary"
						badge={{ label: 'Premium', icon: Sparkles }}
					/>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<div className="space-y-2">
							<p className="text-sm font-medium">Add-ons & Extras</p>
							{addOns.map((addOn) => (
								<AddOnItem key={addOn.id} {...addOn} />
							))}
						</div>
						<Separator />
						<TotalRow label="Total" value="$932.70" />
						<div className="flex justify-between">
							{features.map((feature, i) => (
								<Feature key={i} {...feature} />
							))}
						</div>
					</CardContent>
					<CardFooter className="border-t">
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Place Order</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
