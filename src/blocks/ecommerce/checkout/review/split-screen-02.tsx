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
	ArrowLeft,
	ArrowRight,
	Check,
	CreditCard,
	FileCheck,
	Lock,
	MapPin,
	Package,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

const ProgressBar = ({
	steps,
	current,
}: {
	steps: string[];
	current: number;
}) => (
	<div className="mb-10">
		<div className="flex justify-between">
			{steps.map((step, index) => (
				<div key={step} className="flex flex-1 flex-col items-center">
					<div
						className={`relative z-10 mb-2 flex size-8 items-center justify-center rounded-full text-xs font-medium ${
							index < current
								? 'bg-primary text-primary-foreground'
								: index === current
									? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
									: 'bg-muted text-muted-foreground'
						}`}
					>
						{index < current ? <Check className="size-4" /> : index + 1}
					</div>
					<span
						className={`text-xs @md:text-sm ${index <= current ? 'font-medium' : 'text-muted-foreground'}`}
					>
						{step}
					</span>
				</div>
			))}
		</div>
		<div className="relative mt-2">
			<div className="absolute inset-x-[10%] top-0 h-1 rounded-full bg-muted" />
			<div
				className="absolute inset-x-[10%] top-0 h-1 rounded-full bg-primary transition-all"
				style={{ width: `${(current / (steps.length - 1)) * 80}%` }}
			/>
		</div>
	</div>
);

const ItemPreview = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-medium">${item.price.toFixed(2)}</p>
			<p className="text-xs text-muted-foreground">×{item.quantity}</p>
		</div>
	</div>
);

const InfoBlock = ({
	icon: Icon,
	label,
	value,
	subvalue,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	subvalue?: string;
}) => (
	<div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
		<Icon className="mt-0.5 size-5 text-primary" />
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
			{subvalue && <p className="text-sm text-muted-foreground">{subvalue}</p>}
		</div>
	</div>
);

const PricingRow = ({
	label,
	amount,
	bold,
	discount,
}: {
	label: string;
	amount: number;
	bold?: boolean;
	discount?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={discount ? 'text-green-600 dark:text-green-400' : ''}>
			{discount && '-'}${Math.abs(amount).toFixed(2)}
		</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Ceramic Coffee Mug',
			variant: 'Matte Black / 12oz',
			price: 24.99,
			quantity: 2,
			image:
				'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Pour Over Coffee Maker',
			variant: 'Glass / 600ml',
			price: 39.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Coffee Bean Grinder',
			variant: 'Electric / White',
			price: 89.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop',
		},
	];

	const steps = ['Cart', 'Address', 'Payment', 'Review'];

	return (
		<section
			className="@container relative min-h-screen overflow-hidden"
			data-theme="neon"
		>
			<div className="grid min-h-screen @xl:grid-cols-2">
				<div className="flex flex-col bg-muted/30 px-4 py-12 @sm:px-8 @md:py-16 @xl:px-12 @2xl:px-16">
					<div className="mx-auto w-full max-w-lg">
						<ProgressBar steps={steps} current={3} />

						<div className="mb-8">
							<Badge variant="secondary" className="mb-4 gap-1.5">
								<FileCheck className="size-3.5" />
								Final Review
							</Badge>
							<h1 className="text-2xl font-bold @md:text-3xl">
								Confirm Your Order
							</h1>
							<p className="mt-1 text-muted-foreground">
								Review details before completing purchase
							</p>
						</div>

						<div className="space-y-4">
							<InfoBlock
								icon={MapPin}
								label="Shipping Address"
								value="Mark Thompson"
								subvalue="222 Coffee Lane, Seattle, WA 98101"
							/>
							<InfoBlock
								icon={Truck}
								label="Delivery Method"
								value="Express (2-3 days)"
								subvalue="Arrives Dec 20-21, 2025"
							/>
							<InfoBlock
								icon={CreditCard}
								label="Payment Method"
								value="Visa •••• 4532"
								subvalue="Expires 10/26"
							/>
						</div>

						<div className="mt-8 flex gap-3">
							<Button variant="outline" className="gap-2">
								<ArrowLeft className="size-4" />
								Back
							</Button>
							<Button className="flex-1 gap-2">
								<Lock className="size-4" />
								Confirm Order
								<ArrowRight className="size-4" />
							</Button>
						</div>
					</div>
				</div>

				<div className="flex flex-col bg-card px-4 py-12 @sm:px-8 @md:py-16 @xl:px-12 @2xl:px-16">
					<div className="mx-auto w-full max-w-lg">
						<Card className="border-0 shadow-none bg-transparent">
							<CardHeader className="px-0">
								<CardTitle className="flex items-center gap-2">
									<Package className="size-5" />
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="px-0">
								<div className="mb-6 space-y-4">
									{items.map((item) => (
										<ItemPreview key={item.id} item={item} />
									))}
								</div>

								<Separator className="my-6" />

								<div className="space-y-3">
									<PricingRow label="Subtotal (4 items)" amount={179.96} />
									<PricingRow label="Shipping" amount={9.99} />
									<PricingRow label="Tax" amount={15.3} />
									<PricingRow
										label="Promo (COFFEE20)"
										amount={35.99}
										discount
									/>
								</div>

								<Separator className="my-6" />

								<PricingRow label="Total" amount={169.26} bold />
							</CardContent>
							<CardFooter className="flex-col gap-4 px-0 pt-6">
								<div className="w-full rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 text-center">
									<p className="text-sm font-medium text-green-600 dark:text-green-400">
										🎉 You&apos;re saving $35.99 on this order!
									</p>
								</div>
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<Lock className="size-3.5" />
									<span>Your payment info is secure and encrypted</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
