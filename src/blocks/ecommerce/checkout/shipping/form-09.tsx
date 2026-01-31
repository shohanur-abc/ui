import { Sparkles, Zap, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

const GlowDecorative = () => (
	<div className="absolute inset-0 -z-10 overflow-hidden">
		<div className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-3xl" />
	</div>
);

const QuickFillButton = ({
	icon: Icon,
	label,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}) => (
	<Button variant="outline" className="gap-2 h-11 flex-1">
		<Icon className="size-4" />
		{label}
	</Button>
);

const InputWithIcon = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label className="text-sm font-medium">{label}</Label>
		<Input
			type={type}
			placeholder={placeholder}
			className="h-12 bg-background/60 backdrop-blur-sm border-muted-foreground/20 focus:border-primary transition-colors"
		/>
	</div>
);

const ToggleOption = ({
	id,
	label,
	description,
	defaultChecked,
}: {
	id: string;
	label: string;
	description: string;
	defaultChecked?: boolean;
}) => (
	<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border">
		<div className="space-y-1">
			<Label htmlFor={id} className="font-medium cursor-pointer">{label}</Label>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch id={id} defaultChecked={defaultChecked} />
	</div>
);

const ExpandableSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<Collapsible>
		<CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left group">
			<span className="font-medium">{title}</span>
			<ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
		</CollapsibleTrigger>
		<CollapsibleContent className="space-y-4 pb-4">
			{children}
		</CollapsibleContent>
	</Collapsible>
);

const SubmitActions = ({
	backLabel,
	continueLabel,
}: {
	backLabel: string;
	continueLabel: string;
}) => (
	<div className="flex flex-col @sm:flex-row gap-3 pt-6">
		<Button variant="outline" className="flex-1 h-12">
			{backLabel}
		</Button>
		<Button className="flex-1 h-12 gap-2">
			<Zap className="size-4" />
			{continueLabel}
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<GlowDecorative />
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
						<Sparkles className="size-4" />
						<span className="text-sm font-medium">Express Checkout</span>
					</div>
					<h1 className="text-3xl font-bold tracking-tight">Shipping Information</h1>
					<p className="text-muted-foreground mt-2">Fast, secure, and reliable delivery</p>
				</div>

				<div className="rounded-2xl border bg-card/80 backdrop-blur-sm p-6 @md:p-8 shadow-xl space-y-6">
					<div className="flex gap-3">
						<QuickFillButton icon={Sparkles} label="Autofill with Google" />
						<QuickFillButton icon={Sparkles} label="Use Saved" />
					</div>

					<div className="grid @sm:grid-cols-2 gap-4">
						<InputWithIcon label="First Name" placeholder="John" />
						<InputWithIcon label="Last Name" placeholder="Doe" />
					</div>

					<InputWithIcon label="Email" placeholder="john@example.com" type="email" />
					<InputWithIcon label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
					<InputWithIcon label="Street Address" placeholder="123 Main Street" />

					<div className="grid @sm:grid-cols-3 gap-4">
						<InputWithIcon label="City" placeholder="New York" />
						<InputWithIcon label="State" placeholder="NY" />
						<InputWithIcon label="ZIP" placeholder="10001" />
					</div>

					<ExpandableSection title="Additional Options">
						<InputWithIcon label="Company Name" placeholder="Company (optional)" />
						<InputWithIcon label="Delivery Instructions" placeholder="Gate code, building access..." />
					</ExpandableSection>

					<div className="space-y-3">
						<ToggleOption
							id="save-address"
							label="Save address"
							description="For faster checkout next time"
							defaultChecked
						/>
						<ToggleOption
							id="same-billing"
							label="Same as billing"
							description="Use this address for billing"
							defaultChecked
						/>
					</div>

					<SubmitActions backLabel="Back" continueLabel="Express Continue" />
				</div>
			</div>
		</section>
	);
}
