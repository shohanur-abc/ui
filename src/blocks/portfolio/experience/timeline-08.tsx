import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Journey" />
					<Title text="Roles & Impact" />
					<Description text="Each role shaped who I am as an engineer today." />
				</div>

				<div className="space-y-6">
					<RoleCard
						logo="https://github.com/google.png"
						initials="G"
						company="Google"
						role="Staff Software Engineer"
						period="2022 - Present"
						quote="Leading the design system initiative that serves 500+ engineers across the organization."
						achievements={[
							'Built component library',
							'Led 12-person team',
							'Improved DX metrics by 45%',
						]}
					/>
					<RoleCard
						logo="https://github.com/facebook.png"
						initials="FB"
						company="Meta"
						role="Senior Software Engineer"
						period="2019 - 2022"
						quote="Shipped features that reached billions of users on the Instagram platform."
						achievements={[
							'Stories performance',
							'Reels MVP',
							'Cross-platform architecture',
						]}
					/>
					<RoleCard
						logo="https://github.com/twitter.png"
						initials="X"
						company="Twitter"
						role="Software Engineer"
						period="2017 - 2019"
						quote="Contributed to the timeline rendering engine and tweet composer."
						achievements={[
							'Timeline optimization',
							'Tweet scheduler',
							'A/B testing framework',
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
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

interface RoleCardProps {
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	quote: string;
	achievements: string[];
}

const RoleCard = ({
	logo,
	initials,
	company,
	role,
	period,
	quote,
	achievements,
}: RoleCardProps) => (
	<Card className="overflow-hidden hover:shadow-lg transition-shadow">
		<CardContent className="p-6 @md:p-8">
			<div className="flex flex-col @md:flex-row gap-6">
				<Avatar className="size-16 @md:size-20 rounded-xl border shrink-0">
					<AvatarImage src={logo} alt={company} />
					<AvatarFallback className="rounded-xl text-lg">
						{initials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="flex flex-wrap items-start justify-between gap-2 mb-3">
						<div>
							<h3 className="text-xl @md:text-2xl font-bold">{company}</h3>
							<p className="text-sm text-primary">{role}</p>
						</div>
						<Badge variant="secondary" className="text-xs font-mono">
							{period}
						</Badge>
					</div>
					<div className="flex items-start gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
						<Quote className="size-4 text-muted-foreground shrink-0 mt-0.5" />
						<p className="text-sm text-muted-foreground italic">{quote}</p>
					</div>
					<div className="flex flex-wrap gap-2">
						{achievements.map((achievement, i) => (
							<Badge key={i} variant="outline" className="text-xs">
								{achievement}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
