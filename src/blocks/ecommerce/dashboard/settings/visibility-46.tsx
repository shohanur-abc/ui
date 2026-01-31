import {
	Bell,
	Check,
	Eye,
	EyeOff,
	Heart,
	Lock,
	MessageCircle,
	Search,
	Share2,
	ShoppingBag,
	Star,
	User,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type VisibilityOption = {
	value: string;
	label: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
};

type ProfileSection = {
	id: string;
	name: string;
	description: string;
	visibility: 'public' | 'friends' | 'private';
	icon: React.ComponentType<{ className?: string }>;
};

const VisibilityRadioCard = ({
	value,
	label,
	description,
	icon: Icon,
}: VisibilityOption) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-all hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<Icon className="size-4" />
				<span className="font-medium">{label}</span>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</Label>
);

const ProfileSectionRow = ({
	name,
	description,
	visibility,
	icon: Icon,
}: ProfileSection) => (
	<div className="flex items-center justify-between py-4">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Icon className="size-5 text-muted-foreground" />
			</div>
			<div>
				<h4 className="font-medium">{name}</h4>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
		<Badge
			variant={visibility === 'public' ? 'default' : 'secondary'}
			className={
				visibility === 'public'
					? 'bg-emerald-500/10 text-emerald-500 border-0'
					: visibility === 'private'
						? 'bg-destructive/10 text-destructive border-0'
						: ''
			}
		>
			<div className="flex items-center gap-1">
				{visibility === 'public' && <Eye className="size-3" />}
				{visibility === 'friends' && <Users className="size-3" />}
				{visibility === 'private' && <Lock className="size-3" />}
				{visibility.charAt(0).toUpperCase() + visibility.slice(1)}
			</div>
		</Badge>
	</div>
);

export default function Main() {
	const visibilityOptions: VisibilityOption[] = [
		{
			value: 'public',
			label: 'Public',
			description: 'Anyone can see your profile',
			icon: Eye,
		},
		{
			value: 'friends',
			label: 'Friends Only',
			description: 'Only people you follow',
			icon: Users,
		},
		{
			value: 'private',
			label: 'Private',
			description: 'Only you can see',
			icon: Lock,
		},
	];

	const profileSections: ProfileSection[] = [
		{
			id: 'wishlist',
			name: 'Wishlist',
			description: 'Products you\'ve saved',
			visibility: 'friends',
			icon: Heart,
		},
		{
			id: 'reviews',
			name: 'Reviews',
			description: 'Your product reviews',
			visibility: 'public',
			icon: Star,
		},
		{
			id: 'orders',
			name: 'Order History',
			description: 'Your past purchases',
			visibility: 'private',
			icon: ShoppingBag,
		},
		{
			id: 'activity',
			name: 'Activity',
			description: 'Recent browsing activity',
			visibility: 'private',
			icon: Search,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-4">
								<Avatar className="size-16 ring-4 ring-border">
									<AvatarImage src="https://avatars.githubusercontent.com/u/252440198?v=4" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div>
									<CardTitle>Profile Visibility</CardTitle>
									<CardDescription>
										Control who can see your profile
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<Label className="text-base font-semibold mb-4 block">
								Default Profile Visibility
							</Label>
							<RadioGroup defaultValue="friends" className="space-y-3">
								{visibilityOptions.map((option) => (
									<VisibilityRadioCard key={option.value} {...option} />
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base">Section Visibility</CardTitle>
									<CardDescription>
										Customize visibility for each section
									</CardDescription>
								</div>
								<Button variant="outline" size="sm">
									Edit All
								</Button>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{profileSections.map((section) => (
								<ProfileSectionRow key={section.id} {...section} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Interaction Settings</CardTitle>
							<CardDescription>
								Control how others can interact with you
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{[
								{
									title: 'Allow Messages',
									description: 'Let other users send you direct messages',
									icon: MessageCircle,
									enabled: true,
								},
								{
									title: 'Allow Follow Requests',
									description: 'Let others request to follow you',
									icon: Users,
									enabled: true,
								},
								{
									title: 'Show in Search',
									description: 'Appear in user search results',
									icon: Search,
									enabled: true,
								},
								{
									title: 'Activity Sharing',
									description: 'Share your activity with followers',
									icon: Share2,
									enabled: false,
								},
							].map((setting) => (
								<div key={setting.title} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<setting.icon className="size-5 text-muted-foreground" />
										<div>
											<Label>{setting.title}</Label>
											<p className="text-sm text-muted-foreground">
												{setting.description}
											</p>
										</div>
									</div>
									<Switch defaultChecked={setting.enabled} />
								</div>
							))}
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Reset to Defaults</Button>
						<Button>Save Changes</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
