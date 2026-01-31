'use client';

import { Users, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type SalesRep = {
	id: string;
	name: string;
	avatar: string;
	email: string;
	phone: string;
	region: string;
	revenue: number;
	target: number;
	deals: number;
	winRate: number;
	rank: number;
};

type SalesTeamTableCardProps = {
	title: string;
	description: string;
	team: SalesRep[];
	actionLabel: string;
	onAction: () => void;
};

const getRankBadge = (rank: number) => {
	if (rank === 1) return <Badge className="bg-amber-500 text-white">🥇 #1</Badge>;
	if (rank === 2) return <Badge variant="secondary">🥈 #2</Badge>;
	if (rank === 3) return <Badge variant="outline">🥉 #3</Badge>;
	return <Badge variant="outline">#{rank}</Badge>;
};

const SalesTeamTableCard = ({
	title,
	description,
	team,
	actionLabel,
	onAction,
}: SalesTeamTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Users className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
			<Button variant="outline" size="sm" onClick={onAction}>
				{actionLabel}
			</Button>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Rank</TableHead>
							<TableHead>Sales Rep</TableHead>
							<TableHead>Region</TableHead>
							<TableHead className="text-right">Revenue</TableHead>
							<TableHead className="text-right">Target %</TableHead>
							<TableHead className="text-right">Deals</TableHead>
							<TableHead className="text-right">Win Rate</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{team.map((rep) => {
							const targetPercentage = ((rep.revenue / rep.target) * 100).toFixed(0);
							return (
								<TableRow key={rep.id} className="hover:bg-muted/50 transition-colors">
									<TableCell>{getRankBadge(rep.rank)}</TableCell>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar className="size-10">
												<AvatarImage src={rep.avatar} alt={rep.name} />
												<AvatarFallback>
													{rep.name.split(' ').map((n) => n[0]).join('')}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="font-medium">{rep.name}</p>
												<div className="flex items-center gap-2 text-xs text-muted-foreground">
													<Mail className="size-3" />
													{rep.email}
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-1 text-muted-foreground">
											<MapPin className="size-3" />
											{rep.region}
										</div>
									</TableCell>
									<TableCell className="text-right font-semibold">
										${rep.revenue.toLocaleString()}
									</TableCell>
									<TableCell className="text-right">
										<span
											className={
												Number(targetPercentage) >= 100
													? 'text-primary font-semibold'
													: Number(targetPercentage) >= 80
														? 'text-amber-500'
														: 'text-destructive'
											}
										>
											{targetPercentage}%
										</span>
									</TableCell>
									<TableCell className="text-right">{rep.deals}</TableCell>
									<TableCell className="text-right">
										<span
											className={
												rep.winRate >= 50
													? 'text-primary'
													: 'text-muted-foreground'
											}
										>
											{rep.winRate}%
										</span>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const team: SalesRep[] = [
		{ id: 'REP-001', name: 'Sarah Johnson', avatar: '/placeholder.svg', email: 's.johnson@company.com', phone: '+1-555-0101', region: 'West Coast', revenue: 285000, target: 250000, deals: 42, winRate: 68, rank: 1 },
		{ id: 'REP-002', name: 'Michael Chen', avatar: '/placeholder.svg', email: 'm.chen@company.com', phone: '+1-555-0102', region: 'East Coast', revenue: 248000, target: 250000, deals: 38, winRate: 55, rank: 2 },
		{ id: 'REP-003', name: 'Emily Davis', avatar: '/placeholder.svg', email: 'e.davis@company.com', phone: '+1-555-0103', region: 'Midwest', revenue: 195000, target: 200000, deals: 31, winRate: 52, rank: 3 },
		{ id: 'REP-004', name: 'James Wilson', avatar: '/placeholder.svg', email: 'j.wilson@company.com', phone: '+1-555-0104', region: 'South', revenue: 168000, target: 200000, deals: 28, winRate: 48, rank: 4 },
		{ id: 'REP-005', name: 'Lisa Anderson', avatar: '/placeholder.svg', email: 'l.anderson@company.com', phone: '+1-555-0105', region: 'Northeast', revenue: 142000, target: 200000, deals: 22, winRate: 42, rank: 5 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<SalesTeamTableCard
					title="Sales Team Leaderboard"
					description="Team performance rankings this quarter"
					team={team}
					actionLabel="View All"
					onAction={() => {}}
				/>
			</div>
		</section>
	);
}
