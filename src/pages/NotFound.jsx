import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                {/* Large 404 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 animate-pulse">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-white mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        The page you're looking for seems to have vanished into the digital void. 
                        Don't worry, even the best explorers sometimes take a wrong turn.
                    </p>
                </div>

                {/* Decorative Element */}
                <div className="mb-8 flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-bounce flex items-center justify-center">
                        <div className="text-6xl">🚀</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleGoHome}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        🏠 Go Home
                    </button>
                    

                </div>

                {/* Additional Help Text */}
                <div className="mt-8 text-gray-400 text-sm">
                    <p>If you believe this is an error, please contact support or try refreshing the page.</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;