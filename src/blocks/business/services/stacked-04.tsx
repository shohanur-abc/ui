import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<StackedTeam
					eyebrow="Our Team"
					title="Meet the Experts Behind Our Services"
					description="A diverse team of designers, developers, and strategists united by a passion for excellence."
					leads={[
						{
							name: 'Alex Thompson',
							role: 'CEO & Founder',
							bio: '15+ years in tech, previously at Google and Stripe. Passionate about building products that matter.',
							image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
							social: {
								linkedin: '#',
								twitter: '#',
							},
						},
						{
							name: 'Maria Garcia',
							role: 'Head of Design',
							bio: 'Award-winning designer with experience at Apple and Airbnb. Believer in human-centered design.',
							image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
							social: {
								linkedin: '#',
								twitter: '#',
							},
						},
						{
							name: 'David Kim',
							role: 'Head of Engineering',
							bio: 'Full-stack expert, open source contributor. Previously engineering lead at Meta.',
							image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
							social: {
								linkedin: '#',
								github: '#',
							},
						},
					]}
					teamStats={[
						{ value: '50+', label: 'Team Members' },
						{ value: '12', label: 'Countries' },
						{ value: '8', label: 'Avg. Years Experience' },
					]}
					cta={{ label: 'Join Our Team', href: '/careers' }}
				/>
			</div>
		</section>
	);
}

interface TeamLead {
	name: string;
	role: string;
	bio: string;
	image: string;
	social: {
		linkedin?: string;
		twitter?: string;
		github?: string;
	};
}

interface TeamStat {
	value: string;
	label: string;
}

const StackedTeam = ({
	eyebrow,
	title,
	description,
	leads,
	teamStats,
	cta,
}: {
	eyebrow: string;
	title: string;
	description: string;
	leads: TeamLead[];
	teamStats: TeamStat[];
	cta: { label: string; href: string };
}) => (
	<div>
		<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
				{title}
			</h2>
			<p className="text-lg text-muted-foreground">{description}</p>
		</div>

		{/* Team leads */}
		<div className="space-y-6 mb-10 @md:mb-14">
			{leads.map((lead, i) => (
				<Card key={i} className="py-0 overflow-hidden">
					<div className={`grid @md:grid-cols-3 ${i % 2 === 1 ? '@md:flex-row-reverse' : ''}`}>
						{/* Image */}
						<div className={`relative aspect-square @md:aspect-auto ${i % 2 === 1 ? '@md:order-2' : ''}`}>
							<Image
								src={lead.image}
								alt={lead.name}
								fill
								className="object-cover"
							/>
						</div>

						{/* Content */}
						<CardContent className={`@md:col-span-2 p-6 @md:p-8 flex flex-col justify-center ${i % 2 === 1 ? '@md:order-1' : ''}`}>
							<Badge variant="secondary" className="w-fit mb-3">
								{lead.role}
							</Badge>
							<h3 className="text-2xl font-bold mb-3">{lead.name}</h3>
							<p className="text-muted-foreground mb-4">{lead.bio}</p>
							<div className="flex items-center gap-3">
								{lead.social.linkedin && (
									<Link
										href={lead.social.linkedin}
										className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
									>
										<Linkedin className="size-4" />
									</Link>
								)}
								{lead.social.twitter && (
									<Link
										href={lead.social.twitter}
										className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
									>
										<Twitter className="size-4" />
									</Link>
								)}
								{lead.social.github && (
									<Link
										href={lead.social.github}
										className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
									>
										<Github className="size-4" />
									</Link>
								)}
							</div>
						</CardContent>
					</div>
				</Card>
			))}
		</div>

		{/* Stats */}
		<div className="grid grid-cols-3 gap-6 p-6 @md:p-8 bg-muted/50 rounded-2xl mb-10 @md:mb-14">
			{teamStats.map((stat, i) => (
				<div key={i} className="text-center">
					<div className="text-2xl @md:text-4xl font-bold text-primary">{stat.value}</div>
					<div className="text-sm text-muted-foreground">{stat.label}</div>
				</div>
			))}
		</div>

		{/* CTA */}
		<div className="text-center">
			<Button size="lg" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
