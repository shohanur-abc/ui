import { User, Home, Package, ArrowRight, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const CheckoutStep = ({
	step,
	label,
	active,
	completed,
}: {
	step: number;
	label: string;
	active?: boolean;
	completed?: boolean;
}) => (
	<div className="flex items-center gap-3">
		<div
			className={`
				flex size-10 items-center justify-center rounded-full font-medium text-sm transition-colors
				${completed ? 'bg-primary text-primary-foreground' : ''}
				${active ? 'bg-primary text-primary-foreground' : ''}
				${!active && !completed ? 'bg-muted text-muted-foreground' : ''}
			`}
		>
			{completed ? <Check className="size-5" /> : step}
		</div>
		<span
			className={`hidden @lg:block ${active ? 'font-medium' : 'text-muted-foreground'}`}
		>
			{label}
		</span>
	</div>
);

const StepProgress = ({
	steps,
	progress,
}: {
	steps: {
		step: number;
		label: string;
		active?: boolean;
		completed?: boolean;
	}[];
	progress: number;
}) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			{steps.map((s) => (
				<CheckoutStep key={s.step} {...s} />
			))}
		</div>
		<Progress value={progress} className="h-1" />
	</div>
);

const SectionCard = ({
	icon: Icon,
	title,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-2xl border bg-card p-6">
		<div className="flex items-center gap-3 mb-6">
			<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<Icon className="size-5" />
			</div>
			<h3 className="font-semibold text-lg">{title}</h3>
		</div>
		{children}
	</div>
);

const FormInput = ({
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

const OrderSummaryItem = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-lg font-semibold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const steps = [
		{ step: 1, label: 'Contact', completed: true },
		{ step: 2, label: 'Shipping', active: true },
		{ step: 3, label: 'Payment' },
		{ step: 4, label: 'Review' },
	];

	const summaryItems = [
		{ label: 'Subtotal (3 items)', value: '$459.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Estimated Tax', value: '$36.72' },
	];

	return (
		<section className="@container relative overflow-hidden bg-muted/20">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="max-w-2xl mx-auto @xl:max-w-none">
					<StepProgress steps={steps} progress={50} />

					<div className="grid @xl:grid-cols-[1fr,380px] gap-8 mt-10">
						<div className="space-y-6">
							<SectionCard icon={User} title="Contact Information">
								<div className="space-y-4">
									<div className="grid @sm:grid-cols-2 gap-4">
										<FormInput label="First Name" placeholder="John" />
										<FormInput label="Last Name" placeholder="Doe" />
									</div>
									<FormInput
										label="Email Address"
										placeholder="john@example.com"
										type="email"
									/>
									<FormInput
										label="Phone Number"
										placeholder="+1 (555) 000-0000"
										type="tel"
									/>
								</div>
							</SectionCard>

							<SectionCard icon={Home} title="Shipping Address">
								<div className="space-y-4">
									<FormInput
										label="Street Address"
										placeholder="123 Main Street"
									/>
									<FormInput
										label="Apartment / Suite"
										placeholder="Apt 4B (optional)"
									/>
									<div className="grid @sm:grid-cols-3 gap-4">
										<FormInput label="City" placeholder="New York" />
										<FormInput label="State" placeholder="NY" />
										<FormInput label="ZIP Code" placeholder="10001" />
									</div>
								</div>
							</SectionCard>

							<div className="flex gap-3">
								<Button variant="outline" className="flex-1">
									Back
								</Button>
								<Button className="flex-1 gap-2">
									Continue
									<ArrowRight className="size-4" />
								</Button>
							</div>
						</div>

						<div className="@xl:sticky @xl:top-6 @xl:self-start">
							<SectionCard icon={Package} title="Order Summary">
								<div className="space-y-4">
									{summaryItems.map((item, i) => (
										<OrderSummaryItem key={i} {...item} />
									))}
									<div className="border-t pt-4">
										<OrderSummaryItem label="Total" value="$505.71" bold />
									</div>
								</div>
							</SectionCard>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
