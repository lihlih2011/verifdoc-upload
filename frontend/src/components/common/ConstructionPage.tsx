import React from 'react';
import { Link } from 'react-router-dom';

interface ConstructionPageProps {
    title: string;
    description: string;
}

const ConstructionPage: React.FC<ConstructionPageProps> = ({ title, description }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                        className="h-10 w-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                    </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
                    Module {title}
                </h2>
                <p className="mb-6 font-medium text-body">
                    {description}
                    <br />
                    Ce module est défini dans l'architecture VDS mais nécessite le Backend Pro.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Retour au Dashboard
                </Link>
            </div>
        </div>
    );
};

export default ConstructionPage;
