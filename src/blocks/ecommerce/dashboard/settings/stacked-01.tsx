import { Camera, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProfileField = {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	defaultValue?: string;
};

type ProfileData = {
	avatarUrl: string;
	fallback: string;
	name: string;
	email: string;
};

const ProfileAvatar = ({
	avatarUrl,
	fallback,
	onUpload,
}: ProfileData & { onUpload?: () => void }) => (
	<div className="relative">
		<Avatar className="size-24 ring-2 ring-border transition-all group-hover:ring-primary/50">
			<AvatarImage src={avatarUrl} alt="Profile" />
			<AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute -right-1 -bottom-1 rounded-full shadow-lg transition-transform hover:scale-110"
			onClick={onUpload}
		>
			<Camera className="size-3.5" />
		</Button>
	</div>
);

const ProfileField = ({
	id,
	label,
	placeholder,
	type = 'text',
	defaultValue,
}: ProfileField) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm font-medium">
			{label}
		</Label>
		<Input
			id={id}
			type={type}
			placeholder={placeholder}
			defaultValue={defaultValue}
			className="transition-all focus:ring-2 focus:ring-primary/20"
		/>
	</div>
);

const SectionHeader = ({
	title,
	description,
}: { title: string; description: string }) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center gap-2 text-lg">
			<User className="size-5 text-primary" />
			{title}
		</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
);

export default function Main() {
	const profile: ProfileData = {
		avatarUrl: 'https://avatars.githubusercontent.com/u/252440198?v=4',
		fallback: 'JD',
		name: 'John Doe',
		email: 'john.doe@example.com',
	};

	const fields: ProfileField[] = [
		{
			id: 'firstName',
			label: 'First Name',
			placeholder: 'Enter first name',
			defaultValue: 'John',
		},
		{
			id: 'lastName',
			label: 'Last Name',
			placeholder: 'Enter last name',
			defaultValue: 'Doe',
		},
		{
			id: 'email',
			label: 'Email Address',
			placeholder: 'Enter email',
			type: 'email',
			defaultValue: 'john.doe@example.com',
		},
		{
			id: 'phone',
			label: 'Phone Number',
			placeholder: 'Enter phone number',
			type: 'tel',
			defaultValue: '+1 234 567 890',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
					<SectionHeader
						title="Profile Settings"
						description="Manage your personal information and profile details"
					/>
					<CardContent className="pt-6">
						<div className="flex flex-col gap-6 @md:flex-row @md:gap-8">
							<div className="flex flex-col items-center gap-3">
								<ProfileAvatar {...profile} />
								<span className="text-xs text-muted-foreground">
									Click to upload
								</span>
							</div>
							<div className="flex-1 space-y-4">
								<div className="grid gap-4 @sm:grid-cols-2">
									{fields.map((field) => (
										<ProfileField key={field.id} {...field} />
									))}
								</div>
								<div className="flex justify-end gap-3 pt-4">
									<Button variant="outline">Cancel</Button>
									<Button>Save Changes</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
