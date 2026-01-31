import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
	AlertCircle,
	Bell,
	CheckCircle,
	Globe,
	Key,
	Lock,
	Mail,
	MessageSquare,
	Moon,
	Shield,
	Smartphone,
	Volume2,
} from 'lucide-react';

const SecurityOverview = ({
	src,
	fallback,
	name,
	securityScore,
	lastLogin,
}: {
	src: string;
	fallback: string;
	name: string;
	securityScore: number;
	lastLogin: string;
}) => (
	<div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10 space-y-4">
		<div className="flex items-center gap-4">
			<Avatar className="size-16 ring-2 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div>
				<h2 className="font-semibold">{name}</h2>
				<p className="text-sm text-muted-foreground">Last login: {lastLogin}</p>
			</div>
		</div>
		<div className="space-y-2">
			<div className="flex justify-between text-sm">
				<span>Security Score</span>
				<span className={`font-medium ${securityScore >= 80 ? 'text-green-500' : securityScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
					{securityScore}%
				</span>
			</div>
			<Progress
				value={securityScore}
				className={`h-2 ${securityScore >= 80 ? '[&>div]:bg-green-500' : securityScore >= 50 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500'}`}
			/>
		</div>
	</div>
);

const SecurityItem = ({
	icon: Icon,
	label,
	description,
	status,
	statusText,
	action,
}: {
	icon: React.ElementType;
	label: string;
	description: string;
	status: 'enabled' | 'disabled' | 'warning';
	statusText: string;
	action?: string;
}) => {
	const statusColors = {
		enabled: 'bg-green-500/20 text-green-600',
		disabled: 'bg-muted text-muted-foreground',
		warning: 'bg-amber-500/20 text-amber-600',
	};
	const StatusIcon = status === 'enabled' ? CheckCircle : status === 'warning' ? AlertCircle : Lock;

	return (
		<div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
			<div className="p-2 rounded-lg bg-muted shrink-0">
				<Icon className="size-5 text-muted-foreground" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<span className="font-medium">{label}</span>
					<Badge className={`text-xs ${statusColors[status]}`}>
						<StatusIcon className="size-3 mr-1" />
						{statusText}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
			{action && (
				<Button variant="outline" size="sm" className="shrink-0">
					{action}
				</Button>
			)}
		</div>
	);
};

const NotificationSetting = ({
	icon: Icon,
	label,
	description,
	enabled,
}: {
	icon: React.ElementType;
	label: string;
	description: string;
	enabled: boolean;
}) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<Icon className="size-5 text-muted-foreground" />
			<div>
				<p className="text-sm font-medium">{label}</p>
				<p className="text-xs text-muted-foreground">{description}</p>
			</div>
		</div>
		<Switch defaultChecked={enabled} />
	</div>
);

export default function Main() {
	const profileData = {
		security: {
			src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			fallback: 'JD',
			name: 'John Davidson',
			securityScore: 75,
			lastLogin: 'Today at 10:45 AM',
		},
		securityItems: [
			{
				icon: Shield,
				label: 'Two-Factor Authentication',
				description: 'Add an extra layer of security to your account',
				status: 'enabled' as const,
				statusText: 'Enabled',
			},
			{
				icon: Key,
				label: 'Password',
				description: 'Last changed 45 days ago',
				status: 'warning' as const,
				statusText: 'Update Recommended',
				action: 'Change',
			},
			{
				icon: Smartphone,
				label: 'Trusted Devices',
				description: '3 devices have access to your account',
				status: 'enabled' as const,
				statusText: 'Active',
				action: 'Manage',
			},
		],
		notifications: [
			{ icon: Mail, label: 'Email Notifications', description: 'Order updates and promotions', enabled: true },
			{ icon: Bell, label: 'Push Notifications', description: 'Mobile app alerts', enabled: true },
			{ icon: MessageSquare, label: 'SMS Alerts', description: 'Text message updates', enabled: false },
			{ icon: Volume2, label: 'Marketing', description: 'New products and offers', enabled: false },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6">
						<div className="grid @lg:grid-cols-[320px_1fr] gap-6">
							<div className="space-y-6">
								<SecurityOverview {...profileData.security} />
								<div className="space-y-1">
									<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-2 mb-3">
										Notifications
									</h3>
									{profileData.notifications.map((item, i) => (
										<NotificationSetting key={i} {...item} />
									))}
								</div>
							</div>
							<div>
								<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
									Security Settings
								</h3>
								<div className="space-y-1">
									{profileData.securityItems.map((item, i) => (
										<SecurityItem key={i} {...item} />
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
