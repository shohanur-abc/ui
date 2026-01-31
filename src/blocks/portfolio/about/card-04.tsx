import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowUpRight,
	Download,
	Github,
	Linkedin,
	Mail,
	Twitter,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-sm mx-auto">
					<ProfileCard
						src="https://picsum.photos/seed/card4/400/400"
						fallback="EL"
						name="Emma Lee"
						role="UX Researcher"
						tagline="Understanding users to build better products"
						socials={[
							{ icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
							{ icon: Github, href: 'https://github.com', label: 'GitHub' },
							{
								icon: Linkedin,
								href: 'https://linkedin.com',
								label: 'LinkedIn',
							},
							{ icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
						]}
						skills={[
							'User Interviews',
							'Usability Testing',
							'Surveys',
							'Analytics',
						]}
						actions={[
							{
								label: 'View Portfolio',
								href: '/portfolio',
								icon: ArrowUpRight,
								variant: 'default',
							},
							{
								label: 'Download CV',
								href: '/cv.pdf',
								icon: Download,
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface SocialItem {
	icon: React.ComponentType<{ className?: string }>;
	href: string;
	label: string;
}

interface ActionItem {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	variant: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	tagline: string;
	socials: SocialItem[];
	skills: string[];
	actions: ActionItem[];
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	tagline,
	socials,
	skills,
	actions,
}: ProfileCardProps) => (
	<Card>
		<CardHeader className="text-center pb-2">
			<Avatar className="size-24 mx-auto mb-4 ring-4 ring-primary/20">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h1 className="text-2xl font-bold">{name}</h1>
			<p className="text-primary font-medium">{role}</p>
			<p className="text-sm text-muted-foreground mt-2">{tagline}</p>
		</CardHeader>
		<CardContent>
			<div className="flex justify-center gap-1 mb-4">
				{socials.map(({ icon: Icon, href, label }) => (
					<Button key={label} variant="ghost" size="icon-sm" asChild>
						<Link href={href} aria-label={label}>
							<Icon className="size-4" />
						</Link>
					</Button>
				))}
			</div>
			<Separator className="my-4" />
			<div className="flex flex-wrap justify-center gap-2 mb-6">
				{skills.map((skill) => (
					<Badge key={skill} variant="secondary" className="text-xs">
						{skill}
					</Badge>
				))}
			</div>
			<div className="space-y-2">
				{actions.map(({ label, href, icon: Icon, variant }) => (
					<Button
						key={label}
						variant={variant}
						className="gap-2 w-full"
						asChild
					>
						<Link href={href}>
							{label}
							<Icon className="size-4" />
						</Link>
					</Button>
				))}
			</div>
		</CardContent>
	</Card>
);
