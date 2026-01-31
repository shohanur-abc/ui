import {
	AlertCircle,
	Chrome,
	Globe,
	Laptop,
	LogOut,
	MapPin,
	Monitor,
	MoreVertical,
	Smartphone,
	Tablet,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

type Session = {
	id: string;
	device: string;
	deviceType: 'desktop' | 'mobile' | 'tablet';
	browser: string;
	os: string;
	location: string;
	ip: string;
	lastActive: string;
	current: boolean;
};

const deviceIcons: Record<string, LucideIcon> = {
	desktop: Monitor,
	mobile: Smartphone,
	tablet: Tablet,
};

const SessionCard = ({
	device,
	deviceType,
	browser,
	os,
	location,
	ip,
	lastActive,
	current,
}: Session) => {
	const DeviceIcon = deviceIcons[deviceType] || Laptop;

	return (
		<div
			className={`group flex items-start gap-4 rounded-lg border p-4 transition-all ${
				current ? 'border-primary/30 bg-primary/5' : 'hover:border-primary/50'
			}`}
		>
			<div
				className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${
					current ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
				}`}
			>
				<DeviceIcon className="size-6" />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<h4 className="font-medium">{device}</h4>
					{current && (
						<Badge className="bg-emerald-500/10 text-emerald-500 border-0">
							Current Session
						</Badge>
					)}
				</div>
				<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
					<span className="flex items-center gap-1">
						<Chrome className="size-3" />
						{browser}
					</span>
					<span>{os}</span>
					<span className="flex items-center gap-1">
						<MapPin className="size-3" />
						{location}
					</span>
				</div>
				<div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
					<span>IP: {ip}</span>
					<span>•</span>
					<span>{current ? 'Active now' : `Last active: ${lastActive}`}</span>
				</div>
			</div>
			{!current && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="text-destructive">
							<LogOut className="mr-2 size-4" />
							Revoke Session
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
};

export default function Main() {
	const sessions: Session[] = [
		{
			id: '1',
			device: 'MacBook Pro 16"',
			deviceType: 'desktop',
			browser: 'Chrome 120',
			os: 'macOS Sonoma',
			location: 'San Francisco, CA',
			ip: '192.168.1.xxx',
			lastActive: 'Active now',
			current: true,
		},
		{
			id: '2',
			device: 'iPhone 15 Pro',
			deviceType: 'mobile',
			browser: 'Safari',
			os: 'iOS 17.2',
			location: 'San Francisco, CA',
			ip: '192.168.1.xxx',
			lastActive: '2 hours ago',
			current: false,
		},
		{
			id: '3',
			device: 'iPad Pro',
			deviceType: 'tablet',
			browser: 'Safari',
			os: 'iPadOS 17',
			location: 'Oakland, CA',
			ip: '10.0.0.xxx',
			lastActive: '1 day ago',
			current: false,
		},
		{
			id: '4',
			device: 'Windows Desktop',
			deviceType: 'desktop',
			browser: 'Firefox 121',
			os: 'Windows 11',
			location: 'New York, NY',
			ip: '172.16.0.xxx',
			lastActive: '3 days ago',
			current: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Globe className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Active Sessions</CardTitle>
										<CardDescription>
											Devices currently signed in to your account
										</CardDescription>
									</div>
								</div>
								<Button variant="destructive" size="sm" className="gap-2">
									<LogOut className="size-4" />
									Sign Out All
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-6">
							{sessions.map((session) => (
								<SessionCard key={session.id} {...session} />
							))}
						</CardContent>
					</Card>

					<Card className="border-amber-500/20 bg-amber-500/5">
						<CardContent className="flex items-start gap-4 pt-6">
							<AlertCircle className="size-5 shrink-0 text-amber-500" />
							<div>
								<h4 className="font-medium">Security Tip</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									If you see a session you don't recognize, revoke it immediately and
									change your password. Enable two-factor authentication for additional
									security.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
