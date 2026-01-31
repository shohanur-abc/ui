import {
	AlertTriangle,
	Calendar,
	Check,
	ChevronRight,
	Clock,
	Key,
	Lock,
	RotateCcw,
	Shield,
	Trash2,
	User,
	type LucideIcon,
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
import { Separator } from '@/components/ui/separator';

type ActivityLog = {
	id: string;
	action: string;
	description: string;
	icon: LucideIcon;
	timestamp: string;
	status: 'success' | 'warning' | 'error';
	metadata?: string;
};

type SecurityEvent = {
	id: string;
	type: string;
	location: string;
	timestamp: string;
	blocked: boolean;
};

const ActivityItem = ({
	action,
	description,
	icon: Icon,
	timestamp,
	status,
	metadata,
}: ActivityLog) => (
	<div className="flex items-start gap-4 py-4">
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
				status === 'success'
					? 'bg-emerald-500/10 text-emerald-500'
					: status === 'warning'
						? 'bg-amber-500/10 text-amber-500'
						: 'bg-destructive/10 text-destructive'
			}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="min-w-0 flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{action}</span>
				<Badge
					variant="secondary"
					className={
						status === 'success'
							? 'bg-emerald-500/10 text-emerald-500 border-0'
							: status === 'warning'
								? 'bg-amber-500/10 text-amber-500 border-0'
								: 'bg-destructive/10 text-destructive border-0'
					}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			</div>
			<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			{metadata && (
				<p className="mt-1 text-xs text-muted-foreground">{metadata}</p>
			)}
		</div>
		<span className="text-sm text-muted-foreground whitespace-nowrap">
			{timestamp}
		</span>
	</div>
);

const SecurityEventRow = ({
	type,
	location,
	timestamp,
	blocked,
}: SecurityEvent) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div
				className={`size-2 rounded-full ${
					blocked ? 'bg-destructive' : 'bg-emerald-500'
				}`}
			/>
			<div>
				<p className="text-sm font-medium">{type}</p>
				<p className="text-xs text-muted-foreground">{location}</p>
			</div>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-sm text-muted-foreground">{timestamp}</span>
			{blocked && (
				<Badge variant="destructive" className="text-xs">
					Blocked
				</Badge>
			)}
		</div>
	</div>
);

export default function Main() {
	const activityLogs: ActivityLog[] = [
		{
			id: '1',
			action: 'Password Changed',
			description: 'Your password was successfully updated',
			icon: Key,
			timestamp: '2 hours ago',
			status: 'success',
		},
		{
			id: '2',
			action: 'New Login',
			description: 'Signed in from a new device',
			icon: User,
			timestamp: '1 day ago',
			status: 'success',
			metadata: 'MacBook Pro, San Francisco, CA',
		},
		{
			id: '3',
			action: 'Failed Login Attempt',
			description: 'Incorrect password entered 3 times',
			icon: Lock,
			timestamp: '2 days ago',
			status: 'warning',
			metadata: 'IP: 192.168.1.xxx',
		},
		{
			id: '4',
			action: '2FA Disabled',
			description: 'Two-factor authentication was disabled',
			icon: Shield,
			timestamp: '5 days ago',
			status: 'warning',
		},
		{
			id: '5',
			action: 'Account Recovery',
			description: 'Password reset email was sent',
			icon: RotateCcw,
			timestamp: '1 week ago',
			status: 'success',
		},
	];

	const securityEvents: SecurityEvent[] = [
		{ id: '1', type: 'Login Attempt', location: 'Unknown Location', timestamp: '10 mins ago', blocked: true },
		{ id: '2', type: 'API Request', location: 'Russia', timestamp: '1 hour ago', blocked: true },
		{ id: '3', type: 'Password Reset', location: 'China', timestamp: '3 hours ago', blocked: true },
		{ id: '4', type: 'Login', location: 'San Francisco, CA', timestamp: '5 hours ago', blocked: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Clock className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Security Activity</CardTitle>
											<CardDescription>
												Recent security-related events on your account
											</CardDescription>
										</div>
									</div>
									<Button variant="outline" size="sm" className="gap-2">
										<Calendar className="size-4" />
										View All
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y">
								{activityLogs.map((log) => (
									<ActivityItem key={log.id} {...log} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Blocked Events</CardTitle>
								<CardDescription>
									Suspicious activity we've blocked
								</CardDescription>
							</CardHeader>
							<CardContent className="divide-y">
								{securityEvents.map((event) => (
									<SecurityEventRow key={event.id} {...event} />
								))}
							</CardContent>
						</Card>

						<Card className="bg-primary/5 border-primary/20">
							<CardContent className="pt-6 text-center">
								<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
									<Shield className="size-6 text-primary" />
								</div>
								<h4 className="font-semibold">Account Protected</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									3 suspicious activities blocked this month
								</p>
							</CardContent>
						</Card>

						<Button variant="outline" className="w-full gap-2">
							<Trash2 className="size-4" />
							Clear Activity Log
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
