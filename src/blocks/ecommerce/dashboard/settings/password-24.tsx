import {
	AlertTriangle,
	Check,
	Eye,
	EyeOff,
	Lock,
	Shield,
	X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

type PasswordRequirement = {
	label: string;
	met: boolean;
	regex?: RegExp;
};

type PasswordHistory = {
	date: string;
	strength: 'weak' | 'medium' | 'strong';
};

const RequirementCheck = ({ label, met }: PasswordRequirement) => (
	<div className="flex items-center gap-2">
		<div
			className={`flex size-5 items-center justify-center rounded-full ${
				met
					? 'bg-emerald-500/10 text-emerald-500'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			{met ? <Check className="size-3" /> : <X className="size-3" />}
		</div>
		<span
			className={`text-sm ${met ? 'text-foreground' : 'text-muted-foreground'}`}
		>
			{label}
		</span>
	</div>
);

const StrengthMeter = ({ strength }: { strength: number }) => {
	const getColor = () => {
		if (strength >= 80) return 'bg-emerald-500';
		if (strength >= 50) return 'bg-amber-500';
		return 'bg-destructive';
	};

	const getLabel = () => {
		if (strength >= 80) return 'Strong';
		if (strength >= 50) return 'Medium';
		return 'Weak';
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Password Strength</span>
				<span
					className={`font-medium ${
						strength >= 80
							? 'text-emerald-500'
							: strength >= 50
								? 'text-amber-500'
								: 'text-destructive'
					}`}
				>
					{getLabel()}
				</span>
			</div>
			<div className="h-2 rounded-full bg-muted">
				<div
					className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
					style={{ width: `${strength}%` }}
				/>
			</div>
		</div>
	);
};

const PasswordHistoryItem = ({ date, strength }: PasswordHistory) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-sm text-muted-foreground">{date}</span>
		<span
			className={`text-sm font-medium ${
				strength === 'strong'
					? 'text-emerald-500'
					: strength === 'medium'
						? 'text-amber-500'
						: 'text-destructive'
			}`}
		>
			{strength.charAt(0).toUpperCase() + strength.slice(1)}
		</span>
	</div>
);

const PasswordInput = ({
	id,
	label,
	placeholder,
}: {
	id: string;
	label: string;
	placeholder: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<div className="relative">
			<Input
				id={id}
				type="password"
				placeholder={placeholder}
				className="pr-10"
			/>
			<Button
				type="button"
				variant="ghost"
				size="icon-sm"
				className="absolute right-1 top-1/2 -translate-y-1/2"
			>
				<Eye className="size-4 text-muted-foreground" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const requirements: PasswordRequirement[] = [
		{ label: 'At least 8 characters', met: true },
		{ label: 'Contains uppercase letter', met: true },
		{ label: 'Contains lowercase letter', met: true },
		{ label: 'Contains a number', met: true },
		{ label: 'Contains special character (!@#$%)', met: false },
		{ label: 'No common patterns', met: true },
	];

	const passwordHistory: PasswordHistory[] = [
		{ date: 'Jan 15, 2026', strength: 'strong' },
		{ date: 'Oct 20, 2025', strength: 'medium' },
		{ date: 'Jul 5, 2025', strength: 'strong' },
		{ date: 'Mar 12, 2025', strength: 'weak' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Lock className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Change Password</CardTitle>
									<CardDescription>
										Choose a strong password to protect your account
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-6 @lg:grid-cols-2">
								<div className="space-y-4">
									<PasswordInput
										id="currentPassword"
										label="Current Password"
										placeholder="Enter current password"
									/>
									<PasswordInput
										id="newPassword"
										label="New Password"
										placeholder="Enter new password"
									/>
									<PasswordInput
										id="confirmPassword"
										label="Confirm New Password"
										placeholder="Confirm new password"
									/>
									<StrengthMeter strength={75} />
								</div>

								<div className="space-y-4">
									<h4 className="font-medium">Password Requirements</h4>
									<div className="space-y-2">
										{requirements.map((req) => (
											<RequirementCheck key={req.label} {...req} />
										))}
									</div>
								</div>
							</div>

							<div className="mt-6 flex justify-end gap-3">
								<Button variant="outline">Cancel</Button>
								<Button>Update Password</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Password History</CardTitle>
							<CardDescription>Your recent password changes</CardDescription>
						</CardHeader>
						<CardContent className="divide-y">
							{passwordHistory.map((item) => (
								<PasswordHistoryItem key={item.date} {...item} />
							))}
						</CardContent>
					</Card>

					<Card className="border-amber-500/20 bg-amber-500/5">
						<CardContent className="flex items-start gap-4 pt-6">
							<AlertTriangle className="size-5 shrink-0 text-amber-500" />
							<div>
								<h4 className="font-medium">Password Best Practices</h4>
								<ul className="mt-2 space-y-1 text-sm text-muted-foreground">
									<li>• Use a unique password for each account</li>
									<li>• Avoid using personal information</li>
									<li>• Consider using a password manager</li>
									<li>• Change your password every 90 days</li>
								</ul>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
