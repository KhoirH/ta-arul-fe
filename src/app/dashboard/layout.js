import Sidenav from "@/components/molecules/sidenav";

export const metadata = {
  title: "Assets Management",
  description: "Assets Management",
};

export default function RootLayout({ children }) {
  return (
    <Sidenav>
      {children}
    </Sidenav>
  )
}
