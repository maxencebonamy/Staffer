import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "@/lib/styles/globals.css"
import type { PropsWithChildren, ReactElement } from "react"
import { Navbar } from "@/lib/components/organisms/navbar"
import { ThemeProvider } from "@/lib/providers/theme"
import { TanstackQueryProvider } from "@/lib/providers/tanstack-query"

const font = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap"
})

export const metadata: Metadata = {
	title: "Staffer",
	description: "Staffer"
}

export default ({ children }: PropsWithChildren): ReactElement => {
	return (
		<html lang="en">
			<body className={font.className}>
				<TanstackQueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
					>
						<Navbar />
						{children}
					</ThemeProvider>
				</TanstackQueryProvider>
			</body>
		</html>
	)
}