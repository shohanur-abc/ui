import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Users,
	UserPlus,
	Shield,
	Key,
	Settings,
	LogIn,
	LogOut,
	AlertTriangle,
	CheckCircle,
	type LucideIcon,
} from 'lucide-react';

interface TeamActivity {
	id: string;
	type: 'login' | 'logout' | 'permission' | 'invite' | 'settings' | 'security';
	user: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
		role: string;
	};
	action: string;
	target?: string;
	location?: string;
	device?: string;
	timestamp: string;
	isAlert?: boolean;
}

interface TeamFeedProps {
	title: string;
	activities: TeamActivity[];
	activeMembers: number;
	totalMembers: number;
}

const ActivityIcon = ({
	type,
	isAlert,
}: {
	type: TeamActivity['type'];
	isAlert?: boolean;
}) => {
	if (isAlert) {
		return (
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/20">
				<AlertTriangle className="size-5 text-rose-400" />
			</div>
		);
	}

	const config: Record<
		TeamActivity['type'],
		{ icon: LucideIcon; className: string }
	> = {
		login: { icon: LogIn, className: 'bg-emerald-500/20 text-emerald-400' },
		logout: { icon: LogOut, className: 'bg-muted text-muted-foreground' },
		permission: { icon: Shield, className: 'bg-purple-500/20 text-purple-400' },
		invite: { icon: UserPlus, className: 'bg-blue-500/20 text-blue-400' },
		settings: { icon: Settings, className: 'bg-amber-500/20 text-amber-400' },
		security: { icon: Key, className: 'bg-rose-500/20 text-rose-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const RoleBadge = ({ role }: { role: string }) => {
	const config: Record<string, string> = {
		admin: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		manager: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		editor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		viewer: 'bg-muted text-muted-foreground border-border',
	};

	return (
		<Badge
			variant="outline"
			className={
				config[role.toLowerCase()] ||
				'bg-muted text-muted-foreground border-border'
			}
		>
			{role}
		</Badge>
	);
};

const ActivityCard = ({ activity }: { activity: TeamActivity }) => (
	<div
		className={`group rounded-xl border p-4 backdrop-blur-sm transition-all hover:shadow-lg ${
			activity.isAlert
				? 'border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50'
				: 'border-border/50 bg-card/80 hover:border-primary/30 hover:shadow-primary/5'
		}`}
	>
		<div className="flex gap-4">
			<ActivityIcon type={activity.type} isAlert={activity.isAlert} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex items-center gap-2">
						<Avatar className="size-6">
							<AvatarImage
								src={activity.user.avatar}
								alt={activity.user.name}
							/>
							<AvatarFallback className="text-[10px] bg-secondary">
								{activity.user.initials}
							</AvatarFallback>
						</Avatar>
						<span className="font-medium text-foreground">
							{activity.user.name}
						</span>
						<RoleBadge role={activity.user.role} />
					</div>
					<span className="text-xs text-muted-foreground shrink-0">
						{activity.timestamp}
					</span>
				</div>
				<p className="text-sm text-muted-foreground">
					{activity.action}
					{activity.target && (
						<span className="text-foreground font-medium">
							{' '}
							{activity.target}
						</span>
					)}
				</p>
				{(activity.location || activity.device) && (
					<div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground/70">
						{activity.device && <span>{activity.device}</span>}
						{activity.device && activity.location && <span>•</span>}
						{activity.location && <span>{activity.location}</span>}
					</div>
				)}
			</div>
		</div>
	</div>
);

const TeamStatus = ({
	activeMembers,
	totalMembers,
}: {
	activeMembers: number;
	totalMembers: number;
}) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
				<Users className="size-5 text-primary" />
			</div>
			<div>
				<p className="text-sm text-muted-foreground">Team Status</p>
				<p className="font-semibold text-foreground">
					{activeMembers} of {totalMembers} online
				</p>
			</div>
		</div>
		<div className="flex -space-x-2">
			{[...Array(Math.min(activeMembers, 5))].map((_, i) => (
				<div
					key={i}
					className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary/20"
				>
					<span className="text-xs font-medium text-primary">
						{String.fromCharCode(65 + i)}
					</span>
				</div>
			))}
			{activeMembers > 5 && (
				<div className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium">
					+{activeMembers - 5}
				</div>
			)}
		</div>
	</div>
);

const TeamFeed = ({
	title,
	activities,
	activeMembers,
	totalMembers,
}: TeamFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm">
				Manage Team
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<TeamStatus activeMembers={activeMembers} totalMembers={totalMembers} />
			<div className="space-y-3">
				{activities.map((activity) => (
					<ActivityCard key={activity.id} activity={activity} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const teamActivities: TeamActivity[] = [
		{
			id: '1',
			type: 'security',
			user: {
				name: 'Unknown Device',
				email: 'sarah@company.com',
				initials: 'SC',
				role: 'Admin',
			},
			action: 'Failed login attempt for',
			target: 'sarah@company.com',
			location: 'Moscow, Russia',
			device: 'Unknown Browser',
			timestamp: '2 min ago',
			isAlert: true,
		},
		{
			id: '2',
			type: 'login',
			user: {
				name: 'Sarah Chen',
				email: 'sarah@company.com',
				initials: 'SC',
				role: 'Admin',
			},
			action: 'Logged in successfully',
			location: 'San Francisco, CA',
			device: 'Chrome on MacOS',
			timestamp: '15 min ago',
		},
		{
			id: '3',
			type: 'permission',
			user: {
				name: 'Mike Johnson',
				email: 'mike@company.com',
				initials: 'MJ',
				role: 'Manager',
			},
			action: 'Changed role for Emily Davis to',
			target: 'Editor',
			timestamp: '1 hour ago',
		},
		{
			id: '4',
			type: 'invite',
			user: {
				name: 'Emily Davis',
				email: 'emily@company.com',
				initials: 'ED',
				role: 'Editor',
			},
			action: 'Invited new team member',
			target: 'alex.kim@company.com',
			timestamp: '2 hours ago',
		},
		{
			id: '5',
			type: 'settings',
			user: {
				name: 'Jordan Lee',
				email: 'jordan@company.com',
				initials: 'JL',
				role: 'Manager',
			},
			action: 'Updated notification preferences',
			timestamp: '3 hours ago',
		},
		{
			id: '6',
			type: 'logout',
			user: {
				name: 'Lisa Anderson',
				email: 'lisa@company.com',
				initials: 'LA',
				role: 'Viewer',
			},
			action: 'Logged out',
			device: 'Safari on iOS',
			timestamp: '4 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<TeamFeed
					title="Team Activity"
					activities={teamActivities}
					activeMembers={8}
					totalMembers={12}
				/>
			</div>
		</section>
	);
}
