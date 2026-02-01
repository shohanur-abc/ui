import { Package, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const PageTitle = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) => (
	<div className="flex flex-col items-center text-center mb-10">
		<div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground mb-4 shadow-lg shadow-primary/30">
			<Icon className="size-7" />
		</div>
		<h1 className="text-2xl @md:text-3xl font-bold tracking-tight">{title}</h1>
		<p className="text-muted-foreground mt-2 max-w-md">{description}</p>
	</div>
);

const FloatingInput = ({
	id,
	label,
	type = 'text',
}: {
	id: string;
	label: string;
	type?: string;
}) => (
	<div className="relative">
		<Input
			id={id}
			type={type}
			placeholder=" "
			className="peer h-14 pt-4 px-4"
		/>
		<Label
			htmlFor={id}
			className="absolute left-4 top-4 text-muted-foreground transition-all pointer-events-none
				peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
				peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
		>
			{label}
		</Label>
	</div>
);

const CheckOption = ({
	id,
	label,
	description,
}: {
	id: string;
	label: string;
	description?: string;
}) => (
	<div className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
		<Checkbox id={id} className="mt-0.5" />
		<div>
			<Label htmlFor={id} className="font-medium cursor-pointer">
				{label}
			</Label>
			{description && (
				<p className="text-sm text-muted-foreground">{description}</p>
			)}
		</div>
	</div>
);

const ContinueButton = ({
	label,
	icon: Icon,
}: {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}) => (
	<Button className="w-full h-12 text-base gap-2 group">
		{label}
		<Icon className="size-4 transition-transform group-hover:translate-x-1" />
	</Button>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageTitle
					icon={Package}
					title="Shipping Details"
					description="Enter your shipping information to get your order delivered"
				/>

				<div className="space-y-4">
					<div className="grid @sm:grid-cols-2 gap-4">
						<FloatingInput id="firstName" label="First Name" />
						<FloatingInput id="lastName" label="Last Name" />
					</div>

					<FloatingInput id="email" label="Email Address" type="email" />
					<FloatingInput id="phone" label="Phone Number" type="tel" />

					<Separator className="my-6" />

					<FloatingInput id="address" label="Street Address" />
					<FloatingInput id="apt" label="Apartment, Suite (Optional)" />

					<div className="grid @sm:grid-cols-2 gap-4">
						<FloatingInput id="city" label="City" />
						<FloatingInput id="state" label="State / Province" />
					</div>

					<div className="grid @sm:grid-cols-2 gap-4">
						<FloatingInput id="zip" label="Postal Code" />
						<FloatingInput id="country" label="Country" />
					</div>

					<Separator className="my-6" />

					<div className="space-y-3">
						<CheckOption
							id="save"
							label="Save this address"
							description="Use for future orders"
						/>
						<CheckOption
							id="billing"
							label="Billing address same as shipping"
						/>
					</div>

					<div className="pt-4">
						<ContinueButton label="Continue to Payment" icon={ArrowRight} />
					</div>
				</div>
			</div>
		</section>
	);
}
