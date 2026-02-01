import {
	AlertTriangle,
	Check,
	Eye,
	EyeOff,
	Fingerprint,
	Key,
	Lock,
	Shield,
	ShieldCheck,
	Smartphone,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

type SecurityFeature = {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	enabled: boolean;
	recommended?: boolean;
};

type SecurityScore = {
	score: number;
	level: 'weak' | 'moderate' | 'strong' | 'excellent';
	suggestions: string[];
};

const SecurityToggleCard = ({
	title,
	description,
	icon: Icon,
	enabled,
	recommended,
}: SecurityFeature) => (
	<div
		className={`group flex items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 ${
			enabled ? 'bg-primary/5 border-primary/30' : ''
		}`}
	>
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
				enabled
					? 'bg-emerald-500/10 text-emerald-500'
					: 'bg-muted text-muted-foreground'
			}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1 space-y-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{title}</span>
				{recommended && !enabled && (
					<Badge variant="secondary" className="text-xs">
						Recommended
					</Badge>
				)}
				{enabled && (
					<Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
						<Check className="mr-1 size-3" />
						Active
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

const SecurityScoreCard = ({ score, level, suggestions }: SecurityScore) => {
	const colors = {
		weak: 'text-destructive',
		moderate: 'text-amber-500',
		strong: 'text-emerald-500',
		excellent: 'text-primary',
	};

	return (
		<Card className="relative overflow-hidden">
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
			<CardContent className="pt-6">
				<div className="flex items-center gap-6">
					<div className="relative flex size-24 items-center justify-center">
						<svg className="size-full -rotate-90">
							<circle
								cx="48"
								cy="48"
								r="40"
								className="fill-none stroke-muted stroke-[8]"
							/>
							<circle
								cx="48"
								cy="48"
								r="40"
								className={`fill-none stroke-[8] transition-all duration-500 ${
									level === 'weak'
										? 'stroke-destructive'
										: level === 'moderate'
											? 'stroke-amber-500'
											: 'stroke-emerald-500'
								}`}
								strokeDasharray={`${score * 2.51} 251`}
								strokeLinecap="round"
							/>
						</svg>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<span className={`text-2xl font-bold ${colors[level]}`}>
								{score}
							</span>
							<span className="text-xs text-muted-foreground">/100</span>
						</div>
					</div>
					<div className="flex-1">
						<h3 className="font-semibold">Security Score</h3>
						<p className={`text-sm font-medium ${colors[level]}`}>
							{level.charAt(0).toUpperCase() + level.slice(1)}
						</p>
						<div className="mt-2 space-y-1">
							{suggestions.map((suggestion) => (
								<div
									key={suggestion}
									className="flex items-center gap-2 text-xs text-muted-foreground"
								>
									<AlertTriangle className="size-3" />
									{suggestion}
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const securityFeatures: SecurityFeature[] = [
		{
			id: '2fa',
			title: 'Two-Factor Authentication',
			description: 'Require a verification code in addition to your password',
			icon: Smartphone,
			enabled: true,
		},
		{
			id: 'biometric',
			title: 'Biometric Login',
			description: 'Use fingerprint or face recognition for quick access',
			icon: Fingerprint,
			enabled: false,
			recommended: true,
		},
		{
			id: 'sessionTimeout',
			title: 'Auto Session Timeout',
			description: 'Automatically log out after 30 minutes of inactivity',
			icon: Lock,
			enabled: true,
		},
		{
			id: 'loginAlerts',
			title: 'Login Alerts',
			description: 'Get notified of new sign-ins to your account',
			icon: Shield,
			enabled: true,
		},
		{
			id: 'passwordless',
			title: 'Passwordless Login',
			description: 'Sign in using magic links sent to your email',
			icon: Key,
			enabled: false,
		},
		{
			id: 'ipWhitelist',
			title: 'IP Allowlist',
			description: 'Restrict access to specific IP addresses only',
			icon: ShieldCheck,
			enabled: false,
			recommended: true,
		},
	];

	const securityScore: SecurityScore = {
		score: 72,
		level: 'moderate',
		suggestions: [
			'Enable biometric login',
			'Set up IP allowlist',
			'Update password regularly',
		],
	};

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<SecurityScoreCard {...securityScore} />

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Shield className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Security Features</CardTitle>
									<CardDescription>
										Enable features to protect your account
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{securityFeatures.map((feature) => (
								<SecurityToggleCard key={feature.id} {...feature} />
							))}
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Reset to Defaults</Button>
						<Button>Save Settings</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
