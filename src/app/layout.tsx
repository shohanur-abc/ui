import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/theme-provider';
import './globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-background text-foreground ">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
