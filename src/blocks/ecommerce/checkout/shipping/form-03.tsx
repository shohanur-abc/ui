import { Truck, Clock, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const FeatureBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const SectionTitle = ({ title, step }: { title: string; step: string }) => (
	<div className="flex items-center justify-between mb-6">
		<h2 className="text-lg font-semibold">{title}</h2>
		<Badge variant="secondary">{step}</Badge>
	</div>
);

const InputField = ({
	label,
	placeholder,
	type = 'text',
	className,
}: {
	label: string;
	placeholder: string;
	type?: string;
	className?: string;
}) => (
	<div className={`space-y-2 ${className || ''}`}>
		<Label className="text-sm font-medium">{label}</Label>
		<Input
			type={type}
			placeholder={placeholder}
			className="h-11 bg-muted/50 border-muted-foreground/20 focus:bg-background transition-colors"
		/>
	</div>
);

const NavigationButtons = ({
	backLabel,
	nextLabel,
	onBack,
}: {
	backLabel: string;
	nextLabel: string;
	onBack?: () => void;
}) => (
	<div className="flex items-center justify-between pt-8">
		<Button variant="ghost" onClick={onBack}>
			{backLabel}
		</Button>
		<Button size="lg" className="min-w-[160px]">
			{nextLabel}
		</Button>
	</div>
);

export default function Main() {
	const features = [
		{ icon: Truck, text: 'Free shipping over $50' },
		{ icon: Clock, text: '2-5 business days' },
		{ icon: Shield, text: 'Secure checkout' },
	];

	return (
		<section className="@container relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex flex-wrap justify-center gap-6 mb-12">
					{features.map((feature, i) => (
						<FeatureBadge key={i} {...feature} />
					))}
				</div>

				<div className="rounded-2xl border bg-card p-6 @md:p-8 shadow-lg">
					<SectionTitle title="Shipping Address" step="Step 2 of 4" />

					<div className="space-y-5">
						<div className="grid @md:grid-cols-2 gap-5">
							<InputField label="First Name" placeholder="John" />
							<InputField label="Last Name" placeholder="Doe" />
						</div>

						<InputField label="Email" placeholder="john.doe@email.com" type="email" />

						<Separator className="my-6" />

						<InputField label="Address Line 1" placeholder="Street address, P.O. box" />
						<InputField label="Address Line 2" placeholder="Apartment, suite, unit, building, floor" />

						<div className="grid @sm:grid-cols-3 gap-5">
							<InputField label="City" placeholder="City" />
							<InputField label="State" placeholder="State" />
							<InputField label="ZIP Code" placeholder="12345" />
						</div>

						<InputField label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
					</div>

					<NavigationButtons backLabel="← Back to cart" nextLabel="Continue to delivery" />
				</div>
			</div>
		</section>
	);
}
