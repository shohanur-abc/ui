import { ChevronRight, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProgressStep = ({
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
	<div className="flex items-center gap-2">
		<div
			className={`
				flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors
				${completed ? 'bg-primary text-primary-foreground' : ''}
				${active ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
				${!active && !completed ? 'bg-muted text-muted-foreground' : ''}
			`}
		>
			{completed ? <Check className="size-4" /> : step}
		</div>
		<span
			className={`text-sm hidden @md:block ${active ? 'font-medium' : 'text-muted-foreground'}`}
		>
			{label}
		</span>
	</div>
);

const StepConnector = () => (
	<ChevronRight className="size-4 text-muted-foreground shrink-0" />
);

const ProgressBar = ({
	steps,
}: {
	steps: {
		step: number;
		label: string;
		active?: boolean;
		completed?: boolean;
	}[];
}) => (
	<div className="flex items-center justify-center gap-2 @sm:gap-4 mb-10">
		{steps.map((s, i) => (
			<div key={s.step} className="flex items-center gap-2 @sm:gap-4">
				<ProgressStep {...s} />
				{i < steps.length - 1 && <StepConnector />}
			</div>
		))}
	</div>
);

const InputWithLabel = ({
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
		<Input
			type={type}
			placeholder={placeholder}
			className="h-11 rounded-lg border-muted-foreground/20"
		/>
	</div>
);

const FormGrid = ({ children }: { children: React.ReactNode }) => (
	<div className="grid @md:grid-cols-2 gap-4">{children}</div>
);

const ActionBar = ({
	backLabel,
	nextLabel,
}: {
	backLabel: string;
	nextLabel: string;
}) => (
	<div className="flex flex-col-reverse @sm:flex-row items-center justify-between gap-4 pt-8 border-t">
		<Button variant="ghost" className="w-full @sm:w-auto">
			{backLabel}
		</Button>
		<Button className="w-full @sm:w-auto min-w-[200px]">{nextLabel}</Button>
	</div>
);

export default function Main() {
	const progressSteps = [
		{ step: 1, label: 'Cart', completed: true },
		{ step: 2, label: 'Shipping', active: true },
		{ step: 3, label: 'Payment' },
		{ step: 4, label: 'Review' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<ProgressBar steps={progressSteps} />

				<div className="bg-card rounded-xl border p-6 @md:p-8 shadow-sm">
					<h2 className="text-2xl font-bold mb-2">Shipping Address</h2>
					<p className="text-muted-foreground mb-8">
						Fill in your delivery details
					</p>

					<div className="space-y-6">
						<FormGrid>
							<InputWithLabel label="First Name" placeholder="John" />
							<InputWithLabel label="Last Name" placeholder="Doe" />
						</FormGrid>

						<InputWithLabel
							label="Email Address"
							placeholder="john@example.com"
							type="email"
						/>
						<InputWithLabel
							label="Phone Number"
							placeholder="+1 (555) 000-0000"
							type="tel"
						/>

						<InputWithLabel
							label="Street Address"
							placeholder="123 Example Street"
						/>

						<FormGrid>
							<InputWithLabel label="Apartment / Suite" placeholder="Apt 4B" />
							<InputWithLabel label="City" placeholder="New York" />
						</FormGrid>

						<FormGrid>
							<InputWithLabel label="State / Province" placeholder="New York" />
							<InputWithLabel label="ZIP / Postal Code" placeholder="10001" />
						</FormGrid>

						<ActionBar
							backLabel="← Back to Cart"
							nextLabel="Continue to Payment"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
