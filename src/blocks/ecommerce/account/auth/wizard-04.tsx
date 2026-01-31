import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ArrowLeft, Store, Check, Building2, Phone, MapPin, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const StepCircle = ({
	step,
	label,
	isActive,
	isCompleted,
}: {
	step: number;
	label: string;
	isActive: boolean;
	isCompleted: boolean;
}) => (
	<div className="flex flex-col items-center">
		<div
			className={`size-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
				isCompleted
					? 'bg-primary text-primary-foreground'
					: isActive
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{isCompleted ? <Check className="size-5" /> : step}
		</div>
		<span className={`text-xs mt-2 ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
			{label}
		</span>
	</div>
);

const StepConnector = ({ isCompleted }: { isCompleted: boolean }) => (
	<div className={`flex-1 h-0.5 ${isCompleted ? 'bg-primary' : 'bg-muted'}`} />
);

const StepProgress = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="flex items-start mb-8">
		{steps.map((label, index) => (
			<div key={label} className="flex items-start flex-1 last:flex-initial">
				<StepCircle
					step={index + 1}
					label={label}
					isActive={currentStep === index + 1}
					isCompleted={currentStep > index + 1}
				/>
				{index < steps.length - 1 && (
					<StepConnector isCompleted={currentStep > index + 1} />
				)}
			</div>
		))}
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	id,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	id: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input id={id} type={type} placeholder={placeholder} className="pl-10" />
		</div>
	</div>
);

const NavigationButtons = ({
	showBack,
	nextLabel,
}: {
	showBack: boolean;
	nextLabel: string;
}) => (
	<div className="flex gap-3">
		{showBack && (
			<Button type="button" variant="outline" className="gap-2">
				<ArrowLeft className="size-4" />
				Back
			</Button>
		)}
		<Button type="submit" className="flex-1 gap-2 group">
			{nextLabel}
			<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
		</Button>
	</div>
);

const BusinessInfoStep = () => (
	<form className="space-y-4">
		<FormField id="seller-business" label="Business Name" type="text" placeholder="Your Store Name" icon={Building2} />
		<FormField id="seller-email" label="Business Email" type="email" placeholder="contact@yourstore.com" icon={Mail} />
		<FormField id="seller-phone" label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" icon={Phone} />
		<FormField id="seller-website" label="Website (optional)" type="url" placeholder="https://yourstore.com" icon={Globe} />
		<NavigationButtons showBack={false} nextLabel="Continue" />
	</form>
);

export default function Main() {
	const steps = ['Business Info', 'Verification', 'Store Setup', 'Review'];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-lg">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="SellerHub" icon={Store} />
						</div>
						<CardTitle className="text-2xl">Become a Seller</CardTitle>
						<CardDescription>Set up your seller account in minutes</CardDescription>
					</CardHeader>
					<CardContent>
						<StepProgress steps={steps} currentStep={1} />
						<BusinessInfoStep />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
