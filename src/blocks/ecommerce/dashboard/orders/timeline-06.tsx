import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Package,
	Truck,
	MapPin,
	CheckCircle2,
	Clock,
	AlertTriangle,
	Thermometer,
	Box,
} from 'lucide-react';

interface ShippingMilestone {
	id: string;
	status: 'completed' | 'current' | 'upcoming' | 'delayed';
	location: string;
	facility: string;
	timestamp: string;
	description: string;
	details?: { temperature?: string; weight?: string; handler?: string };
}

interface ShippingTimelineProps {
	trackingNumber: string;
	carrier: string;
	milestones: ShippingMilestone[];
}

interface MilestoneItemProps {
	milestone: ShippingMilestone;
	isLast: boolean;
}

const StatusConfig = {
	completed: {
		icon: CheckCircle2,
		color: 'text-accent',
		bg: 'bg-accent',
		line: 'bg-accent',
	},
	current: {
		icon: Truck,
		color: 'text-primary',
		bg: 'bg-primary',
		line: 'bg-border',
	},
	upcoming: {
		icon: Clock,
		color: 'text-muted-foreground',
		bg: 'bg-muted',
		line: 'bg-border',
	},
	delayed: {
		icon: AlertTriangle,
		color: 'text-destructive',
		bg: 'bg-destructive',
		line: 'bg-destructive',
	},
};

const MilestoneItem = ({ milestone, isLast }: MilestoneItemProps) => {
	const { icon: Icon, color, bg, line } = StatusConfig[milestone.status];
	return (
		<div className="flex gap-4">
			<div className="flex flex-col items-center">
				<div
					className={`size-10 rounded-full flex items-center justify-center ${bg} text-white`}
				>
					<Icon className="size-5" />
				</div>
				{!isLast && (
					<div
						className={`w-0.5 flex-1 my-2 ${milestone.status === 'completed' ? line : 'bg-border'}`}
					/>
				)}
			</div>

			<div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
				<div
					className={`p-4 rounded-xl border transition-colors ${milestone.status === 'current' ? 'bg-primary/5 border-primary/30' : milestone.status === 'delayed' ? 'bg-destructive/5 border-destructive/30' : 'bg-muted/20 border-border/50'}`}
				>
					<div className="flex items-start justify-between mb-2">
						<div>
							<p className="font-semibold">{milestone.facility}</p>
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<MapPin className="size-3" />
								{milestone.location}
							</div>
						</div>
						<div className="text-right">
							<Badge
								variant={
									milestone.status === 'delayed'
										? 'destructive'
										: milestone.status === 'current'
											? 'default'
											: 'outline'
								}
								className="mb-1"
							>
								{milestone.status === 'current'
									? 'Current Location'
									: milestone.status === 'delayed'
										? 'Delayed'
										: milestone.status}
							</Badge>
							<p className="text-xs text-muted-foreground">
								{milestone.timestamp}
							</p>
						</div>
					</div>

					<p className="text-sm text-muted-foreground">
						{milestone.description}
					</p>

					{milestone.details && (
						<div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
							{milestone.details.temperature && (
								<div className="flex items-center gap-1">
									<Thermometer className="size-3" />
									{milestone.details.temperature}
								</div>
							)}
							{milestone.details.weight && (
								<div className="flex items-center gap-1">
									<Box className="size-3" />
									{milestone.details.weight}
								</div>
							)}
							{milestone.details.handler && (
								<div className="flex items-center gap-1">
									Handler: {milestone.details.handler}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const milestones: ShippingMilestone[] = [
		{
			id: '1',
			status: 'current',
			location: 'Newark, NJ',
			facility: 'Distribution Center',
			timestamp: 'Jan 30, 6:30 AM',
			description: 'Package arrived at local distribution center',
			details: { handler: 'John S.' },
		},
		{
			id: '2',
			status: 'completed',
			location: 'Philadelphia, PA',
			facility: 'Transit Hub',
			timestamp: 'Jan 29, 8:00 PM',
			description: 'Package departed transit hub',
			details: { temperature: '68°F' },
		},
		{
			id: '3',
			status: 'completed',
			location: 'Richmond, VA',
			facility: 'Sorting Facility',
			timestamp: 'Jan 29, 2:00 PM',
			description: 'Package sorted and processed',
		},
		{
			id: '4',
			status: 'completed',
			location: 'Charlotte, NC',
			facility: 'Regional Hub',
			timestamp: 'Jan 28, 10:00 PM',
			description: 'Package arrived at regional hub',
		},
		{
			id: '5',
			status: 'completed',
			location: 'Los Angeles, CA',
			facility: 'Origin Facility',
			timestamp: 'Jan 27, 3:15 PM',
			description: 'Package picked up by carrier',
			details: { weight: '2.4 lbs' },
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-lg">Shipping Timeline</CardTitle>
								<p className="text-sm text-muted-foreground">UPS Express</p>
							</div>
							<Badge variant="outline" className="font-mono text-xs">
								1Z999AA1012345
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						{milestones.map((milestone, i) => (
							<MilestoneItem
								key={milestone.id}
								milestone={milestone}
								isLast={i === milestones.length - 1}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
