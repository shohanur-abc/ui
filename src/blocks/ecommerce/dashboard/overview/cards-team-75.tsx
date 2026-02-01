import {
	ArrowUpRight,
	Award,
	BarChart3,
	Briefcase,
	Mail,
	MoreHorizontal,
	Target,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type TeamMember = {
	id: string;
	name: string;
	role: string;
	email: string;
	initials: string;
	sales: string;
	target: string;
	progress: number;
	deals: number;
	performance: 'excellent' | 'good' | 'average';
};

const getPerformanceStyle = (performance: TeamMember['performance']) => {
	switch (performance) {
		case 'excellent':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'good':
			return 'bg-primary/10 text-primary';
		case 'average':
			return 'bg-amber-500/10 text-amber-500';
	}
};

const TeamMemberCard = (member: TeamMember) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-12">
						<AvatarFallback className="text-sm font-medium">
							{member.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium">{member.name}</p>
						<p className="text-xs text-muted-foreground">{member.role}</p>
					</div>
				</div>
				<Badge
					variant="secondary"
					className={getPerformanceStyle(member.performance)}
				>
					{member.performance === 'excellent' && (
						<Award className="mr-1 size-3" />
					)}
					{member.performance}
				</Badge>
			</div>
			<div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
				<div className="text-center">
					<p className="text-lg font-bold">{member.sales}</p>
					<p className="text-xs text-muted-foreground">Sales</p>
				</div>
				<div className="text-center">
					<p className="text-lg font-bold">{member.deals}</p>
					<p className="text-xs text-muted-foreground">Deals</p>
				</div>
				<div className="text-center">
					<p className="text-lg font-bold">{member.progress}%</p>
					<p className="text-xs text-muted-foreground">Target</p>
				</div>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Target Progress</span>
					<span className="font-medium">
						{member.sales} / {member.target}
					</span>
				</div>
				<Progress value={member.progress} className="h-2" />
			</div>
			<div className="mt-4 flex gap-2">
				<Button variant="outline" size="sm" className="flex-1 gap-1">
					<Mail className="size-3.5" />
					Contact
				</Button>
				<Button variant="outline" size="sm" className="flex-1 gap-1">
					<BarChart3 className="size-3.5" />
					Stats
				</Button>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const teamMembers: TeamMember[] = [
		{
			id: 'TM-001',
			name: 'Sarah Wilson',
			role: 'Sales Manager',
			email: 'sarah@example.com',
			initials: 'SW',
			sales: '$142K',
			target: '$150K',
			progress: 95,
			deals: 45,
			performance: 'excellent',
		},
		{
			id: 'TM-002',
			name: 'Michael Chen',
			role: 'Account Executive',
			email: 'michael@example.com',
			initials: 'MC',
			sales: '$98K',
			target: '$120K',
			progress: 82,
			deals: 38,
			performance: 'good',
		},
		{
			id: 'TM-003',
			name: 'Emma Johnson',
			role: 'Sales Rep',
			email: 'emma@example.com',
			initials: 'EJ',
			sales: '$76K',
			target: '$100K',
			progress: 76,
			deals: 28,
			performance: 'good',
		},
		{
			id: 'TM-004',
			name: 'James Brown',
			role: 'Sales Rep',
			email: 'james@example.com',
			initials: 'JB',
			sales: '$54K',
			target: '$90K',
			progress: 60,
			deals: 22,
			performance: 'average',
		},
		{
			id: 'TM-005',
			name: 'Lisa Davis',
			role: 'Account Executive',
			email: 'lisa@example.com',
			initials: 'LD',
			sales: '$112K',
			target: '$120K',
			progress: 93,
			deals: 42,
			performance: 'excellent',
		},
		{
			id: 'TM-006',
			name: 'Robert Miller',
			role: 'Sales Rep',
			email: 'robert@example.com',
			initials: 'RM',
			sales: '$68K',
			target: '$90K',
			progress: 76,
			deals: 25,
			performance: 'good',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{teamMembers.map((member) => (
						<TeamMemberCard key={member.id} {...member} />
					))}
				</div>
			</div>
		</section>
	);
}
