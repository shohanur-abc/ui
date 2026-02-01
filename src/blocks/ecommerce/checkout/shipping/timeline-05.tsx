import {
	Package,
	Truck,
	MapPin,
	Clock,
	Check,
	ChevronRight,
	Edit2,
	Calendar,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MilestoneTimeline = ({
	milestones,
}: {
	milestones: {
		title: string;
		date: string;
		status: 'completed' | 'current' | 'upcoming';
	}[];
}) => (
	<div className="flex items-center justify-between py-4">
		{milestones.map((milestone, i) => (
			<div key={milestone.title} className="flex-1 flex items-center">
				<div className="flex flex-col items-center">
					<div
						className={`
							flex size-10 items-center justify-center rounded-full border-2
							${milestone.status === 'completed' ? 'bg-primary border-primary text-primary-foreground' : ''}
							${milestone.status === 'current' ? 'border-primary bg-primary/10 text-primary' : ''}
							${milestone.status === 'upcoming' ? 'border-muted bg-background text-muted-foreground' : ''}
						`}
					>
						{milestone.status === 'completed' ? (
							<Check className="size-5" />
						) : (
							i + 1
						)}
					</div>
					<div className="text-center mt-2">
						<p
							className={`text-sm font-medium ${milestone.status === 'upcoming' ? 'text-muted-foreground' : ''}`}
						>
							{milestone.title}
						</p>
						<p className="text-xs text-muted-foreground">{milestone.date}</p>
					</div>
				</div>
				{i < milestones.length - 1 && (
					<div
						className={`h-0.5 flex-1 mx-4 ${milestone.status === 'completed' ? 'bg-primary' : 'bg-muted'}`}
					/>
				)}
			</div>
		))}
	</div>
);

const ShippingRow = ({
	value,
	name,
	time,
	price,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-accent/50 has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<span className="font-medium">{name}</span>
			<Badge variant="secondary" className="text-xs">
				{time}
			</Badge>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

const SummarySection = ({
	icon: Icon,
	title,
	content,
	action,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	content: string;
	action?: string;
}) => (
	<div className="flex items-start gap-3 py-3">
		<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="font-medium">{content}</p>
		</div>
		{action && (
			<Button variant="ghost" size="sm" className="gap-1">
				<Edit2 className="size-3" />
				{action}
			</Button>
		)}
	</div>
);

export default function Main() {
	const milestones = [
		{ title: 'Order Placed', date: 'Jan 14', status: 'completed' as const },
		{ title: 'Processing', date: 'Jan 14', status: 'completed' as const },
		{ title: 'Shipped', date: 'Jan 15', status: 'current' as const },
		{ title: 'Delivered', date: 'Jan 17-19', status: 'upcoming' as const },
	];

	const options = [
		{ value: 'standard', name: 'Standard', time: '5-7 days', price: '$5.99' },
		{ value: 'express', name: 'Express', time: '2-3 days', price: '$12.99' },
		{ value: 'overnight', name: 'Overnight', time: '1 day', price: '$24.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-6">Shipping Details</h1>

				<Card className="mb-6">
					<CardHeader className="pb-0">
						<CardTitle className="text-base flex items-center gap-2">
							<Calendar className="size-5 text-primary" />
							Estimated Delivery Timeline
						</CardTitle>
					</CardHeader>
					<CardContent>
						<MilestoneTimeline milestones={milestones} />
					</CardContent>
				</Card>

				<Card className="mb-6">
					<CardContent className="p-4">
						<SummarySection
							icon={MapPin}
							title="Shipping To"
							content="123 Main St, Apt 4B, New York, NY 10001"
							action="Change"
						/>
						<Separator />
						<SummarySection
							icon={Package}
							title="Items"
							content="3 items • 2.5 lbs total"
						/>
					</CardContent>
				</Card>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Truck className="size-5 text-primary" />
							Shipping Method
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="space-y-1">
							{options.map((option) => (
								<ShippingRow key={option.value} {...option} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">
						Continue to Payment
						<ChevronRight className="size-5 ml-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}
