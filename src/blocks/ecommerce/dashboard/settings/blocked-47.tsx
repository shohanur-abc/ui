import {
	Ban,
	Check,
	ChevronRight,
	Mail,
	MessageCircle,
	MoreVertical,
	Plus,
	Search,
	Shield,
	Trash2,
	User,
	UserMinus,
	UserPlus,
	X,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type BlockedUser = {
	id: string;
	name: string;
	username: string;
	avatar?: string;
	blockedAt: string;
	reason?: string;
};

type MutedUser = {
	id: string;
	name: string;
	username: string;
	avatar?: string;
	mutedAt: string;
	mutedUntil?: string;
};

const BlockedUserCard = ({
	name,
	username,
	avatar,
	blockedAt,
	reason,
}: BlockedUser) => (
	<div className="flex items-center gap-4 rounded-lg border p-4">
		<Avatar>
			<AvatarImage src={avatar} />
			<AvatarFallback>
				{name
					.split(' ')
					.map((n) => n[0])
					.join('')}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<h4 className="font-medium truncate">{name}</h4>
				<Badge variant="destructive" className="text-xs">
					Blocked
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground">@{username}</p>
			{reason && (
				<p className="mt-1 text-xs text-muted-foreground">Reason: {reason}</p>
			)}
		</div>
		<div className="flex items-center gap-2">
			<span className="text-xs text-muted-foreground whitespace-nowrap">
				{blockedAt}
			</span>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<User className="mr-2 size-4" />
						View Profile
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-emerald-500">
						<UserPlus className="mr-2 size-4" />
						Unblock User
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

const MutedUserCard = ({
	name,
	username,
	avatar,
	mutedAt,
	mutedUntil,
}: MutedUser) => (
	<div className="flex items-center gap-4 rounded-lg border p-4">
		<Avatar>
			<AvatarImage src={avatar} />
			<AvatarFallback>
				{name
					.split(' ')
					.map((n) => n[0])
					.join('')}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<h4 className="font-medium truncate">{name}</h4>
				<Badge variant="secondary" className="text-xs">
					Muted
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground">@{username}</p>
			{mutedUntil && (
				<p className="mt-1 text-xs text-muted-foreground">
					Until: {mutedUntil}
				</p>
			)}
		</div>
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm">
				Unmute
			</Button>
		</div>
	</div>
);

export default function Main() {
	const blockedUsers: BlockedUser[] = [
		{
			id: '1',
			name: 'Spam Account',
			username: 'spammer123',
			blockedAt: 'Jan 15, 2026',
			reason: 'Spam messages',
		},
		{
			id: '2',
			name: 'John Troll',
			username: 'troller99',
			blockedAt: 'Jan 10, 2026',
			reason: 'Harassment',
		},
		{
			id: '3',
			name: 'Fake Store',
			username: 'fakestore',
			avatar: 'https://avatars.githubusercontent.com/u/252440198?v=4',
			blockedAt: 'Dec 28, 2025',
			reason: 'Fraudulent activity',
		},
	];

	const mutedUsers: MutedUser[] = [
		{
			id: '1',
			name: 'Chatty User',
			username: 'chattyuser',
			avatar: 'https://avatars.githubusercontent.com/u/252440198?v=4',
			mutedAt: 'Jan 18, 2026',
			mutedUntil: 'Feb 18, 2026',
		},
		{
			id: '2',
			name: 'Promo Account',
			username: 'promoaccount',
			mutedAt: 'Jan 12, 2026',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Shield className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Blocked & Muted Users</CardTitle>
									<CardDescription>
										Manage users you've blocked or muted
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<Tabs defaultValue="blocked">
								<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
									<TabsList>
										<TabsTrigger value="blocked">
											Blocked ({blockedUsers.length})
										</TabsTrigger>
										<TabsTrigger value="muted">
											Muted ({mutedUsers.length})
										</TabsTrigger>
									</TabsList>
									<div className="flex gap-2">
										<div className="relative flex-1 @sm:w-64">
											<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
											<Input placeholder="Search users..." className="pl-9" />
										</div>
										<Button size="icon" variant="outline">
											<Plus className="size-4" />
										</Button>
									</div>
								</div>

								<TabsContent value="blocked" className="mt-6 space-y-3">
									{blockedUsers.length > 0 ? (
										blockedUsers.map((user) => (
											<BlockedUserCard key={user.id} {...user} />
										))
									) : (
										<div className="rounded-lg border border-dashed p-8 text-center">
											<Ban className="mx-auto size-12 text-muted-foreground" />
											<p className="mt-2 font-medium">No blocked users</p>
											<p className="text-sm text-muted-foreground">
												Users you block won't be able to contact you
											</p>
										</div>
									)}
								</TabsContent>

								<TabsContent value="muted" className="mt-6 space-y-3">
									{mutedUsers.length > 0 ? (
										mutedUsers.map((user) => (
											<MutedUserCard key={user.id} {...user} />
										))
									) : (
										<div className="rounded-lg border border-dashed p-8 text-center">
											<MessageCircle className="mx-auto size-12 text-muted-foreground" />
											<p className="mt-2 font-medium">No muted users</p>
											<p className="text-sm text-muted-foreground">
												Muted users won't appear in your feed
											</p>
										</div>
									)}
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Block a User</CardTitle>
							<CardDescription>Enter a username to block</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="flex gap-2">
								<Input placeholder="Enter username..." className="flex-1" />
								<Button variant="destructive" className="gap-2">
									<Ban className="size-4" />
									Block
								</Button>
							</div>
							<p className="mt-3 text-sm text-muted-foreground">
								Blocked users cannot view your profile, send you messages, or
								interact with your content.
							</p>
						</CardContent>
					</Card>

					<div className="grid gap-4 @sm:grid-cols-2">
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="text-3xl font-bold text-destructive">
									{blockedUsers.length}
								</div>
								<p className="text-sm text-muted-foreground">Blocked Users</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="text-3xl font-bold text-amber-500">
									{mutedUsers.length}
								</div>
								<p className="text-sm text-muted-foreground">Muted Users</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
