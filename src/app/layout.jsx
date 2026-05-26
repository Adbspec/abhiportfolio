import './globals.css';

export const metadata = {
  title: 'Abhishek Tomar | Portfolio',
  description: 'Professional portfolio and AI recruiter assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="blue-gray" data-mode="light">
      <body>{children}</body>
    </html>
  );
}
