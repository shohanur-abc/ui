import {
	ArrowRight,
	Check,
	ChevronRight,
	Lock,
	Mail,
	Shield,
	Smartphone,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

type WizardStep = {
	id: number;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	completed: boolean;
	current: boolean;
};

const WizardProgress = ({
	steps,
	currentStep,
}: { steps: WizardStep[]; currentStep: number }) => (
	<div className="mb-8">
		<div className="flex items-center justify-between mb-4">
			{steps.map((step, index) => (
				<div key={step.id} className="flex items-center">
					<div className="flex flex-col items-center">
						<div
							className={`flex size-12 items-center justify-center rounded-full border-2 transition-all ${
								step.completed
									? 'border-emerald-500 bg-emerald-500 text-white'
									: step.current
										? 'border-primary bg-primary/10 text-primary'
										: 'border-muted bg-muted text-muted-foreground'
							}`}
						>
							{step.completed ? (
								<Check className="size-6" />
							) : (
								<step.icon className="size-6" />
							)}
						</div>
						<span
							className={`mt-2 text-sm font-medium ${
								step.current ? 'text-primary' : 'text-muted-foreground'
							}`}
						>
							{step.title}
						</span>
					</div>
					{index < steps.length - 1 && (
						<div
							className={`mx-4 h-0.5 w-16 @sm:w-24 transition-colors ${
								step.completed ? 'bg-emerald-500' : 'bg-muted'
							}`}
						/>
					)}
				</div>
			))}
		</div>
		<Progress value={(currentStep / steps.length) * 100} className="h-1" />
	</div>
);

const Step1Profile = () => (
	<div className="space-y-6">
		<div className="flex flex-col items-center gap-4 @sm:flex-row">
			<Avatar className="size-20 ring-4 ring-border">
				<AvatarImage src="https://avatars.githubusercontent.com/u/252440198?v=4" />
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<div className="space-y-1 text-center @sm:text-left">
				<Button size="sm">Upload Photo</Button>
				<p className="text-xs text-muted-foreground">JPG, PNG up to 2MB</p>
			</div>
		</div>
		<div className="grid gap-4 @sm:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="firstName">First Name</Label>
				<Input id="firstName" placeholder="John" defaultValue="John" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="lastName">Last Name</Label>
				<Input id="lastName" placeholder="Doe" defaultValue="Doe" />
			</div>
			<div className="space-y-2 @sm:col-span-2">
				<Label htmlFor="email">Email Address</Label>
				<Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
			</div>
		</div>
	</div>
);

const Step2Password = () => (
	<div className="space-y-6">
		<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
			<div className="flex items-center gap-3">
				<Lock className="size-5 text-primary" />
				<p className="text-sm">
					Create a strong password with at least 8 characters, including numbers
					and special characters.
				</p>
			</div>
		</div>
		<div className="grid gap-4">
			<div className="space-y-2">
				<Label htmlFor="newPassword">New Password</Label>
				<Input id="newPassword" type="password" placeholder="Enter password" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="confirmPassword">Confirm Password</Label>
				<Input id="confirmPassword" type="password" placeholder="Confirm password" />
			</div>
		</div>
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span>Password Strength</span>
				<span className="font-medium text-emerald-500">Strong</span>
			</div>
			<Progress value={85} className="h-2" />
		</div>
	</div>
);

const Step3TwoFactor = () => (
	<div className="space-y-6">
		<div className="flex justify-center">
			<div className="flex size-32 items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
				<Smartphone className="size-12 text-muted-foreground" />
			</div>
		</div>
		<div className="text-center">
			<p className="text-sm text-muted-foreground">
				Scan the QR code with your authenticator app, then enter the 6-digit code below.
			</p>
		</div>
		<div className="flex justify-center">
			<InputOTP maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
		<Button variant="link" className="w-full">
			Skip for now
		</Button>
	</div>
);

const Step4Complete = () => (
	<div className="space-y-6 text-center">
		<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500/10">
			<Check className="size-10 text-emerald-500" />
		</div>
		<div>
			<h3 className="text-xl font-semibold">Setup Complete!</h3>
			<p className="mt-2 text-muted-foreground">
				Your security settings have been configured. You're all set to start using
				your account securely.
			</p>
		</div>
		<div className="grid gap-3 @sm:grid-cols-2">
			<div className="rounded-lg border p-4">
				<Shield className="mx-auto size-8 text-emerald-500" />
				<p className="mt-2 text-sm font-medium">2FA Enabled</p>
			</div>
			<div className="rounded-lg border p-4">
				<Lock className="mx-auto size-8 text-emerald-500" />
				<p className="mt-2 text-sm font-medium">Strong Password</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const currentStep = 2;

	const steps: WizardStep[] = [
		{ id: 1, title: 'Profile', icon: User, completed: true, current: false },
		{ id: 2, title: 'Password', icon: Lock, completed: false, current: true },
		{ id: 3, title: '2FA', icon: Smartphone, completed: false, current: false },
		{ id: 4, title: 'Complete', icon: Check, completed: false, current: false },
	];

	const stepComponents = [Step1Profile, Step2Password, Step3TwoFactor, Step4Complete];
	const CurrentStepComponent = stepComponents[currentStep - 1];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader className="border-b text-center">
						<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
							<Shield className="size-6 text-primary" />
						</div>
						<CardTitle className="text-xl">Security Setup Wizard</CardTitle>
						<CardDescription>
							Complete these steps to secure your account
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-8">
						<WizardProgress steps={steps} currentStep={currentStep} />
						<CurrentStepComponent />
						<div className="mt-8 flex justify-between">
							<Button variant="outline" disabled={currentStep === 1}>
								Back
							</Button>
							<Button className="gap-2">
								{currentStep < steps.length ? (
									<>
										Continue
										<ArrowRight className="size-4" />
									</>
								) : (
									'Go to Dashboard'
								)}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
