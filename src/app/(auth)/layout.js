import '../globals.css'
export default function AuthLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen flex justify-center items-center">
                    <div className="pt-10 pb-5 px-7 rounded-lg border-t-4 border-black shadow-xl max-w-full">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}