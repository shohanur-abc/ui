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
	CheckCircle,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

const CenteredItem = ({ product }: { product: Product }) => (
	<div className="flex flex-col items-center text-center">
		<div className="relative mb-3 size-20 overflow-hidden rounded-xl">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<p className="font-medium">{product.name}</p>
		<p className="text-sm text-muted-foreground">{product.variant}</p>
		<div className="mt-2 flex items-center gap-2">
			<Badge variant="secondary">×{product.quantity}</Badge>
			<span className="font-bold">${product.price.toFixed(2)}</span>
		</div>
	</div>
);

const DetailBox = ({
	icon: Icon,
	title,
	lines,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	lines: string[];
}) => (
	<div className="rounded-xl border bg-card p-4 text-center">
		<div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<p className="text-sm font-medium">{title}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-xs text-muted-foreground">
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
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Headphones',
			variant: 'Wireless / Black',
			price: 199.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Carrying Case',
			variant: 'Hard Shell',
			price: 39.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-xl px-4 py-12 @sm:px-6 @md:py-16">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Step
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review & Confirm
					</h1>
					<p className="mt-2 text-muted-foreground">You&apos;re almost done!</p>
				</div>

				<div className="flex items-center justify-center gap-2 mb-8">
					{['Cart', 'Shipping', 'Payment', 'Review'].map((step, i) => (
						<div key={step} className="flex items-center">
							<div className="flex items-center gap-1">
								<div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
									{i < 3 ? <CheckCircle className="size-4" /> : i + 1}
								</div>
								<span
									className={`text-sm ${i === 3 ? 'font-medium' : 'text-muted-foreground'}`}
								>
									{step}
								</span>
							</div>
							{i < 3 && <div className="mx-2 h-px w-6 bg-border" />}
						</div>
					))}
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-center">Your Items</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-6">
							{products.map((product) => (
								<CenteredItem key={product.id} product={product} />
							))}
						</div>

						<Separator className="my-6" />

						<div className="grid grid-cols-3 gap-4">
							<DetailBox
								icon={MapPin}
								title="Shipping"
								lines={['Alex M.', 'Chicago, IL']}
							/>
							<DetailBox
								icon={Truck}
								title="Delivery"
								lines={['Express', 'Dec 20-21']}
							/>
							<DetailBox
								icon={CreditCard}
								title="Payment"
								lines={['Visa', '•••• 9999']}
							/>
						</div>

						<Separator className="my-6" />

						<div className="space-y-2">
							<SummaryLine label="Subtotal" value="$239.98" />
							<SummaryLine label="Shipping" value="$12.99" />
							<SummaryLine label="Tax" value="$20.40" />
							<SummaryLine label="Discount" value="-$24.00" green />
							<Separator className="my-3" />
							<SummaryLine label="Total" value="$249.37" bold />
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-3">
						<Button size="lg" className="w-full gap-2">
							<Lock className="size-4" />
							Complete Order
							<ArrowRight className="size-4" />
						</Button>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>256-bit SSL encryption</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
