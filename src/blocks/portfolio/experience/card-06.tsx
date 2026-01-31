import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, TrendingUp } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-xl">
						<Eyebrow icon={Users} text="Leadership" />
						<Title text="Teams I've Led" />
						<Description text="Experience leading and growing engineering teams." />
					</div>
					<Stats
						items={[
							{ label: 'Direct Reports', value: '25+' },
							{ label: 'Teams Led', value: '5' },
							{ label: 'Years Leading', value: '6' },
						]}
					/>
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					<TeamCard
						team="Platform Engineering"
						company="TechCorp"
						size={15}
						role="Director"
						period="2023 - Present"
						growth="+200%"
						members={[
							{
								name: 'Alex Chen',
								avatar: 'https://i.pravatar.cc/100?img=1',
								initials: 'AC',
							},
							{
								name: 'Sarah Kim',
								avatar: 'https://i.pravatar.cc/100?img=2',
								initials: 'SK',
							},
							{
								name: 'Mike Ross',
								avatar: 'https://i.pravatar.cc/100?img=3',
								initials: 'MR',
							},
						]}
					/>
					<TeamCard
						team="Design Systems"
						company="TechCorp"
						size={8}
						role="Tech Lead"
						period="2021 - 2023"
						growth="+100%"
						members={[
							{
								name: 'Jane Doe',
								avatar: 'https://i.pravatar.cc/100?img=4',
								initials: 'JD',
							},
							{
								name: 'Bob Smith',
								avatar: 'https://i.pravatar.cc/100?img=5',
								initials: 'BS',
							},
						]}
					/>
					<TeamCard
						team="Frontend Platform"
						company="Meta"
						size={6}
						role="Team Lead"
						period="2020 - 2021"
						growth="+50%"
						members={[
							{
								name: 'Emily Wang',
								avatar: 'https://i.pravatar.cc/100?img=6',
								initials: 'EW',
							},
							{
								name: 'David Lee',
								avatar: 'https://i.pravatar.cc/100?img=7',
								initials: 'DL',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface StatItem {
	label: string;
	value: string;
}

const Stats = ({ items }: { items: StatItem[] }) => (
	<div className="flex gap-6 @lg:gap-8">
		{items.map(({ label, value }, i) => (
			<div key={i} className="text-center @lg:text-right">
				<p className="text-2xl @md:text-3xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		))}
	</div>
);

interface Member {
	name: string;
	avatar: string;
	initials: string;
}

interface TeamCardProps {
	team: string;
	company: string;
	size: number;
	role: string;
	period: string;
	growth: string;
	members: Member[];
}

const TeamCard = ({
	team,
	company,
	size,
	role,
	period,
	growth,
	members,
}: TeamCardProps) => (
	<Card className="hover:shadow-lg transition-shadow">
		<CardContent className="p-6">
			<div className="flex items-start justify-between mb-4">
				<Badge variant="secondary">{role}</Badge>
				<span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
					<TrendingUp className="size-3" />
					{growth}
				</span>
			</div>
			<h3 className="text-lg font-bold mb-1">{team}</h3>
			<p className="text-sm text-primary mb-1">{company}</p>
			<p className="text-xs text-muted-foreground mb-4">{period}</p>
			<div className="flex items-center justify-between pt-4 border-t">
				<div className="flex -space-x-2">
					{members.map(({ name, avatar, initials }, i) => (
						<Avatar key={i} className="size-8 border-2 border-background">
							<AvatarImage src={avatar} alt={name} />
							<AvatarFallback className="text-xs">{initials}</AvatarFallback>
						</Avatar>
					))}
					{size > members.length && (
						<div className="size-8 rounded-full bg-muted flex items-center justify-center border-2 border-background">
							<span className="text-xs text-muted-foreground">
								+{size - members.length}
							</span>
						</div>
					)}
				</div>
				<span className="text-sm text-muted-foreground">{size} members</span>
			</div>
		</CardContent>
	</Card>
);
