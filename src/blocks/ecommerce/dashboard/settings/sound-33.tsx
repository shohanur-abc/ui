import {
	Bell,
	BellRing,
	Calendar,
	Check,
	Clock,
	Mail,
	MessageSquare,
	Moon,
	Smartphone,
	Volume2,
	VolumeX,
} from 'lucide-react';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

type SoundOption = {
	id: string;
	name: string;
};

type ScheduleDay = {
	day: string;
	enabled: boolean;
};

const TimeRangeInput = ({
	label,
	startTime,
	endTime,
}: { label: string; startTime: string; endTime: string }) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="flex items-center gap-2">
			<Input type="time" defaultValue={startTime} className="w-28" />
			<span className="text-muted-foreground">to</span>
			<Input type="time" defaultValue={endTime} className="w-28" />
		</div>
	</div>
);

const DayToggle = ({ day, enabled }: ScheduleDay) => (
	<button
		type="button"
		className={`flex size-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
			enabled
				? 'bg-primary text-primary-foreground'
				: 'bg-muted text-muted-foreground hover:bg-muted/80'
		}`}
	>
		{day.charAt(0)}
	</button>
);

export default function Main() {
	const sounds: SoundOption[] = [
		{ id: 'default', name: 'Default' },
		{ id: 'chime', name: 'Chime' },
		{ id: 'bell', name: 'Bell' },
		{ id: 'pop', name: 'Pop' },
		{ id: 'none', name: 'None' },
	];

	const days: ScheduleDay[] = [
		{ day: 'Sunday', enabled: false },
		{ day: 'Monday', enabled: true },
		{ day: 'Tuesday', enabled: true },
		{ day: 'Wednesday', enabled: true },
		{ day: 'Thursday', enabled: true },
		{ day: 'Friday', enabled: true },
		{ day: 'Saturday', enabled: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Volume2 className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Sound & Vibration</CardTitle>
									<CardDescription>
										Configure notification sounds and vibration
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6 pt-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<BellRing className="size-5 text-muted-foreground" />
									<div>
										<Label>Notification Sounds</Label>
										<p className="text-sm text-muted-foreground">Play sounds for notifications</p>
									</div>
								</div>
								<Switch defaultChecked />
							</div>

							<div className="space-y-3">
								<Label>Sound Selection</Label>
								<Select defaultValue="default">
									<SelectTrigger className="w-full @sm:w-64">
										<SelectValue placeholder="Select a sound" />
									</SelectTrigger>
									<SelectContent>
										{sounds.map((sound) => (
											<SelectItem key={sound.id} value={sound.id}>
												{sound.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label>Volume</Label>
									<span className="text-sm text-muted-foreground">75%</span>
								</div>
								<Slider defaultValue={[75]} max={100} step={1} />
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<Smartphone className="size-5 text-muted-foreground" />
									<div>
										<Label>Vibration</Label>
										<p className="text-sm text-muted-foreground">Vibrate on notifications</p>
									</div>
								</div>
								<Switch defaultChecked />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Moon className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Quiet Hours</CardTitle>
									<CardDescription>
										Pause notifications during specific times
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6 pt-6">
							<div className="flex items-center justify-between">
								<div>
									<Label>Enable Quiet Hours</Label>
									<p className="text-sm text-muted-foreground">
										Mute non-urgent notifications
									</p>
								</div>
								<Switch defaultChecked />
							</div>

							<TimeRangeInput
								label="Time Range"
								startTime="22:00"
								endTime="08:00"
							/>

							<div className="space-y-3">
								<Label>Active Days</Label>
								<div className="flex gap-2">
									{days.map((d) => (
										<DayToggle key={d.day} {...d} />
									))}
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<Label>Exceptions</Label>
								<p className="text-sm text-muted-foreground mb-3">
									These notifications will still come through:
								</p>
								<div className="space-y-2">
									{['Security alerts', 'Critical order issues', 'Payment failures'].map((item) => (
										<div key={item} className="flex items-center justify-between py-2">
											<span className="text-sm">{item}</span>
											<Switch defaultChecked />
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Email Frequency</CardTitle>
							<CardDescription>
								How often to receive email notifications
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<Select defaultValue="instant">
								<SelectTrigger>
									<SelectValue placeholder="Select frequency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="instant">Instant - As they happen</SelectItem>
									<SelectItem value="hourly">Hourly Digest</SelectItem>
									<SelectItem value="daily">Daily Digest</SelectItem>
									<SelectItem value="weekly">Weekly Summary</SelectItem>
								</SelectContent>
							</Select>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Cancel</Button>
						<Button>Save Settings</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
