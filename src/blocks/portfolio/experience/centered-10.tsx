import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Download, Linkedin, Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<Avatar className="size-32 mx-auto mb-8 ring-4 ring-background shadow-xl">
						<AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
						<AvatarFallback className="text-4xl">JD</AvatarFallback>
					</Avatar>

					<Eyebrow text="About Me" />
					<Title text="John Doe" />
					<Subtitle text="Principal Software Engineer" />
					<Description text="I'm a software engineer with 8+ years of experience building products at scale. Currently leading platform engineering at TechCorp, where I focus on developer experience and design systems." />

					<div className="flex flex-wrap justify-center gap-3 mt-8">
						<SocialLink
							href="https://linkedin.com/in/johndoe"
							icon={Linkedin}
							label="LinkedIn"
						/>
						<SocialLink
							href="https://github.com/johndoe"
							icon={Github}
							label="GitHub"
						/>
						<SocialLink
							href="https://johndoe.dev"
							icon={Globe}
							label="Website"
						/>
						<SocialLink
							href="mailto:john@example.com"
							icon={Mail}
							label="Email"
						/>
					</div>

					<div className="flex flex-wrap justify-center gap-4 mt-8">
						<Button asChild>
							<Link href="/contact">
								<Mail className="size-4 mr-2" />
								Get in Touch
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/resume.pdf" download>
								<Download className="size-4 mr-2" />
								Download Resume
							</Link>
						</Button>
					</div>
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
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-xl @md:text-2xl text-primary mt-2 mb-6">{text}</p>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
		{text}
	</p>
);

interface SocialLinkProps {
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => (
	<Link href={href} target="_blank">
		<Badge
			variant="outline"
			className="gap-1.5 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
		>
			<Icon className="size-3.5" />
			{label}
		</Badge>
	</Link>
);
