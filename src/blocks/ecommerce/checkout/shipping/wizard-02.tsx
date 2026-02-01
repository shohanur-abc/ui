import { Check, Package, Truck, Clock, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ProgressHeader = ({
	currentStep,
	totalSteps,
	title,
}: {
	currentStep: number;
	totalSteps: number;
	title: string;
}) => (
	<div className="mb-8">
		<div className="flex items-center justify-between mb-2">
			<span className="text-sm text-muted-foreground">
				Step {currentStep} of {totalSteps}
			</span>
			<span className="text-sm font-medium">
				{Math.round((currentStep / totalSteps) * 100)}%
			</span>
		</div>
		<Progress value={(currentStep / totalSteps) * 100} className="h-2 mb-4" />
		<h1 className="text-3xl font-bold">{title}</h1>
	</div>
);

const ShippingOption = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	description,
	recommended,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	description: string;
	recommended?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className={`
				relative transition-all hover:shadow-md hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
			`}
		>
			{recommended && (
				<Badge className="absolute -top-2.5 right-4">Recommended</Badge>
			)}
			<CardContent className="p-5">
				<div className="flex items-center gap-4">
					<RadioGroupItem value={value} id={value} />
					<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Icon className="size-6" />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<h3 className="font-semibold">{name}</h3>
							<span className="font-bold text-primary">{price}</span>
						</div>
						<div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Clock className="size-3.5" />
								<span>{time}</span>
							</div>
							<span>{description}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const CompletedStep = ({
	label,
	summary,
	onEdit,
}: {
	label: string;
	summary: string;
	onEdit?: () => void;
}) => (
	<Card className="bg-muted/30 border-dashed">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
					<Check className="size-4" />
				</div>
				<div className="flex-1">
					<p className="font-medium">{label}</p>
					<p className="text-sm text-muted-foreground">{summary}</p>
				</div>
				<Button variant="ghost" size="sm" onClick={onEdit}>
					Edit
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const shippingOptions = [
		{
			value: 'standard',
			icon: Package,
			name: 'Standard Shipping',
			time: '5-7 days',
			price: 'Free',
			description: 'Best for non-urgent orders',
		},
		{
			value: 'express',
			icon: Truck,
			name: 'Express Shipping',
			time: '2-3 days',
			price: '$12.99',
			description: 'Fast and reliable',
			recommended: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<ProgressHeader
					currentStep={2}
					totalSteps={4}
					title="Shipping Method"
				/>

				<div className="space-y-4 mb-6">
					<CompletedStep
						label="Shipping Address"
						summary="123 Main St, Apt 4B, New York, NY 10001"
					/>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Truck className="size-5 text-primary" />
							Select Delivery Speed
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="express" className="space-y-4">
							{shippingOptions.map((option) => (
								<ShippingOption key={option.value} {...option} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1 gap-2">
						Continue
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
