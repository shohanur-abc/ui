import {
	Box,
	Truck,
	Clock,
	MapPin,
	Phone,
	ChevronRight,
	User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ConfirmationCard = ({
	icon: Icon,
	title,
	children,
	action,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	children: React.ReactNode;
	action?: { label: string; onClick?: () => void };
}) => (
	<Card>
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon className="size-5" />
					</div>
					<CardTitle className="text-base">{title}</CardTitle>
				</div>
				{action && (
					<Button variant="ghost" size="sm" onClick={action.onClick}>
						{action.label}
					</Button>
				)}
			</div>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex justify-between py-2">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium text-right">{value}</span>
	</div>
);

const DeliveryTimeline = ({
	steps,
}: {
	steps: { label: string; date: string; completed?: boolean }[];
}) => (
	<div className="space-y-4">
		{steps.map((step, i) => (
			<div key={i} className="flex items-start gap-3">
				<div
					className={`
						flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium
						${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
					`}
				>
					{i + 1}
				</div>
				<div className="flex-1">
					<p
						className={step.completed ? 'font-medium' : 'text-muted-foreground'}
					>
						{step.label}
					</p>
					<p className="text-sm text-muted-foreground">{step.date}</p>
				</div>
			</div>
		))}
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

export default function Main() {
	const timeline = [
		{ label: 'Order Placed', date: 'Today', completed: true },
		{ label: 'Processing', date: 'Tomorrow' },
		{ label: 'Shipped', date: 'Jan 17' },
		{ label: 'Delivered', date: 'Jan 19-20' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<Badge variant="outline" className="mb-4">
						Step 2 of 4
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Review Shipping Details
					</h1>
					<p className="text-muted-foreground">
						Confirm your delivery information before proceeding
					</p>
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<div className="space-y-6">
						<ConfirmationCard
							icon={User}
							title="Contact Information"
							action={{ label: 'Edit' }}
						>
							<div className="space-y-1 text-sm">
								<p className="font-medium">John Doe</p>
								<p className="text-muted-foreground">john.doe@email.com</p>
								<p className="text-muted-foreground">+1 (555) 123-4567</p>
							</div>
						</ConfirmationCard>

						<ConfirmationCard
							icon={MapPin}
							title="Delivery Address"
							action={{ label: 'Edit' }}
						>
							<div className="text-sm">
								<p className="font-medium">123 Main Street, Apt 4B</p>
								<p className="text-muted-foreground">New York, NY 10001</p>
								<p className="text-muted-foreground">United States</p>
							</div>
						</ConfirmationCard>

						<ConfirmationCard
							icon={Truck}
							title="Shipping Method"
							action={{ label: 'Change' }}
						>
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Express Delivery</p>
									<p className="text-sm text-muted-foreground">
										2-3 business days
									</p>
								</div>
								<span className="font-bold text-primary">$12.99</span>
							</div>
						</ConfirmationCard>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<Clock className="size-5 text-primary" />
									Estimated Timeline
								</CardTitle>
							</CardHeader>
							<CardContent>
								<DeliveryTimeline steps={timeline} />
							</CardContent>
						</Card>

						<Card className="bg-muted/30">
							<CardHeader>
								<CardTitle className="text-base">Delivery Notes</CardTitle>
							</CardHeader>
							<CardContent>
								<FormField
									label="Special Instructions (Optional)"
									placeholder="Gate code, building access, etc."
								/>
							</CardContent>
						</Card>
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col @sm:flex-row gap-3">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1 gap-2">
						Continue to Payment
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
