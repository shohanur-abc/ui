import {
	AlertCircle,
	ArrowUpRight,
	CheckCircle2,
	ExternalLink,
	Globe,
	MoreHorizontal,
	Server,
	Shield,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ServiceCard = {
	name: string;
	description: string;
	status: 'operational' | 'degraded' | 'outage';
	uptime: string;
	responseTime: string;
	lastIncident: string;
	icon: React.ElementType;
};

const getStatusConfig = (status: ServiceCard['status']) => {
	switch (status) {
		case 'operational':
			return {
				icon: CheckCircle2,
				color: 'text-emerald-500',
				bgColor: 'bg-emerald-500/10',
				label: 'Operational',
			};
		case 'degraded':
			return {
				icon: AlertCircle,
				color: 'text-amber-500',
				bgColor: 'bg-amber-500/10',
				label: 'Degraded',
			};
		case 'outage':
			return {
				icon: AlertCircle,
				color: 'text-red-500',
				bgColor: 'bg-red-500/10',
				label: 'Outage',
			};
	}
};

const ServiceCardComponent = (service: ServiceCard) => {
	const statusConfig = getStatusConfig(service.status);
	const StatusIcon = statusConfig.icon;
	const ServiceIcon = service.icon;

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-muted p-2.5">
							<ServiceIcon className="size-5 text-muted-foreground" />
						</div>
						<div>
							<p className="font-medium">{service.name}</p>
							<p className="text-xs text-muted-foreground">
								{service.description}
							</p>
						</div>
					</div>
					<Badge
						variant="secondary"
						className={`${statusConfig.bgColor} ${statusConfig.color}`}
					>
						<StatusIcon className="mr-1 size-3" />
						{statusConfig.label}
					</Badge>
				</div>
				<div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
					<div className="text-center">
						<p className="text-lg font-bold text-emerald-500">
							{service.uptime}
						</p>
						<p className="text-xs text-muted-foreground">Uptime</p>
					</div>
					<div className="text-center">
						<p className="text-lg font-bold">{service.responseTime}</p>
						<p className="text-xs text-muted-foreground">Response</p>
					</div>
					<div className="text-center">
						<p className="text-xs font-medium">{service.lastIncident}</p>
						<p className="text-xs text-muted-foreground">Last Issue</p>
					</div>
				</div>
				<div className="mt-4 flex gap-2">
					<Button variant="outline" size="sm" className="flex-1 gap-1">
						<ExternalLink className="size-3.5" />
						View Logs
					</Button>
					<Button variant="ghost" size="icon" className="size-8">
						<MoreHorizontal className="size-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const services: ServiceCard[] = [
		{
			name: 'API Gateway',
			description: 'Core API services',
			status: 'operational',
			uptime: '99.9%',
			responseTime: '45ms',
			lastIncident: '30d ago',
			icon: Server,
		},
		{
			name: 'Payment Service',
			description: 'Payment processing',
			status: 'operational',
			uptime: '99.8%',
			responseTime: '120ms',
			lastIncident: '15d ago',
			icon: Shield,
		},
		{
			name: 'CDN',
			description: 'Content delivery',
			status: 'operational',
			uptime: '99.99%',
			responseTime: '12ms',
			lastIncident: '60d ago',
			icon: Globe,
		},
		{
			name: 'Database',
			description: 'Primary database cluster',
			status: 'degraded',
			uptime: '99.5%',
			responseTime: '85ms',
			lastIncident: '2h ago',
			icon: Server,
		},
		{
			name: 'Search Service',
			description: 'Product search',
			status: 'operational',
			uptime: '99.7%',
			responseTime: '65ms',
			lastIncident: '7d ago',
			icon: Zap,
		},
		{
			name: 'Auth Service',
			description: 'Authentication',
			status: 'operational',
			uptime: '99.95%',
			responseTime: '35ms',
			lastIncident: '45d ago',
			icon: Shield,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{services.map((service, i) => (
						<ServiceCardComponent key={i} {...service} />
					))}
				</div>
			</div>
		</section>
	);
}
