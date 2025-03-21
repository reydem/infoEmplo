// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Pagination/Pagination.tsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalDocs: number;
  limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange, totalDocs, limit }) => {
  const goToPreviousPage = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const goToNextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={goToPreviousPage}
          disabled={page === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={page === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{(page - 1) * limit + 1}</span> a{' '}
          <span className="font-medium">{Math.min(page * limit, totalDocs)}</span> de{' '}
          <span className="font-medium">{totalDocs}</span> resultados
        </p>
        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
          <button
            onClick={goToPreviousPage}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                page === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={page === totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;

