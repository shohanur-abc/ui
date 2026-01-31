import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Github, Star, Users } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
					<ProfileCard
						src="https://picsum.photos/seed/bento9/400/400"
						fallback="SR"
						name="Sam Rivera"
						role="Open Source Maintainer"
						className="@sm:col-span-2"
					/>
					<GithubStatCard icon={Star} value="25K+" label="GitHub Stars" />
					<GithubStatCard icon={Users} value="500+" label="Contributors" />
					<BioCard
						text="I maintain several popular open source libraries used by millions. My mission is to make developer tools more accessible."
						className="@lg:col-span-2"
					/>
					<ProjectsCard
						title="Top Projects"
						items={[
							{ name: 'react-ui-kit', stars: 15000 },
							{ name: 'node-utils', stars: 8000 },
							{ name: 'css-framework', stars: 2000 },
						]}
						className="@sm:col-span-2 @lg:col-span-2"
					/>
					<ContributionsCard
						title="Contribution Activity"
						items={[
							{ label: 'Commits', value: 95 },
							{ label: 'PRs', value: 78 },
							{ label: 'Issues', value: 82 },
						]}
						className="@sm:col-span-2"
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
	className?: string;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
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
				<Badge variant="outline" className="mb-2">
					<Github className="size-3 mr-1" />
					@samrivera
				</Badge>
				<h1 className="text-2xl font-bold mb-1">{name}</h1>
				<p className="text-muted-foreground">{role}</p>
			</div>
		</CardContent>
	</Card>
);

interface GithubStatCardProps {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

const GithubStatCard = ({ icon: Icon, value, label }: GithubStatCardProps) => (
	<Card className="bg-muted/50 border-none">
		<CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
			<Icon className="size-6 text-primary mb-2" />
			<div className="text-2xl font-bold">{value}</div>
			<div className="text-xs text-muted-foreground">{label}</div>
		</CardContent>
	</Card>
);

interface BioCardProps {
	text: string;
	className?: string;
}

const BioCard = ({ text, className }: BioCardProps) => (
	<Card className={`bg-primary text-primary-foreground ${className}`}>
		<CardContent className="p-6 flex items-center h-full">
			<div>
				<BookOpen className="size-6 mb-3 opacity-80" />
				<p className="leading-relaxed">{text}</p>
			</div>
		</CardContent>
	</Card>
);

interface ProjectItem {
	name: string;
	stars: number;
}

interface ProjectsCardProps {
	title: string;
	items: ProjectItem[];
	className?: string;
}

const ProjectsCard = ({ title, items, className }: ProjectsCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-4">{title}</p>
			<div className="space-y-3">
				{items.map(({ name, stars }) => (
					<div key={name} className="flex items-center justify-between">
						<span className="font-mono text-sm">{name}</span>
						<Badge variant="secondary">
							<Star className="size-3 mr-1 fill-current" />
							{(stars / 1000).toFixed(1)}k
						</Badge>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface ContributionItem {
	label: string;
	value: number;
}

interface ContributionsCardProps {
	title: string;
	items: ContributionItem[];
	className?: string;
}

const ContributionsCard = ({
	title,
	items,
	className,
}: ContributionsCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-4">{title}</p>
			<div className="space-y-3">
				{items.map(({ label, value }) => (
					<div key={label}>
						<div className="flex justify-between mb-1">
							<span className="text-sm">{label}</span>
							<span className="text-sm text-muted-foreground">{value}%</span>
						</div>
						<Progress value={value} className="h-1.5" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
