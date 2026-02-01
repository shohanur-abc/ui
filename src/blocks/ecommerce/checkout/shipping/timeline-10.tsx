import {
	Package,
	Truck,
	Clock,
	Check,
	MapPin,
	CreditCard,
	Gift,
	ChevronRight,
	Edit2,
	Star,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CheckoutStep = ({
	step,
	title,
	icon: Icon,
	status,
	summary,
	onEdit,
}: {
	step: number;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	status: 'completed' | 'current' | 'upcoming';
	summary?: React.ReactNode;
	onEdit?: () => void;
}) => (
	<div
		className={`relative pl-10 pb-8 ${status === 'upcoming' ? 'opacity-50' : ''}`}
	>
		<div className="absolute left-0 top-0 flex flex-col items-center h-full">
			<div
				className={`
					flex size-8 items-center justify-center rounded-full border-2 z-10 bg-background
					${status === 'completed' ? 'bg-primary border-primary text-primary-foreground' : ''}
					${status === 'current' ? 'border-primary text-primary' : ''}
					${status === 'upcoming' ? 'border-muted text-muted-foreground' : ''}
				`}
			>
				{status === 'completed' ? (
					<Check className="size-4" />
				) : (
					<Icon className="size-4" />
				)}
			</div>
			<div
				className={`w-0.5 flex-1 ${status === 'completed' ? 'bg-primary' : 'bg-muted'}`}
			/>
		</div>
		<div className="flex items-start justify-between">
			<div>
				<div className="flex items-center gap-2 mb-1">
					<h3 className="font-semibold">{title}</h3>
					{status === 'completed' && (
						<Badge variant="secondary" className="text-xs">
							Done
						</Badge>
					)}
					{status === 'current' && <Badge className="text-xs">Current</Badge>}
				</div>
				{summary}
			</div>
			{status === 'completed' && onEdit && (
				<Button variant="ghost" size="sm" onClick={onEdit} className="gap-1">
					<Edit2 className="size-3" />
					Edit
				</Button>
			)}
		</div>
	</div>
);

const OrderItem = ({
	name,
	image,
	price,
	qty,
}: {
	name: string;
	image: string;
	price: string;
	qty: number;
}) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-12 rounded-lg">
			<AvatarImage src={image} />
			<AvatarFallback className="rounded-lg">{name[0]}</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">Qty: {qty}</p>
		</div>
		<span className="font-medium">{price}</span>
	</div>
);

const SummaryRow = ({
	label,
	value,
	highlight,
}: {
	label: string;
	value: string;
	highlight?: boolean;
}) => (
	<div className="flex items-center justify-between">
		<span className={highlight ? 'font-semibold' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={highlight ? 'font-bold text-lg' : 'font-medium'}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items = [
		{
			name: 'Wireless Earbuds Pro',
			image: '/products/earbuds.jpg',
			price: '$129.99',
			qty: 1,
		},
		{
			name: 'Smart Watch Series 5',
			image: '/products/watch.jpg',
			price: '$299.99',
			qty: 1,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-10">Order Review</h1>

				<div className="grid @lg:grid-cols-[1fr_340px] gap-8">
					<div>
						<CheckoutStep
							step={1}
							title="Shipping Address"
							icon={MapPin}
							status="completed"
							onEdit={() => {}}
							summary={
								<div className="text-sm text-muted-foreground mt-1">
									<p>John Doe</p>
									<p>123 Main Street, Apt 4B</p>
									<p>New York, NY 10001</p>
								</div>
							}
						/>

						<CheckoutStep
							step={2}
							title="Shipping Method"
							icon={Truck}
							status="completed"
							onEdit={() => {}}
							summary={
								<div className="text-sm mt-1">
									<div className="flex items-center gap-2">
										<span className="font-medium">Express Shipping</span>
										<Badge variant="secondary">2-3 days</Badge>
									</div>
									<p className="text-muted-foreground">
										$12.99 • Arrives Jan 17
									</p>
								</div>
							}
						/>

						<CheckoutStep
							step={3}
							title="Payment Method"
							icon={CreditCard}
							status="current"
							summary={
								<div className="mt-3">
									<Card>
										<CardContent className="p-4">
											<p className="text-sm text-muted-foreground mb-4">
												Select a payment method to continue
											</p>
											<div className="space-y-2">
												{['Credit Card', 'PayPal', 'Apple Pay'].map(
													(method) => (
														<Button
															key={method}
															variant="outline"
															className="w-full justify-start"
														>
															{method}
														</Button>
													),
												)}
											</div>
										</CardContent>
									</Card>
								</div>
							}
						/>

						<CheckoutStep
							step={4}
							title="Complete Order"
							icon={Gift}
							status="upcoming"
						/>
					</div>

					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-3">
									{items.map((item, i) => (
										<OrderItem key={i} {...item} />
									))}
								</div>

								<Separator />

								<div className="space-y-2">
									<SummaryRow label="Subtotal" value="$429.98" />
									<SummaryRow label="Shipping" value="$12.99" />
									<SummaryRow label="Tax" value="$35.47" />
								</div>

								<Separator />

								<SummaryRow label="Total" value="$478.44" highlight />

								<Button className="w-full" size="lg" disabled>
									Complete Payment
									<ChevronRight className="size-5 ml-2" />
								</Button>

								<p className="text-xs text-center text-muted-foreground">
									By placing your order, you agree to our Terms & Conditions
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
