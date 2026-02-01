import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
	Bell,
	Camera,
	ChevronRight,
	Edit2,
	Eye,
	Globe,
	Heart,
	Lock,
	Mail,
	MessageSquare,
	Phone,
	Shield,
	Smartphone,
	Star,
	User,
	Users,
} from 'lucide-react';
import Link from 'next/link';

const ProfileHeaderCard = ({
	src,
	fallback,
	name,
	username,
	bio,
	verified,
}: {
	src: string;
	fallback: string;
	name: string;
	username: string;
	bio: string;
	verified: boolean;
}) => (
	<Card className="col-span-full row-span-2">
		<CardContent className="p-6">
			<div className="flex flex-col @sm:flex-row gap-6">
				<div className="relative shrink-0 self-start">
					<Avatar className="size-24 ring-4 ring-border">
						<AvatarImage src={src} alt={name} />
						<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
							{fallback}
						</AvatarFallback>
					</Avatar>
					<Button
						size="icon"
						variant="secondary"
						className="absolute -bottom-1 -right-1 size-8 rounded-full"
					>
						<Camera className="size-4" />
					</Button>
				</div>
				<div className="flex-1 space-y-4">
					<div>
						<div className="flex items-center gap-2">
							<h2 className="text-xl font-bold">{name}</h2>
							{verified && (
								<Shield className="size-5 text-blue-500 fill-blue-500/20" />
							)}
						</div>
						<p className="text-muted-foreground">@{username}</p>
						<p className="mt-2 text-sm">{bio}</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button variant="outline" size="sm" className="gap-2" asChild>
							<Link href="/profile/edit">
								<Edit2 className="size-4" />
								Edit Profile
							</Link>
						</Button>
						<Button variant="outline" size="sm" className="gap-2" asChild>
							<Link href="/profile/preview">
								<Eye className="size-4" />
								Preview
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SocialStatsCard = ({
	followers,
	following,
	reviews,
}: {
	followers: number;
	following: number;
	reviews: number;
}) => (
	<Card>
		<CardContent className="p-4">
			<div className="grid grid-cols-3 gap-2 text-center">
				<Link
					href="/followers"
					className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<p className="text-xl font-bold">{followers}</p>
					<p className="text-xs text-muted-foreground">Followers</p>
				</Link>
				<Link
					href="/following"
					className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<p className="text-xl font-bold">{following}</p>
					<p className="text-xs text-muted-foreground">Following</p>
				</Link>
				<Link
					href="/reviews"
					className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
				>
					<p className="text-xl font-bold">{reviews}</p>
					<p className="text-xs text-muted-foreground">Reviews</p>
				</Link>
			</div>
		</CardContent>
	</Card>
);

const ProfileCompletionCard = ({
	percentage,
	missing,
}: {
	percentage: number;
	missing: { icon: React.ElementType; label: string }[];
}) => (
	<Card>
		<CardContent className="p-4 space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">Profile Completion</span>
				<span className="text-sm text-muted-foreground">{percentage}%</span>
			</div>
			<Progress value={percentage} className="h-2" />
			{missing.length > 0 && (
				<div className="space-y-2 mt-3">
					<p className="text-xs text-muted-foreground">
						Complete to earn 500 pts:
					</p>
					{missing.map((item, i) => (
						<div
							key={i}
							className="flex items-center gap-2 text-xs text-muted-foreground"
						>
							<item.icon className="size-3" />
							<span>{item.label}</span>
						</div>
					))}
				</div>
			)}
		</CardContent>
	</Card>
);

const PrivacyCard = ({
	settings,
}: {
	settings: { icon: React.ElementType; label: string; enabled: boolean }[];
}) => (
	<Card className="row-span-2">
		<CardContent className="p-4 space-y-4">
			<div className="flex items-center gap-2">
				<Lock className="size-5 text-muted-foreground" />
				<h3 className="font-medium">Privacy</h3>
			</div>
			<div className="space-y-4">
				{settings.map((setting, i) => (
					<div key={i} className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<setting.icon className="size-4 text-muted-foreground" />
							<span className="text-sm">{setting.label}</span>
						</div>
						<Switch defaultChecked={setting.enabled} />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const ContactInfoCard = ({
	email,
	phone,
	emailVerified,
	phoneVerified,
}: {
	email: string;
	phone: string;
	emailVerified: boolean;
	phoneVerified: boolean;
}) => (
	<Card className="col-span-full @lg:col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<User className="size-5 text-muted-foreground" />
				<h3 className="font-medium">Contact Info</h3>
			</div>
			<div className="grid @sm:grid-cols-2 gap-4">
				<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
					<Mail className="size-5 text-muted-foreground" />
					<div className="flex-1 min-w-0">
						<p className="text-xs text-muted-foreground">Email</p>
						<p className="text-sm font-medium truncate">{email}</p>
					</div>
					{emailVerified ? (
						<Badge className="bg-green-500/20 text-green-600 shrink-0">
							Verified
						</Badge>
					) : (
						<Button variant="ghost" size="sm" className="shrink-0 text-xs">
							Verify
						</Button>
					)}
				</div>
				<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
					<Phone className="size-5 text-muted-foreground" />
					<div className="flex-1 min-w-0">
						<p className="text-xs text-muted-foreground">Phone</p>
						<p className="text-sm font-medium truncate">{phone}</p>
					</div>
					{phoneVerified ? (
						<Badge className="bg-green-500/20 text-green-600 shrink-0">
							Verified
						</Badge>
					) : (
						<Button variant="ghost" size="sm" className="shrink-0 text-xs">
							Verify
						</Button>
					)}
				</div>
			</div>
		</CardContent>
	</Card>
);

const NotificationsCard = ({ unread }: { unread: number }) => (
	<Link href="/notifications">
		<Card className="h-full hover:bg-muted/50 transition-colors">
			<CardContent className="p-4 h-full flex items-center gap-4">
				<div className="relative p-3 rounded-xl bg-blue-500/20">
					<Bell className="size-6 text-blue-500" />
					{unread > 0 && (
						<span className="absolute -top-1 -right-1 size-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
							{unread}
						</span>
					)}
				</div>
				<div className="flex-1">
					<p className="font-medium">Notifications</p>
					<p className="text-xs text-muted-foreground">
						{unread} unread messages
					</p>
				</div>
				<ChevronRight className="size-5 text-muted-foreground" />
			</CardContent>
		</Card>
	</Link>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
			fallback: 'EH',
			name: 'Emma Henderson',
			username: 'emmah',
			bio: 'Fashion enthusiast & lifestyle blogger. Sharing my favorite finds and style tips.',
			verified: true,
		},
		socialStats: {
			followers: 1247,
			following: 384,
			reviews: 89,
		},
		completion: {
			percentage: 85,
			missing: [
				{ icon: Phone, label: 'Add phone number' },
				{ icon: Globe, label: 'Connect social accounts' },
			],
		},
		privacy: [
			{ icon: Eye, label: 'Public Profile', enabled: true },
			{ icon: Heart, label: 'Show Wishlist', enabled: false },
			{ icon: Star, label: 'Show Reviews', enabled: true },
			{ icon: Users, label: 'Show Followers', enabled: true },
		],
		contact: {
			email: 'emma.h@example.com',
			phone: '+1 (555) 123-4567',
			emailVerified: true,
			phoneVerified: false,
		},
		notifications: {
			unread: 5,
		},
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
					<ProfileHeaderCard {...profileData.profile} />
					<SocialStatsCard {...profileData.socialStats} />
					<ProfileCompletionCard {...profileData.completion} />
					<PrivacyCard settings={profileData.privacy} />
					<ContactInfoCard {...profileData.contact} />
					<NotificationsCard {...profileData.notifications} />
				</div>
			</div>
		</section>
	);
}
