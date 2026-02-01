import { Check, Key, Shield, ShieldAlert, Smartphone } from 'lucide-react';

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
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

type SecurityOption = {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	enabled: boolean;
	status?: 'active' | 'inactive' | 'warning';
};

type PasswordRequirement = {
	label: string;
	met: boolean;
};

const SecurityToggle = ({
	title,
	description,
	icon: Icon,
	enabled,
	status,
}: SecurityOption) => (
	<div className="group flex items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/30">
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
				status === 'active'
					? 'bg-emerald-500/10 text-emerald-500'
					: status === 'warning'
						? 'bg-amber-500/10 text-amber-500'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1 space-y-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{title}</span>
				{status === 'active' && (
					<Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
						Active
					</Badge>
				)}
				{status === 'warning' && (
					<Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
						Recommended
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

const PasswordStrength = ({
	strength,
	requirements,
}: {
	strength: number;
	requirements: PasswordRequirement[];
}) => (
	<div className="space-y-3">
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
					{strength >= 80 ? 'Strong' : strength >= 50 ? 'Medium' : 'Weak'}
				</span>
			</div>
			<Progress value={strength} className="h-2" />
		</div>
		<div className="grid gap-2 @sm:grid-cols-2">
			{requirements.map((req) => (
				<div key={req.label} className="flex items-center gap-2 text-sm">
					<div
						className={`flex size-4 items-center justify-center rounded-full ${
							req.met
								? 'bg-emerald-500/10 text-emerald-500'
								: 'bg-muted text-muted-foreground'
						}`}
					>
						{req.met && <Check className="size-3" />}
					</div>
					<span
						className={req.met ? 'text-foreground' : 'text-muted-foreground'}
					>
						{req.label}
					</span>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const securityOptions: SecurityOption[] = [
		{
			id: '2fa',
			title: 'Two-Factor Authentication',
			description: 'Add an extra layer of security to your account',
			icon: Smartphone,
			enabled: true,
			status: 'active',
		},
		{
			id: 'sessions',
			title: 'Session Management',
			description: 'Monitor and manage active login sessions',
			icon: Shield,
			enabled: true,
			status: 'active',
		},
		{
			id: 'alerts',
			title: 'Security Alerts',
			description: 'Get notified about suspicious activities',
			icon: ShieldAlert,
			enabled: false,
			status: 'warning',
		},
	];

	const requirements: PasswordRequirement[] = [
		{ label: 'At least 8 characters', met: true },
		{ label: 'One uppercase letter', met: true },
		{ label: 'One lowercase letter', met: true },
		{ label: 'One number', met: true },
		{ label: 'One special character', met: false },
		{ label: 'No common patterns', met: true },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Key className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Change Password</CardTitle>
									<CardDescription>
										Update your password regularly for better security
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							<div className="space-y-2">
								<Label htmlFor="currentPassword">Current Password</Label>
								<Input
									id="currentPassword"
									type="password"
									placeholder="Enter current password"
								/>
							</div>
							<div className="grid gap-4 @sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="newPassword">New Password</Label>
									<Input
										id="newPassword"
										type="password"
										placeholder="Enter new password"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirm Password</Label>
									<Input
										id="confirmPassword"
										type="password"
										placeholder="Confirm new password"
									/>
								</div>
							</div>
							<PasswordStrength strength={75} requirements={requirements} />
							<div className="flex justify-end">
								<Button>Update Password</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Shield className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Security Options</CardTitle>
									<CardDescription>
										Manage your account security settings
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{securityOptions.map((option) => (
								<SecurityToggle key={option.id} {...option} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
