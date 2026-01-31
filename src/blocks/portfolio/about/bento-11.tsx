import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building, Calendar, GraduationCap, Trophy } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					<ProfileCard
						src="https://picsum.photos/seed/bento11/400/400"
						fallback="DM"
						name="Diana Martinez"
						role="Data Scientist"
						company="Netflix"
						className="@sm:col-span-2"
					/>
					<TimelineCard
						title="Career Path"
						items={[
							{ icon: Building, text: 'Netflix (Current)' },
							{ icon: Building, text: 'Spotify (2019-2022)' },
							{ icon: GraduationCap, text: 'PhD MIT (2019)' },
						]}
						className="@xl:col-span-2 @xl:row-span-2"
					/>
					<StatCard value="50+" label="ML Models Deployed" />
					<StatCard value="$100M+" label="Revenue Impact" />
					<SkillsCard
						items={['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'AWS']}
						className="@sm:col-span-2"
					/>
					<AwardCard
						icon={Trophy}
						title="Top Data Scientist"
						subtitle="Forbes 30 Under 30 (2023)"
					/>
					<ResearchCard
						title="Publications"
						items={['NeurIPS 2023', 'ICML 2022', 'KDD 2021']}
					/>
				</div>
			</div>
		</section>
	);
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	company: string;
	className?: string;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	company,
	className,
}: ProfileCardProps) => (
	<Card className={className}>
		<CardContent className="p-6 flex items-center gap-6">
			<Avatar className="size-20 ring-2 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div>
				<h1 className="text-2xl font-bold mb-1">{name}</h1>
				<p className="text-primary font-medium">{role}</p>
				<p className="text-sm text-muted-foreground">{company}</p>
			</div>
		</CardContent>
	</Card>
);

interface TimelineItem {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface TimelineCardProps {
	title: string;
	items: TimelineItem[];
	className?: string;
}

const TimelineCard = ({ title, items, className }: TimelineCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-4">{title}</p>
			<div className="space-y-4">
				{items.map(({ icon: Icon, text }, i) => (
					<div key={i}>
						<div className="flex items-center gap-3">
							<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
								<Icon className="size-4 text-primary" />
							</div>
							<span className="text-sm">{text}</span>
						</div>
						{i < items.length - 1 && <Separator className="mt-4 ml-4" />}
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface StatCardProps {
	value: string;
	label: string;
}

const StatCard = ({ value, label }: StatCardProps) => (
	<Card className="bg-muted/50 border-none">
		<CardContent className="p-6 flex flex-col justify-center h-full text-center">
			<Calendar className="size-5 text-primary mx-auto mb-2" />
			<div className="text-2xl font-bold">{value}</div>
			<div className="text-xs text-muted-foreground">{label}</div>
		</CardContent>
	</Card>
);

interface SkillsCardProps {
	items: string[];
	className?: string;
}

const SkillsCard = ({ items, className }: SkillsCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-3">Tech Stack</p>
			<div className="flex flex-wrap gap-2">
				{items.map((skill) => (
					<Badge key={skill} variant="secondary">
						{skill}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

interface AwardCardProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
}

const AwardCard = ({ icon: Icon, title, subtitle }: AwardCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="p-6 flex flex-col justify-center h-full text-center">
			<Icon className="size-6 mx-auto mb-2" />
			<p className="font-medium">{title}</p>
			<p className="text-xs opacity-80">{subtitle}</p>
		</CardContent>
	</Card>
);

interface ResearchCardProps {
	title: string;
	items: string[];
}

const ResearchCard = ({ title, items }: ResearchCardProps) => (
	<Card>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-3">{title}</p>
			<div className="space-y-2">
				{items.map((pub) => (
					<Badge key={pub} variant="outline" className="mr-2">
						{pub}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);
