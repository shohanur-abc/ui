import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ArrowLeft, ShoppingBag, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="space-y-2 mb-6">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Step {currentStep} of {steps.length}</span>
			<span className="font-medium">{steps[currentStep - 1]}</span>
		</div>
		<Progress value={(currentStep / steps.length) * 100} className="h-2" />
	</div>
);

const StepDots = ({
	total,
	current,
}: {
	total: number;
	current: number;
}) => (
	<div className="flex items-center justify-center gap-2 mb-6">
		{Array.from({ length: total }).map((_, i) => (
			<div
				key={i}
				className={`size-2.5 rounded-full transition-colors ${
					i + 1 <= current ? 'bg-primary' : 'bg-muted'
				}`}
			/>
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
	onBack,
}: {
	showBack: boolean;
	nextLabel: string;
	onBack?: () => void;
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

const AccountStep = () => (
	<form className="space-y-4">
		<FormField id="wizard-name" label="Full Name" type="text" placeholder="John Doe" icon={User} />
		<FormField id="wizard-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField id="wizard-password" label="Create Password" type="password" placeholder="••••••••" icon={Lock} />
		<NavigationButtons showBack={false} nextLabel="Continue" />
	</form>
);

export default function Main() {
	const steps = ['Account', 'Profile', 'Preferences'];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopNow" icon={ShoppingBag} />
						</div>
						<CardTitle className="text-2xl">Create your account</CardTitle>
						<CardDescription>Let&apos;s get started with a few details</CardDescription>
					</CardHeader>
					<CardContent>
						<StepIndicator steps={steps} currentStep={1} />
						<AccountStep />
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground">
							Already have an account?{' '}
							<Link href="/login" className="text-primary font-medium hover:underline">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
