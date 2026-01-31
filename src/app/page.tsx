import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function Home() {
	return (
		<main className="min-h-screen ">
			<div className="container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h1 className="text-5xl font-bold  mb-4">Welcome</h1>
					<p className="text-xl  mb-8">
						Build amazing things with this template
					</p>
					<Button size="lg">Get Started</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Feature One</CardTitle>
							<CardDescription>
								Description of the first feature
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-slate-600">Add your feature details here.</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Feature Two</CardTitle>
							<CardDescription>
								Description of the second feature
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-slate-600">Add your feature details here.</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Feature Three</CardTitle>
							<CardDescription>
								Description of the third feature
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-slate-600">Add your feature details here.</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
