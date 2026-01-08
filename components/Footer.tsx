import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-8 md:mb-0 text-center md:text-left">
                    <Link href="/" className="text-2xl font-bold text-primary">Qiyam</Link>
                    <p className="mt-2 text-gray-500 text-sm">
                        Empowering entrepreneurs to build meaningful businesses.
                    </p>
                </div>
                <div className="flex space-x-6">
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        Contact Support
                    </Link>
                </div>
                <div className="mt-8 md:mt-0">
                    <Link href="/signup" className="text-primary font-medium hover:text-red-900">
                        Ready to build? Start now &rarr;
                    </Link>
                </div>
            </div>
        </footer>
    );
}
