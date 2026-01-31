import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Download,
	Mail,
	Globe,
	Github,
	Linkedin,
	ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-5 @md:gap-6">
					{/* Profile Card */}
					<Card className="@md:col-span-2 @xl:col-span-1 @xl:row-span-2 overflow-hidden py-0">
						<CardContent className="p-0 h-full flex flex-col">
							<div className="relative aspect-square @xl:aspect-auto @xl:flex-1">
								<Image
									src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
									alt="Profile"
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
								<div className="absolute bottom-0 left-0 right-0 p-6">
									<Badge className="mb-3">Available for Hire</Badge>
									<h1 className="text-2xl @sm:text-3xl font-bold text-white mb-1">
										David Park
									</h1>
									<p className="text-white/80">Frontend Engineer</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* About Card */}
					<Card className="py-0">
						<CardContent className="p-5 @md:p-6">
							<h3 className="font-semibold mb-3">About Me</h3>
							<p className="text-sm text-muted-foreground leading-relaxed mb-4">
								Passionate about creating beautiful, performant web experiences.
								6+ years of experience with React, TypeScript, and modern CSS.
							</p>
							<Button variant="outline" size="sm" className="gap-2" asChild>
								<Link href="#about">
									Learn More <ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Location Card */}
					<Card className="py-0">
						<CardContent className="p-5 @md:p-6 flex items-center gap-4">
							<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
								<Globe className="size-5 text-primary" />
							</div>
							<div>
								<div className="text-sm text-muted-foreground">Location</div>
								<div className="font-semibold">Seoul, South Korea</div>
							</div>
						</CardContent>
					</Card>

					{/* CTA Card */}
					<Card className="bg-primary text-primary-foreground border-0 py-0">
						<CardContent className="p-5 @md:p-6">
							<h3 className="font-semibold mb-2">Let&apos;s Build Together</h3>
							<p className="text-primary-foreground/80 text-sm mb-4">
								Open for freelance projects and full-time opportunities.
							</p>
							<Button variant="secondary" className="gap-2 w-full" asChild>
								<Link href="#contact">
									<Mail className="size-4" /> Get in Touch
								</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Resume Card */}
					<Card className="group hover:shadow-lg transition-all py-0">
						<CardContent className="p-5 @md:p-6 flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="size-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
									<Download className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
								</div>
								<div>
									<div className="font-semibold">Resume</div>
									<div className="text-xs text-muted-foreground">
										Download PDF
									</div>
								</div>
							</div>
							<Button variant="ghost" size="icon" asChild>
								<Link href="#resume">
									<ExternalLink className="size-4" />
								</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Social Links Card */}
					<Card className="py-0">
						<CardContent className="p-5 @md:p-6">
							<h3 className="text-sm font-medium text-muted-foreground mb-4">
								Connect With Me
							</h3>
							<SocialLinks
								items={[
									{
										icon: Github,
										href: '#',
										label: 'GitHub',
										username: '@davidpark',
									},
									{
										icon: Linkedin,
										href: '#',
										label: 'LinkedIn',
										username: 'in/davidpark',
									},
								]}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

const SocialLinks = ({
	items,
}: {
	items: {
		icon: ComponentType<{ className?: string }>;
		href: string;
		label: string;
		username: string;
	}[];
}) => (
	<div className="space-y-3">
		{items.map(({ icon: Icon, href, label, username }) => (
			<Link
				key={label}
				href={href}
				className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-muted transition-colors group"
			>
				<Icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
				<div>
					<div className="text-sm font-medium">{label}</div>
					<div className="text-xs text-muted-foreground">{username}</div>
				</div>
			</Link>
		))}
	</div>
);
